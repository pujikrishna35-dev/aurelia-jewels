import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Layers, UserCheck, CheckCircle2, Check } from 'lucide-react';

const WhyChooseGSF = () => {
  return (
    <section className="why-gsf-section">
      <div className="container why-gsf-container">
        {/* 3-Column Layout: Left (30%), Center (42%), Right (28%) */}
        <div className="why-gsf-3col-grid">
          
          {/* LEFT: Text & Content Area */}
          <div className="why-gsf-left-col">
            <span className="why-gsf-eyebrow">WHY CHOOSE GSF</span>
            <h2 className="why-gsf-title">
              Your Trusted Partner in<br />Education Finance
            </h2>
            <p className="why-gsf-description">
              We simplify the education loan journey by understanding your needs and finding the right financial solution.
            </p>

            <ul className="why-gsf-benefits-list">
              <li className="why-gsf-benefit-item">
                <span className="why-gsf-check-icon">
                  <Check size={14} />
                </span>
                <span>Wide network of Banks & NBFCs</span>
              </li>
              <li className="why-gsf-benefit-item">
                <span className="why-gsf-check-icon">
                  <Check size={14} />
                </span>
                <span>Personalized loan options</span>
              </li>
              <li className="why-gsf-benefit-item">
                <span className="why-gsf-check-icon">
                  <Check size={14} />
                </span>
                <span>End-to-end assistance</span>
              </li>
              <li className="why-gsf-benefit-item">
                <span className="why-gsf-check-icon">
                  <Check size={14} />
                </span>
                <span>Transparent guidance</span>
              </li>
              <li className="why-gsf-benefit-item">
                <span className="why-gsf-check-icon">
                  <Check size={14} />
                </span>
                <span>Faster processing support</span>
              </li>
            </ul>

            <div className="why-gsf-cta-wrapper">
              <Link to="/about" className="btn btn-primary why-gsf-btn">
                <span>Know More About Us</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* CENTER: Large Student Image */}
          <div className="why-gsf-center-col">
            <div className="why-gsf-image-frame">
              <img
                src="/images/why-choose/why-choose-student.jpg"
                alt="Student studying with laptop"
                className="why-gsf-student-img"
              />
            </div>
          </div>

          {/* RIGHT: White Information Panel */}
          <div className="why-gsf-right-col">
            <div className="why-gsf-info-panel">
              <div className="why-gsf-feature-block">
                <div className="why-gsf-feature-icon">
                  <FileCheck size={22} color="#005C5B" />
                </div>
                <div className="why-gsf-feature-text">
                  <h4 className="why-gsf-feature-title">Eligibility Assessment</h4>
                  <p className="why-gsf-feature-desc">Check your loan eligibility in minutes</p>
                </div>
              </div>

              <div className="why-gsf-feature-block">
                <div className="why-gsf-feature-icon">
                  <Layers size={22} color="#005C5B" />
                </div>
                <div className="why-gsf-feature-text">
                  <h4 className="why-gsf-feature-title">Compare Loan Options</h4>
                  <p className="why-gsf-feature-desc">Compare offers from multiple lenders</p>
                </div>
              </div>

              <div className="why-gsf-feature-block">
                <div className="why-gsf-feature-icon">
                  <UserCheck size={22} color="#005C5B" />
                </div>
                <div className="why-gsf-feature-text">
                  <h4 className="why-gsf-feature-title">Expert Guidance</h4>
                  <p className="why-gsf-feature-desc">Get assistance from our loan experts</p>
                </div>
              </div>

              <div className="why-gsf-feature-block">
                <div className="why-gsf-feature-icon">
                  <CheckCircle2 size={22} color="#005C5B" />
                </div>
                <div className="why-gsf-feature-text">
                  <h4 className="why-gsf-feature-title">Sanction Support</h4>
                  <p className="why-gsf-feature-desc">We support you until loan disbursement</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseGSF;
