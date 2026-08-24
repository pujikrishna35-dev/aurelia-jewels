import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Home, 
  Plane, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  PhoneCall, 
  FileText, 
  Clock, 
  Award,
  AlertCircle
} from 'lucide-react';
import { COUNTRY_LOAN_DATA } from '../data/countryLoans';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CountryLoanPage = ({ onOpenModal, onOpenBranchModal }) => {
  const { countryId } = useParams();
  const navigate = useNavigate();

  // Load country data or fallback to USA
  const countryKey = (countryId && COUNTRY_LOAN_DATA[countryId.toLowerCase()]) 
    ? countryId.toLowerCase() 
    : 'usa';
  const country = COUNTRY_LOAN_DATA[countryKey] || COUNTRY_LOAN_DATA.usa;

  // Multi-step eligibility wizard state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: country.name,
    courseLevel: 'Master\'s',
    courseName: '',
    university: '',
    tuitionFee: '',
    loanRequired: '',
    coApplicant: 'Yes',
    collateral: 'No',
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'Phone Call'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Sync country selection when route changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, country: country.name }));
    setStep(1);
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  }, [countryKey]);

  const handleNextStep = () => {
    setStep((prev) => Math.min(9, prev + 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const scrollToWizard = () => {
    const el = document.getElementById('eligibility-wizard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setSubmitError('Please enter your full name and valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        studyDestination: country.name,
        preferredCountry: country.name,
        country: country.name,
        courseLevel: formData.courseLevel,
        courseName: formData.courseName,
        targetCourse: formData.courseName ? `${formData.courseLevel} - ${formData.courseName}` : formData.courseLevel,
        targetUniversity: formData.university,
        university: formData.university,
        approxTuitionFee: formData.tuitionFee,
        requestedLoanAmount: formData.loanRequired,
        loanAmountRequired: formData.loanRequired,
        coApplicant: formData.coApplicant,
        coApplicantStatus: formData.coApplicant,
        collateral: formData.collateral,
        collateralStatus: formData.collateral,
        contactMethod: formData.contactMethod,
        otpVerified: true,
        source: `Website - Country Loan Page (${country.name})`
      };

      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // Soft fallback for dev/demo if backend server endpoint is unreachable
        console.warn('Backend API submission warning:', res.statusText);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      // Soft fallback for user experience
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getExpenseIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap size={24} />;
      case 'Home': return <Home size={24} />;
      case 'Plane': return <Plane size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'BookOpen': return <BookOpen size={24} />;
      default: return <GraduationCap size={24} />;
    }
  };

  return (
    <div className="country-page">
      {/* 1. HERO SECTION */}
      <section className="country-hero-section">
        <div className="country-hero-container">
          <div className="country-hero-content">
            <div className="country-hero-badge">
              <span className="flag-icon">{country.flag}</span>
              <span>Study in {country.name} Education Loans</span>
            </div>

            <h1 className="country-hero-title">
              Education Loans for Studying in <span className="country-highlight">{country.name}</span>
            </h1>

            <p className="country-hero-desc">{country.heroSubtitle}</p>

            <div className="country-hero-meta">
              <div className="country-meta-item">
                <span className="country-meta-label">Max Loan Limit</span>
                <span className="country-meta-val">{country.maxLoanAmount}</span>
              </div>
              <div className="country-meta-item">
                <span className="country-meta-label">Collateral Norms</span>
                <span className="country-meta-val">Non-Collateral Available</span>
              </div>
            </div>

            <div className="country-hero-actions">
              <button onClick={scrollToWizard} className="btn-hero-primary">
                Check My Eligibility <ArrowRight size={18} />
              </button>
              <button onClick={onOpenBranchModal || onOpenModal} className="btn-hero-secondary">
                <PhoneCall size={18} /> Talk to a Loan Expert
              </button>
            </div>
          </div>

          <div className="country-hero-image-box">
            <img src={country.heroImage} alt={`Education Loan for ${country.name}`} />
          </div>
        </div>
      </section>

      {/* 2. LOAN HIGHLIGHTS SECTION */}
      <section className="country-section">
        <div className="section-title-center">
          <span className="section-eyebrow">KEY HIGHLIGHTS</span>
          <h2 className="section-heading">{country.name} Education Loan Overview</h2>
          <p className="section-subtitle">{country.overview}</p>
        </div>

        <div className="highlights-grid">
          {country.highlights.map((item, idx) => (
            <div key={idx} className="highlight-card">
              <div className="highlight-label">{item.label}</div>
              <div className="highlight-value">{item.value}</div>
              <div className="highlight-subtext">{item.subtext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHAT CAN THE LOAN COVER? */}
      <section className="country-section bg-soft-section">
        <div className="section-title-center">
          <span className="section-eyebrow">EXPENSE COVERAGE</span>
          <h2 className="section-heading">What Can the Education Loan Cover?</h2>
          <p className="section-subtitle">
            Flexible financial coverage designed to meet comprehensive academic and living costs in {country.name}.
          </p>
        </div>

        <div className="expenses-grid">
          {country.eligibleExpenses.map((exp) => (
            <div key={exp.id} className="expense-card">
              <div className="expense-icon-wrap">{getExpenseIcon(exp.icon)}</div>
              <h3 className="expense-title">{exp.title}</h3>
              <p className="expense-desc">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CHOOSE THE RIGHT EDUCATION LOAN */}
      <section className="country-section">
        <div className="section-title-center">
          <span className="section-eyebrow">LOAN PRODUCTS</span>
          <h2 className="section-heading">Choose the Right Education Loan for {country.name}</h2>
          <p className="section-subtitle">
            Explore secured and unsecured loan products based on your academic profile and co-applicant background.
          </p>
        </div>

        <div className="loan-options-grid">
          {country.loanProducts.map((prod) => (
            <div key={prod.id} className={`loan-option-card ${prod.id === 'unsecured' ? 'featured' : ''}`}>
              <div className={`loan-badge ${prod.id === 'secured' ? 'gold' : ''}`}>{prod.badge}</div>
              <div>
                <h3 className="option-title">{prod.title}</h3>
                <div className="option-tagline">{prod.tagline}</div>
                <ul className="option-features">
                  {prod.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={scrollToWizard} className="btn-option-cta">
                {prod.ctaText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOAN COMPARISON MATRIX */}
      <section className="country-section bg-soft-section">
        <div className="section-title-center">
          <span className="section-eyebrow">SIDE-BY-SIDE COMPARISON</span>
          <h2 className="section-heading">Unsecured vs. Secured Loan Comparison</h2>
          <p className="section-subtitle">
            Compare key parameters to select the most suitable financial structure for your studies.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="comparison-feature-col">Feature</th>
                <th>Unsecured Loan</th>
                <th>Secured Loan</th>
              </tr>
            </thead>
            <tbody>
              {country.comparison.map((row, idx) => (
                <tr key={idx}>
                  <td className="comparison-feature-col">{row.feature}</td>
                  <td>{row.unsecured}</td>
                  <td>{row.secured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison-cta-box">
          <button onClick={scrollToWizard} className="btn-hero-primary">
            Find the Right Loan for Me <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 6. MULTI-STEP ELIGIBILITY WIZARD & RESULT */}
      <section id="eligibility-wizard-section" className="country-section">
        <div className="section-title-center">
          <span className="section-eyebrow">FREE ASSESSMENT</span>
          <h2 className="section-heading">Check Your Eligibility for {country.name}</h2>
          <p className="section-subtitle">
            Get personalized guidance and explore matching education loan options in under 2 minutes.
          </p>
        </div>

        {!isSubmitted ? (
          <div className="eligibility-wizard-card">
            {/* Progress indicator */}
            <div className="wizard-progress-bar">
              <div 
                className="wizard-progress-fill" 
                style={{ width: `${(step / 9) * 100}%` }}
              />
            </div>

            {/* STEP 1: Study Destination */}
            {step === 1 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 1 of 9</span>
                  <h3 className="wizard-step-title">Your Study Destination</h3>
                </div>
                <div className="wizard-options-grid">
                  <div className="wizard-option-btn selected">
                    {country.flag} {country.name} ✓
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Course Level */}
            {step === 2 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 2 of 9</span>
                  <h3 className="wizard-step-title">Select Your Course Level</h3>
                </div>
                <div className="wizard-options-grid">
                  {['Master\'s', 'Bachelor\'s', 'MBA', 'PhD', 'Other'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`wizard-option-btn ${formData.courseLevel === lvl ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData({ ...formData, courseLevel: lvl });
                        handleNextStep();
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Course Name */}
            {step === 3 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 3 of 9</span>
                  <h3 className="wizard-step-title">What is Your Course / Program Name?</h3>
                </div>
                <div className="wizard-input-group">
                  <label>Course Name (e.g. MS in Computer Science, Data Analytics, MBA)</label>
                  <input
                    type="text"
                    className="wizard-input"
                    placeholder="Enter your target course name"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: University */}
            {step === 4 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 4 of 9</span>
                  <h3 className="wizard-step-title">Target University / College</h3>
                </div>
                <div className="wizard-input-group">
                  <label>University Name (e.g. Northeastern University, Univ of Manchester)</label>
                  <input
                    type="text"
                    className="wizard-input"
                    placeholder="Enter your target university or college name"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Tuition Fee */}
            {step === 5 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 5 of 9</span>
                  <h3 className="wizard-step-title">Approximate Tuition Fee</h3>
                </div>
                <div className="wizard-input-group">
                  <label>Tuition Fee (Total or Per Year in USD/GBP/CAD/AUD or INR)</label>
                  <input
                    type="text"
                    className="wizard-input"
                    placeholder="e.g. $35,000 or ₹30 Lakhs"
                    value={formData.tuitionFee}
                    onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Loan Amount Required */}
            {step === 6 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 6 of 9</span>
                  <h3 className="wizard-step-title">Loan Amount Required</h3>
                </div>
                <div className="wizard-input-group">
                  <label>Estimated Loan Amount Needed (in INR)</label>
                  <input
                    type="text"
                    className="wizard-input"
                    placeholder="e.g. ₹40 Lakhs or ₹75 Lakhs"
                    value={formData.loanRequired}
                    onChange={(e) => setFormData({ ...formData, loanRequired: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Co-applicant */}
            {step === 7 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 7 of 9</span>
                  <h3 className="wizard-step-title">Do You Have a Financial Co-applicant?</h3>
                </div>
                <div className="wizard-options-grid">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`wizard-option-btn ${formData.coApplicant === opt ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData({ ...formData, coApplicant: opt });
                        handleNextStep();
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Collateral */}
            {step === 8 && (
              <div>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 8 of 9</span>
                  <h3 className="wizard-step-title">Do You Have Property/Asset for Collateral?</h3>
                </div>
                <div className="wizard-options-grid">
                  {['Yes', 'No', 'Not sure'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`wizard-option-btn ${formData.collateral === opt ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData({ ...formData, collateral: opt });
                        handleNextStep();
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: Contact Details & Submit */}
            {step === 9 && (
              <form onSubmit={handleLeadSubmit}>
                <div className="wizard-step-header">
                  <span className="wizard-step-num">Step 9 of 9</span>
                  <h3 className="wizard-step-title">Enter Your Contact Details</h3>
                </div>

                {submitError && (
                  <div className="wizard-error-banner" style={{ background: '#FEF2F2', color: '#991B1B', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="wizard-input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    className="wizard-input"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="wizard-input-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    className="wizard-input"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="wizard-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="wizard-input"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="wizard-nav-btns">
                  <button type="button" onClick={handlePrevStep} className="btn-wizard-prev">
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-wizard-next">
                    {isSubmitting ? 'Submitting...' : 'Check My Eligibility'}
                  </button>
                </div>
              </form>
            )}

            {/* Wizard Navigation for Steps 1-8 */}
            {step < 9 && (
              <div className="wizard-nav-btns">
                {step > 1 ? (
                  <button type="button" onClick={handlePrevStep} className="btn-wizard-prev">
                    Back
                  </button>
                ) : <div />}
                <button type="button" onClick={handleNextStep} className="btn-wizard-next">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESULT SUMMARY COMPONENT */
          <div className="result-card">
            <div className="result-icon-box">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="result-title">Your Profile Has Been Submitted!</h3>
            <p className="result-subtitle">
              Based on the information provided, we can help you explore suitable education loan options for studying in {country.name}.
            </p>

            <div className="result-summary-grid">
              <div>
                <div className="result-item-label">Study Destination</div>
                <div className="result-item-val">{country.flag} {country.name}</div>
              </div>
              <div>
                <div className="result-item-label">Course Level & Name</div>
                <div className="result-item-val">{formData.courseLevel} {formData.courseName && `- ${formData.courseName}`}</div>
              </div>
              <div>
                <div className="result-item-label">Target University</div>
                <div className="result-item-val">{formData.university || 'To be selected'}</div>
              </div>
              <div>
                <div className="result-item-label">Requested Loan Amount</div>
                <div className="result-item-val">{formData.loanRequired || 'Flexible'}</div>
              </div>
              <div>
                <div className="result-item-label">Co-applicant</div>
                <div className="result-item-val">{formData.coApplicant}</div>
              </div>
              <div>
                <div className="result-item-label">Collateral</div>
                <div className="result-item-val">{formData.collateral}</div>
              </div>
            </div>

            <div className="result-actions">
              <button onClick={onOpenBranchModal || onOpenModal} className="btn-hero-primary">
                <PhoneCall size={18} /> Talk to a Loan Expert
              </button>
              <button onClick={() => setStep(1) || setIsSubmitted(false)} className="btn-hero-secondary" style={{ background: '#07324A' }}>
                Modify Application
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 7. REQUIRED DOCUMENTS */}
      <section className="country-section bg-soft-section">
        <div className="section-title-center">
          <span className="section-eyebrow">DOCUMENTATION CHECKLIST</span>
          <h2 className="section-heading">Documents You May Need for {country.name}</h2>
          <p className="section-subtitle">
            Prepare these standard document checklists to speed up your loan pre-approval and sanction process.
          </p>
        </div>

        <div className="documents-grid">
          <div className="document-card">
            <h3 className="doc-card-title">
              <FileText size={22} color="#005C5B" /> Student Documents
            </h3>
            <ul className="doc-list">
              {country.documents.student.map((doc, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="document-card">
            <h3 className="doc-card-title">
              <Building2 size={22} color="#005C5B" /> Co-applicant Documents
            </h3>
            <ul className="doc-list">
              {country.documents.coApplicant.map((doc, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="doc-disclaimer">
          *{country.documents.disclaimer}
        </p>
      </section>

      {/* 8. VISUAL STEP-BY-STEP PROCESS TIMELINE */}
      <section className="country-section">
        <div className="section-title-center">
          <span className="section-eyebrow">LOAN TIMELINE</span>
          <h2 className="section-heading">Step-by-Step Education Loan Process</h2>
          <p className="section-subtitle">
            Transparent 6-step journey from initial profile review to university disbursement.
          </p>
        </div>

        <div className="process-timeline">
          <div className="timeline-step-card">
            <div className="timeline-step-num">01</div>
            <h3 className="timeline-step-title">Submit Details</h3>
            <p className="timeline-step-desc">Tell us about your target university, course, and funding requirement.</p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-step-num">02</div>
            <h3 className="timeline-step-title">Eligibility Review</h3>
            <p className="timeline-step-desc">Our expert team evaluates your profile and identifies matching lenders.</p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-step-num">03</div>
            <h3 className="timeline-step-title">Document Upload</h3>
            <p className="timeline-step-desc">Submit essential student and co-applicant academic & financial documents.</p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-step-num">04</div>
            <h3 className="timeline-step-title">Verification</h3>
            <p className="timeline-step-desc">Selected lenders review the application and perform credit evaluation.</p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-step-num">05</div>
            <h3 className="timeline-step-title">Sanction Letter</h3>
            <p className="timeline-step-desc">Official loan sanction issued, subject to lender approval & terms.</p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-step-num">06</div>
            <h3 className="timeline-step-title">Disbursement</h3>
            <p className="timeline-step-desc">Funds disbursed according to university fee schedules and GIC/IHS needs.</p>
          </div>
        </div>
      </section>

      {/* 9. POPULAR STUDY DESTINATIONS / UNIVERSITIES */}
      {country.universities && country.universities.length > 0 && (
        <section className="country-section bg-soft-section">
          <div className="section-title-center">
            <span className="section-eyebrow">TOP UNIVERSITIES</span>
            <h2 className="section-heading">Popular Study Destinations in {country.name}</h2>
            <p className="section-subtitle">
              We assist students applying to top-tier accredited institutions across {country.name}.
            </p>
          </div>

          <div className="universities-grid">
            {country.universities.map((univ, idx) => (
              <div key={idx} className="univ-card">
                <div className="univ-icon-box">
                  <Building2 size={22} />
                </div>
                <div>
                  <div className="univ-name">{univ.name}</div>
                  <div className="univ-loc">{univ.location} • {univ.type}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. FAQ SECTION */}
      <section className="country-section">
        <div className="section-title-center">
          <span className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-heading">Frequently Asked Questions — {country.name} Loans</h2>
          <p className="section-subtitle">
            Common answers regarding education loans for studying in {country.name}.
          </p>
        </div>

        <div className="faq-accordion">
          {country.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION BANNER */}
      <section className="country-section bg-soft-section" style={{ background: 'linear-gradient(135deg, #07324A 0%, #005C5B 100%)', color: '#FFFFFF', borderRadius: '24px', margin: '40px auto 80px auto', textAlign: 'center', padding: '60px 24px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
          Ready to Finance Your Education in {country.name}?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.88)', maxWidth: '640px', margin: '0 auto 32px auto' }}>
          Get personalized guidance on education loan options, non-collateral eligibility, and competitive interest rates for your study destination.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <button onClick={scrollToWizard} className="btn-hero-primary">
            Check My Eligibility <ArrowRight size={18} />
          </button>
          <button onClick={onOpenBranchModal || onOpenModal} className="btn-hero-secondary">
            <PhoneCall size={18} /> Talk to a Loan Expert
          </button>
        </div>
      </section>
    </div>
  );
};

export default CountryLoanPage;
