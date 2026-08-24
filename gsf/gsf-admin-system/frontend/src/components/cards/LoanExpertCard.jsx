import React from 'react';
import { PhoneCall } from 'lucide-react';

const LoanExpertCard = ({ onOpenModal }) => {
  return (
    <div className="dark-callback-card">
      <h4>
        <PhoneCall size={18} /> Need Help?
      </h4>
      <div className="subtitle">Request A Callback</div>
      <p>Our experts will call you at your convenience.</p>
      <button className="btn btn-gold" onClick={onOpenModal}>
        Request Callback
      </button>
    </div>
  );
};

export default LoanExpertCard;
