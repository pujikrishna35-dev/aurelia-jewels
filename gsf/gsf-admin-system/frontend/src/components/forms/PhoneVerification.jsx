import React from 'react';
import { Phone, ArrowRight, RefreshCw } from 'lucide-react';

const PhoneVerification = ({
  phone,
  onPhoneChange,
  onSendOtp,
  loading,
  cooldownSec,
  disabled = false,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
        Mobile Number (WhatsApp Enabled) *
      </label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div
          style={{
            padding: '10px 14px',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>🇮🇳</span> +91
        </div>
        <input
          type="tel"
          required
          maxLength={10}
          placeholder="Enter 10-digit mobile number"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
          disabled={disabled}
          style={{
            flex: 1,
            padding: '10px 14px',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={onSendOtp}
          disabled={disabled || phone.length !== 10 || loading || cooldownSec > 0}
          style={{
            padding: '10px 16px',
            background: cooldownSec > 0 ? '#94a3b8' : '#005C5B',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: phone.length === 10 && cooldownSec === 0 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : cooldownSec > 0 ? (
            `Resend in ${cooldownSec}s`
          ) : (
            <>
              <span>Get OTP</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PhoneVerification;
