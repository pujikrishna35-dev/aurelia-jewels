import { leadsStore, studentsStore, applicationsStore, studentUpdatesStore, studentNotificationsStore, studentDocumentsStore, saveDatabase, StudentAccount, StudentLoanApplication, StudentUpdateItem, StudentNotificationItem, StudentDocumentItem } from '../config/database';
import { Lead, LeadActivity, FollowUpItem, DashboardStats } from '../shared/types/lead';
import { LeadClassification } from '../shared/constants/leadClassification';
import { LeadStatus } from '../shared/constants/leadStatus';
import { notificationService } from './notification.service';
import { leadScoringService } from './leadScoring.service';
import { outboundNotificationService } from './outboundNotification.service';

export class LeadService {
  getAllLeads(classificationFilter?: string, searchQuery?: string): Lead[] {
    let result = [...leadsStore];

    if (classificationFilter && classificationFilter !== 'ALL') {
      result = result.filter(l => l.leadClassification === classificationFilter);
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.university.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getLeadById(id: string): Lead | null {
    const lead = leadsStore.find(l => l.id === id);
    return lead || null;
  }

  createLead(data: Partial<Lead>): Lead {
    const newId = `lead-${Date.now()}`;
    
    // Auto-calculate Lead Score and Classification stage
    const scoring = leadScoringService.calculateScore(data);
    const classification = scoring.classification as LeadClassification;

    const newLead: Lead = {
      id: newId,
      name: data.name || 'Anonymous Student',
      phone: data.phone || '',
      email: data.email || '',
      destination: data.destination || 'Global',
      country: data.country || data.destination || 'Global',
      university: data.university || 'Target Institute',
      course: data.course || 'Higher Education',
      intake: data.intake || 'Upcoming Intake',
      loanAmount: Number(data.loanAmount) || 2500000,
      loanType: data.loanType || 'Non-Collateral',
      hasCollateral: Boolean(data.hasCollateral),
      studentSelectedClassification: (data.studentSelectedClassification || 'MEDIUM') as LeadClassification,
      leadClassification: classification,
      leadScore: scoring.score,
      leadScoreBreakdown: scoring.breakdown,
      status: 'New',
      source: data.source || 'Website Submission',
      campaign: data.campaign || 'Direct',
      assignedEmployee: 'Unassigned',
      otpVerified: Boolean(data.otpVerified),
      qualificationLevel: data.qualificationLevel || 'PG',
      admissionStatus: data.admissionStatus || 'CONFIRMED',
      addressLine1: data.addressLine1 || '',
      addressLine2: data.addressLine2 || '',
      city: data.city || '',
      state: data.state || '',
      pincode: data.pincode || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activities: [
        {
          id: `act-${Date.now()}`,
          leadId: newId,
          actionType: 'CREATED',
          title: 'Lead & Application Registered',
          description: `Student verified OTP and submitted loan request.`,
          performedBy: 'Student (Website API)',
          createdAt: new Date().toISOString()
        },
        {
          id: `act-${Date.now() + 1}`,
          leadId: newId,
          actionType: 'CLASSIFICATION_CHANGED',
          title: 'Automated Lead Scoring',
          description: `Auto-scored ${scoring.score}/100 and classified as ${classification}. Breakdown: ${scoring.breakdown}`,
          performedBy: 'System (Scoring Engine)',
          createdAt: new Date().toISOString()
        }
      ],
      followUps: []
    };

    leadsStore.unshift(newLead);

    // Formatted Application ID (e.g. GSF-2026-00125)
    const appIdNumber = Math.floor(10000 + Math.random() * 90000);
    const applicationId = `GSF-2026-${appIdNumber}`;

    // 1. Check or Create Student Account
    let existingStudent = studentsStore.find(s => s.mobile === newLead.phone);
    let studentId = existingStudent ? existingStudent.studentId : `student-${Date.now()}`;

    if (!existingStudent) {
      const studentAccount: StudentAccount = {
        studentId,
        fullName: newLead.name,
        email: newLead.email,
        mobile: newLead.phone,
        applicationId,
        isActive: true,
        isPasswordSet: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      studentsStore.unshift(studentAccount);
    }

    // Full Address formatting
    const fullAddress = [newLead.addressLine1, newLead.addressLine2, newLead.city, newLead.state, newLead.pincode]
      .filter(Boolean)
      .join(', ') || 'Address Provided in Application';

    // 2. Automatically Create & Link Student Loan Application
    const loanApp: StudentLoanApplication = {
      applicationId,
      studentId,
      leadId: newId,
      fullName: newLead.name,
      email: newLead.email,
      mobile: newLead.phone,
      country: newLead.country,
      university: newLead.university,
      course: newLead.course,
      qualificationLevel: newLead.qualificationLevel || 'PG',
      intake: newLead.intake,
      admissionStatus: newLead.admissionStatus || 'CONFIRMED',
      loanAmount: newLead.loanAmount,
      address: fullAddress,
      applicationStatus: 'SUBMITTED',
      loanStatus: 'PROCESSING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    applicationsStore.unshift(loanApp);

    // Initial Student Timeline Update & Notification
    const initialUpdate: StudentUpdateItem = {
      id: `supd-${Date.now()}`,
      applicationId,
      studentId,
      date: new Date().toISOString().split('T')[0],
      title: 'Application Submitted',
      description: `Your education loan application (${applicationId}) for ${newLead.country} was successfully submitted.`,
      createdAt: new Date().toISOString()
    };
    studentUpdatesStore.unshift(initialUpdate);

    const initialNotif: StudentNotificationItem = {
      id: `snotif-${Date.now()}`,
      applicationId,
      studentId,
      title: '🔔 Application Submitted',
      message: `Your education loan application (${applicationId}) has been successfully submitted!`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    studentNotificationsStore.unshift(initialNotif);

    // 3. Trigger Outbound SMS, WhatsApp, and Email Notifications
    const welcomeMsg = `Hello ${newLead.name}, your GSF education loan application (${applicationId}) has been successfully submitted! Track your application status here: http://localhost:5173/student/login`;
    outboundNotificationService.sendSmsAndWhatsApp(newLead.phone, newLead.name, welcomeMsg);

    const emailSubject = `GSF Education Loan Application Submitted - ID: ${applicationId}`;
    const emailHtml = `
      <div style="font-family: sans-serif; color: #07324A; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #005C5B; border-bottom: 2px solid #F4B63F; padding-bottom: 8px;">Application Received</h2>
        <p>Dear <strong>${newLead.name}</strong>,</p>
        <p>Your education loan application (ID: <strong>${applicationId}</strong>) has been successfully submitted! Here are the details registered in our system:</p>
        <ul>
          <li><strong>Target Institution:</strong> ${newLead.university}</li>
          <li><strong>Course Level:</strong> ${newLead.course}</li>
          <li><strong>Requested Loan Amount:</strong> ₹${Number(newLead.loanAmount).toLocaleString('en-IN')}</li>
          <li><strong>Destination Country:</strong> ${newLead.country}</li>
        </ul>
        <p>You can track the ongoing verification stages and upload additional items directly inside the student portal:</p>
        <a href="http://localhost:5173/student/login" style="display: inline-block; background-color: #005C5B; color: #FFFFFF; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Access Student Portal</a>
        <p style="margin-top: 20px; font-size: 0.88rem; color: #64748B;">Best regards,<br/>GSF Credit & Operations Team</p>
      </div>
    `;
    outboundNotificationService.sendEmail(newLead.email, newLead.name, emailSubject, emailHtml);

    // 4. Trigger Super Admin Notification & Socket.IO Event
    notificationService.createLeadNotification(newLead);

    saveDatabase();
    return newLead;
  }

  updateClassification(id: string, newClassification: LeadClassification, adminName: string): Lead | null {
    const lead = this.getLeadById(id);
    if (!lead) return null;

    const oldClassification = lead.leadClassification;
    if (oldClassification === newClassification) return lead;

    lead.leadClassification = newClassification;
    lead.updatedAt = new Date().toISOString();

    const activity: LeadActivity = {
      id: `act-${Date.now()}`,
      leadId: lead.id,
      actionType: 'CLASSIFICATION_CHANGED',
      title: 'Lead Classification Changed',
      description: `Classification changed from ${oldClassification} to ${newClassification}.`,
      performedBy: adminName,
      createdAt: new Date().toISOString()
    };

    if (!lead.activities) lead.activities = [];
    lead.activities.unshift(activity);

    notificationService.notifyClassificationChange(lead, oldClassification, newClassification, adminName);
    saveDatabase();
    return lead;
  }

  updateStatus(id: string, newStatus: LeadStatus, adminName: string): Lead | null {
    const lead = this.getLeadById(id);
    if (!lead) return null;

    const oldStatus = lead.status;
    if (oldStatus === newStatus) return lead;

    lead.status = newStatus;
    lead.updatedAt = new Date().toISOString();

    const activity: LeadActivity = {
      id: `act-${Date.now()}`,
      leadId: lead.id,
      actionType: 'STATUS_CHANGED',
      title: 'Lead Status Updated',
      description: `Status changed from "${oldStatus}" to "${newStatus}".`,
      performedBy: adminName,
      createdAt: new Date().toISOString()
    };

    if (!lead.activities) lead.activities = [];
    lead.activities.unshift(activity);

    // Synchronize StudentLoanApplication status
    const studentApp = applicationsStore.find(
      a => a.leadId === lead.id || a.studentId === lead.id || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, '')
    );
    if (studentApp) {
      const statusStr = newStatus as string;
      if (statusStr === 'Sanctioned' || statusStr === 'Converted') {
        studentApp.applicationStatus = 'APPROVED';
        studentApp.loanStatus = 'SANCTIONED';
      } else if (statusStr === 'Disbursed') {
        studentApp.applicationStatus = 'COMPLETED';
        studentApp.loanStatus = 'DISBURSED';
      } else if (statusStr === 'Rejected' || statusStr === 'Lost') {
        studentApp.applicationStatus = 'REJECTED';
        studentApp.loanStatus = 'REJECTED';
      } else if (statusStr === 'Under Review') {
        studentApp.applicationStatus = 'UNDER_REVIEW';
        studentApp.loanStatus = 'PROCESSING';
      } else if (statusStr === 'Application Submitted' || statusStr === 'Documents Pending') {
        studentApp.applicationStatus = 'SUBMITTED';
        studentApp.loanStatus = 'PROCESSING';
      }
      studentApp.updatedAt = new Date().toISOString();

      // Push Student Timeline Update
      studentUpdatesStore.unshift({
        id: `supd-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        date: new Date().toISOString().split('T')[0],
        title: `Status Updated: ${newStatus}`,
        description: `Your application status has been updated to "${newStatus}" by the GSF credit team.`,
        createdAt: new Date().toISOString()
      });

      // Push Student Notification
      studentNotificationsStore.unshift({
        id: `snotif-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        title: '🔔 Application Status Updated',
        message: `Your loan application status has been updated to "${newStatus}".`,
        isRead: false,
        createdAt: new Date().toISOString()
      });

      // Dispatch Real-Time WebSocket event to Student Dashboard
      notificationService.notifyStudentUpdate({
        studentId: studentApp.studentId,
        applicationId: studentApp.applicationId,
        applicationStatus: studentApp.applicationStatus,
        loanStatus: studentApp.loanStatus,
        message: `Status updated to ${newStatus}`
      });

      // Dispatch Outbound SMS/WhatsApp and Email alerts
      const statusMsg = `Hello ${lead.name}, your GSF education loan application (${studentApp.applicationId}) status has been updated to "${newStatus}". Log in to check details: http://localhost:5173/student/login`;
      outboundNotificationService.sendSmsAndWhatsApp(lead.phone, lead.name, statusMsg);

      const emailSubject = `GSF Loan Application Status Updated: ${newStatus}`;
      const emailHtml = `
        <div style="font-family: sans-serif; color: #07324A; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #005C5B; border-bottom: 2px solid #F4B63F; padding-bottom: 8px;">Loan Status Update</h2>
          <p>Dear <strong>${lead.name}</strong>,</p>
          <p>Your education loan application status has been updated to <strong>"${newStatus}"</strong> by the GSF credit evaluation team.</p>
          <p>Log in to your student portal to review the updated timeline, verify document feedback, or check next steps:</p>
          <a href="http://localhost:5173/student/login" style="display: inline-block; background-color: #005C5B; color: #FFFFFF; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Check Application Status</a>
          <p style="margin-top: 20px; font-size: 0.88rem; color: #64748B;">Best regards,<br/>GSF Credit Operations Team</p>
        </div>
      `;
      outboundNotificationService.sendEmail(lead.email, lead.name, emailSubject, emailHtml);
    }

    notificationService.notifyStatusChange(lead, oldStatus, newStatus, adminName);
    saveDatabase();
    return lead;
  }

  addStudentUpdate(leadId: string, message: string, visibleToStudent: boolean, adminName: string): boolean {
    const lead = this.getLeadById(leadId);
    if (!lead) return false;

    const studentApp = applicationsStore.find(
      a => a.leadId === leadId || a.studentId === leadId || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, '')
    );
    if (!studentApp) return false;

    if (visibleToStudent) {
      studentUpdatesStore.unshift({
        id: `supd-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        date: new Date().toISOString().split('T')[0],
        title: 'Application Update from GSF Team',
        description: message,
        createdAt: new Date().toISOString()
      });

      studentNotificationsStore.unshift({
        id: `snotif-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        title: '🔔 New Update from GSF Team',
        message: message,
        isRead: false,
        createdAt: new Date().toISOString()
      });

      // Dispatch Real-Time WebSocket event to Student Dashboard
      notificationService.notifyStudentUpdate({
        studentId: studentApp.studentId,
        applicationId: studentApp.applicationId,
        message
      });
    }

    // Always record internal admin activity
    if (!lead.activities) lead.activities = [];
    lead.activities.unshift({
      id: `act-${Date.now()}`,
      leadId: lead.id,
      actionType: 'NOTE_ADDED',
      title: visibleToStudent ? 'Student Update Sent' : 'Internal Admin Note',
      description: message,
      performedBy: adminName,
      createdAt: new Date().toISOString()
    });

    saveDatabase();
    return true;
  }

  updateStudentDocument(leadId: string, documentName: string, status: 'VERIFIED' | 'PENDING' | 'ACTION_REQUIRED', visibleToStudent: boolean, adminName: string): boolean {
    const lead = this.getLeadById(leadId);
    if (!lead) return false;

    const studentApp = applicationsStore.find(
      a => a.leadId === leadId || a.studentId === leadId || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, '')
    );
    if (!studentApp) return false;

    let doc = studentDocumentsStore.find(d => d.leadId === leadId && d.documentName === documentName);
    if (doc) {
      doc.status = status;
      doc.visibleToStudent = visibleToStudent;
      doc.updatedAt = new Date().toISOString();
    } else {
      doc = {
        id: `doc-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        leadId: leadId,
        documentName,
        status,
        visibleToStudent,
        updatedAt: new Date().toISOString()
      };
      studentDocumentsStore.push(doc);
    }

    if (visibleToStudent) {
      const statusTitle = status === 'VERIFIED' ? '✓ Document Verified' : (status === 'ACTION_REQUIRED' ? '⚠ Action Required on Document' : 'Document Status Updated');
      const statusDesc = status === 'VERIFIED'
        ? `Your ${documentName} has been verified and approved.`
        : (status === 'ACTION_REQUIRED' ? `Please upload your latest ${documentName} to proceed with sanction.` : `${documentName} status is currently ${status}.`);

      studentUpdatesStore.unshift({
        id: `supd-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        date: new Date().toISOString().split('T')[0],
        title: statusTitle,
        description: statusDesc,
        createdAt: new Date().toISOString()
      });

      studentNotificationsStore.unshift({
        id: `snotif-${Date.now()}`,
        applicationId: studentApp.applicationId,
        studentId: studentApp.studentId,
        title: `🔔 ${statusTitle}`,
        message: statusDesc,
        isRead: false,
        createdAt: new Date().toISOString()
      });

      // Dispatch Real-Time WebSocket event to Student Dashboard
      notificationService.notifyStudentUpdate({
        studentId: studentApp.studentId,
        applicationId: studentApp.applicationId,
        documentName,
        status
      });
    }

    saveDatabase();
    return true;
  }

  addNote(id: string, noteText: string, adminName: string): Lead | null {
    const lead = this.getLeadById(id);
    if (!lead) return null;

    const activity: LeadActivity = {
      id: `act-${Date.now()}`,
      leadId: lead.id,
      actionType: 'NOTE_ADDED',
      title: 'Admin Note Added',
      description: noteText,
      performedBy: adminName,
      createdAt: new Date().toISOString()
    };

    if (!lead.activities) lead.activities = [];
    lead.activities.unshift(activity);

    saveDatabase();
    return lead;
  }

  addFollowUp(id: string, followupData: Partial<FollowUpItem>, adminName: string): FollowUpItem | null {
    const lead = this.getLeadById(id);
    if (!lead) return null;

    const newFollowUp: FollowUpItem = {
      id: `fol-${Date.now()}`,
      leadId: lead.id,
      studentName: lead.name,
      phone: lead.phone,
      classification: lead.leadClassification,
      date: followupData.date || new Date().toISOString().split('T')[0],
      time: followupData.time || '10:00 AM',
      assignedEmployee: followupData.assignedEmployee || adminName,
      notes: followupData.notes || 'Routine follow-up call',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    if (!lead.followUps) lead.followUps = [];
    lead.followUps.unshift(newFollowUp);

    const activity: LeadActivity = {
      id: `act-${Date.now()}`,
      leadId: lead.id,
      actionType: 'FOLLOWUP_SCHEDULED',
      title: 'Follow-up Scheduled',
      description: `Scheduled for ${newFollowUp.date} at ${newFollowUp.time}. Notes: ${newFollowUp.notes}`,
      performedBy: adminName,
      createdAt: new Date().toISOString()
    };

    if (!lead.activities) lead.activities = [];
    lead.activities.unshift(activity);

    saveDatabase();
    return newFollowUp;
  }

  getAllFollowUps(): FollowUpItem[] {
    const all: FollowUpItem[] = [];
    leadsStore.forEach(l => {
      if (l.followUps) {
        all.push(...l.followUps);
      }
    });
    return all.sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());
  }

  getDashboardStats(): DashboardStats {
    const totalLeads = leadsStore.length;
    const hotLeads = leadsStore.filter(l => l.leadClassification === 'HOT').length;
    const mediumLeads = leadsStore.filter(l => l.leadClassification === 'MEDIUM').length;
    const coldLeads = leadsStore.filter(l => l.leadClassification === 'COLD').length;
    const newLeads = leadsStore.filter(l => l.status === 'New').length;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const allFollowUps = this.getAllFollowUps();
    const todayFollowups = allFollowUps.filter(f => f.date === todayStr && f.status === 'Pending').length;

    const totalApplications = leadsStore.filter(l => ['Application Submitted', 'Under Review', 'Sanctioned', 'Disbursed'].includes(l.status)).length;
    const sanctionedLoans = leadsStore.filter(l => ['Sanctioned', 'Disbursed'].includes(l.status)).length;
    const disbursedLeads = leadsStore.filter(l => l.status === 'Disbursed');
    const disbursedLoans = disbursedLeads.length;
    const totalDisbursedAmount = disbursedLeads.reduce((acc, l) => acc + l.loanAmount, 0);

    return {
      totalLeads,
      hotLeads,
      mediumLeads,
      coldLeads,
      newLeads,
      todayFollowups,
      totalApplications,
      sanctionedLoans,
      disbursedLoans,
      totalDisbursedAmount
    };
  }
}

export const leadService = new LeadService();
