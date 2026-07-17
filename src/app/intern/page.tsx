"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "../access.module.css";

type Membership = { organizationId: string; organizationName: string; role: string };
type Session = { authenticated: boolean; provisioned?: boolean; name?: string; email?: string; memberships?: Membership[] };

const roleNames: Record<string, string> = {
  owner: "Inhaber / Administrator",
  admin: "Administrator",
  office: "Büro",
  accounting: "Buchhaltung",
  dispatcher: "Disposition",
  instructor: "Dozent",
  customer: "Kunde",
  employee: "Mitarbeiter",
};

export default function InternPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");

  useEffect(() => {
    fetch("/api/session", { cache: "no-store" }).then((r) => r.json()).then(setSession).catch(() => setSession({ authenticated: false }));
  }, []);

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInviteUrl("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/invitations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: data.get("email"), organizationId: data.get("organizationId"), role: data.get("role") }),
    });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      setMessage("Einladung wurde erstellt und protokolliert.");
      setInviteUrl(body.invitationUrl);
      event.currentTarget.reset();
    } else {
      setMessage("Die Einladung konnte nicht erstellt werden. Bitte Firmenrecht prüfen.");
    }
  }

  if (!session) return <main className={styles.page}><section className={styles.card}>Zugang wird geladen …</section></main>;
  if (!session.authenticated || !session.provisioned) {
    return <main className={styles.page}><section className={styles.card}><h1 className={styles.title}>Zugang erforderlich</h1><div className={styles.actions}><a className={styles.primary} href="/zugang">Zum Zugang</a></div></section></main>;
  }

  const canInvite = session.memberships?.some((m) => m.role === "owner" || m.role === "admin");

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Geschützter Arbeitsbereich</p>
        <h1 className={styles.title}>Guten Tag{session.name ? `, ${session.name}` : ""}.</h1>
        <p className={styles.intro}>Diese Firmen und Rollen sind deinem persönlichen Zugang zugeordnet:</p>
        <div className={styles.grid}>
          {session.memberships?.map((membership) => (
            <article className={styles.org} key={membership.organizationId}>
              <strong>{membership.organizationName}</strong>
              <span>{roleNames[membership.role] ?? membership.role}</span>
            </article>
          ))}
        </div>

        {canInvite && (
          <form className={styles.form} onSubmit={invite}>
            <h2>Zugang einladen</h2>
            <label>E-Mail-Adresse<input name="email" type="email" autoComplete="email" required /></label>
            <label>Firma<select name="organizationId" required>{session.memberships?.filter((m) => m.role === "owner" || m.role === "admin").map((m) => <option value={m.organizationId} key={m.organizationId}>{m.organizationName}</option>)}</select></label>
            <label>Rolle<select name="role" defaultValue="office">{Object.entries(roleNames).filter(([role]) => role !== "owner").map(([role, label]) => <option value={role} key={role}>{label}</option>)}</select></label>
            <button className={styles.primary} type="submit">Einladung erstellen</button>
          </form>
        )}

        {message && <div className={inviteUrl ? styles.success : styles.error}>{message}</div>}
        {inviteUrl && <div className={`${styles.notice} ${styles.inviteLink}`}><strong>Einmaliger Einladungslink:</strong><br /><a href={inviteUrl}>{inviteUrl}</a></div>}

        <div className={styles.actions}>
          <a className={styles.secondary} href="/">Demo öffnen</a>
          <a className={styles.secondary} href="/signout-with-chatgpt">Sicher abmelden</a>
        </div>
      </section>
    </main>
  );
}
