import React from 'react';

const CLASSIFICATION_MAP = {
  HOT: { label: 'HOT', emoji: '🔥', class: 'badge-hot' },
  MEDIUM: { label: 'MEDIUM', emoji: '🟡', class: 'badge-medium' },
  COLD: { label: 'COLD', emoji: '🔵', class: 'badge-cold' }
};

const ClassificationBadge = ({ classification }) => {
  const config = CLASSIFICATION_MAP[classification] || CLASSIFICATION_MAP.MEDIUM;

  return (
    <span className={`badge-classification ${config.class}`}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default ClassificationBadge;
