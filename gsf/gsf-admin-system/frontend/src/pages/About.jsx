import React from 'react';
import SectionTitle from '../components/SectionTitle';
import WhyChooseGSF from '../sections/WhyChooseGSF';
import CallbackForm from '../sections/CallbackForm';
import { Target, Award, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

const About = ({ onOpenModal }) => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>ABOUT GSF GLOBAL SCHOLAR FINANCE</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Empowering Scholars Worldwide</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            GSF Global Scholar Finance is India's leading specialized education finance advisory, committed to bridging the gap between student aspirations and lender requirements.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '48px', height: '48px', background: '#E6F3F3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A4D4E', marginBottom: '20px' }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: '#475569', lineHeight: '1.7' }}>
                To provide transparent, hassle-free, and affordable education loan solutions for students aspiring to pursue higher education in India and overseas.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '48px', height: '48px', background: '#FFF8EB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D98A11', marginBottom: '20px' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: '#475569', lineHeight: '1.7' }}>
                To become the most trusted global student financial advisory brand, ensuring no deserving student is deprived of quality education due to financial constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks Grid */}
      <section className="section-padding bg-soft" id="partners">
        <div className="container">
          <SectionTitle
            subtitle="OUR LENDING NETWORK"
            title="15+ Trusted Bank & NBFC Partners"
            description="We collaborate with premier nationalized banks, private financial institutions, and international education lenders."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', textAlign: 'center' }}>
            {['State Bank of India', 'HDFC Credila', 'ICICI Bank', 'Axis Bank', 'Bank of Baroda', 'Avanse Financial', 'InCred', 'Prodigy Finance', 'MPower Financing', 'Auxilo'].map((partner, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', padding: '24px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: '700', color: '#0A4D4E', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseGSF />
      <CallbackForm />
    </div>
  );
};

export default About;
