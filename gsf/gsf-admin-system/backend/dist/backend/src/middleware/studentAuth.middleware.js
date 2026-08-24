"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAuthMiddleware = void 0;
const database_1 = require("../config/database");
const studentAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['x-student-phone'];
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in to your student account.'
            });
            return;
        }
        // Support Bearer token or plain student ID / phone header
        let identifier = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
        // Resolve student account from token/mobile/id
        const student = database_1.studentsStore.find(s => s.studentId === identifier || s.mobile === identifier || s.mobile.replace(/\s+/g, '') === identifier.replace(/\s+/g, ''));
        if (!student || !student.isActive) {
            res.status(403).json({
                success: false,
                message: 'Student account access forbidden or application not found for this mobile number.'
            });
            return;
        }
        // Attach student context to request
        req.studentId = student.studentId;
        req.mobile = student.mobile;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid authentication session.' });
    }
};
exports.studentAuthMiddleware = studentAuthMiddleware;
