import React from 'react';
import { Globe, GraduationCap, ShieldCheck, CheckCircle2, Landmark, Wallet } from 'lucide-react';
import { LOAN_CATEGORIES } from '../data/loanCategories';

const ICON_MAP = {
  Globe: Globe,
  GraduationCap: GraduationCap,
  ShieldCheck: ShieldCheck,
  CheckCircle2: CheckCircle2,
  Landmark: Landmark,
  Wallet: Wallet
};

const LoanCategories = () => {
  return (
    <section className="loan-categories-section">
      <div className="loan-options-container">
        <div className="loan-options-grid">
          {LOAN_CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || GraduationCap;

            return (
              <div key={category.id} className="loan-option-card">
                <div className="loan-option-icon">
                  <IconComponent size={44} strokeWidth={1.6} />
                </div>
                <h3 className="loan-option-title">{category.title}</h3>
                <p className="loan-option-desc">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LoanCategories;
