import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import EligibilityModal from './components/forms/EligibilityModal';
import BranchSelectionModal from './components/forms/BranchSelectionModal';

import AppRoutes from './routes/AppRoutes';
import { NotificationProvider } from './context/NotificationContext';
import RealtimeToast from './components/admin/RealtimeToast';

import './styles/global.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isStudentRoute = location.pathname.startsWith('/student');
  const isAdminRoute = location.pathname.startsWith('/admin') ||
    ['/dashboard', '/leads', '/students', '/follow-ups', '/settings'].some(p => location.pathname.startsWith(p));

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Auto-display lead capture popup once per session when visitor opens homepage
  useEffect(() => {
    if (isHome) {
      const hasShown = sessionStorage.getItem('gsfLeadPopupShown');
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsModalOpen(true);
          sessionStorage.setItem('gsfLeadPopupShown', 'true');
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [isHome]);

  if (isAdminRoute) {
    return (
      <NotificationProvider>
        <AppRoutes
          onOpenModal={() => setIsModalOpen(true)}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />
        <RealtimeToast />
      </NotificationProvider>
    );
  }

  if (isStudentRoute) {
    return (
      <AppRoutes
        onOpenModal={() => setIsModalOpen(true)}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
      />
    );
  }

  return (
    <div className="app-container">
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
      />

      <main className={isHome ? 'main-content home-layout' : 'main-content internal-layout'}>
        <AppRoutes
          onOpenModal={() => setIsModalOpen(true)}
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />
      </main>

      <Footer />
      <WhatsAppButton />
      <EligibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BranchSelectionModal isOpen={isBranchModalOpen} onClose={() => setIsBranchModalOpen(false)} />
    </div>
  );
}

export default App;
