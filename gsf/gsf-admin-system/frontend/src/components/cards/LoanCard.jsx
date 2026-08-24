import React from 'react';
import { ArrowRight } from 'lucide-react';

const LoanCard = ({ title, description, badge, onClick }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {badge && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '4px 8px',
              borderRadius: '4px',
              background: '#fef3c7',
              color: '#92400e',
              display: 'inline-block',
              marginBottom: '12px',
            }}
          >
            {badge}
          </span>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', marginBottom: '20px' }}>
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#005C5B',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span>Apply For This Loan</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default LoanCard;
