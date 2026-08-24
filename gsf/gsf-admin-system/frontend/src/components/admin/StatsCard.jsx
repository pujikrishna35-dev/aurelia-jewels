import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: IconComponent, color = '#005C5B', bg = '#E6F4F3', highlightGold }) => {
  return (
    <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        backgroundColor: bg,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {IconComponent && <IconComponent size={26} />}
      </div>
      <div>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</span>
        <div style={{
          fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: highlightGold ? '#D9941E' : '#07324A',
          lineHeight: 1.1
        }}>
          {value}
        </div>
        {subtitle && <span style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', display: 'block' }}>{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatsCard;
