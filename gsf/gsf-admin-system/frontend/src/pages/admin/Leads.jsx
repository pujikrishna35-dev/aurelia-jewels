import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import LeadTable from '../../components/admin/LeadTable';
import ClassificationBadge from '../../components/admin/ClassificationBadge';
import { api } from '../../lib/api';
import { useNotifications } from '../../context/NotificationContext';
import { Filter, Search, Plus, Flame, Sun, Snowflake, RefreshCw, X } from 'lucide-react';

const Leads = () => {
  const location = useLocation();
  const [leads, setLeads] = useState([]);
  const [classificationFilter, setClassificationFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('All Counselors');
  const [selectedStatus, setSelectedStatus] = useState('All Stages');
  const [savedFilters, setSavedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lastLeadEvent } = useNotifications();

  // Manual Lead Creation Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [manualError, setManualError] = useState(null);
  const [manualForm, setManualForm] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'United States',
    qualificationLevel: 'PG',
    loanAmount: '',
    admissionStatus: 'CONFIRMED',
    collateral: 'No',
    assignedEmployee: 'Unassigned'
  });

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setManualSubmitting(true);
    setManualError(null);
    try {
      const payload = {
        ...manualForm,
        loanAmount: Number(manualForm.loanAmount),
        hasCollateral: manualForm.collateral === 'Yes',
        destination: manualForm.country,
        loanType: manualForm.collateral === 'Yes' ? 'Collateral' : 'Non-Collateral'
      };

      const res = await api.createLeadManual(payload);
      if (res.success) {
        setIsModalOpen(false);
        setManualForm({
          name: '',
          phone: '',
          email: '',
          country: 'United States',
          qualificationLevel: 'PG',
          loanAmount: '',
          admissionStatus: 'CONFIRMED',
          collateral: 'No',
          assignedEmployee: 'Unassigned'
        });
        fetchLeads();
      } else {
        setManualError(res.message || 'Failed to create lead.');
      }
    } catch (err) {
      setManualError('Error sending request: ' + err.message);
    } finally {
      setManualSubmitting(false);
    }
  };

  // Load saved filters on mount
  useEffect(() => {
    const saved = localStorage.getItem('gsf_saved_filters');
    if (saved) {
      try {
        setSavedFilters(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved filters:', err);
      }
    }
  }, []);

  // Check for redirects from Dashboard charts
  useEffect(() => {
    if (location.state) {
      if (location.state.filterStatus) {
        setSelectedStatus(location.state.filterStatus);
      }
      if (location.state.filterCountry) {
        setSearchQuery(location.state.filterCountry);
      }
    }
  }, [location.state]);

  const handleSaveFilter = () => {
    const filterName = prompt('Enter a title to bookmark this filter configuration:');
    if (!filterName) return;

    const newFilter = {
      id: Date.now().toString(),
      name: filterName,
      classification: classificationFilter,
      counselor: selectedCounselor,
      status: selectedStatus,
      search: searchQuery
    };

    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('gsf_saved_filters', JSON.stringify(updated));
  };

  const applySavedFilter = (filter) => {
    setClassificationFilter(filter.classification || 'ALL');
    setSelectedCounselor(filter.counselor || 'All Counselors');
    setSelectedStatus(filter.status || 'All Stages');
    setSearchQuery(filter.search || '');
  };

  const removeSavedFilter = (id, e) => {
    e.stopPropagation();
    const updated = savedFilters.filter((f) => f.id !== id);
    setSavedFilters(updated);
    localStorage.setItem('gsf_saved_filters', JSON.stringify(updated));
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.getLeads(classificationFilter, searchQuery);
      if (res.success) {
        setLeads(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [classificationFilter, searchQuery]);

  // Real-time socket updates for leads table
  useEffect(() => {
    if (lastLeadEvent) {
      fetchLeads();
    }
  }, [lastLeadEvent]);

  const handleStatusChange = async (id, newStatus) => {
    await api.updateLead(id, { status: newStatus });
    fetchLeads();
  };

  // Client side filtering for employee assignment and status
  const filteredLeads = leads.filter((lead) => {
    if (selectedCounselor !== 'All Counselors' && lead.assignedEmployee !== selectedCounselor) {
      return false;
    }
    if (selectedStatus !== 'All Stages' && lead.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader
          title="Lead Management Registry"
          searchVal={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Top Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

              {/* Classification Tabs */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => setClassificationFilter('ALL')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    backgroundColor: classificationFilter === 'ALL' ? '#07324A' : 'transparent',
                    color: classificationFilter === 'ALL' ? '#FFFFFF' : '#64748B',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ALL INQUIRIES
                </button>
                <button
                  onClick={() => setClassificationFilter('HOT')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    backgroundColor: classificationFilter === 'HOT' ? '#DC2626' : 'transparent',
                    color: classificationFilter === 'HOT' ? '#FFFFFF' : '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Flame size={16} /> HOT
                </button>
                <button
                  onClick={() => setClassificationFilter('MEDIUM')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    backgroundColor: classificationFilter === 'MEDIUM' ? '#D97706' : 'transparent',
                    color: classificationFilter === 'MEDIUM' ? '#FFFFFF' : '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Sun size={16} /> WARM
                </button>
                <button
                  onClick={() => setClassificationFilter('COLD')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    backgroundColor: classificationFilter === 'COLD' ? '#2563EB' : 'transparent',
                    color: classificationFilter === 'COLD' ? '#FFFFFF' : '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Snowflake size={16} /> COLD
                </button>
              </div>

              {/* Counselor Filter */}
              <select
                value={selectedCounselor}
                onChange={(e) => setSelectedCounselor(e.target.value)}
                className="admin-select"
                style={{ fontWeight: 700, fontSize: '0.85rem' }}
              >
                <option value="All Counselors">All Counselors / Employees</option>
                <option value="Senior Counselor">Senior Counselor</option>
                <option value="Unassigned">Unassigned</option>
              </select>

              {/* Status Stage Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="admin-select"
                style={{ fontWeight: 700, fontSize: '0.85rem' }}
              >
                <option value="All Stages">All Lead Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Documents Pending">Documents Pending</option>
                <option value="Application Submitted">Application Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Sanctioned">Sanctioned</option>
                <option value="Disbursed">Disbursed</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              <button
                onClick={handleSaveFilter}
                style={{
                  padding: '0 12px',
                  height: '42px',
                  borderRadius: '8px',
                  border: '1.5px dashed #005C5B',
                  color: '#005C5B',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  backgroundColor: '#E6F4F3',
                  cursor: 'pointer'
                }}
              >
                + Bookmark Preset
              </button>
            </div>

            {/* Manual Creation CTA */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={fetchLeads}
                className="btn-admin-primary"
                style={{ backgroundColor: '#07324A', padding: '0 14px' }}
                title="Refresh leads"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-admin-primary"
              >
                <Plus size={18} /> Add New Student Lead
              </button>
            </div>
          </div>

          {/* Bookmarked Filter Tags */}
          {savedFilters.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>Saved Filter Presets:</span>
              {savedFilters.map((f) => (
                <span
                  key={f.id}
                  onClick={() => applySavedFilter(f)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#07324A',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  📁 {f.name}
                  <button
                    onClick={(e) => removeSavedFilter(f.id, e)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Leads Table */}
          <LeadTable leads={filteredLeads} onStatusChange={handleStatusChange} />

        </div>
      </div>

      {/* Manual Lead Creation Modal */}
      {isModalOpen && (
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
            maxWidth: '540px',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#07324A' }}>Create New Student Lead</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {manualError && (
              <div style={{ padding: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '0.84rem', marginBottom: '16px', fontWeight: 700 }}>
                ⚠️ {manualError}
              </div>
            )}

            <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Student Full Name"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="admin-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Target Country *
                  </label>
                  <select
                    value={manualForm.country}
                    onChange={(e) => setManualForm({ ...manualForm, country: e.target.value })}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Requested Loan (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2500000"
                    value={manualForm.loanAmount}
                    onChange={(e) => setManualForm({ ...manualForm, loanAmount: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Collateral Support
                  </label>
                  <select
                    value={manualForm.collateral}
                    onChange={(e) => setManualForm({ ...manualForm, collateral: e.target.value })}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="No">No Collateral (Non-Collateral)</option>
                    <option value="Yes">Yes (Property / FD / Govt Asset)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assign Counselor
                  </label>
                  <select
                    value={manualForm.assignedEmployee}
                    onChange={(e) => setManualForm({ ...manualForm, assignedEmployee: e.target.value })}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Senior Counselor">Senior Counselor</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '0 16px',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={manualSubmitting}
                  className="btn-admin-primary"
                >
                  {manualSubmitting ? 'Saving Lead...' : 'Submit & Register Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
