import React, { useEffect } from 'react';
import { MapPin, PhoneCall, X, Phone } from 'lucide-react';
import { GSF_BRANCHES } from '../config/branches';
import './BranchSelectionModal.css';

const BranchSelectionModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCallBranch = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="branch-modal-overlay" onClick={onClose}>
      <div className="branch-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="branch-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="branch-modal-header">
          <div className="branch-header-icon">
            <PhoneCall size={26} color="#005C5B" />
          </div>
          <h2>Choose Your Branch</h2>
          <p>Select your preferred branch to speak with a loan expert.</p>
        </div>

        {/* Branch Cards List */}
        <div className="branch-cards-list">
          {GSF_BRANCHES.map((branch) => (
            <div key={branch.id} className="branch-card-item">
              <div className="branch-card-info">
                <div className="branch-title-row">
                  <MapPin size={18} color="#005C5B" className="branch-pin-icon" />
                  <h3>📍 {branch.name}</h3>
                </div>
                <div className="branch-phone-row">
                  <Phone size={14} color="#64748B" />
                  <span>{branch.phone}</span>
                </div>
              </div>

              <button
                className="btn-branch-call"
                onClick={() => handleCallBranch(branch.rawPhone)}
              >
                <PhoneCall size={15} />
                <span>Call Now</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Notice */}
        <div className="branch-modal-footer">
          <p>🔒 Instant Direct Connection to GSF Education Loan Officers</p>
        </div>
      </div>
    </div>
  );
};

export default BranchSelectionModal;
