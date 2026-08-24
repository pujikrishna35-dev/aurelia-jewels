import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';

const MobileMenu = ({ isOpen, onClose, onOpenModal }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-nav-drawer" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={24} color="#1e293b" />
        </button>
      </div>
      <ul className="mobile-menu-list">
        {NAV_LINKS.map((link, idx) => (
          <li key={idx}>
            <div className="mobile-nav-link">
              <Link to={link.path} onClick={onClose}>
                {link.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ padding: '20px', marginTop: 'auto' }}>
        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => {
            onClose();
            if (onOpenModal) onOpenModal();
          }}
        >
          Talk to a Loan Expert
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
