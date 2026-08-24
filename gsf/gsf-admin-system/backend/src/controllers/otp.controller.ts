import { Request, Response } from 'express';
import { otpService } from '../services/otp.service';

export class OtpController {
  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phone } = req.body;
      if (!phone) {
        res.status(400).json({ success: false, message: 'Phone number is required.' });
        return;
      }

      const result = await otpService.sendOtp(phone);
      res.json({
        success: true,
        message: result.message || 'OTP sent successfully',
        e164Phone: result.e164Phone
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Failed to send OTP.' });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phone, code } = req.body;
      if (!phone || !code) {
        res.status(400).json({
          success: false,
          verified: false,
          message: 'Phone number and verification code are required.'
        });
        return;
      }

      const result = await otpService.verifyOtp(phone, code);
      
      if (result.success) {
        res.json({
          success: true,
          verified: true,
          message: result.message || 'Mobile number verified successfully.',
          e164Phone: result.e164Phone
        });
      } else {
        res.status(400).json({
          success: false,
          verified: false,
          message: result.message || 'Invalid OTP'
        });
      }
    } catch (error: any) {
      res.status(400).json({
        success: false,
        verified: false,
        message: error.message || 'Verification failed.'
      });
    }
  }
}

export const otpController = new OtpController();
