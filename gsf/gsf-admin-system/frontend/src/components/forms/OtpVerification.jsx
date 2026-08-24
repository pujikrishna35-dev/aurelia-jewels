import React from 'react';
import { ShieldCheck, Check, RefreshCw } from 'lucide-react';

const OtpVerification = ({
  otpInput,
  onOtpChange,
  onVerifyOtp,
  loading,
  otpError,
  otpVerified,
  otpSent,
}) => {
  if (!otpSent && !otpVerified) return null;

  return (
    <div
      style={{
        background: otpVerified ? '#f0fdf4' : '#f8fafc',
        border: `1px solid ${otpVerified ? '#86efac' : '#e2e8f0'}`,
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: otpVerified ? '#166534' : '#334155' }}>
          {otpVerified ? '✓ Phone Number Verified' : 'Enter 6-digit OTP sent to your phone'}
        </span>
        <ShieldCheck size={18} color={otpVerified ? '#16a34a' : '#64748b'} />
      </div>

      {!otpVerified && (
        <>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otpInput}
              onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ''))}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '16px',
                letterSpacing: '4px',
                textAlign: 'center',
                fontWeight: '700',
              }}
            />
            <button
              type="button"
              onClick={onVerifyOtp}
              disabled={otpInput.length !== 6 || loading}
              style={{
                padding: '8px 16px',
                background: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: otpInput.length === 6 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
              <span>Verify</span>
            </button>
          </div>
          {otpError && (
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '500' }}>
              {otpError}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default OtpVerification;
