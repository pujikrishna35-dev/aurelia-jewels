import React from 'react';
import SectionTitle from '../components/SectionTitle';
import LoanCategories from '../sections/LoanCategories';
import CallbackForm from '../sections/CallbackForm';
import { ShieldCheck, Building2, Landmark, Check, HelpCircle } from 'lucide-react';

const EducationLoans = ({ onOpenModal }) => {
  return (
    <div className="education-loans-page">
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>EDUCATION LOAN SOLUTIONS</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Comprehensive Education Loans</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            From 100% tuition coverage to living expense allowances and pre-visa sanction letters, discover customized loan packages.
          </p>
        </div>
      </section>

      <LoanCategories />

      {/* Detailed Collateral vs Non-Collateral */}
      <section className="section-padding bg-soft" id="collateral">
        <div className="container">
          <SectionTitle
            subtitle="LOAN TYPES COMPARISON"
            title="Collateral Loans vs Non-Collateral Loans"
            description="Choose the right loan structure based on your co-applicant profile, collateral availability, and target institute."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {/* Collateral Card */}
            <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: '18px', border: '2px solid #0A4D4E', boxShadow: '0 8px 24px rgba(10,77,78,0.08)' }}>
              <div className="badge badge-teal" style={{ marginBottom: '16px' }}>Secured Loan</div>
              <h3 style={{ fontSize: '1.75rem', color: '#0A4D4E', marginBottom: '12px' }}>Collateral Education Loans</h3>
              <p style={{ color: '#64748B', marginBottom: '24px' }}>
                Loans pledged against immovable tangible assets like residential property, commercial building, plot, or liquid FD.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#0A4D4E" /> <strong>Interest Rates:</strong> Starts from 8.55% p.a.</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#0A4D4E" /> <strong>Loan Limit:</strong> Up to ₹1.5 Crore+</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#0A4D4E" /> <strong>Repayment Tenure:</strong> Up to 15 Years</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#0A4D4E" /> <strong>Tax Benefit:</strong> Full Section 80E Exemption</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onOpenModal}>
                Apply Collateral Loan →
              </button>
            </div>

            {/* Non-Collateral Card */}
            <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: '18px', border: '2px solid #F5A623', boxShadow: '0 8px 24px rgba(245,166,35,0.12)' }}>
              <div className="badge badge-gold" style={{ marginBottom: '16px' }}>Unsecured Loan</div>
              <h3 style={{ fontSize: '1.75rem', color: '#0F172A', marginBottom: '12px' }}>Non-Collateral Loans</h3>
              <p style={{ color: '#64748B', marginBottom: '24px' }}>
                Loans granted based on student academic scores, GRE/GMAT/IELTS results, target university ranking & co-applicant income.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#D98A11" /> <strong>Interest Rates:</strong> Starts from 10.25% p.a.</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#D98A11" /> <strong>Loan Limit:</strong> Up to ₹75 Lakhs</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#D98A11" /> <strong>Approval Speed:</strong> Quick 3-5 Working Days</li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Check size={18} color="#D98A11" /> <strong>Zero Collateral:</strong> No asset required</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={onOpenModal}>
                Apply Non-Collateral Loan →
              </button>
            </div>
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
};

export default EducationLoans;
