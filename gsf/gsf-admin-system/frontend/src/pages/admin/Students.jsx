import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ClassificationBadge from '../../components/admin/ClassificationBadge';
import { api } from '../../lib/api';
import { GraduationCap, Award, Banknote } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.getLeads('ALL', '');
      if (res.success) {
        setStudents(res.data);
      }
    };
    fetchStudents();
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader title="Enrolled & Active Student Directory" />

        <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Destination & University</th>
                    <th>Course & Intake</th>
                    <th>Loan Amount</th>
                    <th>Classification</th>
                    <th>Application Stage</th>
                    <th>Assigned Counselor</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div style={{ fontWeight: 800, color: '#07324A' }}>{student.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{student.email}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#005C5B' }}>{student.university || student.targetUniversity}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{student.country || student.studyDestination}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{student.course || student.courseName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{student.intake}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: '#07324A' }}>{formatCurrency(student.loanAmount)}</div>
                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{student.loanType || (student.hasCollateral ? 'Collateral' : 'Non-Collateral')}</span>
                      </td>
                      <td>
                        <ClassificationBadge classification={student.leadClassification} />
                      </td>
                      <td>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: student.status === 'Disbursed' ? '#DCFCE7' : '#E0E7FF',
                          color: student.status === 'Disbursed' ? '#15803D' : '#4338CA'
                        }}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{student.assignedEmployee || 'Unassigned'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Students;
