"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASSIFICATION_DETAILS = exports.LEAD_CLASSIFICATIONS = void 0;
exports.LEAD_CLASSIFICATIONS = {
    HOT: 'HOT',
    MEDIUM: 'MEDIUM',
    COLD: 'COLD'
};
exports.CLASSIFICATION_DETAILS = {
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
