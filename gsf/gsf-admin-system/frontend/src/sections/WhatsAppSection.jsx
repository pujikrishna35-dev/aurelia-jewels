import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/navigation';

const WhatsAppSection = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${COMPANY_CONTACT.whatsapp}?text=Hi%20GSF%20Team,%20I%20want%20to%20chat%20regarding%20my%20Education%20Loan%20options.`, '_blank');
  };

  return (
    <section className="whatsapp-section">
      <div className="container">
        <div className="whatsapp-card">
          <div className="whatsapp-content">
            <div className="whatsapp-icon-large">
              <MessageCircle size={36} />
            </div>
            <div className="whatsapp-text">
              <h3>Prefer WhatsApp?</h3>
              <p>Chat instantly with our education loan advisors on WhatsApp for quick answers & document guidance.</p>
            </div>
          </div>

          <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <MessageCircle size={22} />
            <span>WhatsApp Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSection;
