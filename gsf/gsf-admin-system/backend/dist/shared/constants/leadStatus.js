"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_COLORS = exports.LEAD_STATUSES = void 0;
exports.LEAD_STATUSES = [
    'New',
    'Contacted',
    'Follow-up',
    'Documents Pending',
    'Application Submitted',
    'Under Review',
    'Sanctioned',
    'Disbursed',
    'Converted',
    'Lost'
];
exports.STATUS_COLORS = {
    'New': { bg: '#E0F2FE', color: '#0369A1' },
    'Contacted': { bg: '#F1F5F9', color: '#334155' },
    'Follow-up': { bg: '#FEF3C7', color: '#B45309' },
    'Documents Pending': { bg: '#FFEDD5', color: '#C2410C' },
    'Application Submitted': { bg: '#E0E7FF', color: '#4338CA' },
    'Under Review': { bg: '#F3E8FF', color: '#6B21A8' },
    'Sanctioned': { bg: '#DCFCE7', color: '#15803D' },
    'Disbursed': { bg: '#D1FAE5', color: '#047857' },
    'Converted': { bg: '#CCFBF1', color: '#0F766E' },
    'Lost': { bg: '#FEE2E2', color: '#B91C1C' }
};
