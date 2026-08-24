"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudentToken = exports.generateStudentToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const FALLBACK_JWT_SECRET = 'gsf_super_secret_jwt_key_2026_finance_admin';
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    // Refuse to silently sign tokens with a secret that's public in source control.
    throw new Error('JWT_SECRET environment variable is not set. Refusing to start in production with the fallback secret.');
}
const JWT_SECRET = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;
/**
 * Admin session tokens (24h expiry).
 */
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role, type: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decoded?.type !== 'admin') {
        throw new Error('Invalid token type for admin session.');
    }
    return decoded;
};
exports.verifyToken = verifyToken;
/**
 * Student session tokens (7 day expiry — loan applications are tracked over
 * weeks, so a shorter-lived admin-style token would force frequent re-logins).
 * Replaces the previous scheme where the raw studentId/mobile was used as a
 * "token" with no cryptographic verification at all.
 */
const generateStudentToken = (studentId, mobile) => {
    return jsonwebtoken_1.default.sign({ studentId, mobile, type: 'student' }, JWT_SECRET, { expiresIn: '7d' });
};
exports.generateStudentToken = generateStudentToken;
const verifyStudentToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decoded?.type !== 'student' || !decoded.studentId) {
        throw new Error('Invalid token type for student session.');
    }
    return { studentId: decoded.studentId, mobile: decoded.mobile };
};
exports.verifyStudentToken = verifyStudentToken;
