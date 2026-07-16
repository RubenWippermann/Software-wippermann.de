export type OrganizationRole =
  | "owner"
  | "organization_admin"
  | "office"
  | "accounting"
  | "course_management"
  | "planning"
  | "sales"
  | "marketing"
  | "coordinator"
  | "instructor"
  | "customer"
  | "hospital"
  | "driver";

export type Permission =
  | "organization.manage"
  | "user.manage"
  | "task.read"
  | "task.write"
  | "course.read"
  | "course.write"
  | "finance.read"
  | "finance.write"
  | "instructor.read"
  | "instructor.write"
  | "document.read"
  | "document.write"
  | "audit.read"
  | "transport.read"
  | "transport.write"
  | "own_portal.read";

const allPermissions: Permission[] = [
  "organization.manage",
  "user.manage",
  "task.read",
  "task.write",
  "course.read",
  "course.write",
  "finance.read",
  "finance.write",
  "instructor.read",
  "instructor.write",
  "document.read",
  "document.write",
  "audit.read",
  "transport.read",
  "transport.write",
  "own_portal.read",
];

export const rolePermissions: Record<OrganizationRole, ReadonlySet<Permission>> = {
  owner: new Set(allPermissions),
  organization_admin: new Set(allPermissions),
  office: new Set([
    "task.read", "task.write", "course.read", "course.write", "instructor.read",
    "document.read", "document.write", "own_portal.read",
  ]),
  accounting: new Set([
    "task.read", "task.write", "course.read", "finance.read", "finance.write",
    "document.read", "document.write", "own_portal.read",
  ]),
  course_management: new Set([
    "task.read", "task.write", "course.read", "course.write", "instructor.read",
    "instructor.write", "document.read", "document.write", "own_portal.read",
  ]),
  planning: new Set([
    "task.read", "task.write", "course.read", "course.write", "instructor.read",
    "transport.read", "transport.write", "own_portal.read",
  ]),
  sales: new Set([
    "task.read", "task.write", "course.read", "course.write", "document.read",
    "document.write", "own_portal.read",
  ]),
  marketing: new Set(["task.read", "task.write", "document.read", "document.write", "own_portal.read"]),
  coordinator: new Set([
    "task.read", "task.write", "course.read", "course.write", "instructor.read",
    "document.read", "document.write", "own_portal.read",
  ]),
  instructor: new Set(["course.read", "document.read", "document.write", "own_portal.read"]),
  customer: new Set(["course.read", "document.read", "own_portal.read"]),
  hospital: new Set(["transport.read", "document.read", "own_portal.read"]),
  driver: new Set(["transport.read", "transport.write", "document.write", "own_portal.read"]),
};
