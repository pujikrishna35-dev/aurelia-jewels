import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import BranchMap from '../components/BranchMap';

const BranchMapSection = ({ onOpenBranchModal }) => {
  return (
    <section className="branch-section" style={{ padding: '80px 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SectionTitle
          subtitle="OUR PAN-INDIA BRANCH NETWORK"
          title="Visit Our Regional Branches & Offices"
          description="Locate GSF Global Scholar Finance branches nearest to you for in-person consultation and document submission."
        />

        <div style={{ marginTop: '40px' }}>
          <BranchMap />
        </div>
      </div>
    </section>
  );
};

export default BranchMapSection;
