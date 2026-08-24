import React from 'react';
import { Users, Landmark, Award, TrendingUp, Globe } from 'lucide-react';

const STATS_DATA = [
  {
    id: 'students',
    number: '20,000+',
    label: 'Students Supported',
    icon: Users,
    highlight: false
  },
  {
    id: 'partners',
    number: '50+',
    label: 'Bank & NBFC Partners',
    icon: Landmark,
    highlight: false
  },
  {
    id: 'approval',
    number: '95%',
    label: 'Approval Success Rate',
    icon: Award,
    highlight: true
  },
  {
    id: 'disbursed',
    number: '₹500 Cr+',
    label: 'Loans Disbursed',
    icon: TrendingUp,
    highlight: true
  },
  {
    id: 'countries',
    number: '20+',
    label: 'Countries Supported',
    icon: Globe,
    highlight: false
  }
];

const StatsStrip = () => {
  return (
    <section className="stats-strip-section">
      <div className="container">
        <div className="stats-strip-card">
          <div className="stats-grid">
            {STATS_DATA.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.id} className="stat-item">
                  <div className="stat-icon-wrapper">
                    <IconComponent size={22} className="stat-icon" />
                  </div>
                  <div className="stat-content">
                    <span className={`stat-number ${stat.highlight ? 'stat-number-gold' : ''}`}>
                      {stat.number}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
