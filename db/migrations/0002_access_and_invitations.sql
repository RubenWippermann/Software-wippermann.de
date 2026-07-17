PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS access_invitations (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email_normalized TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'owner', 'organization_admin', 'office', 'accounting',
    'course_management', 'planning', 'sales', 'marketing',
    'coordinator', 'instructor', 'customer', 'hospital', 'driver'
  )),
  token_hash TEXT NOT NULL UNIQUE,
  invited_by_user_id TEXT NOT NULL REFERENCES users(id),
  expires_at TEXT NOT NULL,
  accepted_at TEXT,
  revoked_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_access_invitations_email
  ON access_invitations(email_normalized);
CREATE INDEX IF NOT EXISTS idx_access_invitations_org
  ON access_invitations(organization_id);

CREATE TABLE IF NOT EXISTS user_security_preferences (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  mfa_method TEXT NOT NULL DEFAULT 'platform' CHECK (mfa_method IN ('platform', 'sms')),
  mfa_status TEXT NOT NULL DEFAULT 'pending' CHECK (mfa_status IN ('pending', 'verified', 'disabled')),
  recovery_phone_e164 TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_onboarding (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_step INTEGER NOT NULL DEFAULT 1,
  completed_at TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
