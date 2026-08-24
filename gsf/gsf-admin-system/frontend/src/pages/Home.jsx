import React from 'react';
import Hero from '../sections/Hero';
import StatsStrip from '../sections/StatsStrip';
import LoanCategories from '../sections/LoanCategories';
import WhyChooseGSF from '../sections/WhyChooseGSF';
import LendingPartners from '../sections/LendingPartners';
import StudyDestinations from '../sections/StudyDestinations';
import LoanCalculator from '../sections/LoanCalculator';
import LoanProcess from '../sections/LoanProcess';
import Testimonials from '../sections/Testimonials';
import BranchMapSection from '../sections/BranchMapSection';
import FaqSection from '../sections/FaqSection';
import FinalCta from '../sections/FinalCta';
import CallbackForm from '../sections/CallbackForm';
import WhatsAppSection from '../sections/WhatsAppSection';

const Home = ({ onOpenModal, onOpenBranchModal }) => {
  return (
    <main>
      {/* 1. HERO SECTION */}
      <Hero onOpenModal={onOpenModal} />

      {/* 2. STATISTICS STRIP (Positioned immediately below hero) */}
      <StatsStrip />

      {/* 3. SIX LOAN OPTION CARDS (Spaced below statistics) */}
      <LoanCategories />

      {/* 4. WHY CHOOSE GSF SECTION */}
      <WhyChooseGSF />

      {/* 5. LENDING PARTNERS SECTION */}
      <LendingPartners />

      {/* 6. STUDY DESTINATIONS SECTION */}
      <StudyDestinations />

      {/* 7. LOAN CALCULATOR */}
      <LoanCalculator onOpenModal={onOpenModal} />

      {/* 8. EDUCATION LOAN JOURNEY */}
      <LoanProcess />

      {/* 9. TESTIMONIAL SECTION */}
      <Testimonials />

      {/* 9B. PAN-INDIA BRANCH MAP SECTION */}
      <BranchMapSection onOpenBranchModal={onOpenBranchModal} />

      {/* 10. FAQ SECTION */}
      <FaqSection />

      {/* 11. FINAL CTA SECTION */}
      <FinalCta onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />

      {/* 12. CALLBACK FORM & WHATSAPP SECTION */}
      <CallbackForm />
      <WhatsAppSection />
    </main>
  );
};

export default Home;
