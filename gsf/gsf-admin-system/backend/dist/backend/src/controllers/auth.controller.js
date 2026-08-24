"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginAdmin = void 0;
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const loginAdmin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    // Pre-configured Admin Demo Login (admin@gsf.com / Admin@123 or any password for demo)
    const admin = database_1.initialAdmins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!admin && email !== 'admin@gsf.com') {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }
    const activeAdmin = admin || database_1.initialAdmins[0];
    const token = (0, jwt_1.generateToken)(activeAdmin);
    return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: activeAdmin
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
