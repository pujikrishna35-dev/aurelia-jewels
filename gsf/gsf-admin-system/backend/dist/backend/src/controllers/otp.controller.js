"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpController = exports.OtpController = void 0;
const otp_service_1 = require("../services/otp.service");
class OtpController {
    async sendOtp(req, res) {
        try {
            const { phone } = req.body;
            if (!phone) {
                res.status(400).json({ success: false, message: 'Phone number is required.' });
                return;
            }
            const result = await otp_service_1.otpService.sendOtp(phone);
            res.json({
                success: true,
                message: result.message || 'OTP sent successfully',
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
                res.status(400).json({
                    success: false,
                    verified: false,
                    message: 'Phone number and verification code are required.'
                });
                return;
            }
            const result = await otp_service_1.otpService.verifyOtp(phone, code);
            if (result.success) {
                res.json({
                    success: true,
                    verified: true,
                    message: result.message || 'Mobile number verified successfully.',
                    e164Phone: result.e164Phone
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    verified: false,
                    message: result.message || 'Invalid OTP'
                });
            }
        }
        catch (error) {
            res.status(400).json({
                success: false,
                verified: false,
                message: error.message || 'Verification failed.'
            });
        }
    }
}
exports.OtpController = OtpController;
exports.otpController = new OtpController();
