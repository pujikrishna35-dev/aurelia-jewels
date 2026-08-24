import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/navigation';

const Navbar = ({ onOpenModal, onOpenBranchModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleExpertClick = () => {
    if (onOpenBranchModal) {
      onOpenBranchModal();
    } else if (onOpenModal) {
      onOpenModal();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* LEFT: Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/images/logo/gsf-logo.png" alt="GSF Global Scholar Finance Logo" />
        </Link>

        {/* CENTER: Navigation Links */}
        <ul className="navbar-menu">
          {NAV_LINKS.map((link, idx) => (
            <li key={idx} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT: Deep Teal CTA */}
        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={handleExpertClick}>
            <Phone size={16} />
            <span>Talk to a Loan Expert</span>
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-menu-list">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <div className="mobile-nav-link">
                  <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
            <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); handleExpertClick(); }}>
              Talk to a Loan Expert
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
