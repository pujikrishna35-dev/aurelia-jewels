import React from 'react';
import ClassificationBadge from './ClassificationBadge';
import { Calendar, Clock, User, Phone, CheckCircle2 } from 'lucide-react';

const FollowUpCard = ({ followup }) => {
  return (
    <div className="admin-card" style={{ padding: '18px 20px', borderLeft: '4px solid #005C5B' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#07324A' }}>{followup.studentName}</span>
            <ClassificationBadge classification={followup.classification} />
          </div>
          <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <Phone size={14} /> {followup.phone}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#005C5B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {followup.date}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '2px' }}>
            <Clock size={12} /> {followup.time}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', fontSize: '0.86rem', color: '#334155', marginBottom: '12px' }}>
        <strong>Notes:</strong> {followup.notes}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748B' }}>
        <span>Assigned to: <strong>{followup.assignedEmployee}</strong></span>
        <span style={{
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: followup.status === 'Completed' ? '#DCFCE7' : followup.status === 'Overdue' ? '#FEE2E2' : '#FEF3C7',
          color: followup.status === 'Completed' ? '#15803D' : followup.status === 'Overdue' ? '#B91C1C' : '#B45309',
          fontWeight: 700
        }}>
          {followup.status}
        </span>
      </div>
    </div>
  );
};

export default FollowUpCard;
