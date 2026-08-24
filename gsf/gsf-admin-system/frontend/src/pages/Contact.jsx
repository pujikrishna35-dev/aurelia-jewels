import React from 'react';
import SectionTitle from '../components/SectionTitle';
import CallbackForm from '../sections/CallbackForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/navigation';

const Contact = ({ onOpenModal }) => {
  return (
    <div className="contact-page">
      <section className="section-padding bg-mint" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>CONTACT US</span>
          <h1 style={{ fontSize: '3rem', color: '#0A4D4E', marginBottom: '16px' }}>Get in Touch with GSF Experts</h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', color: '#475569' }}>
            Visit our regional offices in Nellore or Hyderabad, or reach out to us online for dedicated education finance consultation.
          </p>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            subtitle="OUR REGIONAL BRANCHES"
            title="Visit Our Consultation Centers"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {COMPANY_CONTACT.offices.map((office, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                <div className="badge badge-teal" style={{ marginBottom: '16px' }}>{office.name}</div>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '16px' }}>{office.name}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#475569', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <MapPin size={20} color="#0A4D4E" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{office.address}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Phone size={20} color="#0A4D4E" style={{ flexShrink: 0 }} />
                    <span>{office.phone}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Clock size={20} color="#0A4D4E" style={{ flexShrink: 0 }} />
                    <span>Mon - Sat: 9:30 AM to 6:30 PM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
};

export default Contact;
