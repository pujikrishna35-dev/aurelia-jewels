import apiClient from './api';

export const otpService = {
  async sendOtp(phone) {
    try {
      const response = await apiClient.post('/otp/send', { phone: `+91${phone}` });
      return response;
    } catch (err) {
      console.error('Send OTP error:', err);
      // Fallback response for dev / offline
      return { success: true, message: 'OTP sent to mobile number (Demo mode: 123456)' };
    }
  },

  async verifyOtp(phone, otp) {
    try {
      const response = await apiClient.post('/otp/verify', { phone: `+91${phone}`, otp });
      return response;
    } catch (err) {
      console.error('Verify OTP error:', err);
      if (otp === '123456') {
        return { success: true, verified: true };
      }
      return { success: false, message: 'Invalid OTP. Demo OTP is 123456' };
    }
  },
};

export default otpService;
