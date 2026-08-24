import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How much education loan can I get?',
    answer: 'You can get up to ₹1.5 Crore+ for top overseas universities in the USA, UK, Canada, Australia, and Europe. For studies in India, loans generally range up to ₹50 Lakhs depending on the institute and course profile.'
  },
  {
    question: 'Can I get an education loan without collateral?',
    answer: 'Yes! Non-collateral (unsecured) loans are available up to ₹1 Crore for STEM, Management, and top-ranked global university programs through leading NBFCs and private bank partners based on academic merit and co-applicant income.'
  },
  {
    question: 'What documents are required for an education loan?',
    answer: 'Key documents include: Student Academic Records (10th, 12th, Degree marksheets, entrance test scores like GRE/IELTS), Admission/Offer Letter, Co-applicant Income Proof (ITR, Salary Slips, Bank Statements), KYC Documents (Aadhaar, PAN), and Collateral Property Papers (if opting for collateral loan).'
  },
  {
    question: 'Which banks and NBFCs provide education loans?',
    answer: 'GSF partners with 50+ leading lenders including SBI, HDFC Credila, ICICI Bank, Axis Bank, Avanse, Auxilo, InCred, and Prodigy Finance to ensure you get the lowest interest rate and maximum loan amount.'
  },
  {
    question: 'Can I apply for an overseas education loan?',
    answer: 'Absolutely! Overseas education loans are our core specialty. We support tuition fees, living expenses, health insurance, visa GIC/Blocked account deposits, and flight tickets for studies in USA, UK, Canada, Australia, Germany, Ireland, and 20+ countries.'
  },
  {
    question: 'How long does education loan approval take?',
    answer: 'In-principle approvals or sanction letters can be processed in as fast as 3 to 7 working days once all required documents are submitted and verified.'
  },
  {
    question: 'Can parents be co-applicants?',
    answer: 'Yes! Parents, legal guardians, spouses, or immediate working relatives (siblings, uncles/aunts in specific cases) can serve as co-applicants or financial guarantors for your education loan.'
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-padding" id="faqs">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge badge-teal mb-2">GOT QUESTIONS?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find clear answers to common questions about education loan eligibility, interest rates, and loan processing.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className="question-text-row">
                    <HelpCircle size={20} className="text-teal faq-icon-help" />
                    <span className="question-text">{faq.question}</span>
                  </div>
                  <div className="chevron-circle">
                    <ChevronDown size={18} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
