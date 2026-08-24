import React from 'react';

const STATUS_OPTIONS = [
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

const StatusDropdown = ({ currentStatus, onChange, disabled }) => {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="admin-select"
      style={{
        fontWeight: 700,
        fontSize: '0.85rem',
        cursor: 'pointer'
      }}
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default StatusDropdown;
