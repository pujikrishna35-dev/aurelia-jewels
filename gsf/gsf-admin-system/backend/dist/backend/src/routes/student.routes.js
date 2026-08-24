"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const studentAuth_middleware_1 = require("../middleware/studentAuth.middleware");
const router = (0, express_1.Router)();
// Student Authentication (Password & OTP)
router.post('/student/auth/login', (req, res) => student_controller_1.studentController.login(req, res));
// First-Time Password Setup ("New? Create a Password")
router.post('/student/auth/create-password/send-otp', (req, res) => student_controller_1.studentController.createPasswordSendOtp(req, res));
router.post('/student/auth/create-password/verify', (req, res) => student_controller_1.studentController.createPasswordVerify(req, res));
// Forgot Password Recovery
router.post('/student/auth/forgot-password/send-otp', (req, res) => student_controller_1.studentController.createPasswordSendOtp(req, res));
router.post('/student/auth/forgot-password/verify', (req, res) => student_controller_1.studentController.createPasswordVerify(req, res));
// Legacy Direct OTP Login Support
router.post('/student/auth/send-otp', (req, res) => student_controller_1.studentController.sendOtp(req, res));
router.post('/student/auth/verify-otp', (req, res) => student_controller_1.studentController.verifyOtp(req, res));
// Authenticated Student Protected Endpoints
router.get('/student/profile', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getProfile(req, res));
router.get('/student/application', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getApplication(req, res));
router.get('/student/application/status', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getStatus(req, res));
router.get('/student/updates', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getUpdates(req, res));
router.get('/student/notifications', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getNotifications(req, res));
router.get('/student/documents', studentAuth_middleware_1.studentAuthMiddleware, (req, res) => student_controller_1.studentController.getDocuments(req, res));
exports.default = router;
