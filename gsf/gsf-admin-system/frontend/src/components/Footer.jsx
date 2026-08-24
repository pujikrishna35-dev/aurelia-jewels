import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/navigation';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/images/logo/gsf-logo.png" alt="GSF Global Scholar Finance" />
            </Link>
            <p className="footer-tagline">
              Making education financing easier, faster, and transparent for students pursuing higher studies in India and abroad.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/education-loans">Education Loans</Link></li>
              <li><Link to="/study-destinations">Study Destinations</Link></li>
              <li><Link to="/loan-options">Loan Options</Link></li>
              <li><Link to="/resources">Resources & FAQs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/admin" style={{ color: '#F4B63F', fontWeight: '700' }}>Admin Portal Login</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="footer-column-title">Our Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/education-loans#abroad">Study Abroad Loans</Link></li>
              <li><Link to="/education-loans#india">Education Loans in India</Link></li>
              <li><Link to="/education-loans#collateral">Collateral Property Loans</Link></li>
              <li><Link to="/education-loans#non-collateral">Non-Collateral Loans</Link></li>
              <li><Link to="/education-loans#personal">Personal & Top-up Loans</Link></li>
              <li><Link to="/loan-options#comparison">Banks & NBFC Options</Link></li>
            </ul>
          </div>

          {/* Our Presence & Contact */}
          <div>
            <h4 className="footer-column-title">Our Presence & Contact</h4>
            <div className="footer-presence">
              {COMPANY_CONTACT.offices.map((office, idx) => (
                <div key={idx} className="presence-box">
                  <h5>{office.name}</h5>
                  <p>{office.address}</p>
                </div>
              ))}

              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="#F5A623" />
                  <span>{COMPANY_CONTACT.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#F5A623" />
                  <span>{COMPANY_CONTACT.email}</span>
                </div>
              </div>
            </div>

            <div className="newsletter-box" style={{ marginTop: '20px' }}>
              <p>Subscribe to get the latest loan guides, interest rates & offers.</p>
              {subscribed ? (
                <div style={{ color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} /> Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 GSF Global Scholar Finance. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/resources#privacy">Privacy Policy</Link>
            <Link to="/resources#terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
