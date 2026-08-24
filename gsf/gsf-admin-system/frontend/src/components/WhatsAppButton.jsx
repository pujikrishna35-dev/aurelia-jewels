import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/navigation';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(`https://wa.me/${COMPANY_CONTACT.whatsapp}?text=Hi%20GSF%20Team,%20I%20would%20like%20to%20know%20more%20about%20Education%20Loans.`, '_blank');
  };

  return (
    <div className="floating-whatsapp-btn" onClick={handleClick} aria-label="Chat on WhatsApp">
      <MessageCircle size={28} />
      <span className="floating-tooltip">Chat with us</span>
    </div>
  );
};

export default WhatsAppButton;
