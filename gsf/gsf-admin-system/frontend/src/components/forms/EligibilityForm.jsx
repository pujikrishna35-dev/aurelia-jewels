import React, { useState } from 'react';
import PhoneVerification from './PhoneVerification';
import OtpVerification from './OtpVerification';
import Button from '../common/Button';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EligibilityForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetCountry: 'USA',
    loanAmount: '2500000',
    admissionStatus: 'CONFIRMED',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  const formatE164Phone = (phoneStr) => {
    if (!phoneStr) return '';
    let digits = phoneStr.replace(/[^\d+]/g, '');
    if (!digits.startsWith('+')) {
      if (digits.length === 10) return `+91${digits}`;
      return `+91${digits}`;
    }
    return digits;
  };

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) return;
    setLoading(true);
    setOtpError('');
    try {
      const formattedPhone = formatE164Phone(formData.phone);
      let res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone })
      });
      if (!res.ok) {
        res = await fetch(`${API_BASE}/otp/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formattedPhone })
        });
      }
      const data = await res.json();
      if (data.success) {
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
      } else {
        setOtpError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setOtpError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput || otpInput.trim().length < 4) {
      setOtpError('Please enter the OTP code.');
      return;
    }
    setLoading(true);
    setOtpError('');
    try {
      const formattedPhone = formatE164Phone(formData.phone);
      let res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone, code: otpInput.trim() })
      });
      if (!res.ok) {
        res = await fetch(`${API_BASE}/otp/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formattedPhone, code: otpInput.trim() })
        });
      }
      const data = await res.json();
      if (data.success && (data.verified || data.verified === undefined)) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'Invalid OTP code.');
      }
    } catch (err) {
      setOtpError('Failed to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Please verify your mobile number via OTP first.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        otpVerified: true,
        destination: formData.targetCountry,
        country: formData.targetCountry,
        course: 'Higher Education',
        intake: 'Current/Immediate',
        loanAmount: Number(formData.loanAmount) || 2500000,
        loanType: 'Non-Collateral',
        hasCollateral: false,
        studentSelectedClassification: 'HOT',
        leadClassification: 'HOT',
        admissionStatus: formData.admissionStatus,
        source: 'GSF Eligibility Page'
      };

      await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (err) {
      console.error('Failed to submit lead:', err);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
          Full Name *
        </label>
        <input
          type="text"
          required
          placeholder="Student's Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
          Email Address *
        </label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
      </div>

      <PhoneVerification
        phone={formData.phone}
        onPhoneChange={(val) => setFormData({ ...formData, phone: val })}
        onSendOtp={handleSendOtp}
        loading={loading}
        cooldownSec={cooldownSec}
        disabled={otpVerified}
      />

      <OtpVerification
        otpInput={otpInput}
        onOtpChange={setOtpInput}
        onVerifyOtp={handleVerifyOtp}
        loading={loading}
        otpError={otpError}
        otpVerified={otpVerified}
        otpSent={otpSent}
      />

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
          Target Study Destination *
        </label>
        <select
          value={formData.targetCountry}
          onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        >
          <option value="USA">USA</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
        </select>
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={!otpVerified}>
        Check Loan Eligibility Now
      </Button>
    </form>
  );
};

export default EligibilityForm;
