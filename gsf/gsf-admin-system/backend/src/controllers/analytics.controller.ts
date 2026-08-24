import { Request, Response } from 'express';
import { leadsStore } from '../config/database';

export const getAnalyticsStats = (req: Request, res: Response) => {
  const leads = leadsStore;

  // 1. Pipeline Funnel (leads grouped by status)
  const funnel: Record<string, number> = {
    'New': 0,
    'Contacted': 0,
    'Documents Pending': 0,
    'Under Review': 0,
    'Sanctioned': 0,
    'Disbursed': 0,
    'Lost/Rejected': 0
  };

  leads.forEach((l) => {
    const status = l.status;
    if (status === 'New') funnel['New']++;
    else if (status === 'Contacted') funnel['Contacted']++;
    else if (status === 'Documents Pending') funnel['Documents Pending']++;
    else if (status === 'Under Review') funnel['Under Review']++;
    else if (status === 'Sanctioned') funnel['Sanctioned']++;
    else if (status === 'Disbursed') funnel['Disbursed']++;
    else if (status === 'Lost') funnel['Lost/Rejected']++;
    else {
      // Catch-all bucket
      funnel[status] = (funnel[status] || 0) + 1;
    }
  });

  // 2. Source Spread (leads split by acquisition channel)
  const sources: Record<string, number> = {};
  leads.forEach((l) => {
    const src = l.source || 'Website Enquiry';
    sources[src] = (sources[src] || 0) + 1;
  });

  // 3. Disbursement Volumes by Destination Country
  const disbursements: Record<string, number> = {};
  leads.forEach((l) => {
    if (l.status === 'Disbursed') {
      const country = l.country || l.destination || 'Global';
      disbursements[country] = (disbursements[country] || 0) + (l.loanAmount || 0);
    }
  });

  // If no disbursements yet, seed defaults from Rohan and Priya's profiles if they were set to Disbursed,
  // or return an empty object.
  return res.json({
    success: true,
    data: {
      funnel,
      sources,
      disbursements
    }
  });
};
