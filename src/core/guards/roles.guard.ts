export const ROLES = {
  ADMIN: "admin",
  TECHNICIAN: "technician",
} as const;

export type GuardRole = typeof ROLES[keyof typeof ROLES];