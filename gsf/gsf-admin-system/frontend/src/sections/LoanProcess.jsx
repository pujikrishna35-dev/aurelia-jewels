import React from 'react';
import { FileText, UserCheck, GitCompare, FolderCheck, Send, CheckCircle2 } from 'lucide-react';
import { LOAN_PROCESS_STEPS } from '../data/loanProcess';

const ICON_MAP = {
  FileText: FileText,
  UserCheck: UserCheck,
  GitCompare: GitCompare,
  FolderCheck: FolderCheck,
  Send: Send,
  CheckCircle2: CheckCircle2
};

const LoanProcess = () => {
  return (
    <section className="loan-process-section">
      <div className="loan-process-container">
        {/* Centered Section Header */}
        <div className="loan-process-header">
          <span className="loan-process-eyebrow">OUR SIMPLE LOAN PROCESS</span>
          <h2 className="loan-process-heading">
            From Enquiry to Disbursement – We’ve Got You Covered!
          </h2>
          <p className="loan-process-description">
            A smooth, transparent, 6-step roadmap designed to secure your education loan with minimum effort.
          </p>
        </div>

        {/* Continuous Horizontal Process Timeline */}
        <div className="process-timeline-wrapper">
          <div className="process-connecting-line"></div>
          <div className="process-steps-grid">
            {LOAN_PROCESS_STEPS.map((item) => {
              const IconComponent = ICON_MAP[item.iconName] || FileText;

              return (
                <div key={item.step} className="process-step-node">
                  <div className="step-icon-wrapper">
                    <IconComponent size={26} color="#005C5B" className="step-icon" />
                    <span className="step-number-badge">{item.step}</span>
                  </div>

                  <h3 className="step-title">{item.title}</h3>
                  <span className="step-subtitle">{item.subtitle}</span>
                  <p className="step-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanProcess;
