import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatsCard from '../../components/admin/StatsCard';
import LeadTable from '../../components/admin/LeadTable';
import AdminBranchMap from '../../components/admin/AdminBranchMap';
import { api } from '../../lib/api';
import {
  Users,
  Flame,
  Sun,
  Snowflake,
  Sparkles,
  CalendarClock,
  FileCheck,
  Award,
  Banknote,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, leadsRes, analyticsRes] = await Promise.all([
        api.getDashboardStats(),
        api.getLeads('ALL', ''),
        api.getAnalytics()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (leadsRes.success) setRecentLeads(leadsRes.data.slice(0, 5));
      if (analyticsRes.success) setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await api.updateLead(id, { status: newStatus });
    fetchDashboardData();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader title="Admin Dashboard Overview" />

        <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Top Row Metrics */}
          <div className="admin-stats-grid-4">
            <StatsCard
              title="Total Leads"
              value={stats?.totalLeads || 0}
              subtitle="All registered inquiries"
              icon={Users}
              color="#07324A"
              bg="#E2E8F0"
            />
            <StatsCard
              title="HOT LEADS"
              value={stats?.hotLeads || 0}
              subtitle="Urgent & Documentation Ready"
              icon={Flame}
              color="#DC2626"
              bg="#FEE2E2"
            />
            <StatsCard
              title="WARM LEADS"
              value={stats?.mediumLeads || 0}
              subtitle="Moderate intake timeline"
              icon={Sun}
              color="#D97706"
              bg="#FEF3C7"
            />
            <StatsCard
              title="COLD LEADS"
              value={stats?.coldLeads || 0}
              subtitle="Long term research"
              icon={Snowflake}
              color="#2563EB"
              bg="#DBEAFE"
            />
          </div>

          {/* Second Row Operational Metrics */}
          <div className="admin-stats-grid-5">
            <StatsCard
              title="New Inquiries"
              value={stats?.newLeads || 0}
              icon={Sparkles}
              color="#0369A1"
              bg="#E0F2FE"
            />
            <StatsCard
              title="Today's Follow-ups"
              value={stats?.todayFollowups || 0}
              icon={CalendarClock}
              color="#B45309"
              bg="#FEF3C7"
            />
            <StatsCard
              title="Applications"
              value={stats?.totalApplications || 0}
              icon={FileCheck}
              color="#4338CA"
              bg="#E0E7FF"
            />
            <StatsCard
              title="Sanctioned Loans"
              value={stats?.sanctionedLoans || 0}
              icon={Award}
              color="#15803D"
              bg="#DCFCE7"
            />
            <StatsCard
              title="Disbursed Loans"
              value={stats?.disbursedLoans || 0}
              subtitle={stats?.totalDisbursedAmount ? formatCurrency(stats.totalDisbursedAmount) : '₹0'}
              icon={Banknote}
              color="#005C5B"
              bg="#E6F4F3"
              highlightGold={true}
            />
          </div>

          {/* Real-Time Pipeline Analytics & Funnels */}
          {!loading && analytics && (
            <div className="lead-detail-main-grid">
              {/* Card 1: Pipeline Funnel Conversion */}
              <div className="admin-card">
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#07324A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={18} color="#005C5B" /> Pipeline Funnel Stages
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '16px' }}>
                  👉 Click any stage below to filter leads inside the CRM registry.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(analytics.funnel || {}).map(([stage, count], idx, arr) => {
                    const maxVal = Math.max(...arr.map(item => item[1]), 1);
                    const pct = Math.round((count / maxVal) * 100);
                    return (
                      <div 
                        key={stage} 
                        onClick={() => navigate('/admin/leads', { state: { filterStatus: stage } })}
                        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                        className="hover-card-dim"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          <span style={{ color: '#005C5B', textDecoration: 'underline' }}>{stage}</span>
                          <span>{count} leads ({pct}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ 
                            width: `${pct}%`, 
                            height: '100%', 
                            backgroundColor: stage === 'Disbursed' ? '#10B981' : stage === 'Sanctioned' ? '#005C5B' : '#0F4563',
                            borderRadius: '4px',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Loan Disbursement by Destination */}
              <div className="admin-card">
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#07324A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Banknote size={18} color="#005C5B" /> Disbursement Volume by Country
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '16px' }}>
                  👉 Click any country below to filter leads inside the CRM registry.
                </p>
                {Object.keys(analytics.disbursements || {}).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748B', fontSize: '0.86rem' }}>
                    No loans fully disbursed yet to track volumes.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {Object.entries(analytics.disbursements || {}).map(([country, amt]) => {
                      const maxDisbursed = Math.max(...Object.values(analytics.disbursements), 1);
                      const barPct = Math.round((amt / maxDisbursed) * 100);
                      const amountInLakhs = Math.round(amt / 100000);
                      return (
                        <div 
                          key={country} 
                          onClick={() => navigate('/admin/leads', { state: { filterCountry: country } })}
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                        >
                          <span style={{ width: '80px', fontSize: '0.8rem', fontWeight: 700, color: '#005C5B', textDecoration: 'underline', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {country}
                          </span>
                          <div style={{ flexGrow: 1, height: '24px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                            <div style={{
                              width: `${barPct}%`,
                              height: '100%',
                              backgroundColor: '#F4B63F',
                              transition: 'width 0.5s ease',
                              display: 'flex',
                              alignItems: 'center',
                              paddingLeft: '8px'
                            }}>
                              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#07324A' }}>
                                ₹{amountInLakhs}L
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Branch Locator Map Widget */}
          <div className="admin-card" style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#07324A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📍 Active Office Branches & Consultation Hubs
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '16px' }}>
              Real-time map visualization of all physical consultation centers across South India.
            </p>
            <AdminBranchMap />
          </div>

          {/* Recent Inquiries Table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#07324A' }}>Recent Student Submissions</h3>
              <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Showing 5 recent entries</span>
            </div>

            <LeadTable leads={recentLeads} onStatusChange={handleStatusChange} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
