import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/auth.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { otpController } from '../controllers/otp.controller';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticateAdmin, getMe);
router.post('/send-otp', (req, res) => otpController.sendOtp(req, res));
router.post('/verify-otp', (req, res) => otpController.verifyOtp(req, res));

export default router;
