import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Lock, Smartphone, CheckCircle2, ArrowLeft } from 'lucide-react';
import './student.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentLogin = () => {
  const navigate = useNavigate();

  // Active Mode: 'LOGIN' | 'CREATE_PASSWORD' | 'FORGOT_PASSWORD'
  const [mode, setMode] = useState('LOGIN');

  // Form Fields
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP & Password Setup Fields
  const [otpStep, setOtpStep] = useState(1); // 1: Send OTP, 2: Verify OTP, 3: Set New Password, 4: Success
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  // Status & Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const startCooldown = () => {
    setCooldownSec(30);
    const interval = setInterval(() => {
      setCooldownSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetFormState = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
    setOtpStep(1);
    setOtpCode('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowNewPassword(false);
  };

  // 1. Password-based Student Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/student/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('gsf_student_token', data.token);
        localStorage.setItem('gsf_student_info', JSON.stringify(data.student));
        navigate('/student/dashboard');
      } else {
        // SECURITY RULE: Never reveal whether the mobile number exists
        setError('Invalid mobile number or password.');
      }
    } catch (err) {
      setError('Unable to login. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // 2. First-Time Password Creation / Forgot Password - Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    const endpoint = mode === 'CREATE_PASSWORD'
      ? `${API_BASE}/student/auth/create-password/send-otp`
      : `${API_BASE}/student/auth/forgot-password/send-otp`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile })
      });
      const data = await res.json();

      if (data.success) {
        setOtpStep(2);
        startCooldown();
      } else {
        setError(data.message || 'No student account was found for this mobile number. Please submit your GSF education loan application first.');
      }
    } catch (err) {
      setError('Unable to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP Step
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length < 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    setError('');
    setOtpStep(3); // Proceed to Set Password Step
  };

  // 4. Save New Password
  const handleSaveNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    setLoading(true);
    setError('');

    const endpoint = mode === 'CREATE_PASSWORD'
      ? `${API_BASE}/student/auth/create-password/verify`
      : `${API_BASE}/student/auth/forgot-password/verify`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile, code: otpCode, newPassword })
      });
      const data = await res.json();

      if (data.success) {
        setOtpStep(4); // Success state
        setSuccessMessage(mode === 'CREATE_PASSWORD' ? 'Password created successfully!' : 'Password reset successfully!');
      } else {
        setError(data.message || 'Verification or password setup failed.');
      }
    } catch (err) {
      setError('Unable to save password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-auth-page">
      <div className="student-auth-card">
        {/* Card Header */}
        <div className="student-auth-header">
          <div className="student-brand-logo">
            <img src="/images/logo/gsf-logo.png" alt="GSF Global Scholar Finance" style={{ height: '56px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h2>
            {mode === 'LOGIN' && 'Student Login'}
            {mode === 'CREATE_PASSWORD' && 'Create Your Student Password'}
            {mode === 'FORGOT_PASSWORD' && 'Reset Your Student Password'}
          </h2>
          <p>
            {mode === 'LOGIN' && 'Track your education loan application and status updates'}
            {mode === 'CREATE_PASSWORD' && 'Link a secure password to your existing GSF loan application'}
            {mode === 'FORGOT_PASSWORD' && 'Verify your mobile number via OTP to reset your password'}
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="student-auth-alert error">
            ⚠️ {error}
          </div>
        )}

        {/* MODE 1: PASSWORD LOGIN FORM */}
        {mode === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="student-auth-form">
            {/* Mobile Field */}
            <div className="student-form-group">
              <label>Mobile Number</label>
              <div className="student-input-icon-wrapper">
                <span className="country-code-prefix">+91</span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="student-input phone-prefix-padding"
                  required
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="student-form-group">
              <label>Password</label>
              <div className="student-input-icon-wrapper">
                <Lock size={18} color="#64748B" className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="student-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
                </button>
              </div>
            </div>

            {/* Login CTA */}
            <button type="submit" disabled={loading} className="student-btn-primary">
              {loading ? 'Authenticating...' : 'Login →'}
            </button>

            {/* Action Links */}
            <div className="student-auth-links-row">
              <button
                type="button"
                onClick={() => resetFormState('FORGOT_PASSWORD')}
                className="student-btn-link"
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={() => resetFormState('CREATE_PASSWORD')}
                className="student-btn-link highlight"
              >
                New? Create a Password
              </button>
            </div>
          </form>
        )}

        {/* MODE 2 & 3: CREATE / FORGOT PASSWORD FLOW */}
        {(mode === 'CREATE_PASSWORD' || mode === 'FORGOT_PASSWORD') && (
          <div>
            {/* Step 1: Send OTP */}
            {otpStep === 1 && (
              <form onSubmit={handleSendOtp} className="student-auth-form">
                <div className="student-form-group">
                  <label>Registered Mobile Number</label>
                  <div className="student-input-icon-wrapper">
                    <span className="country-code-prefix">+91</span>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="student-input phone-prefix-padding"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="student-btn-primary">
                  {loading ? 'Sending OTP...' : 'Send OTP →'}
                </button>

                <button
                  type="button"
                  onClick={() => resetFormState('LOGIN')}
                  className="student-btn-back"
                >
                  <ArrowLeft size={16} /> Back to Login
                </button>
              </form>
            )}

            {/* Step 2: Enter OTP */}
            {otpStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="student-auth-form">
                <div className="student-form-group">
                  <label>Enter SMS OTP sent to +91 {mobile}</label>
                  <div className="student-input-icon-wrapper">
                    <Lock size={18} color="#64748B" className="input-icon" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="student-input"
                      style={{ letterSpacing: '4px', fontWeight: 700 }}
                      required
                    />
                  </div>
                </div>

                <div className="student-resend-row">
                  <button
                    type="button"
                    disabled={cooldownSec > 0 || loading}
                    onClick={handleSendOtp}
                    className="student-btn-link"
                  >
                    {cooldownSec > 0 ? `Resend OTP in ${cooldownSec}s` : 'Resend OTP'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(1);
                      setError('');
                    }}
                    className="student-btn-link secondary"
                  >
                    Change Number
                  </button>
                </div>

                <button type="submit" className="student-btn-primary">
                  Verify OTP →
                </button>
              </form>
            )}

            {/* Step 3: Create / Reset Password */}
            {otpStep === 3 && (
              <form onSubmit={handleSaveNewPassword} className="student-auth-form">
                <div className="student-form-group">
                  <label>{mode === 'CREATE_PASSWORD' ? 'Create Password' : 'New Password'}</label>
                  <div className="student-input-icon-wrapper">
                    <Lock size={18} color="#64748B" className="input-icon" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="student-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="password-toggle-btn"
                    >
                      {showNewPassword ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
                    </button>
                  </div>
                </div>

                <div className="student-form-group">
                  <label>Confirm Password</label>
                  <div className="student-input-icon-wrapper">
                    <Lock size={18} color="#64748B" className="input-icon" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="student-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="student-btn-primary">
                  {loading ? 'Saving Password...' : (mode === 'CREATE_PASSWORD' ? 'Create Password' : 'Reset Password')}
                </button>
              </form>
            )}

            {/* Step 4: Success Banner */}
            {otpStep === 4 && (
              <div className="student-success-box">
                <CheckCircle2 size={40} color="#15803D" />
                <h3>{successMessage}</h3>
                <p>Your password has been saved securely to your student account.</p>

                <button
                  type="button"
                  onClick={() => resetFormState('LOGIN')}
                  className="student-btn-primary"
                  style={{ marginTop: '16px' }}
                >
                  Login Now →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="student-auth-footer">
          <p>🔒 256-bit Encrypted Password & Twilio OTP Protection</p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
