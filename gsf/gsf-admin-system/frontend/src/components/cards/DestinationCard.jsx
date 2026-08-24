import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  const { id, flag, country, subtitle, highlights } = destination || {};

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
      }}
    >
      <div>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{flag || '✈️'}</div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
          {country || 'Study Destination'}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
          {subtitle || 'Flexible loans up to 1.5 Cr with low interest rates'}
        </p>

        {highlights && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {highlights.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <CheckCircle2 size={15} color="#005C5B" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to={`/country/${id || country?.toLowerCase()}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: '#f1f5f9',
          color: '#005C5B',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          textDecoration: 'none',
        }}
      >
        <span>Explore Loan Options</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default DestinationCard;
