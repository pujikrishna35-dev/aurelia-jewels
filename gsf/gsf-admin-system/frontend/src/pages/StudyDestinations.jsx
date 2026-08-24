import React from 'react';
import SectionTitle from '../components/SectionTitle';
import StudyDestinationsSection from '../sections/StudyDestinations';
import CallbackForm from '../sections/CallbackForm';

const StudyDestinations = ({ onOpenModal }) => {
  return (
    <div className="study-destinations-page">
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>GLOBAL STUDY DESTINATIONS</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Study Destination Finance Guides</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            We specialize in country-specific loan requirements, blocked accounts, GIC setup, and pre-visa sanction letters for USA, UK, Canada, Australia, Ireland, and Germany.
          </p>
        </div>
      </section>

      <StudyDestinationsSection />

      <section className="section-padding">
        <div className="container">
          <SectionTitle
            subtitle="DESTINATION HIGHLIGHTS"
            title="Country Wise Financial Overview"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#0A4D4E', marginBottom: '8px' }}>🇺🇸 USA Loans</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>Non-collateral loans available up to $100,000 without US co-signer. Ideal for STEM & I-20 proof.</p>
              </div>
              <a href="/country/usa" style={{ color: '#005C5B', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>Explore USA Loans →</a>
            </div>
            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#0A4D4E', marginBottom: '8px' }}>🇬🇧 UK Loans</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>Fast 3-day sanction letters for CAS issuing and UKVI visa financial compliance verification.</p>
              </div>
              <a href="/country/uk" style={{ color: '#005C5B', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>Explore UK Loans →</a>
            </div>
            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#0A4D4E', marginBottom: '8px' }}>🇨🇦 Canada Loans</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>Funding both SDS tuition fees and GIC deposit (approx $20,635 CAD) in a single sanction letter.</p>
              </div>
              <a href="/country/canada" style={{ color: '#005C5B', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>Explore Canada Loans →</a>
            </div>
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
};

export default StudyDestinations;
