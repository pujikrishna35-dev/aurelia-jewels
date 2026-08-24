"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAuthMiddleware = void 0;
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const studentAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in to your student account.'
            });
            return;
        }
        const token = authHeader.substring(7);
        // Cryptographically verify the session token (previously this accepted
        // a raw phone number or student ID as the "token" with no verification
        // at all, letting anyone view another student's loan application by
        // guessing or knowing their phone number/ID).
        const decoded = (0, jwt_1.verifyStudentToken)(token);
        const student = database_1.studentsStore.find(s => s.studentId === decoded.studentId);
        if (!student || !student.isActive) {
            res.status(403).json({
                success: false,
                message: 'Student account access forbidden or application not found for this mobile number.'
            });
            return;
        }
        req.studentId = student.studentId;
        req.mobile = student.mobile;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired session. Please log in again.' });
    }
};
exports.studentAuthMiddleware = studentAuthMiddleware;
