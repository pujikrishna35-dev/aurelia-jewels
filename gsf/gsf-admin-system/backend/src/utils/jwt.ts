import jwt from 'jsonwebtoken';
import { AdminUser } from '../shared/types/admin';

const FALLBACK_JWT_SECRET = 'gsf_super_secret_jwt_key_2026_finance_admin';

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  // Refuse to silently sign tokens with a secret that's public in source control.
  throw new Error(
    'JWT_SECRET environment variable is not set. Refusing to start in production with the fallback secret.'
  );
}

const JWT_SECRET = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;

/**
 * Admin session tokens (24h expiry).
 */
export const generateToken = (user: AdminUser): string => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role, type: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): any => {
  const decoded: any = jwt.verify(token, JWT_SECRET);
  if (decoded?.type !== 'admin') {
    throw new Error('Invalid token type for admin session.');
  }
  return decoded;
};

/**
 * Student session tokens (7 day expiry — loan applications are tracked over
 * weeks, so a shorter-lived admin-style token would force frequent re-logins).
 * Replaces the previous scheme where the raw studentId/mobile was used as a
 * "token" with no cryptographic verification at all.
 */
export const generateStudentToken = (studentId: string, mobile: string): string => {
  return jwt.sign(
    { studentId, mobile, type: 'student' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyStudentToken = (token: string): { studentId: string; mobile: string } => {
  const decoded: any = jwt.verify(token, JWT_SECRET);
  if (decoded?.type !== 'student' || !decoded.studentId) {
    throw new Error('Invalid token type for student session.');
  }
  return { studentId: decoded.studentId, mobile: decoded.mobile };
};
