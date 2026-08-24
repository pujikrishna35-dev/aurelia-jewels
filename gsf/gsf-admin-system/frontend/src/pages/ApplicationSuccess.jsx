import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ApplicationSuccess = () => {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', padding: '16px', background: '#dcfce7', borderRadius: '50%', marginBottom: '24px' }}>
        <CheckCircle2 size={48} color="#16a34a" />
      </div>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
        Application Submitted Successfully!
      </h1>
      <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
        Thank you for choosing GSF Global Scholar Finance. Your dedicated education loan counselor will contact you within 24 hours to assist with document pickup and sanctioning.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            padding: '12px 24px',
            background: '#005C5B',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Return to Homepage</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
