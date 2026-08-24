"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginAdmin = void 0;
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
const loginAdmin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const admin = database_1.initialAdmins.find(a => a.email.toLowerCase() === email.toLowerCase());
    // Constant-shaped response whether the email is unknown or the password is
    // wrong, so this endpoint doesn't reveal which admin emails exist.
    if (!admin || !(0, password_1.verifyPassword)(password, admin.passwordHash)) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    const token = (0, jwt_1.generateToken)(admin);
    // Never return the password hash to the client.
    const { passwordHash, ...safeAdmin } = admin;
    return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: safeAdmin
    });
};
exports.loginAdmin = loginAdmin;
const getMe = (req, res) => {
    return res.json({
        success: true,
        user: req.user
    });
};
exports.getMe = getMe;
