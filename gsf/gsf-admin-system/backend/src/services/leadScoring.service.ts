import { Lead } from '../shared/types/lead';

export class LeadScoringService {
  /**
   * Calculates a lead quality score out of 100 based on registration parameters
   * and maps it to a target stage classification (HOT, MEDIUM, COLD).
   */
  calculateScore(lead: Partial<Lead>): {
    score: number;
    classification: 'HOT' | 'MEDIUM' | 'COLD';
    breakdown: string;
  } {
    let score = 0;
    const parts: string[] = [];

    // 1. Destination Country (max 25 pts)
    const dest = (lead.country || lead.destination || '').toLowerCase().trim();
    if (dest.includes('usa') || dest.includes('united states') || dest.includes('canada')) {
      score += 25;
      parts.push('+25 Destination (USA/Canada)');
    } else if (
      dest.includes('uk') ||
      dest.includes('united kingdom') ||
      dest.includes('europe') ||
      dest.includes('germany') ||
      dest.includes('australia')
    ) {
      score += 20;
      parts.push('+20 Destination (UK/EU/AU)');
    } else if (dest && dest !== 'global') {
      score += 15;
      parts.push('+15 Destination (Other)');
    } else {
      score += 10;
      parts.push('+10 Destination (General)');
    }

    // 2. Loan Amount (max 25 pts)
    const amount = Number(lead.loanAmount || 0);
    if (amount >= 5000000) { // >=50 Lakhs
      score += 25;
      parts.push('+25 Loan Amount (>=50L)');
    } else if (amount >= 3000000) { // 30L-49.99L
      score += 20;
      parts.push('+20 Loan Amount (30L-49L)');
    } else if (amount >= 1500000) { // 15L-29.99L
      score += 15;
      parts.push('+15 Loan Amount (15L-29L)');
    } else if (amount > 0) { // <15 Lakhs
      score += 10;
      parts.push('+10 Loan Amount (<15L)');
    } else {
      score += 5;
      parts.push('+5 Loan Amount (Default)');
    }

    // 3. Collateral Availability (max 20 pts)
    const hasCollateral = lead.hasCollateral === true || String((lead as any).collateral || '').toLowerCase() === 'yes';
    if (hasCollateral) {
      score += 20;
      parts.push('+20 Collateral Present');
    } else {
      score += 10;
      parts.push('+10 Non-Collateralized');
    }

    // 4. Admission Status (max 20 pts)
    const admission = String(lead.admissionStatus || '').toUpperCase();
    if (admission === 'CONFIRMED') {
      score += 20;
      parts.push('+20 Confirmed Admission');
    } else {
      score += 10;
      parts.push('+10 Admission Pending');
    }

    // 5. Qualification Level (max 10 pts)
    const qual = String(lead.qualificationLevel || '').toUpperCase();
    if (qual === 'PG') {
      score += 10;
      parts.push('+10 PG (Postgrad)');
    } else if (qual === 'UG') {
      score += 5;
      parts.push('+5 UG (Undergrad)');
    } else {
      score += 5;
      parts.push('+5 Qualification Default');
    }

    // Map score to classification stage
    let classification: 'HOT' | 'MEDIUM' | 'COLD' = 'MEDIUM';
    if (score >= 75) {
      classification = 'HOT';
    } else if (score < 45) {
      classification = 'COLD';
    }

    return {
      score,
      classification,
      breakdown: parts.join(', ')
    };
  }
}

export const leadScoringService = new LeadScoringService();
