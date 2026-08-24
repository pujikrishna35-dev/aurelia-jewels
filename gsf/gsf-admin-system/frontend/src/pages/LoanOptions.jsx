import React from 'react';
import SectionTitle from '../components/SectionTitle';
import CallbackForm from '../sections/CallbackForm';
import { Landmark, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const LoanOptions = ({ onOpenModal }) => {
  return (
    <div className="loan-options-page">
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>COMPARE LENDERS</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Public Banks vs Private Banks vs NBFCs</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            We provide transparent side-by-side comparison of interest rates, margin money, processing fees, and moratorium terms.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionTitle
            subtitle="LENDER COMPARISON MATRIX"
            title="Choose the Best Lender Strategy"
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <thead>
                <tr style={{ background: '#0A4D4E', color: '#FFFFFF', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px' }}>Parameter</th>
                  <th style={{ padding: '16px 20px' }}>Public Banks (SBI, BOB)</th>
                  <th style={{ padding: '16px 20px' }}>Private Banks (ICICI, Axis)</th>
                  <th style={{ padding: '16px 20px' }}>NBFCs (HDFC Credila, Avanse)</th>
                </tr>
              </thead>
              <tbody style={{ color: '#334155', fontSize: '0.95rem' }}>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>Interest Rates</td>
                  <td style={{ padding: '16px 20px' }}>8.55% - 10.50%</td>
                  <td style={{ padding: '16px 20px' }}>10.25% - 12.50%</td>
                  <td style={{ padding: '16px 20px' }}>11.00% - 13.50%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>Processing Time</td>
                  <td style={{ padding: '16px 20px' }}>10 - 18 Days</td>
                  <td style={{ padding: '16px 20px' }}>5 - 7 Days</td>
                  <td style={{ padding: '16px 20px' }}>3 - 5 Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>Non-Collateral Limit</td>
                  <td style={{ padding: '16px 20px' }}>Up to ₹50 Lakhs (Select Univ)</td>
                  <td style={{ padding: '16px 20px' }}>Up to ₹75 Lakhs</td>
                  <td style={{ padding: '16px 20px' }}>Up to ₹75 Lakhs+</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>Margin Money</td>
                  <td style={{ padding: '16px 20px' }}>15% for Overseas</td>
                  <td style={{ padding: '16px 20px' }}>0% to 10%</td>
                  <td style={{ padding: '16px 20px' }}>0% (100% Funding)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button className="btn btn-primary" onClick={onOpenModal}>
              Get Customized Offer Breakdown →
            </button>
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
};

export default LoanOptions;
