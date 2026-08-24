import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PARTNERS = [
  {
    id: 'hdfc-credila',
    name: 'HDFC Credila',
    type: 'Premier NBFC Partner',
    desc: 'Specialized education loans up to 1.5 Cr',
    badge: 'NBFC',
    color: '#004B87',
    logo: '/images/lenders/hdfc-credila.svg'
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    type: 'Public Sector Bank',
    desc: 'Lowest interest rates for top global institutes',
    badge: 'Govt Bank',
    color: '#00B5EF',
    logo: '/images/lenders/sbi.svg'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    type: 'Leading Private Bank',
    desc: 'Pre-visa sanction & quick digital processing',
    badge: 'Private Bank',
    color: '#F37021',
    logo: '/images/lenders/icici.svg'
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    type: 'Leading Private Bank',
    desc: '100% funding option with flexible repayment',
    badge: 'Private Bank',
    color: '#971237',
    logo: '/images/lenders/axis.svg'
  },
  {
    id: 'avanse',
    name: 'Avanse Financial',
    type: 'Education NBFC',
    desc: 'Non-collateral loans for STEM & Management',
    badge: 'NBFC',
    color: '#0067B1',
    logo: '/images/lenders/avanse.svg'
  },
  {
    id: 'auxilo',
    name: 'Auxilo Finserve',
    type: 'Education Finance Specialist',
    desc: 'Customized loan solutions for global courses',
    badge: 'NBFC',
    color: '#E31E24',
    logo: '/images/lenders/auxilo.svg'
  },
  {
    id: 'incred',
    name: 'InCred Finance',
    type: 'Technology NBFC',
    desc: 'Fast digital approval & doorstep service',
    badge: 'NBFC',
    color: '#1A365D',
    logo: '/images/lenders/incred.svg'
  },
  {
    id: 'prodigy',
    name: 'Prodigy Finance',
    type: 'International Lender',
    desc: 'No-cosigner loans in USD for top US/UK universities',
    badge: 'Global Lender',
    color: '#005C5B',
    logo: '/images/lenders/prodigy.svg'
  }
];

const LendingPartners = () => {
  return (
    <section className="lending-partners-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge badge-teal mb-2">NETWORK OF TRUST</span>
          <h2 className="section-title">Our Lending Partners</h2>
          <p className="section-subtitle">
            Compare education loan options from leading banks and NBFCs to get the lowest interest rate and best terms.
          </p>
        </div>

        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="partner-badge-tag">{partner.badge}</div>
              
              <div className="partner-logo-box">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="partner-official-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="partner-name">{partner.name}</span>
              </div>

              <div className="partner-info">
                <span className="partner-type">{partner.type}</span>
                <p className="partner-desc">{partner.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="partners-footer-note">
          <ShieldCheck size={18} className="text-teal" />
          <span>We partner with 50+ RBI registered Banks, NBFCs, and International Education Funders.</span>
        </div>
      </div>
    </section>
  );
};

export default LendingPartners;
