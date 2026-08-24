import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

const FinalCta = ({ onOpenModal, onOpenBranchModal }) => {
  const handleExpertClick = (e) => {
    e.preventDefault();
    if (onOpenBranchModal) {
      onOpenBranchModal();
    } else if (onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <section className="final-cta-section section-padding">
      <div className="container">
        <div className="final-cta-card">
          
          <div className="final-cta-badge">
            <ShieldCheck size={16} className="text-gold" />
            <span>START YOUR GLOBAL SCHOLAR JOURNEY</span>
          </div>

          <h2 className="final-cta-heading">Ready to Fund Your Dream?</h2>
          
          <p className="final-cta-subtext">
            Get expert guidance on choosing the right education loan for your study journey with zero processing stress.
          </p>

          <div className="final-cta-buttons">
            <button className="btn btn-gold btn-lg" onClick={handleExpertClick}>
              <PhoneCall size={18} />
              <span>Talk to a Loan Expert</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="final-cta-trust-strip">
            <span>✓ 100% Free Consultation</span>
            <span>✓ No Hidden Charges</span>
            <span>✓ 50+ Partner Banks & NBFCs</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCta;
