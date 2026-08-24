export const LEAD_CLASSIFICATIONS = {
  HOT: 'HOT',
  MEDIUM: 'MEDIUM',
  COLD: 'COLD'
} as const;

export type LeadClassification = keyof typeof LEAD_CLASSIFICATIONS;

export const CLASSIFICATION_DETAILS = {
  HOT: {
    label: 'HOT',
    emoji: '🔥',
    badgeClass: 'badge-hot',
    color: '#EF4444',
    bg: '#FEE2E2',
    description: 'High intent, urgent intake, complete documentation readiness'
  },
  MEDIUM: {
    label: 'MEDIUM',
    emoji: '🟡',
    badgeClass: 'badge-medium',
    color: '#D97706',
    bg: '#FEF3C7',
    description: 'Moderate intent, upcoming intake, partial documents ready'
  },
  COLD: {
    label: 'COLD',
    emoji: '🔵',
    badgeClass: 'badge-cold',
    color: '#2563EB',
    bg: '#DBEAFE',
    description: 'Early research stage, long term intake'
  }
};
