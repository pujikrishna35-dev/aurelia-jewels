"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadService = exports.LeadService = void 0;
const database_1 = require("../config/database");
const notification_service_1 = require("./notification.service");
class LeadService {
    getAllLeads(classificationFilter, searchQuery) {
        let result = [...database_1.leadsStore];
        if (classificationFilter && classificationFilter !== 'ALL') {
            result = result.filter(l => l.leadClassification === classificationFilter);
        }
        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(l => l.name.toLowerCase().includes(q) ||
                l.email.toLowerCase().includes(q) ||
                l.phone.toLowerCase().includes(q) ||
                l.university.toLowerCase().includes(q) ||
                l.country.toLowerCase().includes(q));
        }
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getLeadById(id) {
        const lead = database_1.leadsStore.find(l => l.id === id);
        return lead || null;
    }
    createLead(data) {
        const newId = `lead-${Date.now()}`;
        const classification = (data.leadClassification || data.studentSelectedClassification || 'MEDIUM');
        const newLead = {
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
            studentSelectedClassification: classification,
            leadClassification: classification,
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
                    description: `Student verified OTP and submitted loan request (${classification} priority).`,
                    performedBy: 'Student (Website API)',
                    createdAt: new Date().toISOString()
                }
            ],
            followUps: []
        };
        database_1.leadsStore.unshift(newLead);
        // Formatted Application ID (e.g. GSF-2026-00125)
        const appIdNumber = Math.floor(10000 + Math.random() * 90000);
        const applicationId = `GSF-2026-${appIdNumber}`;
        // 1. Check or Create Student Account
        let existingStudent = database_1.studentsStore.find(s => s.mobile === newLead.phone);
        let studentId = existingStudent ? existingStudent.studentId : `student-${Date.now()}`;
        if (!existingStudent) {
            const studentAccount = {
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
            database_1.studentsStore.unshift(studentAccount);
        }
        // Full Address formatting
        const fullAddress = [newLead.addressLine1, newLead.addressLine2, newLead.city, newLead.state, newLead.pincode]
            .filter(Boolean)
            .join(', ') || 'Address Provided in Application';
        // 2. Automatically Create & Link Student Loan Application
        const loanApp = {
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
        database_1.applicationsStore.unshift(loanApp);
        // Initial Student Timeline Update & Notification
        const initialUpdate = {
            id: `supd-${Date.now()}`,
            applicationId,
            studentId,
            date: new Date().toISOString().split('T')[0],
            title: 'Application Submitted',
            description: `Your education loan application (${applicationId}) for ${newLead.country} was successfully submitted.`,
            createdAt: new Date().toISOString()
        };
        database_1.studentUpdatesStore.unshift(initialUpdate);
        const initialNotif = {
            id: `snotif-${Date.now()}`,
            applicationId,
            studentId,
            title: '🔔 Application Submitted',
            message: `Your education loan application (${applicationId}) has been successfully submitted!`,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        database_1.studentNotificationsStore.unshift(initialNotif);
        // 3. Trigger WhatsApp Notification Access Link
        console.log(`=======================================================`);
        console.log(`📱 [WHATSAPP DISPATCH] Message sent to ${newLead.phone}`);
        console.log(`Hello ${newLead.name}, your education loan application (${applicationId}) has been successfully submitted! Track your application status here: http://localhost:5173/student/login`);
        console.log(`=======================================================`);
        // 4. Trigger Super Admin Notification & Socket.IO Event
        notification_service_1.notificationService.createLeadNotification(newLead);
        (0, database_1.saveDatabase)();
        return newLead;
    }
    updateClassification(id, newClassification, adminName) {
        const lead = this.getLeadById(id);
        if (!lead)
            return null;
        const oldClassification = lead.leadClassification;
        if (oldClassification === newClassification)
            return lead;
        lead.leadClassification = newClassification;
        lead.updatedAt = new Date().toISOString();
        const activity = {
            id: `act-${Date.now()}`,
            leadId: lead.id,
            actionType: 'CLASSIFICATION_CHANGED',
            title: 'Lead Classification Changed',
            description: `Classification changed from ${oldClassification} to ${newClassification}.`,
            performedBy: adminName,
            createdAt: new Date().toISOString()
        };
        if (!lead.activities)
            lead.activities = [];
        lead.activities.unshift(activity);
        notification_service_1.notificationService.notifyClassificationChange(lead, oldClassification, newClassification, adminName);
        (0, database_1.saveDatabase)();
        return lead;
    }
    updateStatus(id, newStatus, adminName) {
        const lead = this.getLeadById(id);
        if (!lead)
            return null;
        const oldStatus = lead.status;
        if (oldStatus === newStatus)
            return lead;
        lead.status = newStatus;
        lead.updatedAt = new Date().toISOString();
        const activity = {
            id: `act-${Date.now()}`,
            leadId: lead.id,
            actionType: 'STATUS_CHANGED',
            title: 'Lead Status Updated',
            description: `Status changed from "${oldStatus}" to "${newStatus}".`,
            performedBy: adminName,
            createdAt: new Date().toISOString()
        };
        if (!lead.activities)
            lead.activities = [];
        lead.activities.unshift(activity);
        // Synchronize StudentLoanApplication status
        const studentApp = database_1.applicationsStore.find(a => a.leadId === lead.id || a.studentId === lead.id || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, ''));
        if (studentApp) {
            const statusStr = newStatus;
            if (statusStr === 'Sanctioned' || statusStr === 'Converted') {
                studentApp.applicationStatus = 'APPROVED';
                studentApp.loanStatus = 'SANCTIONED';
            }
            else if (statusStr === 'Disbursed') {
                studentApp.applicationStatus = 'COMPLETED';
                studentApp.loanStatus = 'DISBURSED';
            }
            else if (statusStr === 'Rejected' || statusStr === 'Lost') {
                studentApp.applicationStatus = 'REJECTED';
                studentApp.loanStatus = 'REJECTED';
            }
            else if (statusStr === 'Under Review') {
                studentApp.applicationStatus = 'UNDER_REVIEW';
                studentApp.loanStatus = 'PROCESSING';
            }
            else if (statusStr === 'Application Submitted' || statusStr === 'Documents Pending') {
                studentApp.applicationStatus = 'SUBMITTED';
                studentApp.loanStatus = 'PROCESSING';
            }
            studentApp.updatedAt = new Date().toISOString();
            // Push Student Timeline Update
            database_1.studentUpdatesStore.unshift({
                id: `supd-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                date: new Date().toISOString().split('T')[0],
                title: `Status Updated: ${newStatus}`,
                description: `Your application status has been updated to "${newStatus}" by the GSF credit team.`,
                createdAt: new Date().toISOString()
            });
            // Push Student Notification
            database_1.studentNotificationsStore.unshift({
                id: `snotif-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                title: '🔔 Application Status Updated',
                message: `Your loan application status has been updated to "${newStatus}".`,
                isRead: false,
                createdAt: new Date().toISOString()
            });
            // Dispatch Real-Time WebSocket event to Student Dashboard
            notification_service_1.notificationService.notifyStudentUpdate({
                studentId: studentApp.studentId,
                applicationId: studentApp.applicationId,
                applicationStatus: studentApp.applicationStatus,
                loanStatus: studentApp.loanStatus,
                message: `Status updated to ${newStatus}`
            });
        }
        notification_service_1.notificationService.notifyStatusChange(lead, oldStatus, newStatus, adminName);
        return lead;
    }
    addStudentUpdate(leadId, message, visibleToStudent, adminName) {
        const lead = this.getLeadById(leadId);
        if (!lead)
            return false;
        const studentApp = database_1.applicationsStore.find(a => a.leadId === leadId || a.studentId === leadId || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, ''));
        if (!studentApp)
            return false;
        if (visibleToStudent) {
            database_1.studentUpdatesStore.unshift({
                id: `supd-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                date: new Date().toISOString().split('T')[0],
                title: 'Application Update from GSF Team',
                description: message,
                createdAt: new Date().toISOString()
            });
            database_1.studentNotificationsStore.unshift({
                id: `snotif-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                title: '🔔 New Update from GSF Team',
                message: message,
                isRead: false,
                createdAt: new Date().toISOString()
            });
            // Dispatch Real-Time WebSocket event to Student Dashboard
            notification_service_1.notificationService.notifyStudentUpdate({
                studentId: studentApp.studentId,
                applicationId: studentApp.applicationId,
                message
            });
        }
        // Always record internal admin activity
        if (!lead.activities)
            lead.activities = [];
        lead.activities.unshift({
            id: `act-${Date.now()}`,
            leadId: lead.id,
            actionType: 'NOTE_ADDED',
            title: visibleToStudent ? 'Student Update Sent' : 'Internal Admin Note',
            description: message,
            performedBy: adminName,
            createdAt: new Date().toISOString()
        });
        (0, database_1.saveDatabase)();
        return true;
    }
    updateStudentDocument(leadId, documentName, status, visibleToStudent, adminName) {
        const lead = this.getLeadById(leadId);
        if (!lead)
            return false;
        const studentApp = database_1.applicationsStore.find(a => a.leadId === leadId || a.studentId === leadId || a.mobile === lead.phone || a.mobile.replace(/\s+/g, '') === lead.phone.replace(/\s+/g, ''));
        if (!studentApp)
            return false;
        let doc = database_1.studentDocumentsStore.find(d => d.leadId === leadId && d.documentName === documentName);
        if (doc) {
            doc.status = status;
            doc.visibleToStudent = visibleToStudent;
            doc.updatedAt = new Date().toISOString();
        }
        else {
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
            database_1.studentDocumentsStore.push(doc);
        }
        if (visibleToStudent) {
            const statusTitle = status === 'VERIFIED' ? '✓ Document Verified' : (status === 'ACTION_REQUIRED' ? '⚠ Action Required on Document' : 'Document Status Updated');
            const statusDesc = status === 'VERIFIED'
                ? `Your ${documentName} has been verified and approved.`
                : (status === 'ACTION_REQUIRED' ? `Please upload your latest ${documentName} to proceed with sanction.` : `${documentName} status is currently ${status}.`);
            database_1.studentUpdatesStore.unshift({
                id: `supd-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                date: new Date().toISOString().split('T')[0],
                title: statusTitle,
                description: statusDesc,
                createdAt: new Date().toISOString()
            });
            database_1.studentNotificationsStore.unshift({
                id: `snotif-${Date.now()}`,
                applicationId: studentApp.applicationId,
                studentId: studentApp.studentId,
                title: `🔔 ${statusTitle}`,
                message: statusDesc,
                isRead: false,
                createdAt: new Date().toISOString()
            });
            // Dispatch Real-Time WebSocket event to Student Dashboard
            notification_service_1.notificationService.notifyStudentUpdate({
                studentId: studentApp.studentId,
                applicationId: studentApp.applicationId,
                documentName,
                status
            });
        }
        (0, database_1.saveDatabase)();
        return true;
    }
    addNote(id, noteText, adminName) {
        const lead = this.getLeadById(id);
        if (!lead)
            return null;
        const activity = {
            id: `act-${Date.now()}`,
            leadId: lead.id,
            actionType: 'NOTE_ADDED',
            title: 'Admin Note Added',
            description: noteText,
            performedBy: adminName,
            createdAt: new Date().toISOString()
        };
        if (!lead.activities)
            lead.activities = [];
        lead.activities.unshift(activity);
        (0, database_1.saveDatabase)();
        return lead;
    }
    addFollowUp(id, followupData, adminName) {
        const lead = this.getLeadById(id);
        if (!lead)
            return null;
        const newFollowUp = {
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
        if (!lead.followUps)
            lead.followUps = [];
        lead.followUps.unshift(newFollowUp);
        const activity = {
            id: `act-${Date.now()}`,
            leadId: lead.id,
            actionType: 'FOLLOWUP_SCHEDULED',
            title: 'Follow-up Scheduled',
            description: `Scheduled for ${newFollowUp.date} at ${newFollowUp.time}. Notes: ${newFollowUp.notes}`,
            performedBy: adminName,
            createdAt: new Date().toISOString()
        };
        if (!lead.activities)
            lead.activities = [];
        lead.activities.unshift(activity);
        (0, database_1.saveDatabase)();
        return newFollowUp;
    }
    getAllFollowUps() {
        const all = [];
        database_1.leadsStore.forEach(l => {
            if (l.followUps) {
                all.push(...l.followUps);
            }
        });
        return all.sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());
    }
    getDashboardStats() {
        const totalLeads = database_1.leadsStore.length;
        const hotLeads = database_1.leadsStore.filter(l => l.leadClassification === 'HOT').length;
        const mediumLeads = database_1.leadsStore.filter(l => l.leadClassification === 'MEDIUM').length;
        const coldLeads = database_1.leadsStore.filter(l => l.leadClassification === 'COLD').length;
        const newLeads = database_1.leadsStore.filter(l => l.status === 'New').length;
        const todayStr = new Date().toISOString().split('T')[0];
        const allFollowUps = this.getAllFollowUps();
        const todayFollowups = allFollowUps.filter(f => f.date === todayStr && f.status === 'Pending').length;
        const totalApplications = database_1.leadsStore.filter(l => ['Application Submitted', 'Under Review', 'Sanctioned', 'Disbursed'].includes(l.status)).length;
        const sanctionedLoans = database_1.leadsStore.filter(l => ['Sanctioned', 'Disbursed'].includes(l.status)).length;
        const disbursedLeads = database_1.leadsStore.filter(l => l.status === 'Disbursed');
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
exports.LeadService = LeadService;
exports.leadService = new LeadService();
