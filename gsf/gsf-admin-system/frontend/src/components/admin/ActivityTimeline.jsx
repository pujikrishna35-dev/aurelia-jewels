import React from 'react';
import { History, User, Clock, FileCheck, PhoneCall, Tag } from 'lucide-react';

const ActivityTimeline = ({ activities = [] }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {activities.length === 0 ? (
        <p style={{ color: '#64748B', fontSize: '0.88rem' }}>No activity history recorded yet.</p>
      ) : (
        activities.map((act) => (
          <div key={act.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#E6F4F3',
              color: '#005C5B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 2
            }}>
              {act.actionType === 'CLASSIFICATION_CHANGED' ? <Tag size={16} /> :
               act.actionType === 'STATUS_CHANGED' ? <FileCheck size={16} /> :
               act.actionType === 'CONTACTED' ? <PhoneCall size={16} /> : <Clock size={16} />}
            </div>

            <div style={{
              flexGrow: 1,
              backgroundColor: '#F8FAFC',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, color: '#07324A', fontSize: '0.88rem' }}>{act.title}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{new Date(act.createdAt).toLocaleString()}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#334155', margin: 0 }}>{act.description}</p>
              <span style={{ fontSize: '0.72rem', color: '#005C5B', fontWeight: 700, marginTop: '4px', display: 'block' }}>
                By: {act.performedBy}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityTimeline;
