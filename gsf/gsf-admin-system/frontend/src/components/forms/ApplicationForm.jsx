import React, { useState } from 'react';
import PhoneVerification from './PhoneVerification';
import OtpVerification from './OtpVerification';
import Button from '../common/Button';

const ApplicationForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetCountry: 'USA',
    universityName: '',
    loanAmount: '3000000',
    hasCollateral: 'NO',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  const handleSendOtp = () => {
    if (formData.phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setCooldownSec(30);
    }, 600);
  };

  const handleVerifyOtp = () => {
    if (otpInput === '123456' || otpInput.length === 6) {
      setOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP code. Please enter 123456');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Please verify your phone number before submitting.');
      return;
    }
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
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
          placeholder="As per Passport / Aadhaar"
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
          placeholder="your.name@gmail.com"
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
          University / College Name
        </label>
        <input
          type="text"
          placeholder="e.g. Northeastern University, Boston"
          value={formData.universityName}
          onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={!otpVerified}>
        Submit Education Loan Application
      </Button>
    </form>
  );
};

export default ApplicationForm;
