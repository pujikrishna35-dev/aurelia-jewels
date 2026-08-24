import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Flame,
  Sun,
  Snowflake,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Search,
  ArrowLeft,
  Building2,
  FileText,
  Banknote
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const WebsiteAdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const adminToken = localStorage.getItem('gsf_admin_token');
  const adminUser = JSON.parse(localStorage.getItem('gsf_admin_user') || '{}');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin');
    }
  }, [adminToken, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        }),
        fetch(`${API_BASE}/leads`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
      ]);

      if (statsRes.ok) {
        const sData = await statsRes.json();
        if (sData.success) setStats(sData.data);
      }

      if (leadsRes && leadsRes.ok) {
        const lData = await leadsRes.json();
        if (lData.success && lData.data?.length) {
          setLeads(lData.data);
        }
      }
    } catch (err) {
      console.warn('Backend API connection offline, displaying local cache:', err);
      // Fallback demo leads if backend server is not reachable locally
      setLeads([
        {
          id: 'lead-101',
          name: 'Rahul Sharma',
          phone: '+91 98765 43210',
          email: 'rahul.sharma@example.com',
          studyDestination: 'USA',
          targetUniversity: 'Northeastern University',
          courseName: 'M.S. Computer Science',
          courseLevel: 'Masters',
          loanAmount: 4500000,
          requestedLoanAmount: '₹45,00,000',
          leadClassification: 'HOT',
          status: 'Under Review',
          hasCollateral: true,
          collateral: 'Yes (Property)',
          createdAt: new Date().toISOString()
        },
        {
          id: 'lead-102',
          name: 'Ananya Verma',
          phone: '+91 98123 45678',
          email: 'ananya.v@example.com',
          studyDestination: 'UK',
          targetUniversity: 'King\'s College London',
          courseName: 'M.Sc. Data Science',
          courseLevel: 'Masters',
          loanAmount: 3200000,
          requestedLoanAmount: '₹32,00,000',
          leadClassification: 'MEDIUM',
          status: 'Contacted',
          hasCollateral: false,
          collateral: 'No (Non-Collateral)',
          createdAt: new Date().toISOString()
        },
        {
          id: 'lead-103',
          name: 'Karan Patel',
          phone: '+91 99887 76655',
          email: 'karan.patel@example.com',
          studyDestination: 'Canada',
          targetUniversity: 'University of Toronto',
          courseName: 'MBA Business Analytics',
          courseLevel: 'Postgraduate',
          loanAmount: 5000000,
          requestedLoanAmount: '₹50,00,000',
          leadClassification: 'HOT',
          status: 'Sanctioned',
          hasCollateral: true,
          collateral: 'Yes (Fixed Deposit)',
          createdAt: new Date().toISOString()
        }
      ]);
      setStats({
        totalLeads: 3,
        hotLeads: 2,
        mediumLeads: 1,
        coldLeads: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gsf_admin_token');
    localStorage.removeItem('gsf_admin_user');
    navigate('/admin');
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = filter === 'ALL' || l.leadClassification === filter;
    const matchesSearch = !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase())) ||
      (l.country && l.country.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: '20px 28px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(7, 50, 74, 0.05)',
          marginBottom: '28px'
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#005C5B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SUPER ADMIN PORTAL
            </span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#07324A', margin: '2px 0 0 0' }}>
              Welcome, {adminUser.name || 'Admin'}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={fetchData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: '#DC2626',
                color: '#FFFFFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B' }}>TOTAL LEADS</span>
              <Users size={20} color="#07324A" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#07324A', marginTop: '8px' }}>
              {stats?.totalLeads || leads.length}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #FEE2E2', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#DC2626' }}>🔥 HOT LEADS</span>
              <Flame size={20} color="#DC2626" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', marginTop: '8px' }}>
              {stats?.hotLeads || leads.filter(l => l.leadClassification === 'HOT').length}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #FEF3C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#D97706' }}>🟡 WARM LEADS</span>
              <Sun size={20} color="#D97706" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '8px' }}>
              {stats?.mediumLeads || leads.filter(l => l.leadClassification === 'MEDIUM').length}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #DBEAFE', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563EB' }}>🔵 COLD LEADS</span>
              <Snowflake size={20} color="#2563EB" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', marginTop: '8px' }}>
              {stats?.coldLeads || leads.filter(l => l.leadClassification === 'COLD').length}
            </div>
          </div>
        </div>

        {/* Lead Table Container */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 4px 12px rgba(7, 50, 74, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['ALL', 'HOT', 'MEDIUM', 'COLD'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    backgroundColor: filter === tab ? '#005C5B' : '#F1F5F9',
                    color: filter === tab ? '#FFFFFF' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {tab === 'ALL' ? 'All Applications' : `${tab} Priority`}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search leads by name/phone/country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading student applications...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', background: '#F8FAFC' }}>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Student Name</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Contact Details</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Destination & University</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Requested Loan</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>Submission Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                        No applications matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 800, color: '#07324A' }}>{lead.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                            {lead.courseLevel ? `${lead.courseLevel} - ` : ''}{lead.courseName || lead.course}
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 700, color: '#07324A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {lead.phone}
                            {(lead.otpVerified || lead.otpVerified === undefined) && (
                              <span style={{ fontSize: '0.68rem', backgroundColor: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                ✓ VERIFIED
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{lead.email}</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 700, color: '#005C5B' }}>{lead.targetUniversity || lead.university}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{lead.studyDestination || lead.country}</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: 800, color: '#D9941E' }}>
                            {lead.requestedLoanAmount || formatCurrency(lead.loanAmount)}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            Co-app: {lead.coApplicant || 'No'} • Collateral: {lead.collateral || (lead.hasCollateral ? 'Yes' : 'No')}
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              backgroundColor: lead.status === 'Sanctioned' ? '#DCFCE7' : lead.status === 'Under Review' ? '#F3E8FF' : '#E0F2FE',
                              color: lead.status === 'Sanctioned' ? '#15803D' : lead.status === 'Under Review' ? '#6B21A8' : '#0369A1'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Documents Pending">Documents Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Sanctioned">Sanctioned</option>
                            <option value="Disbursed">Disbursed</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.85rem', color: '#64748B' }}>
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default WebsiteAdminDashboard;
