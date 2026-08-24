import React, { useState } from 'react';
import { PhoneCall, CheckCircle2, Shield, Clock, ThumbsUp } from 'lucide-react';

const CallbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    requirement: 'Study Abroad Loan'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        requirement: 'Study Abroad Loan'
      });
    }, 4000);
  };

  return (
    <section className="callback-section" id="callback-form">
      <div className="container callback-container">
        {/* Left Column */}
        <div className="callback-info">
          <h2>Still Have Questions?</h2>
          <p>
            Talk to our senior loan advisors to clear your doubts about interest rates, collateral requirement, co-applicant criteria, and visa financial proof.
          </p>

          <div className="callback-features">
            <div className="callback-feature-item">
              <CheckCircle2 size={20} />
              <span>100% Free Confidential Consultation</span>
            </div>
            <div className="callback-feature-item">
              <Clock size={20} />
              <span>Quick Callback within 30 Minutes</span>
            </div>
            <div className="callback-feature-item">
              <Shield size={20} />
              <span>Direct Bank & NBFC Partner Matching</span>
            </div>
            <div className="callback-feature-item">
              <ThumbsUp size={20} />
              <span>Highest Sanction Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="callback-form-card">
          <h3>Request A Callback</h3>

          {submitted && (
            <div className="success-toast">
              <CheckCircle2 size={22} />
              <div>
                <strong>Thank you!</strong> Your request has been submitted. Our senior expert will call you shortly.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="Enter your full name"
                className="form-input"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile Number *</label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                placeholder="student@example.com"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirement">Select Requirement</label>
              <select
                id="requirement"
                className="form-select"
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              >
                <option value="Study Abroad Loan">Study Abroad Loan</option>
                <option value="Education Loan in India">Education Loan in India</option>
                <option value="Collateral Property Loan">Collateral Loan (Property/FD)</option>
                <option value="Non-Collateral Loan">Non-Collateral Loan (Unsecured)</option>
                <option value="General Loan Enquiry">General Loan Guidance</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary form-submit-btn">
              <PhoneCall size={18} /> Request Callback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallbackForm;
