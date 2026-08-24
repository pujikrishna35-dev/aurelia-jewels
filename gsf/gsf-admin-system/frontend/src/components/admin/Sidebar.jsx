import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CalendarClock, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on path change
  useEffect(() => {
    document.body.classList.remove('sidebar-open');
  }, [location.pathname]);

  // Close sidebar on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (document.body.classList.contains('sidebar-open')) {
        const aside = document.querySelector('aside');
        const toggleBtn = document.querySelector('.mobile-sidebar-toggle');
        if (aside && !aside.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
          document.body.classList.remove('sidebar-open');
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gsf_admin_token');
    localStorage.removeItem('gsf_admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/leads', label: 'Lead Management', icon: Users },
    { path: '/admin/students', label: 'Student Directory', icon: GraduationCap },
    { path: '/admin/follow-ups', label: 'Follow-ups', icon: CalendarClock },
    { path: '/admin/settings', label: 'Settings & Config', icon: Settings },
  ];

  return (
    <aside className="admin-sidebar">
      <div>
        {/* Brand Header */}
        <div style={{ 
          padding: '24px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '12px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/logo/gsf-logo.png" 
              alt="GSF Global Scholar Finance" 
              style={{ 
                height: '40px', 
                width: 'auto',
                objectFit: 'contain',
                backgroundColor: '#FFFFFF',
                padding: '4px 8px',
                borderRadius: '8px'
              }} 
            />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>GSF Admin</h3>
              <span style={{ fontSize: '0.72rem', color: '#F4B63F', fontWeight: 700, letterSpacing: '0.5px' }}>CRM & API SYSTEM</span>
            </div>
          </div>

          <button 
            onClick={() => document.body.classList.remove('sidebar-open')}
            className="mobile-sidebar-close"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: isActive ? '#005C5B' : 'transparent',
                  transition: 'all 0.2s ease'
                })}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            color: '#FCA5A5',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none'
          }}
        >
          <LogOut size={18} />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
