import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { studentAuthMiddleware } from '../middleware/studentAuth.middleware';

const router = Router();

// Student Authentication (Password & OTP)
router.post('/student/auth/login', (req, res) => studentController.login(req, res));

// First-Time Password Setup ("New? Create a Password")
router.post('/student/auth/create-password/send-otp', (req, res) => studentController.createPasswordSendOtp(req, res));
router.post('/student/auth/create-password/verify', (req, res) => studentController.createPasswordVerify(req, res));

// Forgot Password Recovery
router.post('/student/auth/forgot-password/send-otp', (req, res) => studentController.createPasswordSendOtp(req, res));
router.post('/student/auth/forgot-password/verify', (req, res) => studentController.createPasswordVerify(req, res));

// Legacy Direct OTP Login Support
router.post('/student/auth/send-otp', (req, res) => studentController.sendOtp(req, res));
router.post('/student/auth/verify-otp', (req, res) => studentController.verifyOtp(req, res));

// Authenticated Student Protected Endpoints
router.get('/student/profile', studentAuthMiddleware, (req, res) => studentController.getProfile(req, res));
router.get('/student/application', studentAuthMiddleware, (req, res) => studentController.getApplication(req, res));
router.get('/student/application/status', studentAuthMiddleware, (req, res) => studentController.getStatus(req, res));
router.get('/student/updates', studentAuthMiddleware, (req, res) => studentController.getUpdates(req, res));
router.get('/student/notifications', studentAuthMiddleware, (req, res) => studentController.getNotifications(req, res));
router.get('/student/documents', studentAuthMiddleware, (req, res) => studentController.getDocuments(req, res));

export default router;
