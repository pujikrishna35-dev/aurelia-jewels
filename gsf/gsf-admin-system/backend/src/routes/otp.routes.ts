import { Router } from 'express';
import { otpController } from '../controllers/otp.controller';

const router = Router();

router.post('/otp/send', (req, res) => otpController.sendOtp(req, res));
router.post('/otp/verify', (req, res) => otpController.verifyOtp(req, res));

export default router;
