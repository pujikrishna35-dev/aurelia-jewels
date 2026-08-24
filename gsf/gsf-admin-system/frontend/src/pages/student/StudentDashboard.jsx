import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, CheckCircle2, Clock, FileText, Bell, User, MapPin, Building2, GraduationCap, DollarSign, Calendar, AlertCircle, AlertTriangle, FileCheck, Upload } from 'lucide-react';
import { io } from 'socket.io-client';
import './student.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE.replace('/api', '');

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liveSyncToast, setLiveSyncToast] = useState('');

  const token = localStorage.getItem('gsf_student_token');

  const fetchStudentData = useCallback(async () => {
    if (!token) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const [profRes, appRes, statusRes, updRes, notifRes, docRes] = await Promise.all([
        fetch(`${API_BASE}/student/profile`, { headers }),
        fetch(`${API_BASE}/student/application`, { headers }),
        fetch(`${API_BASE}/student/application/status`, { headers }),
        fetch(`${API_BASE}/student/updates`, { headers }),
        fetch(`${API_BASE}/student/notifications`, { headers }),
        fetch(`${API_BASE}/student/documents`, { headers })
      ]);

      if (profRes.status === 401 || profRes.status === 403) {
        localStorage.removeItem('gsf_student_token');
        navigate('/student/login');
        return;
      }

      const profData = await profRes.json();
      const appData = await appRes.json();
      const statusData = await statusRes.json();
      const updData = await updRes.json();
      const notifData = await notifRes.json();
      const docData = await docRes.json();

      if (profData.success) setProfile(profData.data);
      if (appData.success) setApplication(appData.data);
      if (statusData.success) setStatus(statusData.data);
      if (updData.success) setUpdates(updData.data);
      if (notifData.success) setNotifications(notifData.data);
      if (docData.success) setDocuments(docData.data);

    } catch (err) {
      setError('Unable to load application details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // Initial Data Fetch & Real-Time Socket.IO Listener Setup
  useEffect(() => {
    if (!token) {
      navigate('/student/login');
      return;
    }

    fetchStudentData();

    // Initialize Socket.IO connection for real-time admin sync
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Connected to GSF Real-Time Update Stream');
    });

    socket.on('student_update', (data) => {
      // Re-fetch student data instantly on any admin update
      fetchStudentData();
      setLiveSyncToast('⚡ Live update received from GSF Admin Team!');
      setTimeout(() => setLiveSyncToast(''), 4000);
    });

    return () => {
      socket.disconnect();
    };
  }, [token, fetchStudentData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gsf_student_token');
    localStorage.removeItem('gsf_student_info');
    navigate('/student/login');
  };

  if (loading) {
    return (
      <div className="student-loading-screen">
        <div className="student-spinner"></div>
        <p>Loading your secure student portal...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="student-error-screen">
        <AlertCircle size={40} color="#DC2626" />
        <h2>Application Unavailable</h2>
        <p>{error || 'No application was found for this student account.'}</p>
        <button onClick={handleLogout} className="student-btn-primary">Return to Login</button>
      </div>
    );
  }

  // Format currency
  const formattedLoanAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(application.loanAmount);

  // Dynamic Timeline Progress Calculation (5 Stages: 0, 1, 2, 3, 4)
  const getTimelineStageIndex = (appStat, loanStat) => {
    if (loanStat === 'DISBURSED' || appStat === 'COMPLETED') return 4;
    if (loanStat === 'SANCTIONED') return 3;
    if (appStat === 'UNDER_REVIEW' || appStat === 'APPROVED') return 2;
    if (appStat === 'DOCUMENTS_VERIFIED' || appStat === 'DOCUMENTS_PENDING') return 1;
    return 0; // SUBMITTED
  };

  const currentStageIndex = getTimelineStageIndex(application.applicationStatus, application.loanStatus);

  const getTimelineSteps = () => {
    const stages = [
      { title: 'Application Submitted' },
      { title: 'Documents Verification' },
      { title: 'Application Under Review' },
      { title: 'Loan Sanction' },
      { title: 'Loan Disbursement' }
    ];

    return stages.map((stage, idx) => {
      let state = 'pending';
      if (idx < currentStageIndex) {
        state = 'completed';
      } else if (idx === currentStageIndex) {
        state = (currentStageIndex === 4 && (application.loanStatus === 'DISBURSED' || application.applicationStatus === 'COMPLETED'))
          ? 'completed'
          : 'current';
      }

      let dateLabel = 'Pending';
      if (idx === 0) {
        dateLabel = new Date(application.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } else if (idx === 1 && currentStageIndex >= 1) {
        dateLabel = currentStageIndex > 1 ? 'Verified' : 'In Progress';
      } else if (idx === 2 && currentStageIndex >= 2) {
        dateLabel = currentStageIndex > 2 ? 'Completed' : 'Under Review';
      } else if (idx === 3 && currentStageIndex >= 3) {
        dateLabel = currentStageIndex > 3 ? 'Sanctioned' : 'Sanctioned';
      } else if (idx === 4 && currentStageIndex === 4) {
        dateLabel = 'Disbursed';
      }

      return {
        title: stage.title,
        date: dateLabel,
        state
      };
    });
  };

  const timelineSteps = getTimelineSteps();
  const latestUpdate = updates.length > 0 ? updates[0] : null;

  return (
    <div className="student-dashboard-layout">
      {/* Real-time Socket Notification Toast */}
      {liveSyncToast && (
        <div className="student-live-toast">
          {liveSyncToast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="student-header">
        <div className="student-header-inner">
          <div className="student-logo">
            <img src="/images/logo/gsf-logo.png" alt="GSF Global Scholar Finance" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
            <span className="student-logo-text" style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, borderLeft: '1px solid #CBD5E1', paddingLeft: '10px', marginLeft: '4px' }}>Student Portal</span>
          </div>

          <div className="student-user-meta">
            <div className="student-app-badge">
              ID: {application.applicationId}
            </div>
            <button onClick={handleLogout} className="student-logout-btn" title="Logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="student-main-content">
        <div className="student-welcome-banner">
          <div>
            <h1><span className="student-name-highlight">Welcome, {application.fullName}</span> 👋</h1>
            <p>Track your study abroad loan progress and application milestones</p>
          </div>
          <div className="student-id-pill">
            Application ID: {application.applicationId}
          </div>
        </div>

        {/* Latest Admin Update Highlight Banner */}
        {latestUpdate && (
          <div className="student-card latest-update-banner">
            <div className="latest-update-header">
              <span className="update-tag">LATEST UPDATE</span>
              <span className="update-time">{latestUpdate.date}</span>
            </div>
            <h3>{latestUpdate.title}</h3>
            <p>{latestUpdate.description}</p>
          </div>
        )}

        {/* Status Overview Cards (Separate Application Status & Loan Status) */}
        <div className="student-status-grid">
          {/* Card 1: Application Status */}
          <div className="student-card status-card">
            <div className="status-card-header">
              <FileText size={20} color="#005C5B" />
              <span>Application Status</span>
            </div>
            <div className="status-pill app-status">
              {status?.applicationStatusLabel || `🟡 ${application.applicationStatus}`}
            </div>
            <p className="status-meta">Synced live from Super Admin Panel</p>
          </div>

          {/* Card 2: Loan Status */}
          <div className="student-card status-card">
            <div className="status-card-header">
              <DollarSign size={20} color="#005C5B" />
              <span>Loan Status</span>
            </div>
            <div className="status-pill loan-status">
              {status?.loanStatusLabel || `🟡 ${application.loanStatus}`}
            </div>
            <p className="status-meta">Finance Partner Sanction Stage</p>
          </div>
        </div>

        {/* Documents Verification & Requirements Card */}
        <div className="student-card">
          <h2 className="section-title">
            <FileCheck size={20} color="#005C5B" /> Documents & Verification Checklist
          </h2>

          {documents.length > 0 ? (
            <div className="student-docs-grid">
              {documents.map((doc) => (
                <div key={doc.id} className={`student-doc-item ${doc.status.toLowerCase()}`}>
                  <div className="doc-info">
                    {doc.status === 'VERIFIED' && <CheckCircle2 size={18} color="#15803D" />}
                    {doc.status === 'PENDING' && <Clock size={18} color="#D97706" />}
                    {doc.status === 'ACTION_REQUIRED' && <AlertTriangle size={18} color="#DC2626" />}
                    <div>
                      <h4 className="doc-name">{doc.documentName}</h4>
                      <span className="doc-status-text">
                        {doc.status === 'VERIFIED' && '✓ Verified'}
                        {doc.status === 'PENDING' && '🟡 Pending Review'}
                        {doc.status === 'ACTION_REQUIRED' && '⚠ Action Required'}
                      </span>
                    </div>
                  </div>

                  {doc.status === 'ACTION_REQUIRED' && (
                    <button className="doc-action-btn" title="Upload document">
                      <Upload size={14} /> Upload File
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="student-docs-grid">
              <div className="student-doc-item verified">
                <div className="doc-info">
                  <CheckCircle2 size={18} color="#15803D" />
                  <div>
                    <h4 className="doc-name">Admission Offer Letter</h4>
                    <span className="doc-status-text">✓ Verified</span>
                  </div>
                </div>
              </div>
              <div className="student-doc-item verified">
                <div className="doc-info">
                  <CheckCircle2 size={18} color="#15803D" />
                  <div>
                    <h4 className="doc-name">Academic Marksheets & Certificates</h4>
                    <span className="doc-status-text">✓ Verified</span>
                  </div>
                </div>
              </div>
              <div className="student-doc-item action_required">
                <div className="doc-info">
                  <AlertTriangle size={18} color="#DC2626" />
                  <div>
                    <h4 className="doc-name">Income Proof & IT Returns</h4>
                    <span className="doc-status-text">⚠ Action Required</span>
                  </div>
                </div>
                <button className="doc-action-btn">
                  <Upload size={14} /> Upload File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Application Visual Timeline */}
        <div className="student-card">
          <h2 className="section-title">
            <Clock size={20} color="#005C5B" /> Application Progress Timeline
          </h2>

          <div className="student-timeline">
            {/* Background Inactive Line (Starts at center of 1st circle, ends at center of 5th circle) */}
            <div className="timeline-track-bg" />

            {/* Dynamic Active Progress Fill Line */}
            <div
              className="timeline-track-fill"
              style={{ width: `calc(80% * (${currentStageIndex} / 4))` }}
            />

            {timelineSteps.map((step, index) => (
              <div key={index} className={`timeline-item ${step.state}`}>
                <div className="timeline-icon-node">
                  {step.state === 'completed' && <CheckCircle2 size={20} color="#005C5B" />}
                  {step.state === 'current' && <div className="current-pulse-dot" />}
                  {step.state === 'pending' && <div className="pending-circle-dot" />}
                </div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <span className="timeline-date">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Application Details Grid */}
        <div className="student-card">
          <h2 className="section-title">
            <GraduationCap size={20} color="#005C5B" /> My Application Details
          </h2>

          <div className="student-details-grid">
            <div className="detail-item">
              <label>Full Name</label>
              <span>{application.fullName}</span>
            </div>

            <div className="detail-item">
              <label>Email Address</label>
              <span>{application.email}</span>
            </div>

            <div className="detail-item">
              <label>Registered Mobile</label>
              <span>{application.mobile}</span>
            </div>

            <div className="detail-item">
              <label>Application ID</label>
              <span className="highlight-text">{application.applicationId}</span>
            </div>

            <div className="detail-item">
              <label>Destination Country</label>
              <span>{application.country}</span>
            </div>

            <div className="detail-item">
              <label>University / College</label>
              <span>{application.university}</span>
            </div>

            <div className="detail-item">
              <label>Course Name</label>
              <span>{application.course}</span>
            </div>

            <div className="detail-item">
              <label>Qualification Level</label>
              <span><span className="badge-tag">{application.qualificationLevel}</span></span>
            </div>

            <div className="detail-item">
              <label>Planning Intake</label>
              <span>{application.intake}</span>
            </div>

            <div className="detail-item">
              <label>Admission Status</label>
              <span>
                <span className={`badge-tag ${application.admissionStatus === 'CONFIRMED' ? 'green' : 'amber'}`}>
                  {application.admissionStatus}
                </span>
              </span>
            </div>

            <div className="detail-item">
              <label>Loan Amount Required</label>
              <span className="loan-amount-text">{formattedLoanAmount}</span>
            </div>

            <div className="detail-item full-width">
              <label>Residence Address</label>
              <span><MapPin size={14} color="#64748B" style={{ display: 'inline', marginRight: '4px' }} />{application.address}</span>
            </div>
          </div>
        </div>

        {/* Grid Container for Updates & Notifications */}
        <div className="student-two-col-grid">
          {/* Recent Updates */}
          <div className="student-card">
            <h2 className="section-title">
              <Clock size={20} color="#005C5B" /> Application History & Updates
            </h2>

            {updates.length > 0 ? (
              <div className="updates-list">
                {updates.map((item) => (
                  <div key={item.id} className="update-entry">
                    <span className="update-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">No recent updates available at this time.</p>
            )}
          </div>

          {/* Student Notifications */}
          <div className="student-card">
            <h2 className="section-title">
              <Bell size={20} color="#005C5B" /> Important Notifications
            </h2>

            {notifications.length > 0 ? (
              <div className="notifications-list">
                {notifications.map((item) => (
                  <div key={item.id} className="notification-item-card">
                    <h3>{item.title}</h3>
                    <p>{item.message}</p>
                    <span className="notif-time">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">No notifications received.</p>
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="student-footer">
        <p>© 2026 GSF Global Scholar Finance — Empowering Global Education Ambitions</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
