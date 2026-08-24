import crypto from 'crypto';

/**
 * Shared password hashing helper (salted HMAC-SHA256).
 *
 * Used for both admin and student accounts so credential checks are
 * consistent across the system. This is a pragmatic improvement over the
 * previous state (admin passwords were not checked at all); for a real
 * production rollout, migrate to bcrypt/argon2 with a per-user random salt.
 */
const PASSWORD_SALT = process.env.PASSWORD_HASH_SALT || 'gsf_auth_salt_2026';

export const hashPassword = (password: string): string => {
  return crypto.createHmac('sha256', PASSWORD_SALT).update(password).digest('hex');
};

export const verifyPassword = (password: string, hash: string | undefined | null): boolean => {
  if (!hash) return false;
  return hashPassword(password) === hash;
};
