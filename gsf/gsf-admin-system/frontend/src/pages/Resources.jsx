import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import CallbackForm from '../sections/CallbackForm';
import { FileText, Calculator, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'Can I get an education loan without collateral for studying abroad?',
    a: 'Yes! GSF assists students in securing non-collateral loans up to ₹75 Lakhs for premier universities in USA, UK, Canada, Australia, and Ireland, based on academic scores and co-applicant financial eligibility.'
  },
  {
    q: 'What documents are required to apply for an education loan?',
    a: 'Key documents include: Student Academic Marksheets (10th, 12th, Degree), GRE/IELTS scorecards, University Offer Letter, Co-applicant PAN & Aadhaar, 6-month Bank Statements, and 2-year ITR filing.'
  },
  {
    q: 'What is the moratorium period during an education loan?',
    a: 'The moratorium period is the grace duration during which the student is not required to pay full Principal EMI. It spans the course duration plus 6 months to 1 year post-completion.'
  },
  {
    q: 'Can I claim tax benefits on education loan interest?',
    a: 'Yes, under Section 80E of the Indian Income Tax Act, the co-applicant or student can claim 100% deduction on interest paid towards higher education loan for 8 consecutive financial years.'
  }
];

const Resources = ({ onOpenModal }) => {
  const [openFaq, setOpenFaq] = useState(0);

  // EMI Calculator state
  const [loanAmt, setLoanAmt] = useState(4000000);
  const [tenure, setTenure] = useState(10);
  const [rate, setRate] = useState(10.5);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  return (
    <div className="resources-page">
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>STUDENT RESOURCES & GUIDES</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Loan Calculator & Knowledge Base</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            Calculate estimated monthly EMIs, review document checklists, and resolve your questions.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding" id="calculator">
        <div className="container">
          <SectionTitle
            subtitle="INTERACTIVE TOOL"
            title="Education Loan EMI Calculator"
          />

          <div style={{ maxWidth: '640px', margin: '0 auto', background: '#F8FAFC', padding: '36px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}>
            <div className="form-group">
              <label>Loan Amount: ₹{(loanAmt / 100000).toFixed(1)} Lakhs</label>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={loanAmt}
                onChange={(e) => setLoanAmt(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Interest Rate: {rate}% p.a.</label>
              <input
                type="range"
                min="8"
                max="15"
                step="0.25"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Repayment Tenure: {tenure} Years</label>
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '32px', background: '#0A4D4E', color: '#FFFFFF', padding: '24px', borderRadius: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#F5A623', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Monthly EMI</span>
              <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', margin: '8px 0' }}>₹{calculateEMI().toLocaleString('en-IN')} / month</h2>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>*Exact EMI may vary based on lender moratorium interest terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-soft" id="faqs">
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionTitle
            subtitle="FREQUENTLY ASKED QUESTIONS"
            title="Everything You Need to Know"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}
              >
                <div
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', color: '#0F172A' }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="#0A4D4E" /> : <ChevronDown size={20} color="#64748B" />}
                </div>

                {openFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid #F1F5F9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
};

export default Resources;
