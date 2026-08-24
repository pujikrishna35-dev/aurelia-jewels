import React, { useState, useMemo } from 'react';
import { ArrowRight, Calculator, Info, ShieldCheck } from 'lucide-react';

const LoanCalculator = ({ onOpenModal }) => {
  const [destination, setDestination] = useState('usa');
  const [amount, setAmount] = useState(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState(9.5); // 9.5%
  const [tenureYears, setTenureYears] = useState(10); // 10 Years

  // EMI Math Calculation
  const { emi, totalInterest, totalRepayment } = useMemo(() => {
    const principal = Number(amount) || 0;
    const ratePerMonth = (Number(interestRate) || 0) / 12 / 100;
    const months = (Number(tenureYears) || 1) * 12;

    if (principal <= 0 || ratePerMonth <= 0 || months <= 0) {
      return { emi: 0, totalInterest: 0, totalRepayment: 0 };
    }

    const calculatedEmi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
      (Math.pow(1 + ratePerMonth, months) - 1);

    const repayment = calculatedEmi * months;
    const interest = repayment - principal;

    return {
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(interest),
      totalRepayment: Math.round(repayment)
    };
  }, [amount, interestRate, tenureYears]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="loan-calculator-section section-padding" id="calculator">
      <div className="container">
        <div className="section-header text-center">
          <span className="badge badge-gold mb-2">INTERACTIVE FINANCIAL PLANNING</span>
          <h2 className="section-title">Estimate Your Education Loan</h2>
          <p className="section-subtitle">
            Calculate your estimated monthly EMI, total interest payable, and total repayment breakdown in real time.
          </p>
        </div>

        <div className="calculator-wrapper-card">
          <div className="calculator-grid">
            
            {/* Left Inputs Column */}
            <div className="calculator-inputs-col">
              
              {/* Study Destination */}
              <div className="input-group">
                <label className="input-label">Study Destination</label>
                <select
                  className="calc-select-input"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="usa">USA 🇺🇸</option>
                  <option value="uk">UK 🇬🇧</option>
                  <option value="canada">Canada 🇨🇦</option>
                  <option value="australia">Australia 🇦🇺</option>
                  <option value="germany">Germany 🇩🇪</option>
                  <option value="ireland">Ireland 🇮🇪</option>
                  <option value="india">India 🇮🇳</option>
                  <option value="other">Other Global Destinations 🌐</option>
                </select>
              </div>

              {/* Loan Amount Slider */}
              <div className="input-group">
                <div className="input-label-row">
                  <label className="input-label">Loan Amount</label>
                  <span className="input-value-badge">{formatCurrency(amount)}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="100000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="calc-slider"
                />
                <div className="slider-range-labels">
                  <span>₹5 Lakhs</span>
                  <span>₹1.5 Crore</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="input-group">
                <div className="input-label-row">
                  <label className="input-label">Interest Rate (% p.a.)</label>
                  <span className="input-value-badge">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="8.5"
                  max="16.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="calc-slider"
                />
                <div className="slider-range-labels">
                  <span>8.5%</span>
                  <span>16.0%</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div className="input-group">
                <div className="input-label-row">
                  <label className="input-label">Loan Tenure (Years)</label>
                  <span className="input-value-badge">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="calc-slider"
                />
                <div className="slider-range-labels">
                  <span>1 Year</span>
                  <span>15 Years</span>
                </div>
              </div>

            </div>

            {/* Right Summary Display Column */}
            <div className="calculator-summary-col">
              <div className="emi-result-box">
                <span className="emi-title-label">ESTIMATED MONTHLY EMI</span>
                <div className="emi-amount-display">{formatCurrency(emi)} <span className="emi-per-month">/ mo</span></div>
                <span className="emi-note">Based on amortized monthly repayment schedule</span>
              </div>

              <div className="breakdown-list">
                <div className="breakdown-item">
                  <span className="breakdown-label">Principal Amount</span>
                  <span className="breakdown-val">{formatCurrency(amount)}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Estimated Interest</span>
                  <span className="breakdown-val text-gold">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="breakdown-item breakdown-total">
                  <span className="breakdown-label">Total Repayment Amount</span>
                  <span className="breakdown-val">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>

              <div className="calc-action-area">
                <button className="btn btn-primary btn-full-width" onClick={onOpenModal}>
                  <span>Check Your Eligibility</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="calc-disclaimer">
                <Info size={14} className="text-muted" />
                <span>Calculations are estimated figures for reference only. Final interest rates and terms depend on lender underwriting.</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
