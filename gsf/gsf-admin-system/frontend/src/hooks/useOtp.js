import { useState } from 'react';
import otpService from '../services/otpService';

export const useOtp = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  const sendOtp = async (phone) => {
    if (!phone || phone.length !== 10) {
      setOtpError('Please enter a valid 10-digit mobile number');
      return false;
    }
    setLoading(true);
    setOtpError('');
    try {
      const res = await otpService.sendOtp(phone);
      if (res.success) {
        setOtpSent(true);
        setCooldownSec(30);
        const timer = setInterval(() => {
          setCooldownSec((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return true;
      } else {
        setOtpError(res.message || 'Failed to send OTP');
        return false;
      }
    } catch (err) {
      setOtpError('Error sending OTP');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone, otp) => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter valid 6-digit OTP');
      return false;
    }
    setLoading(true);
    setOtpError('');
    try {
      const res = await otpService.verifyOtp(phone, otp);
      if (res.verified || res.success) {
        setOtpVerified(true);
        return true;
      } else {
        setOtpError(res.message || 'Invalid OTP code');
        return false;
      }
    } catch (err) {
      setOtpError('Error verifying OTP');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    otpSent,
    otpVerified,
    otpInput,
    setOtpInput,
    otpError,
    loading,
    cooldownSec,
    sendOtp,
    verifyOtp,
  };
};

export default useOtp;
