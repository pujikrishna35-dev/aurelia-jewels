export const COUNTRY_LOAN_DATA = {
  usa: {
    id: 'usa',
    name: 'USA',
    fullName: 'United States of America',
    flag: '🇺🇸',
    heroImage: '/images/destinations/usa.jpg',
    heroSubtitle: 'Fund your education in the USA with flexible education loan options designed for international students.',
    maxLoanAmount: 'Up to ₹1.5 Crore',
    overview: 'The USA remains the top destination for higher education. With STEM OPT extension opportunities and world-renowned universities, securing the right education loan is crucial for your US study journey.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹1.5 Crore', subtext: 'Based on profile & university' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Subject to lender eligibility' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 15 Years', subtext: 'Flexible EMI schedules' },
      { label: 'Moratorium Period', value: 'Course Duration + 6-12 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '3 - 7 Working Days', subtext: 'Fast digital sanction support' },
      { label: 'Coverage', value: '100% Cost of Education', subtext: 'Tuition + Living + Travel' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'Full university or college tuition & mandatory academic fees.', icon: 'GraduationCap' },
      { id: 'living', title: 'Living Expenses', description: 'On-campus/off-campus housing, meals, and monthly stipend.', icon: 'Home' },
      { id: 'travel', title: 'Travel Expenses', description: 'Airfare ticket costs to and from the United States.', icon: 'Plane' },
      { id: 'insurance', title: 'Health Insurance', description: 'Mandatory university health insurance & medical coverage.', icon: 'ShieldCheck' },
      { id: 'other', title: 'Other Education Expenses', description: 'Books, laptop/equipment, SEVIS fee, and examination fees.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Education Loan',
        badge: 'Popular Choice',
        tagline: 'No Property Collateral Required',
        features: [
          'No collateral required, subject to lender eligibility',
          'Loan amount determined by university rank & GRE/academic score',
          'Co-applicant with stable income required by most lenders',
          'Covers tuition fees, living expenses, and health insurance'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Education Loan',
        badge: 'Higher Limits',
        tagline: 'Backed by Property or Fixed Deposit',
        features: [
          'Collateral required (Residential/Commercial property, FD, or Land)',
          'Higher loan limits up to ₹1.5 Crore+',
          'Lower interest rates compared to unsecured loans',
          'Flexible repayment tenures up to 15 years'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required (Subject to profile)', secured: 'Property / FD / Asset required' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹75 Lakhs - ₹1 Crore', secured: 'Up to ₹1.5 Crore+' },
      { feature: 'Interest Rate Range', unsecured: 'Based on lender & student profile', secured: 'Generally lower interest rates' },
      { feature: 'Processing Time', unsecured: '3 - 5 Working Days', secured: '7 - 12 Working Days (Property evaluation)' },
      { feature: 'Best Suitable For', unsecured: 'Top tier universities & STEM courses', secured: 'Students requiring high funding or lower EMIs' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Class 10th, 12th & Graduation Marksheets / Degree',
        'US University Offer Letter / Admit Letter / I-20',
        'Standardized Test Scores (GRE, GMAT, TOEFL, IELTS)',
        'Aadhaar Card & PAN Card',
        'Bank Statement (Last 6 months)'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'Income Proof (ITR for last 2-3 years / Salary Slips for 3 months)',
        'Form 16 / Form 26AS (if salaried)',
        'Bank Account Statement (Last 6 months showing salary/income)',
        'Business Registration & P&L (if self-employed)',
        'Property Documents (for secured loans)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'Northeastern University', location: 'Boston, MA', type: 'Private Research' },
      { name: 'University of Texas at Dallas', location: 'Richardson, TX', type: 'Public State Univ' },
      { name: 'Arizona State University', location: 'Tempe, AZ', type: 'Public Research' },
      { name: 'New York University (NYU)', location: 'New York, NY', type: 'Top Private Univ' },
      { name: 'University of Southern California', location: 'Los Angeles, CA', type: 'Top Private Univ' },
      { name: 'Purdue University', location: 'West Lafayette, IN', type: 'Public STEM Leader' }
    ],

    faqs: [
      {
        question: 'Can I get an education loan for US studies without collateral?',
        answer: 'Yes! Several partner lenders offer unsecured (non-collateral) education loans up to ₹75 Lakhs - ₹1 Crore for US universities based on the university ranking, GRE/IELTS score, and co-applicant financial profile.'
      },
      {
        question: 'Is I-20 form mandatory before applying for a US education loan?',
        answer: 'You can get a loan pre-approval or conditional sanction letter using your university admit/offer letter even before receiving the official I-20. The sanction letter can then be submitted to the university to receive your I-20.'
      },
      {
        question: 'Does the loan cover living expenses in the US?',
        answer: 'Yes, most education loans cover living costs (accommodation, food, books, health insurance) in addition to university tuition fees.'
      },
      {
        question: 'When does loan repayment start for US courses?',
        answer: 'Repayment usually begins after the course completion plus a moratorium (grace) period of 6 to 12 months. During the course duration, simple interest or partial interest may be paid depending on lender policy.'
      },
      {
        question: 'What is the role of a co-applicant for US education loans?',
        answer: 'A co-applicant (parent, sibling, spouse, or relative) acts as a guarantor. For unsecured loans, the co-applicant financial stability is an important factor in loan approval.'
      }
    ]
  },

  uk: {
    id: 'uk',
    name: 'UK',
    fullName: 'United Kingdom',
    flag: '🇬🇧',
    heroImage: '/images/destinations/uk.jpg',
    heroSubtitle: 'Fast 3-day sanction support for 1-year Master programs with 100% tuition and CAS deposit loan options.',
    maxLoanAmount: 'Up to ₹1.0 Crore',
    overview: 'The UK offers 1-year Master degree programs and a 2-year Graduate Route post-study work visa. Fast-track education loan options help you meet CAS requirements seamlessly.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹1.0 Crore', subtext: 'Based on profile & university' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Fast 3-day approval' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 12 - 15 Years', subtext: 'Tailored for 1-year Masters' },
      { label: 'Moratorium Period', value: 'Course Duration + 6 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '3 - 5 Working Days', subtext: 'Quick CAS deposit release' },
      { label: 'Coverage', value: '100% Cost of Education', subtext: 'Tuition + Living + CAS' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'Full university tuition fee payments.', icon: 'GraduationCap' },
      { id: 'living', title: 'Living Expenses', description: 'London & Outer London accommodation and monthly living maintenance.', icon: 'Home' },
      { id: 'travel', title: 'Flight & Visa', description: 'UK Student Visa fee, IHS health surcharge, and flights.', icon: 'Plane' },
      { id: 'insurance', title: 'IHS Health Surcharge', description: 'Mandatory NHS Immigration Health Surcharge fee.', icon: 'ShieldCheck' },
      { id: 'other', title: 'CAS Deposit', description: 'Initial deposit requirement for Confirmation of Acceptance for Studies.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured UK Education Loan',
        badge: 'Fast Approval',
        tagline: 'No Property Collateral Needed',
        features: [
          'No collateral required for eligible UK universities',
          'Fast turnaround to meet university CAS deadlines',
          'Covers initial CAS deposit and IHS health surcharge',
          'Simple digital process with minimum documentation'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured UK Education Loan',
        badge: 'Lower EMI',
        tagline: 'Property or FD Collateralized',
        features: [
          'Collateral supported (Property/FD)',
          'Lower interest rate structures',
          'Extended repayment terms up to 15 years',
          'Covers 100% expenses including living maintenance'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible profiles', secured: 'Property / Fixed Deposit required' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹50 - ₹75 Lakhs', secured: 'Up to ₹1 Crore+' },
      { feature: 'Interest Rate Range', unsecured: 'Based on lender & student profile', secured: 'Generally lower interest rates' },
      { feature: 'Processing Time', unsecured: '3 Working Days', secured: '7 - 10 Working Days' },
      { feature: 'Best Suitable For', unsecured: '1-Year Master students needing quick CAS', secured: 'Students seeking lowest EMI and maximum amount' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Marksheets & Degree Certificate',
        'UK University Offer Letter / Conditional Offer',
        'IELTS / PTE / English Test Scores or Waiver Letter',
        'Aadhaar Card & PAN Card',
        'Bank Account Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'Income Tax Returns (ITR last 2-3 years)',
        'Salary Slips (3 months) / Business proof',
        'Bank Statement (Last 6 months)',
        'Property documents (if opting for secured loan)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'University of Manchester', location: 'Manchester, UK', type: 'Russell Group' },
      { name: 'University of Birmingham', location: 'Birmingham, UK', type: 'Russell Group' },
      { name: 'King\'s College London', location: 'London, UK', type: 'Top Global University' },
      { name: 'University of Leeds', location: 'Leeds, UK', type: 'Russell Group' },
      { name: 'University of Glasgow', location: 'Glasgow, Scotland', type: 'Top UK University' },
      { name: 'Cranfield University', location: 'Bedford, UK', type: 'Postgraduate Leader' }
    ],

    faqs: [
      {
        question: 'Can I get a loan for 1-year Master degrees in the UK?',
        answer: 'Yes, specialized loan programs exist for 1-year UK Master courses with customized repayment structures tailored for post-study work periods.'
      },
      {
        question: 'Can the education loan cover the UK CAS deposit?',
        answer: 'Yes! Lenders can disburse funds directly to pay the initial CAS deposit required by UK universities.'
      },
      {
        question: 'Does the loan cover the NHS Immigration Health Surcharge (IHS)?',
        answer: 'Yes, eligible education loans can cover student visa fees, IHS health surcharge, and travel tickets.'
      },
      {
        question: 'What is the minimum income requirement for a UK loan co-applicant?',
        answer: 'Income requirements vary by lender and university tier. For top UK institutions, flexible co-applicant norms are available.'
      }
    ]
  },

  canada: {
    id: 'canada',
    name: 'Canada',
    fullName: 'Canada',
    flag: '🇨🇦',
    heroImage: '/images/destinations/canada.jpg',
    heroSubtitle: 'Comprehensive loan coverage including GIC deposit, tuition fees, and living expense disbursements.',
    maxLoanAmount: 'Up to ₹75 Lakhs',
    overview: 'Canada is famous for quality education, PGWP post-study work permits, and clear pathways. Secure funding for your tuition fee and GIC (Guaranteed Investment Certificate) seamlessly.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹75 Lakhs', subtext: 'Based on profile & institution' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Flexible eligibility norms' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 12 - 15 Years', subtext: 'Easy EMI after graduation' },
      { label: 'Moratorium Period', value: 'Course Duration + 6-12 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '4 - 7 Working Days', subtext: 'GIC pre-approval support' },
      { label: 'Coverage', value: '100% Education Expenses', subtext: 'Tuition + GIC + Living' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'Semester / yearly tuition fees for Canadian colleges and universities.', icon: 'GraduationCap' },
      { id: 'gic', title: 'GIC Deposit', description: 'Guaranteed Investment Certificate (GIC) living cost requirement.', icon: 'Home' },
      { id: 'travel', title: 'Air travel & Visa', description: 'Canadian student visa fee and air travel expenses.', icon: 'Plane' },
      { id: 'insurance', title: 'Medical Insurance', description: 'Provincial and institutional health insurance coverage.', icon: 'ShieldCheck' },
      { id: 'other', title: 'Study Supplies', description: 'Books, laptop, and academic equipment expenses.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Canada Education Loan',
        badge: 'No Collateral',
        tagline: 'Quick Sanction for Colleges & Universities',
        features: [
          'No property collateral required',
          'Includes funding for mandatory GIC account setup',
          'Covers SDS & Non-SDS university/college applications',
          'Fast approval with simple documentation'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Canada Education Loan',
        badge: 'Lower Interest',
        tagline: 'Property collateralized for maximum funding',
        features: [
          'Collateral backed (Property or Fixed Deposit)',
          'Substantially lower interest rates',
          'Higher loan ceiling up to ₹75 Lakhs - ₹1 Crore',
          'Flexible long-term repayment up to 15 years'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible courses', secured: 'Property / FD required' },
      { feature: 'GIC Deposit Funding', unsecured: 'Included in loan sanction', secured: 'Included in loan sanction' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹40 - ₹50 Lakhs', secured: 'Up to ₹75 Lakhs+' },
      { feature: 'Processing Time', unsecured: '4 - 6 Working Days', secured: '8 - 12 Working Days' },
      { feature: 'Best Suitable For', unsecured: 'PG Diploma & Master degree students', secured: 'Students seeking maximum amount at lowest interest' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Marksheets & Certificates (10th, 12th, Bachelor degree)',
        'Canada Letter of Acceptance (LOA)',
        'IELTS Academic / PTE / TOEFL Score Card',
        'Aadhaar & PAN Card',
        'Student Bank Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'ITR Slips (Last 2-3 years)',
        'Salary Slips (Last 3 months) / Business documents',
        'Bank Statement (Last 6 months)',
        'Property Collateral Papers (if applicable)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'University of Toronto', location: 'Toronto, ON', type: 'Top Canadian University' },
      { name: 'University of British Columbia', location: 'Vancouver, BC', type: 'Global Top Univ' },
      { name: 'McGill University', location: 'Montreal, QC', type: 'Top Research Univ' },
      { name: 'University of Waterloo', location: 'Waterloo, ON', type: 'Tech & Engineering' },
      { name: 'Conestoga College', location: 'Kitchener, ON', type: 'Popular Public College' },
      { name: 'Seneca Polytechnic', location: 'Toronto, ON', type: 'Applied Arts & Tech' }
    ],

    faqs: [
      {
        question: 'Can the education loan cover my GIC amount for Canada?',
        answer: 'Yes! Lenders can disburse funds directly to purchase your Guaranteed Investment Certificate (GIC) as required for Canadian student visa applications.'
      },
      {
        question: 'Are loans available for Canadian PG Diploma courses?',
        answer: 'Yes, education loans are available for both University Master degrees and PG Diploma programs at eligible Canadian public colleges.'
      },
      {
        question: 'Do I need collateral for a Canadian education loan?',
        answer: 'Not necessarily. Unsecured loans up to ₹40-50 Lakhs are available for eligible profiles without property collateral.'
      }
    ]
  },

  australia: {
    id: 'australia',
    name: 'Australia',
    fullName: 'Commonwealth of Australia',
    flag: '🇦🇺',
    heroImage: '/images/destinations/australia.jpg',
    heroSubtitle: 'Easy living allowance funding with attractive post-study work visa alignment for Australian universities.',
    maxLoanAmount: 'Up to ₹80 Lakhs',
    overview: 'Australia offers world-class universities, innovative research, and generous post-study work rights. Secure education financing for Australian tuition and OSHC health cover.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹80 Lakhs', subtext: 'Based on profile & university' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Subject to lender terms' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 15 Years', subtext: 'Flexible post-graduation EMI' },
      { label: 'Moratorium Period', value: 'Course Duration + 6-12 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '4 - 7 Working Days', subtext: 'CoE pre-approval support' },
      { label: 'Coverage', value: '100% Cost of Education', subtext: 'Tuition + OSHC + Living' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'University tuition fees per semester or year.', icon: 'GraduationCap' },
      { id: 'living', title: 'Living Allowance', description: 'Off-campus accommodation, food, and daily living costs.', icon: 'Home' },
      { id: 'travel', title: 'Flight & Visa', description: 'Australian Subclass 500 Student Visa fee and air tickets.', icon: 'Plane' },
      { id: 'insurance', title: 'OSHC Coverage', description: 'Overseas Student Health Cover (OSHC) mandatory health insurance.', icon: 'ShieldCheck' },
      { id: 'other', title: 'Course Materials', description: 'Textbooks, laptop, and laboratory fees.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Australia Education Loan',
        badge: 'No Collateral',
        tagline: 'Sanction for Group of Eight & Top Universities',
        features: [
          'No property collateral required for eligible institutions',
          'Covers mandatory OSHC health cover',
          'Sanction letter accepted for visa financial proof',
          'Fast turnaround time'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Australia Education Loan',
        badge: 'Maximum Loan',
        tagline: 'Backed by Property or FD',
        features: [
          'Property / FD backed collateral loan',
          'Lower interest rates',
          'Higher loan limits up to ₹80 Lakhs+',
          'Up to 15 years repayment tenure'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible profiles', secured: 'Property / FD required' },
      { feature: 'OSHC Coverage', unsecured: 'Fully covered', secured: 'Fully covered' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹40 - ₹60 Lakhs', secured: 'Up to ₹80 Lakhs+' },
      { feature: 'Processing Time', unsecured: '4 - 6 Working Days', secured: '8 - 12 Working Days' },
      { feature: 'Best Suitable For', unsecured: 'Master degree students at top universities', secured: 'Students requiring maximum loan limit at lower interest' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Certificates (10th, 12th & Degree)',
        'Australian University Offer Letter / CoE',
        'IELTS / PTE / TOEFL Score Card',
        'Aadhaar Card & PAN Card',
        'Bank Account Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'ITR Proof (Last 2-3 years)',
        'Salary Slips (3 months) / Business proof',
        'Bank Statement (Last 6 months)',
        'Property documents (if applying for secured loan)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'University of Melbourne', location: 'Melbourne, VIC', type: 'Go8 Member' },
      { name: 'University of Sydney', location: 'Sydney, NSW', type: 'Go8 Member' },
      { name: 'University of Queensland', location: 'Brisbane, QLD', type: 'Go8 Member' },
      { name: 'Monash University', location: 'Melbourne, VIC', type: 'Go8 Member' },
      { name: 'UNSW Sydney', location: 'Sydney, NSW', type: 'Go8 Member' },
      { name: 'RMIT University', location: 'Melbourne, VIC', type: 'Tech & Design Leader' }
    ],

    faqs: [
      {
        question: 'Does the loan cover OSHC (Overseas Student Health Cover)?',
        answer: 'Yes, mandatory OSHC health cover expenses can be included directly in your loan sanction.'
      },
      {
        question: 'Can I use the loan sanction letter for the Australian visa financial requirement?',
        answer: 'Yes, official education loan sanction letters from recognized banks/NBFCs are accepted by Australian immigration for student visa financial proof.'
      }
    ]
  },

  ireland: {
    id: 'ireland',
    name: 'Ireland',
    fullName: 'Republic of Ireland',
    flag: '🇮🇪',
    heroImage: '/images/destinations/ireland.jpg',
    heroSubtitle: 'Seamless financial support for European tech hub universities with quick turnaround.',
    maxLoanAmount: 'Up to ₹60 Lakhs',
    overview: 'Ireland is Europe\'s premier technology hub housing top global tech giants. Enjoy 1-year Master programs and 2-year post-study work visas with education loans tailored for Irish higher education.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹60 Lakhs', subtext: 'Based on profile & university' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Subject to lender eligibility' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 12 - 15 Years', subtext: 'Flexible post-study repayment' },
      { label: 'Moratorium Period', value: 'Course Duration + 6 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '3 - 6 Working Days', subtext: 'Quick pre-visa sanction' },
      { label: 'Coverage', value: '100% Cost of Education', subtext: 'Tuition + Living + Insurance' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'Full Irish university or institute tuition fees.', icon: 'GraduationCap' },
      { id: 'living', title: 'Living Expenses', description: 'Dublin & regional accommodation and living costs.', icon: 'Home' },
      { id: 'travel', title: 'Travel & Visa', description: 'Irish student visa fees and flight expenses.', icon: 'Plane' },
      { id: 'insurance', title: 'Private Medical Insurance', description: 'Mandatory Irish student private health insurance policy.', icon: 'ShieldCheck' },
      { id: 'other', title: 'Academic Supplies', description: 'Books, laptop, and university supplies.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Ireland Education Loan',
        badge: 'No Property Needed',
        tagline: 'Sanctions for Irish Universities & Technological Institutes',
        features: [
          'No collateral required for eligible courses',
          'Fast sanction for Irish student visa applications',
          'Covers tuition fees and living expenses',
          'Simplified documentation'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Ireland Education Loan',
        badge: 'Lowest Interest',
        tagline: 'Backed by Property or FD',
        features: [
          'Property / FD backed collateral',
          'Lower interest rates',
          'Higher loan limits up to ₹60 Lakhs+',
          'Up to 15 years repayment tenure'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible profiles', secured: 'Property / FD required' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹40 - ₹50 Lakhs', secured: 'Up to ₹60 Lakhs+' },
      { feature: 'Interest Rate Range', unsecured: 'Based on lender & student profile', secured: 'Generally lower interest rates' },
      { feature: 'Processing Time', unsecured: '3 - 5 Working Days', secured: '7 - 10 Working Days' },
      { feature: 'Best Suitable For', unsecured: 'MSc Computer Science & Data Analytics students', secured: 'Students seeking maximum amount at lower interest' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Marksheets & Degree Certificates',
        'Ireland University Offer Letter',
        'IELTS / TOEFL / PTE Score Card',
        'Aadhaar & PAN Card',
        'Bank Account Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'ITR Slips (Last 2-3 years)',
        'Salary Slips (3 months) / Business proof',
        'Bank Statement (Last 6 months)',
        'Property documents (for secured loans)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'Trinity College Dublin', location: 'Dublin, Ireland', type: 'Top Ranked Irish Univ' },
      { name: 'University College Dublin (UCD)', location: 'Dublin, Ireland', type: 'Research Leader' },
      { name: 'University of Galway', location: 'Galway, Ireland', type: 'Top Public Univ' },
      { name: 'Dublin City University (DCU)', location: 'Dublin, Ireland', type: 'Innovation Leader' },
      { name: 'University of Limerick', location: 'Limerick, Ireland', type: 'Public Research Univ' }
    ],

    faqs: [
      {
        question: 'Can I get a loan for studying Master degrees in Ireland?',
        answer: 'Yes! Both secured and unsecured loan options are available for Master degree and Postgraduate diploma courses across Irish universities.'
      }
    ]
  },

  germany: {
    id: 'germany',
    name: 'Germany',
    fullName: 'Federal Republic of Germany',
    flag: '🇩🇪',
    heroImage: '/images/destinations/germany.jpg',
    heroSubtitle: 'Specialized loans for Blocked Account setup and living expense financing for German higher education.',
    maxLoanAmount: 'Up to ₹50 Lakhs',
    overview: 'Germany is world-famous for tuition-free public universities and cutting-edge engineering. Education loans primarily fund the mandatory German Blocked Account (Sperrkonto) and living expenses.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Up to ₹50 Lakhs', subtext: 'Covers Blocked Account & Tuition' },
      { label: 'Collateral Requirement', value: 'Non-Collateral Available', subtext: 'Subject to lender eligibility' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 12 - 15 Years', subtext: 'Flexible post-study repayment' },
      { label: 'Moratorium Period', value: 'Course Duration + 6-12 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '3 - 5 Working Days', subtext: 'Blocked Account funding support' },
      { label: 'Coverage', value: '100% Living & Blocked Account', subtext: 'Sperrkonto + Travel + Fees' }
    ],

    eligibleExpenses: [
      { id: 'blocked', title: 'Blocked Account (Sperrkonto)', description: 'Mandatory German Blocked Account living deposit (approx €11,208/year).', icon: 'Home' },
      { id: 'tuition', title: 'Semester Contribution & Tuition', description: 'Semester contribution fees or private university tuition.', icon: 'GraduationCap' },
      { id: 'travel', title: 'Air Tickets & Visa', description: 'German Student Visa fees and flight tickets.', icon: 'Plane' },
      { id: 'insurance', title: 'Health Insurance', description: 'Mandatory German public/private health insurance (TK, AOK, etc.).', icon: 'ShieldCheck' },
      { id: 'other', title: 'Study Equipment', description: 'Books, laptop, and study equipment.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Germany Education Loan',
        badge: 'Blocked Account Funding',
        tagline: 'No Property Required',
        features: [
          'No property collateral needed for public/private German university admits',
          'Funds disbursed directly to open German Blocked Account (Sperrkonto)',
          'Covers semester contributions and flight tickets',
          'Fast digital sanction'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Germany Education Loan',
        badge: 'Lowest Interest',
        tagline: 'Backed by Property or FD',
        features: [
          'Property / FD backed collateral loan',
          'Lowest interest rate structures',
          'Covers high funding needs for private universities',
          'Up to 15 years repayment tenure'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible profiles', secured: 'Property / FD required' },
      { feature: 'Blocked Account Funding', unsecured: 'Fully supported', secured: 'Fully supported' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹25 - ₹35 Lakhs', secured: 'Up to ₹50 Lakhs+' },
      { feature: 'Processing Time', unsecured: '3 - 5 Working Days', secured: '7 - 10 Working Days' },
      { feature: 'Best Suitable For', unsecured: 'Public university students needing Blocked Account', secured: 'Private university students needing higher amounts' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Marksheets (10th, 12th, Graduation Degree)',
        'German University Admission Letter (Zulassungsbescheid)',
        'IELTS / TOEFL / German Language Proficiency (if applicable)',
        'Aadhaar Card & PAN Card',
        'Bank Account Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'Income Tax Returns (Last 2-3 years)',
        'Salary Slips (3 months) / Business proof',
        'Bank Statement (Last 6 months)',
        'Property documents (if opting for secured loan)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'Technical University of Munich (TUM)', location: 'Munich, Germany', type: 'TU9 Public Univ' },
      { name: 'RWTH Aachen University', location: 'Aachen, Germany', type: 'TU9 Public Univ' },
      { name: 'TU Berlin', location: 'Berlin, Germany', type: 'TU9 Public Univ' },
      { name: 'Heidelberg University', location: 'Heidelberg, Germany', type: 'Excellence Univ' },
      { name: 'FAU Erlangen-Nürnberg', location: 'Erlangen, Germany', type: 'Top Research Univ' }
    ],

    faqs: [
      {
        question: 'Can the education loan be used to fund the German Blocked Account (Sperrkonto)?',
        answer: 'Yes! Partner lenders can disburse loan funds directly into your German Blocked Account (such as Expatrio, Coracle, or Fintiba) to satisfy German visa financial requirements.'
      }
    ]
  },

  'other-countries': {
    id: 'other-countries',
    name: 'Global Study',
    fullName: 'Worldwide Study Destinations',
    flag: '🌐',
    heroImage: '/images/destinations/other-countries.jpg',
    heroSubtitle: 'Tailored education loan assistance for accredited global institutions worldwide.',
    maxLoanAmount: 'Custom Limit',
    overview: 'Whether you plan to study in Singapore, France, New Zealand, Dubai, Sweden, or elsewhere in Europe, flexible loan options cover your tuition and global living expenses.',
    
    highlights: [
      { label: 'Maximum Loan Amount', value: 'Custom Limit', subtext: 'Based on country & program' },
      { label: 'Collateral Requirement', value: 'Secured & Unsecured', subtext: 'Subject to lender terms' },
      { label: 'Interest Rate', value: 'Competitive Rates', subtext: 'Based on lender & applicant profile' },
      { label: 'Repayment Tenure', value: 'Up to 15 Years', subtext: 'Flexible post-graduation EMI' },
      { label: 'Moratorium Period', value: 'Course Duration + 6-12 Months', subtext: 'Grace period during study' },
      { label: 'Processing Time', value: '5 - 8 Working Days', subtext: 'Global sanction support' },
      { label: 'Coverage', value: '100% Approved Costs', subtext: 'Tuition + Living + Visa' }
    ],

    eligibleExpenses: [
      { id: 'tuition', title: 'Tuition Fees', description: 'Full academic tuition fee payments.', icon: 'GraduationCap' },
      { id: 'living', title: 'Living Expenses', description: 'Hostel, rent, meals, and daily transportation costs.', icon: 'Home' },
      { id: 'travel', title: 'Travel & Visa', description: 'Student visa application fee and airfare.', icon: 'Plane' },
      { id: 'insurance', title: 'Insurance', description: 'International student medical and travel insurance.', icon: 'ShieldCheck' },
      { id: 'other', title: 'Course Equipment', description: 'Books, laptop, and mandatory study materials.', icon: 'BookOpen' }
    ],

    loanProducts: [
      {
        id: 'unsecured',
        title: 'Unsecured Global Education Loan',
        badge: 'No Property',
        tagline: 'For Top Global Universities',
        features: [
          'No collateral required for accredited global institutions',
          'Subject to student academic profile & co-applicant income',
          'Covers tuition fees and international living costs',
          'Digital application process'
        ],
        ctaText: 'Check Eligibility'
      },
      {
        id: 'secured',
        title: 'Secured Global Education Loan',
        badge: 'Higher Limit',
        tagline: 'Property Collateral Backed',
        features: [
          'Collateral supported (Property or FD)',
          'Higher loan limit customized for your study budget',
          'Lower interest rates',
          'Up to 15 years repayment tenure'
        ],
        ctaText: 'Check Eligibility'
      }
    ],

    comparison: [
      { feature: 'Collateral Required', unsecured: 'Not required for eligible profiles', secured: 'Property / FD required' },
      { feature: 'Loan Amount Limit', unsecured: 'Up to ₹35 - ₹50 Lakhs', secured: 'Custom Limit (Up to ₹1.5 Cr+)' },
      { feature: 'Interest Rate Range', unsecured: 'Based on lender & student profile', secured: 'Generally lower interest rates' },
      { feature: 'Processing Time', unsecured: '4 - 6 Working Days', secured: '8 - 12 Working Days' },
      { feature: 'Best Suitable For', unsecured: 'Top tier university admits worldwide', secured: 'Students seeking maximum amount at lower interest' }
    ],

    documents: {
      student: [
        'Passport (First & Last Page)',
        'Academic Marksheets (10th, 12th & Graduation Degree)',
        'Official University Admission / Offer Letter',
        'English / Language Test Scores (IELTS, TOEFL, etc.)',
        'Aadhaar & PAN Card',
        'Bank Account Statement'
      ],
      coApplicant: [
        'Aadhaar Card & PAN Card of Co-applicant',
        'Income Tax Returns (ITR last 2-3 years)',
        'Salary Slips (3 months) / Business proof',
        'Bank Statement (Last 6 months)',
        'Property Collateral Papers (if applicable)'
      ],
      disclaimer: 'Required documents may vary depending on the lender, loan type (Secured/Unsecured), and applicant financial profile.'
    },

    universities: [
      { name: 'National University of Singapore (NUS)', location: 'Singapore', type: 'Top Global Univ' },
      { name: 'Nanyang Technological University (NTU)', location: 'Singapore', type: 'Tech & Engineering' },
      { name: 'INSEAD France', location: 'Fontainebleau, France', type: 'Top Business School' },
      { name: 'University of Auckland', location: 'Auckland, New Zealand', type: 'Top NZ University' },
      { name: 'KTH Royal Institute of Technology', location: 'Stockholm, Sweden', type: 'Top Tech Institute' }
    ],

    faqs: [
      {
        question: 'Can I get an education loan for countries not listed separately?',
        answer: 'Yes! Education loans are available for accredited universities across Singapore, France, New Zealand, UAE, Sweden, Netherlands, and all major study destinations.'
      }
    ]
  }
};
