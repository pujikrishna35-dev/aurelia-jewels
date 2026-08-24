"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = exports.StudentController = void 0;
const otp_service_1 = require("../services/otp.service");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
const database_1 = require("../config/database");
class StudentController {
    /**
     * Password-based Login for Student Panel
     */
    async login(req, res) {
        try {
            const { mobile, password } = req.body;
            if (!mobile || !password) {
                res.status(400).json({ success: false, message: 'Mobile number and password are required.' });
                return;
            }
            const e164 = otp_service_1.otpService.normalizePhone(mobile);
            const student = database_1.studentsStore.find(s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === mobile);
            // SECURITY RULE: Never reveal if the mobile number exists
            if (!student || !student.isActive || !student.isPasswordSet || !student.passwordHash) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid mobile number or password.'
                });
                return;
            }
            const inputHash = (0, password_1.hashPassword)(password);
            if (student.passwordHash !== inputHash) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid mobile number or password.'
                });
                return;
            }
            const application = database_1.applicationsStore.find(a => a.studentId === student.studentId);
            res.json({
                success: true,
                token: (0, jwt_1.generateStudentToken)(student.studentId, student.mobile),
                student: {
                    studentId: student.studentId,
                    fullName: student.fullName,
                    email: student.email,
                    mobile: student.mobile,
                    applicationId: student.applicationId,
                    isPasswordSet: student.isPasswordSet
                },
                applicationId: application?.applicationId
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'An internal login error occurred.' });
        }
    }
    /**
     * Send OTP for First-Time Password Creation ("New? Create a Password")
     */
    async createPasswordSendOtp(req, res) {
        try {
            const { phone } = req.body;
            if (!phone) {
                res.status(400).json({ success: false, message: 'Mobile number is required.' });
                return;
            }
            const e164 = otp_service_1.otpService.normalizePhone(phone);
            const student = database_1.studentsStore.find(s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone);
            // CRITICAL RULE: If account does not exist, reject with explicit guidance
            if (!student) {
                res.status(404).json({
                    success: false,
                    message: 'No student account was found for this mobile number. Please submit your GSF education loan application first.'
                });
                return;
            }
            const result = await otp_service_1.otpService.sendOtp(phone);
            res.json({
                success: true,
                message: 'OTP sent to your registered mobile number.',
                e164Phone: result.e164Phone
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message || 'Failed to send OTP.' });
        }
    }
    /**
     * Verify OTP and Set Password for First-Time Password Creation or Reset
     */
    async createPasswordVerify(req, res) {
        try {
            const { phone, code, newPassword } = req.body;
            if (!phone || !code || !newPassword) {
                res.status(400).json({ success: false, message: 'Mobile number, OTP code, and new password are required.' });
                return;
            }
            if (newPassword.length < 6) {
                res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
                return;
            }
            const result = await otp_service_1.otpService.verifyOtp(phone, code);
            if (!result.success) {
                res.status(400).json({ success: false, message: result.message || 'Invalid OTP code.' });
                return;
            }
            const e164 = result.e164Phone;
            const student = database_1.studentsStore.find(s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone);
            if (!student) {
                res.status(404).json({
                    success: false,
                    message: 'No student account was found for this mobile number. Please submit your GSF education loan application first.'
                });
                return;
            }
            // Hash password and save to existing student account
            student.passwordHash = (0, password_1.hashPassword)(newPassword);
            student.isPasswordSet = true;
            student.updatedAt = new Date().toISOString();
            (0, database_1.saveDatabase)();
            res.json({
                success: true,
                message: 'Password created successfully! You can now log in to your Student Portal.'
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message || 'Failed to create password.' });
        }
    }
    /**
     * Legacy Direct OTP Login Support
     */
    async sendOtp(req, res) {
        try {
            const { phone } = req.body;
            if (!phone) {
                res.status(400).json({ success: false, message: 'Mobile number is required.' });
                return;
            }
            const e164 = otp_service_1.otpService.normalizePhone(phone);
            const student = database_1.studentsStore.find(s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone);
            if (!student) {
                res.status(404).json({
                    success: false,
                    message: 'No education loan application was found for this mobile number.'
                });
                return;
            }
            const result = await otp_service_1.otpService.sendOtp(phone);
            res.json({
                success: true,
                message: 'OTP sent to mobile number successfully.',
                e164Phone: result.e164Phone
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message || 'Failed to send OTP.' });
        }
    }
    async verifyOtp(req, res) {
        try {
            const { phone, code } = req.body;
            if (!phone || !code) {
                res.status(400).json({ success: false, message: 'Mobile number and verification code are required.' });
                return;
            }
            const result = await otp_service_1.otpService.verifyOtp(phone, code);
            if (!result.success) {
                res.status(400).json({ success: false, verified: false, message: result.message || 'Invalid OTP code.' });
                return;
            }
            const e164 = result.e164Phone;
            const student = database_1.studentsStore.find(s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone);
            if (!student) {
                res.status(404).json({
                    success: false,
                    verified: false,
                    message: 'No education loan application was found for this mobile number.'
                });
                return;
            }
            const application = database_1.applicationsStore.find(a => a.studentId === student.studentId);
            res.json({
                success: true,
                verified: true,
                token: (0, jwt_1.generateStudentToken)(student.studentId, student.mobile),
                student: {
                    studentId: student.studentId,
                    fullName: student.fullName,
                    email: student.email,
                    mobile: student.mobile,
                    applicationId: student.applicationId,
                    isPasswordSet: student.isPasswordSet
                },
                applicationId: application?.applicationId
            });
        }
        catch (error) {
            res.status(400).json({ success: false, verified: false, message: error.message || 'OTP verification failed.' });
        }
    }
    getProfile(req, res) {
        const student = database_1.studentsStore.find(s => s.studentId === req.studentId);
        if (!student) {
            res.status(404).json({ success: false, message: 'Student profile not found.' });
            return;
        }
        res.json({
            success: true,
            data: {
                studentId: student.studentId,
                fullName: student.fullName,
                email: student.email,
                mobile: student.mobile,
                applicationId: student.applicationId,
                isActive: student.isActive,
                isPasswordSet: student.isPasswordSet,
                createdAt: student.createdAt
            }
        });
    }
    getApplication(req, res) {
        const app = database_1.applicationsStore.find(a => a.studentId === req.studentId);
        if (!app) {
            res.status(404).json({ success: false, message: 'Unable to load your application. Please try again later.' });
            return;
        }
        // Explicitly exclude internal GSF lead classifications (HOT, MEDIUM, COLD)
        res.json({
            success: true,
            data: {
                applicationId: app.applicationId,
                fullName: app.fullName,
                email: app.email,
                mobile: app.mobile,
                country: app.country,
                university: app.university,
                course: app.course,
                qualificationLevel: app.qualificationLevel,
                intake: app.intake,
                admissionStatus: app.admissionStatus,
                loanAmount: app.loanAmount,
                address: app.address,
                applicationStatus: app.applicationStatus,
                loanStatus: app.loanStatus,
                createdAt: app.createdAt,
                updatedAt: app.updatedAt
            }
        });
    }
    getStatus(req, res) {
        const app = database_1.applicationsStore.find(a => a.studentId === req.studentId);
        if (!app) {
            res.status(404).json({ success: false, message: 'Application status not available.' });
            return;
        }
        const appStatusLabels = {
            SUBMITTED: '🟢 Application Submitted',
            DOCUMENTS_PENDING: '🟡 Documents Pending',
            DOCUMENTS_VERIFIED: '🟢 Documents Verified',
            UNDER_REVIEW: '🟡 Application Under Review',
            ACTION_REQUIRED: '🟠 Action Required',
            APPROVED: '🟢 Application Approved',
            REJECTED: '🔴 Application Rejected',
            ON_HOLD: '⚪ On Hold',
            COMPLETED: '🟢 Loan Completed'
        };
        const loanStatusLabels = {
            NOT_STARTED: '⚪ Not Started',
            PROCESSING: '🟡 Loan Processing',
            UNDER_REVIEW: '🟡 Under Review',
            SANCTIONED: '🟢 Loan Sanctioned',
            DISBURSED: '🟢 Loan Disbursed',
            REJECTED: '🔴 Loan Rejected',
            ON_HOLD: '⚪ On Hold'
        };
        res.json({
            success: true,
            data: {
                applicationId: app.applicationId,
                applicationStatus: app.applicationStatus,
                applicationStatusLabel: appStatusLabels[app.applicationStatus] || `🟡 ${app.applicationStatus}`,
                loanStatus: app.loanStatus,
                loanStatusLabel: loanStatusLabels[app.loanStatus] || `🟡 ${app.loanStatus}`,
                updatedAt: app.updatedAt
            }
        });
    }
    getUpdates(req, res) {
        const updates = database_1.studentUpdatesStore.filter(u => u.studentId === req.studentId);
        res.json({
            success: true,
            data: updates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        });
    }
    getNotifications(req, res) {
        const notifs = database_1.studentNotificationsStore.filter(n => n.studentId === req.studentId);
        res.json({
            success: true,
            data: notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        });
    }
    getDocuments(req, res) {
        const docs = database_1.studentDocumentsStore.filter(d => d.studentId === req.studentId && d.visibleToStudent);
        res.json({
            success: true,
            data: docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        });
    }
}
exports.StudentController = StudentController;
exports.studentController = new StudentController();
