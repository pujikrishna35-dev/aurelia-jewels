import React from 'react';
import { X, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const RealtimeToast = () => {
  const { activeToast, dismissToast, markAsRead } = useNotifications();
  const navigate = useNavigate();

  if (!activeToast) return null;

  const handleToastClick = () => {
    markAsRead(activeToast.id);
    dismissToast();
    navigate(`/admin/leads/${activeToast.leadId}`);
  };

  const getToastAccent = (classification) => {
    switch (classification) {
      case 'HOT':
        return { border: '#E11D48', bg: '#FFF1F2', tagBg: '#FFE4E6', tagText: '#BE123C' };
      case 'MEDIUM':
        return { border: '#D97706', bg: '#FFFBEB', tagBg: '#FEF3C7', tagText: '#B45309' };
      case 'COLD':
        return { border: '#0284C7', bg: '#F0F9FF', tagBg: '#E0F2FE', tagText: '#0369A1' };
      default:
        return { border: '#005C5B', bg: '#F0FDFA', tagBg: '#CCFBF1', tagText: '#0F766E' };
    }
  };

  const accent = getToastAccent(activeToast.classification);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '340px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(7, 50, 74, 0.2), 0 2px 8px rgba(0,0,0,0.06)',
        borderLeft: `5px solid ${accent.border}`,
        borderTop: '1px solid #E2E8F0',
        borderRight: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px',
        zIndex: 9999,
        animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      {/* Header with Title and Close */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: accent.tagBg,
              color: accent.tagText,
              fontSize: '0.8rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px'
            }}
          >
            {activeToast.title}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>Just now</span>
        </div>

        <button
          onClick={dismissToast}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '4px'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Student Details */}
      <div>
        <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#07324A', margin: '0 0 4px 0' }}>
          {activeToast.studentName}
        </h4>
        <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>
          {activeToast.country} {activeToast.intake ? `• ${activeToast.intake}` : ''}
        </p>
      </div>

      {/* Action Link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
        <button
          onClick={handleToastClick}
          style={{
            backgroundColor: '#07324A',
            color: '#FFFFFF',
            border: 'none',
            padding: '7px 14px',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(7, 50, 74, 0.25)',
            transition: 'transform 0.15s ease, backgroundColor 0.15s ease'
          }}
        >
          View Lead <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default RealtimeToast;
