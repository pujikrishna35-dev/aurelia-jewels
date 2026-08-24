import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ClassificationBadge from '../../components/admin/ClassificationBadge';
import StatusDropdown from '../../components/admin/StatusDropdown';
import ActivityTimeline from '../../components/admin/ActivityTimeline';
import { api } from '../../lib/api';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  Landmark, 
  Calendar, 
  Banknote, 
  FileText, 
  Plus, 
  Clock, 
  AlertTriangle,
  Send
} from 'lucide-react';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followupDate, setFollowupDate] = useState('');
  const [followupTime, setFollowupTime] = useState('11:00 AM');
  const [followupNotes, setFollowupNotes] = useState('');

  // Student Broadcast & Document Management State
  const [studentMessage, setStudentMessage] = useState('');
  const [visibleToStudent, setVisibleToStudent] = useState(true);
  const [studentMsgSent, setStudentMsgSent] = useState(false);

  const [selectedDocName, setSelectedDocName] = useState('Admission Letter');
  const [selectedDocStatus, setSelectedDocStatus] = useState('VERIFIED');
  const [docVisibleToStudent, setDocVisibleToStudent] = useState(true);
  const [docMsgSent, setDocMsgSent] = useState(false);

  const fetchLeadDetails = async () => {
    try {
      const res = await api.getLeadById(id);
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch lead detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendStudentUpdate = async (e) => {
    e.preventDefault();
    if (!studentMessage) return;
    const res = await api.postStudentUpdate(id, studentMessage, visibleToStudent);
    if (res.success) {
      setStudentMessage('');
      setStudentMsgSent(true);
      setTimeout(() => setStudentMsgSent(false), 3000);
      fetchLeadDetails();
    }
  };

  const handleUpdateStudentDoc = async (e) => {
    e.preventDefault();
    const res = await api.updateStudentDocument(id, selectedDocName, selectedDocStatus, docVisibleToStudent);
    if (res.success) {
      setDocMsgSent(true);
      setTimeout(() => setDocMsgSent(false), 3000);
      fetchLeadDetails();
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const handleClassificationChange = async (newClassification) => {
    const res = await api.updateLead(id, { leadClassification: newClassification });
    if (res.success) fetchLeadDetails();
  };

  const handleStatusChange = async (newStatus) => {
    const res = await api.updateLead(id, { status: newStatus });
    if (res.success) fetchLeadDetails();
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText) return;
    const res = await api.addNote(id, noteText);
    if (res.success) {
      setNoteText('');
      fetchLeadDetails();
    }
  };

  const handleScheduleFollowUp = async (e) => {
    e.preventDefault();
    if (!followupDate) return;
    const res = await api.addFollowUp(id, {
      date: followupDate,
      time: followupTime,
      notes: followupNotes
    });
    if (res.success) {
      setShowFollowUpModal(false);
      setFollowupNotes('');
      fetchLeadDetails();
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <AdminHeader title="Lead Details Loading..." />
          <div className="admin-content" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#005C5B', fontWeight: 700 }}>Loading inquiry details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <AdminHeader title="Lead Not Found" />
          <div className="admin-content" style={{ textAlign: 'center', padding: '60px' }}>
            <AlertTriangle size={48} color="#DC2626" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#07324A', marginBottom: '8px' }}>Lead Record Not Found</h3>
            <p style={{ color: '#64748B', marginBottom: '20px' }}>The requested student inquiry does not exist in the database.</p>
            <button onClick={() => navigate('/admin/leads')} className="btn-admin-primary">
              <ArrowLeft size={16} /> Return to Lead Registry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader title={`Lead Profile: ${lead.name}`} />

        <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Top Bar with Back Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={() => navigate('/admin/leads')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#07324A',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: 'none',
                background: 'none'
              }}
            >
              <ArrowLeft size={18} /> Back to Lead Registry
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setShowFollowUpModal(true)}
                className="btn-admin-primary"
                style={{ backgroundColor: '#07324A' }}
              >
                <Clock size={16} /> Schedule Follow-up
              </button>
            </div>
          </div>

          {/* Main 2-Column Detail Layout */}
          <div className="lead-detail-main-grid">

            {/* Left Main Column: Detailed Student Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Student Overview Card */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#07324A', marginBottom: '4px' }}>
                      {lead.name}
                    </h2>
                    <span style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>
                      Lead ID: #{lead.id} • Submitted: {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ClassificationBadge classification={lead.leadClassification} />
                  </div>
                </div>

                <div className="info-grid-4col" style={{ backgroundColor: '#F8FAFC', padding: '18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '2px' }}>PHONE</span>
                    <strong style={{ color: '#07324A', fontSize: '0.9rem' }}>{lead.phone}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '2px' }}>EMAIL</span>
                    <strong style={{ color: '#07324A', fontSize: '0.9rem' }}>{lead.email}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '2px' }}>DESTINATION</span>
                    <strong style={{ color: '#005C5B', fontSize: '0.9rem' }}>{lead.studyDestination || lead.country || lead.destination}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '2px' }}>REQUESTED LOAN</span>
                    <strong style={{ color: '#07324A', fontSize: '0.95rem', fontWeight: 800 }}>{lead.requestedLoanAmount || `₹${lead.loanAmount}`}</strong>
                  </div>
                </div>
              </div>

              {/* Academic & Loan Inquiries Information */}
              <div className="admin-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#07324A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} color="#005C5B" /> Academic & Loan Application Profile
                </h3>

                <div className="info-grid-3col">
                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>TARGET UNIVERSITY</span>
                    <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.92rem' }}>{lead.targetUniversity || lead.university || 'N/A'}</span>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>COURSE & INTAKE</span>
                    <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.92rem' }}>{lead.courseName || lead.course || 'N/A'} ({lead.intake || 'N/A'})</span>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>QUALIFICATION</span>
                    <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.92rem' }}>{lead.courseLevel || lead.qualificationLevel || 'PG'}</span>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>CO-APPLICANT</span>
                    <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.92rem' }}>{lead.coApplicant || 'Parents'}</span>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>COLLATERAL SUPPORT</span>
                    <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.92rem' }}>{lead.collateral || (lead.hasCollateral ? 'Yes' : 'No')}</span>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, display: 'block' }}>ASSIGNED COUNSELOR</span>
                    <span style={{ fontWeight: 800, color: '#005C5B', fontSize: '0.92rem' }}>{lead.assignedEmployee || 'Unassigned'}</span>
                  </div>
                </div>
              </div>

              {/* Student Portal Broadcast & Message Communication */}
              <div className="admin-card" style={{ borderLeft: '4px solid #005C5B' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#07324A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={18} color="#005C5B" /> Broadcast Message to Student Dashboard
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '14px' }}>
                  Post updates directly to this student's personal portal feed.
                </p>

                {studentMsgSent && (
                  <div style={{ padding: '10px', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
                    ✓ Message broadcasted successfully to student portal!
                  </div>
                )}

                <form onSubmit={handleSendStudentUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <textarea
                    rows={3}
                    placeholder="e.g. Your HDFC Credila loan application has been approved! Sanction letter generated."
                    value={studentMessage}
                    onChange={(e) => setStudentMessage(e.target.value)}
                    className="admin-input"
                    style={{ height: 'auto', padding: '10px' }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={visibleToStudent}
                        onChange={(e) => setVisibleToStudent(e.target.checked)}
                      />
                      Visible on Student Dashboard
                    </label>

                    <button type="submit" className="btn-admin-primary" style={{ height: '36px', fontSize: '0.82rem' }}>
                      <Send size={14} /> Send Broadcast
                    </button>
                  </div>
                </form>
              </div>

              {/* Student Document Status Verification Manager */}
              <div className="admin-card" style={{ borderLeft: '4px solid #F4B63F' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#07324A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="#D9941E" /> Verify & Update Student Document Status
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '14px' }}>
                  Set document verification status visible on the student application checklist.
                </p>

                {docMsgSent && (
                  <div style={{ padding: '10px', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
                    ✓ Document verification state updated on student portal!
                  </div>
                )}

                <form onSubmit={handleUpdateStudentDoc} className="info-grid-3col" style={{ alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Document Name
                    </label>
                    <select
                      value={selectedDocName}
                      onChange={(e) => setSelectedDocName(e.target.value)}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      <option value="Admission Letter">Admission Offer Letter</option>
                      <option value="Academic Transcripts">Academic Transcripts / Marksheet</option>
                      <option value="Passport Copy">Passport Copy</option>
                      <option value="PAN Card">PAN Card (Student & Co-app)</option>
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="Bank Statement">6 Months Bank Statement</option>
                      <option value="Income Tax Return">2 Years Income Tax Returns</option>
                      <option value="Property Documents">Property / Collateral Documents</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Verification Status
                    </label>
                    <select
                      value={selectedDocStatus}
                      onChange={(e) => setSelectedDocStatus(e.target.value)}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      <option value="VERIFIED">✓ VERIFIED & APPROVED</option>
                      <option value="PENDING">⏳ PENDING VERIFICATION</option>
                      <option value="REJECTED">❌ REJECTED / RESUBMIT</option>
                    </select>
                  </div>

                  <div>
                    <button type="submit" className="btn-admin-primary" style={{ width: '100%', height: '42px', fontSize: '0.84rem' }}>
                      Update Verification Status
                    </button>
                  </div>
                </form>
              </div>

              {/* Activity Audit Timeline */}
              <div className="admin-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#07324A', marginBottom: '16px' }}>
                  Activity Audit & Change Log
                </h3>
                <ActivityTimeline activities={lead.activities || []} />
              </div>

            </div>

            {/* Right Column: Controls & Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Stage & Classification Control Card */}
              <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#07324A', marginBottom: '16px' }}>
                  CRM Lead Controls
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>
                      CHANGE LEAD STAGE
                    </label>
                    <StatusDropdown
                      currentStatus={lead.status}
                      onChange={handleStatusChange}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>
                      RE-CLASSIFY LEAD (HEAT SCORE)
                    </label>
                    <select
                      value={lead.leadClassification}
                      onChange={(e) => handleClassificationChange(e.target.value)}
                      className="admin-select"
                      style={{ width: '100%', fontWeight: 700 }}
                    >
                      <option value="HOT">🔥 HOT (Urgent Intake)</option>
                      <option value="MEDIUM">🟡 WARM (Moderate Timeline)</option>
                      <option value="COLD">🔵 COLD (Research Phase)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div className="admin-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#07324A', marginBottom: '14px' }}>
                  Internal Counselor Notes
                </h3>

                <form onSubmit={handleAddNote} style={{ marginBottom: '16px' }}>
                  <textarea
                    rows={3}
                    placeholder="Type internal remarks..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="admin-input"
                    style={{ height: 'auto', padding: '10px', width: '100%', marginBottom: '8px' }}
                  />
                  <button type="submit" className="btn-admin-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} /> Add Remark
                  </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                  {(!lead.notes || lead.notes.length === 0) ? (
                    <span style={{ fontSize: '0.82rem', color: '#64748B' }}>No counselor notes added yet.</span>
                  ) : (
                    lead.notes.map((n) => (
                      <div key={n.id} style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <p style={{ fontSize: '0.84rem', color: '#334155', margin: '0 0 4px 0' }}>{n.note}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                          <span>By: {n.author}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Follow-Up Schedule Modal */}
      {showFollowUpModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(7, 50, 74, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#07324A', marginBottom: '16px' }}>
              Schedule Student Follow-up
            </h3>

            <form onSubmit={handleScheduleFollowUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Follow-up Date *
                </label>
                <input
                  type="date"
                  required
                  value={followupDate}
                  onChange={(e) => setFollowupDate(e.target.value)}
                  className="admin-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11:30 AM"
                  value={followupTime}
                  onChange={(e) => setFollowupTime(e.target.value)}
                  className="admin-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Follow-up Notes / Goal
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Call student regarding co-applicant IT Return submission"
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  className="admin-input"
                  style={{ height: 'auto', padding: '10px', width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowFollowUpModal(false)}
                  style={{ padding: '0 16px', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary" style={{ height: '40px' }}>
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetail;
