export const eligibilityService = {
  calculateEligibility({ loanAmount, coApplicantIncome, collateralValue, courseLevel }) {
    const numericLoan = parseFloat(loanAmount) || 0;
    const numericIncome = parseFloat(coApplicantIncome) || 0;
    const numericCollateral = parseFloat(collateralValue) || 0;

    const maxUnsecured = courseLevel === 'PG' ? 4000000 : 2500000;
    const isUnsecuredEligible = numericLoan <= maxUnsecured && numericIncome >= 40000;
    const isSecuredEligible = numericCollateral >= numericLoan * 0.8;

    return {
      eligible: isUnsecuredEligible || isSecuredEligible,
      estimatedInterestRate: isSecuredEligible ? '8.95%' : '10.25%',
      maxUnsecuredAmount: maxUnsecured,
      recommendation: isSecuredEligible
        ? 'Public Sector Bank Collateralized Loan (SBI / BOB)'
        : 'Top NBFC Unsecured Loan (HDFC Credila / Avanse / InCred)',
    };
  },
};

export default eligibilityService;
