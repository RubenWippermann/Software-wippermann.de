import { rolePermissions, type OrganizationRole, type Permission } from "./permissions";

export type ActiveMembership = {
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  active: boolean;
};

export class AccessDeniedError extends Error {
  constructor() {
    super("Zugriff nicht erlaubt");
    this.name = "AccessDeniedError";
  }
}

export function authorizeOrganizationAccess(input: {
  membership: ActiveMembership | null | undefined;
  organizationId: string;
  permission: Permission;
}): ActiveMembership {
  const { membership, organizationId, permission } = input;

  if (
    !membership ||
    !membership.active ||
    membership.organizationId !== organizationId ||
    !rolePermissions[membership.role].has(permission)
  ) {
    throw new AccessDeniedError();
  }

  return membership;
}

export function scopeToOrganization(organizationId: string) {
  if (!organizationId.trim()) throw new AccessDeniedError();
  return { organizationId } as const;
}
