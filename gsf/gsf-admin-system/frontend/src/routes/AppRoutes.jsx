import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import EducationLoans from '../pages/EducationLoans';
import StudyDestinations from '../pages/StudyDestinations';
import LoanOptions from '../pages/LoanOptions';
import Resources from '../pages/Resources';
import Contact from '../pages/Contact';
import CountryLoanPage from '../pages/CountryLoanPage';
import AdminLogin from '../pages/AdminLogin';
import Eligibility from '../pages/Eligibility';
import ApplicationSuccess from '../pages/ApplicationSuccess';

import AdminDashboard from '../pages/admin/AdminDashboard';
import Leads from '../pages/admin/Leads';
import LeadDetail from '../pages/admin/LeadDetail';
import Students from '../pages/admin/Students';
import FollowUps from '../pages/admin/FollowUps';
import Settings from '../pages/admin/Settings';

import StudentLogin from '../pages/student/StudentLogin';
import StudentDashboard from '../pages/student/StudentDashboard';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('gsf_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AppRoutes = ({ onOpenModal, onOpenBranchModal }) => {
  return (
    <Routes>
      <Route path="/" element={<Home onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/about" element={<About onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/education-loans" element={<EducationLoans onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/study-destinations" element={<StudyDestinations onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/country/:countryId" element={<CountryLoanPage onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/loan-options" element={<LoanOptions onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/resources" element={<Resources onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/contact" element={<Contact onOpenModal={onOpenModal} onOpenBranchModal={onOpenBranchModal} />} />
      <Route path="/eligibility" element={<Eligibility />} />
      <Route path="/application-success" element={<ApplicationSuccess />} />
      
      {/* Admin Panel */}
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/leads" element={<ProtectedAdminRoute><Leads /></ProtectedAdminRoute>} />
      <Route path="/admin/leads/:id" element={<ProtectedAdminRoute><LeadDetail /></ProtectedAdminRoute>} />
      <Route path="/admin/students" element={<ProtectedAdminRoute><Students /></ProtectedAdminRoute>} />
      <Route path="/admin/follow-ups" element={<ProtectedAdminRoute><FollowUps /></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} />

      {/* Aliases for top-level admin paths */}
      <Route path="/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/leads" element={<ProtectedAdminRoute><Leads /></ProtectedAdminRoute>} />
      <Route path="/leads/:id" element={<ProtectedAdminRoute><LeadDetail /></ProtectedAdminRoute>} />
      <Route path="/students" element={<ProtectedAdminRoute><Students /></ProtectedAdminRoute>} />
      <Route path="/follow-ups" element={<ProtectedAdminRoute><FollowUps /></ProtectedAdminRoute>} />
      <Route path="/settings" element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} />

      {/* Student Panel */}
      <Route path="/student" element={<Navigate to="/student/login" replace />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
