import React from 'react';

const SectionTitle = ({ subtitle, title, description, align = 'center' }) => {
  return (
    <div className="section-header" style={{ textAlign: align }}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
};

export default SectionTitle;
