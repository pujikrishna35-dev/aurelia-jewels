import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const LenderCard = ({ bank, onApply }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <img
            src={bank?.logo || '/images/lenders/sbi.svg'}
            alt={bank?.name || 'Lender Partner'}
            style={{ maxHeight: '40px', maxWidth: '140px', objectFit: 'contain' }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '20px',
              background: '#e0f2fe',
              color: '#0369a1',
            }}
          >
            {bank?.type || 'Top Partner'}
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
          {bank?.name || 'Partner Bank'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>Interest Rate:</span>
            <strong style={{ color: '#0f172a' }}>{bank?.interestRate || 'Starting at 9.55%'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>Max Loan Amount:</span>
            <strong style={{ color: '#0f172a' }}>{bank?.maxLoan || 'Up to ₹1.5 Cr'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>Collateral:</span>
            <strong style={{ color: '#0f172a' }}>{bank?.collateralRequired ? 'Property / FD' : 'No Collateral'}</strong>
          </div>
        </div>

        {bank?.features && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {bank.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569' }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={onApply}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#005C5B',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Check Loan Eligibility
      </button>
    </div>
  );
};

export default LenderCard;
