"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Shared password hashing helper (salted HMAC-SHA256).
 *
 * Used for both admin and student accounts so credential checks are
 * consistent across the system. This is a pragmatic improvement over the
 * previous state (admin passwords were not checked at all); for a real
 * production rollout, migrate to bcrypt/argon2 with a per-user random salt.
 */
const PASSWORD_SALT = process.env.PASSWORD_HASH_SALT || 'gsf_auth_salt_2026';
const hashPassword = (password) => {
    return crypto_1.default.createHmac('sha256', PASSWORD_SALT).update(password).digest('hex');
};
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => {
    if (!hash)
        return false;
    return (0, exports.hashPassword)(password) === hash;
};
exports.verifyPassword = verifyPassword;
