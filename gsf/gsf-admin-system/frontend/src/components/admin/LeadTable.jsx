import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClassificationBadge from './ClassificationBadge';
import StatusDropdown from './StatusDropdown';
import { Eye, ExternalLink, Calendar } from 'lucide-react';

const LeadTable = ({ leads, onStatusChange }) => {
  const navigate = useNavigate();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Contact Details</th>
              <th>Destination & University</th>
              <th>Loan Amount</th>
              <th>Classification</th>
              <th>Lead Status</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  No student leads matching current filter criteria.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: '#07324A', fontSize: '0.95rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {lead.courseLevel ? `${lead.courseLevel} - ` : ''}{lead.courseName || lead.course}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#07324A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {lead.phone}
                      {(lead.otpVerified || lead.otpVerified === undefined) && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                          ✓ VERIFIED
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{lead.email}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#005C5B' }}>{lead.targetUniversity || lead.university}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {lead.studyDestination || lead.country || lead.destination} • {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: '#07324A' }}>
                      {lead.requestedLoanAmount || formatCurrency(lead.loanAmount)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                      Co-app: {lead.coApplicant || 'No'} • Collateral: {lead.collateral || (lead.hasCollateral ? 'Yes' : 'No')}
                    </div>
                  </td>
                  <td>
                    <ClassificationBadge classification={lead.leadClassification} />
                    {lead.studentSelectedClassification !== lead.leadClassification && (
                      <span style={{ display: 'block', fontSize: '0.68rem', color: '#D97706', marginTop: '2px', fontWeight: 700 }}>
                        (Student: {lead.studentSelectedClassification})
                      </span>
                    )}
                  </td>
                  <td>
                    <StatusDropdown
                      currentStatus={lead.status}
                      onChange={(newStatus) => onStatusChange(lead.id, newStatus)}
                    />
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                      {lead.assignedEmployee || 'Unassigned'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/leads/${lead.id}`)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#E6F4F3',
                        color: '#005C5B',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
