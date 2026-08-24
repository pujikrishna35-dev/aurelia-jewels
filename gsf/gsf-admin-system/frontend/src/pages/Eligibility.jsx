import React, { useState } from 'react';
import EligibilityForm from '../components/forms/EligibilityForm';
import SectionTitle from '../components/common/SectionTitle';

const Eligibility = () => {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <SectionTitle
        subtitle="Free Instant Eligibility Checker"
        title="Check Your Education Loan Eligibility"
        description="Fill out your academic and loan requirements to find instant matching lender offers."
      />

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          marginTop: '32px',
        }}
      >
        {submittedData ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginBottom: '8px' }}>
              Great News, {submittedData.fullName}!
            </h3>
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '24px' }}>
              Based on your details, you qualify for up to ₹40 Lakhs pre-approved unsecured loan for {submittedData.targetCountry}.
            </p>
            <button
              onClick={() => setSubmittedData(null)}
              style={{
                padding: '10px 20px',
                background: '#005C5B',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Check Another Application
            </button>
          </div>
        ) : (
          <EligibilityForm onSubmitSuccess={(data) => setSubmittedData(data)} />
        )}
      </div>
    </div>
  );
};

export default Eligibility;
