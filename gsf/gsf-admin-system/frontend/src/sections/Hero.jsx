import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/navigation';

const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero-section">
      {/* Animated Airplane Image */}
      <img
        src="/images/hero/airplane.png"
        alt="Education Travel Airplane"
        className="animated-hero-airplane"
      />

      {/* Revolving Transparent Globe Image in Left Bottom Corner */}
      <img
        src="/images/hero/revolving-globe.png"
        alt="Revolving Globe"
        className="revolving-hero-globe"
      />

      <div className="container hero-grid">
        {/* Left Column Text Content */}
        <div className="hero-left">
          <div className="hero-badge">
            TRUSTED EDUCATION FINANCE SPECIALIST
          </div>

          <h1 className="hero-title">
            Your Education.<br />
            Your Dream.<br />
            <span className="hero-title-gold">Our Financial Support.</span>
          </h1>

          <p className="hero-subtitle">
            <strong>
              Explore education loan options from leading banks and NBFCs for studying in India or abroad.
              From eligibility and lender comparison to documentation and sanction support,
              GSF Global Scholar Finance helps you throughout your education loan journey.
            </strong>
          </p>

          {/* Compact 2x2 Benefits Grid */}
          <div className="hero-benefits-grid">
            <div className="benefit-item-compact">
              <div className="benefit-icon-compact">
                <Check size={14} />
              </div>
              <span>Compare Multiple Lenders</span>
            </div>
            <div className="benefit-item-compact">
              <div className="benefit-icon-compact">
                <Check size={14} />
              </div>
              <span>Higher Approval Chance</span>
            </div>
            <div className="benefit-item-compact">
              <div className="benefit-icon-compact">
                <Check size={14} />
              </div>
              <span>Quick Processing Support</span>
            </div>
            <div className="benefit-item-compact">
              <div className="benefit-icon-compact">
                <Check size={14} />
              </div>
              <span>End to End Guidance</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onOpenModal}>
              <span>Apply for Your Loan </span>
              <ArrowRight size={18} />
            </button>

            <a href="#callback-form" className="btn btn-secondary">
              Check your eligibility
            </a>
          </div>
        </div>

        {/* Right Column Overlay (Houses Student Girl Cutout) */}
        <div className="hero-right">
          <img
            src="/images/hero/student-girl-cutout.png"
            alt="GSF Scholar Student"
            className="hero-student-girl-near-giantwheel"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
