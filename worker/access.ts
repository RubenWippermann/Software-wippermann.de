export interface AccessEnv {
  DB: D1Database;
  BOOTSTRAP_ADMIN_EMAIL_SHA256?: string;
}

const EMAIL_HEADER = "oai-authenticated-user-email";
const NAME_HEADER = "oai-authenticated-user-full-name";
const NAME_ENCODING_HEADER = "oai-authenticated-user-full-name-encoding";
const ORGANIZATIONS = [
  "org_personal_paramedic",
  "org_bww",
  "org_euroblood",
  "org_ruben_wippermann",
] as const;
const ROLES = new Set([
  "owner", "organization_admin", "office", "accounting",
  "course_management", "planning", "sales", "marketing", "coordinator",
  "instructor", "customer", "hospital", "driver",
]);

type Identity = { email: string; name: string };
type Membership = { organization_id: string; role: string };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function identityFrom(request: Request): Identity | null {
  const email = request.headers.get(EMAIL_HEADER)?.trim().toLowerCase();
  if (!email) return null;
  const rawName = request.headers.get(NAME_HEADER)?.trim() || email.split("@")[0];
  const encoded = request.headers.get(NAME_ENCODING_HEADER) === "percent-encoded-utf-8";
  let name = rawName;
  if (encoded) {
    try { name = decodeURIComponent(rawName); } catch { name = rawName; }
  }
  return { email, name };
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function currentUser(env: AccessEnv, identity: Identity) {
  return env.DB.prepare(
    "SELECT id, email_normalized, display_name, status FROM users WHERE email_normalized = ? LIMIT 1",
  ).bind(identity.email).first<{ id: string; email_normalized: string; display_name: string; status: string }>();
}

async function memberships(env: AccessEnv, userId: string): Promise<Membership[]> {
  const result = await env.DB.prepare(
    "SELECT organization_id, role FROM organization_memberships WHERE user_id = ? AND active = 1 ORDER BY organization_id",
  ).bind(userId).all<Membership>();
  return result.results || [];
}

async function sessionResponse(request: Request, env: AccessEnv): Promise<Response> {
  const identity = identityFrom(request);
  if (!identity) return json({ authenticated: false }, 401);
  const user = await currentUser(env, identity);
  if (!user || user.status !== "active") {
    return json({ authenticated: true, provisioned: false, identity });
  }
  return json({
    authenticated: true,
    provisioned: true,
    identity,
    user,
    memberships: await memberships(env, user.id),
  });
}

async function bootstrap(request: Request, env: AccessEnv): Promise<Response> {
  if (request.method !== "POST" || !sameOrigin(request)) return json({ error: "Nicht erlaubt" }, 403);
  const identity = identityFrom(request);
  if (!identity) return json({ error: "Bitte zuerst sicher anmelden." }, 401);
  const configuredHash = env.BOOTSTRAP_ADMIN_EMAIL_SHA256?.trim().toLowerCase();
  if (!configuredHash || await sha256(identity.email) !== configuredHash) {
    return json({ error: "Diese Anmeldung ist nicht für die Ersteinrichtung freigegeben." }, 403);
  }
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM users").first<{ total: number }>();
  if ((count?.total || 0) > 0) return json({ error: "Die Ersteinrichtung wurde bereits abgeschlossen." }, 409);

  const userId = crypto.randomUUID();
  const now = new Date().toISOString();
  const statements = [
    env.DB.prepare("INSERT INTO users (id, auth_subject, email_normalized, display_name, status, mfa_required, created_at, updated_at) VALUES (?, ?, ?, ?, 'active', 1, ?, ?)")
      .bind(userId, `sites:${identity.email}`, identity.email, identity.name, now, now),
    env.DB.prepare("INSERT INTO user_security_preferences (user_id, mfa_method, mfa_status, updated_at) VALUES (?, 'platform', 'pending', ?)")
      .bind(userId, now),
    env.DB.prepare("INSERT INTO user_onboarding (user_id, current_step, updated_at) VALUES (?, 1, ?)")
      .bind(userId, now),
  ];
  for (const organizationId of ORGANIZATIONS) {
    statements.push(env.DB.prepare("INSERT INTO organization_memberships (id, organization_id, user_id, role, active, created_at, updated_at) VALUES (?, ?, ?, 'owner', 1, ?, ?)")
      .bind(crypto.randomUUID(), organizationId, userId, now, now));
  }
  statements.push(env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, action, entity_type, entity_id, details_json, occurred_at) VALUES (?, ?, 'access.bootstrap', 'user', ?, ?, ?)")
    .bind(crypto.randomUUID(), userId, userId, JSON.stringify({ organizations: ORGANIZATIONS }), now));
  await env.DB.batch(statements);
  return json({ ok: true });
}

async function createInvitation(request: Request, env: AccessEnv): Promise<Response> {
  if (request.method !== "POST" || !sameOrigin(request)) return json({ error: "Nicht erlaubt" }, 403);
  const identity = identityFrom(request);
  if (!identity) return json({ error: "Nicht angemeldet" }, 401);
  const actor = await currentUser(env, identity);
  if (!actor || actor.status !== "active") return json({ error: "Kein aktiver Zugang" }, 403);

  const body = await request.json<{ email?: string; organizationId?: string; role?: string }>().catch(() => ({}));
  const email = body.email?.trim().toLowerCase() || "";
  const organizationId = body.organizationId || "";
  const role = body.role || "";
  if (!email.includes("@") || !ORGANIZATIONS.includes(organizationId as typeof ORGANIZATIONS[number]) || !ROLES.has(role)) {
    return json({ error: "Bitte E-Mail, Firma und Rolle prüfen." }, 400);
  }
  const authorization = await env.DB.prepare(
    "SELECT role FROM organization_memberships WHERE user_id = ? AND organization_id = ? AND active = 1 AND role IN ('owner', 'organization_admin') LIMIT 1",
  ).bind(actor.id, organizationId).first<{ role: string }>();
  if (!authorization) return json({ error: "Keine Berechtigung für diese Firma." }, 403);

  const token = randomToken();
  const tokenHash = await sha256(token);
  const invitationId = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await env.DB.batch([
    env.DB.prepare("INSERT INTO access_invitations (id, organization_id, email_normalized, role, token_hash, invited_by_user_id, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(invitationId, organizationId, email, role, tokenHash, actor.id, expiresAt, now.toISOString()),
    env.DB.prepare("INSERT INTO audit_events (id, organization_id, actor_user_id, action, entity_type, entity_id, details_json, occurred_at) VALUES (?, ?, ?, 'access.invitation.created', 'access_invitation', ?, ?, ?)")
      .bind(crypto.randomUUID(), organizationId, actor.id, invitationId, JSON.stringify({ email, role, expiresAt }), now.toISOString()),
  ]);
  return json({ ok: true, invitationUrl: `${new URL(request.url).origin}/einladung?token=${encodeURIComponent(token)}`, expiresAt });
}

async function acceptInvitation(request: Request, env: AccessEnv): Promise<Response> {
  if (request.method !== "POST" || !sameOrigin(request)) return json({ error: "Nicht erlaubt" }, 403);
  const identity = identityFrom(request);
  if (!identity) return json({ error: "Bitte zuerst sicher anmelden." }, 401);
  const body = await request.json<{ token?: string }>().catch(() => ({}));
  if (!body.token) return json({ error: "Einladung fehlt." }, 400);
  const tokenHash = await sha256(body.token);
  const invitation = await env.DB.prepare(
    "SELECT id, organization_id, email_normalized, role, expires_at FROM access_invitations WHERE token_hash = ? AND accepted_at IS NULL AND revoked_at IS NULL LIMIT 1",
  ).bind(tokenHash).first<{ id: string; organization_id: string; email_normalized: string; role: string; expires_at: string }>();
  if (!invitation || new Date(invitation.expires_at).getTime() < Date.now()) return json({ error: "Die Einladung ist ungültig oder abgelaufen." }, 410);
  if (invitation.email_normalized !== identity.email) return json({ error: "Bitte mit der eingeladenen E-Mail-Adresse anmelden." }, 403);

  const existing = await currentUser(env, identity);
  const userId = existing?.id || crypto.randomUUID();
  const now = new Date().toISOString();
  const statements = [];
  if (!existing) {
    statements.push(env.DB.prepare("INSERT INTO users (id, auth_subject, email_normalized, display_name, status, mfa_required, created_at, updated_at) VALUES (?, ?, ?, ?, 'active', 1, ?, ?)")
      .bind(userId, `sites:${identity.email}`, identity.email, identity.name, now, now));
    statements.push(env.DB.prepare("INSERT INTO user_security_preferences (user_id, mfa_method, mfa_status, updated_at) VALUES (?, 'platform', 'pending', ?)").bind(userId, now));
    statements.push(env.DB.prepare("INSERT INTO user_onboarding (user_id, current_step, updated_at) VALUES (?, 1, ?)").bind(userId, now));
  }
  statements.push(env.DB.prepare("INSERT INTO organization_memberships (id, organization_id, user_id, role, active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?) ON CONFLICT(organization_id, user_id) DO UPDATE SET role = excluded.role, active = 1, updated_at = excluded.updated_at")
    .bind(crypto.randomUUID(), invitation.organization_id, userId, invitation.role, now, now));
  statements.push(env.DB.prepare("UPDATE access_invitations SET accepted_at = ? WHERE id = ?").bind(now, invitation.id));
  statements.push(env.DB.prepare("INSERT INTO audit_events (id, organization_id, actor_user_id, action, entity_type, entity_id, details_json, occurred_at) VALUES (?, ?, ?, 'access.invitation.accepted', 'access_invitation', ?, ?, ?)")
    .bind(crypto.randomUUID(), invitation.organization_id, userId, invitation.id, JSON.stringify({ role: invitation.role }), now));
  await env.DB.batch(statements);
  return json({ ok: true });
}

export async function handleAccessRequest(request: Request, env: AccessEnv): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname === "/api/session") return sessionResponse(request, env);
  if (url.pathname === "/api/bootstrap") return bootstrap(request, env);
  if (url.pathname === "/api/invitations") return createInvitation(request, env);
  if (url.pathname === "/api/invitations/accept") return acceptInvitation(request, env);
  if (url.pathname === "/intern" || url.pathname.startsWith("/intern/")) {
    const identity = identityFrom(request);
    if (!identity) {
      const returnTo = `${url.pathname}${url.search}`;
      return Response.redirect(new URL(`/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`, url.origin), 302);
    }
    const user = await currentUser(env, identity);
    if (!user || user.status !== "active") return Response.redirect(new URL("/zugang?error=no_access", url.origin), 302);
  }
  return null;
}
