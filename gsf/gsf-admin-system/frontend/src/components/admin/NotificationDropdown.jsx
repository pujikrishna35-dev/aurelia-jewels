import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, ChevronRight, Sparkles, Clock, Globe, GraduationCap } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const formatRelativeTime = (isoString) => {
  if (!isoString) return 'Just now';
  const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

const getBadgeStyle = (classification) => {
  switch (classification) {
    case 'HOT':
      return { bg: '#FEF2F2', border: '#FECACA', color: '#DC2626', icon: '🔥' };
    case 'MEDIUM':
      return { bg: '#FEFCE8', border: '#FEF08A', color: '#CA8A04', icon: '🟡' };
    case 'COLD':
      return { bg: '#EFF6FF', border: '#BFDBFE', color: '#2563EB', icon: '🔵' };
    default:
      return { bg: '#F3F4F6', border: '#E5E7EB', color: '#4B5563', icon: '⚡' };
  }
};

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, newNotifAnim } = useNotifications();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markAsRead(notif.id);
    }
    setIsOpen(false);
    navigate(`/admin/leads/${notif.leadId}`);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/admin/leads');
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Notification Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          backgroundColor: isOpen ? '#F1F5F9' : '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        title="Admin Notifications"
      >
        <Bell size={20} color={unreadCount > 0 ? '#07324A' : '#64748B'} />

        {unreadCount > 0 && (
          <span
            className={newNotifAnim ? 'notif-badge-pulse' : ''}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 800,
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 5px',
              boxShadow: '0 2px 5px rgba(225, 29, 72, 0.4)'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Card */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '52px',
            right: 0,
            width: '380px',
            maxHeight: '520px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            boxShadow: '0 12px 32px rgba(7, 50, 74, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInDown 0.2s ease-out'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#07324A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#F4B63F" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#E11D48',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}
                >
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F4B63F',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          {/* List Content */}
          <div style={{ overflowY: 'auto', flexGrow: 1, maxHeight: '400px' }}>
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#64748B'
                }}
              >
                <Bell size={32} color="#CBD5E1" style={{ marginBottom: '10px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600 }}>No notifications yet</p>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Real-time student lead activity will appear here.
                </span>
              </div>
            ) : (
              notifications.map((notif) => {
                const badge = getBadgeStyle(notif.classification);
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className="notif-item-hover"
                    style={{
                      padding: '14px 18px',
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: notif.isRead ? '#FFFFFF' : '#F0FDFA',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      position: 'relative'
                    }}
                  >
                    {!notif.isRead && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '6px',
                          top: '20px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#005C5B'
                        }}
                      />
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {badge.icon} {notif.title || 'New Lead'}
                      </span>

                      <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} /> {formatRelativeTime(notif.createdAt)}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#07324A', marginBottom: '2px' }}>
                      {notif.studentName}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {notif.country && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Globe size={12} color="#005C5B" /> {notif.country}
                        </span>
                      )}
                      {notif.intake && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <GraduationCap size={12} color="#005C5B" /> {notif.intake}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer View All Link */}
          <div
            onClick={handleViewAll}
            style={{
              padding: '12px',
              textAlign: 'center',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#005C5B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            View all leads in CRM <ChevronRight size={14} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
