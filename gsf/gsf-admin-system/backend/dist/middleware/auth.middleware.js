"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authentication required. Please login.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login again.' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
