import React from 'react';
import { Search, UserCheck, Shield, Menu } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const AdminHeader = ({ title, searchVal, onSearchChange }) => {
  const userJson = localStorage.getItem('gsf_admin_user');
  const user = userJson ? JSON.parse(userJson) : { name: 'Senior Finance Admin', role: 'SuperAdmin' };

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => document.body.classList.toggle('sidebar-open')}
          className="mobile-sidebar-toggle"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#07324A' }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {onSearchChange && (
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search leads, phone, uni..."
              value={searchVal || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '38px', width: '100%' }}
            />
          </div>
        )}

        {/* Real-Time Notification Bell & Dropdown */}
        <NotificationDropdown />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px', borderLeft: '1px solid #E2E8F0' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#E6F4F3',
            color: '#005C5B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800
          }}>
            <UserCheck size={20} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#07324A' }}>{user.name}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#005C5B', fontWeight: 700 }}>
              <Shield size={12} /> {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
