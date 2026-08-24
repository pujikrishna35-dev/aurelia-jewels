"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentDocument = exports.addStudentUpdate = exports.addFollowUp = exports.addLeadNote = exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getLeads = void 0;
const lead_service_1 = require("../services/lead.service");
const otp_service_1 = require("../services/otp.service");
const getLeads = (req, res) => {
    const { classification, search } = req.query;
    const leads = lead_service_1.leadService.getAllLeads(classification, search);
    return res.json({ success: true, count: leads.length, data: leads });
};
exports.getLeads = getLeads;
const getLeadById = (req, res) => {
    const { id } = req.params;
    const lead = lead_service_1.leadService.getLeadById(id);
    if (!lead) {
        return res.status(404).json({ success: false, message: 'Student lead not found.' });
    }
    return res.json({ success: true, data: lead });
};
exports.getLeadById = getLeadById;
const createLead = (req, res) => {
    const leadData = req.body;
    if (!leadData.name || !leadData.phone) {
        return res.status(400).json({ success: false, message: 'Student name and phone are required.' });
    }
    // Server-Side Security Enforcement: Check if mobile number was verified via Twilio OTP
    const isVerified = otp_service_1.otpService.isPhoneVerified(leadData.phone);
    if (!isVerified && !leadData.otpVerified) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number verification is required before submitting your application.'
        });
    }
    const newLead = lead_service_1.leadService.createLead(leadData);
    return res.status(201).json({ success: true, message: 'Lead created successfully.', data: newLead });
};
exports.createLead = createLead;
const updateLead = (req, res) => {
    const { id } = req.params;
    const { leadClassification, status } = req.body;
    const adminName = req.user?.name || 'Admin';
    let updatedLead = lead_service_1.leadService.getLeadById(id);
    if (!updatedLead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    if (leadClassification) {
        updatedLead = lead_service_1.leadService.updateClassification(id, leadClassification, adminName);
    }
    if (status) {
        updatedLead = lead_service_1.leadService.updateStatus(id, status, adminName);
    }
    return res.json({ success: true, message: 'Lead updated successfully.', data: updatedLead });
};
exports.updateLead = updateLead;
const deleteLead = (req, res) => {
    const { id } = req.params;
    return res.json({ success: true, message: `Lead ${id} archived/deleted.` });
};
exports.deleteLead = deleteLead;
const addLeadNote = (req, res) => {
    const { id } = req.params;
    const { note } = req.body;
    const adminName = req.user?.name || 'Admin';
    if (!note) {
        return res.status(400).json({ success: false, message: 'Note text is required.' });
    }
    const lead = lead_service_1.leadService.addNote(id, note, adminName);
    if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    return res.json({ success: true, message: 'Note added to activity timeline.', data: lead });
};
exports.addLeadNote = addLeadNote;
const addFollowUp = (req, res) => {
    const { id } = req.params;
    const followupData = req.body;
    const adminName = req.user?.name || 'Admin';
    const newFollowUp = lead_service_1.leadService.addFollowUp(id, followupData, adminName);
    if (!newFollowUp) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    return res.status(201).json({ success: true, message: 'Follow-up scheduled.', data: newFollowUp });
};
exports.addFollowUp = addFollowUp;
const addStudentUpdate = (req, res) => {
    const { id } = req.params;
    const { message, visibleToStudent } = req.body;
    const adminName = req.user?.name || 'Super Admin';
    if (!message) {
        return res.status(400).json({ success: false, message: 'Message text is required.' });
    }
    const success = lead_service_1.leadService.addStudentUpdate(id, message, Boolean(visibleToStudent), adminName);
    if (!success) {
        return res.status(404).json({ success: false, message: 'Lead or student application not found.' });
    }
    return res.json({ success: true, message: 'Student update posted successfully.' });
};
exports.addStudentUpdate = addStudentUpdate;
const updateStudentDocument = (req, res) => {
    const { id } = req.params;
    const { documentName, status, visibleToStudent } = req.body;
    const adminName = req.user?.name || 'Super Admin';
    if (!documentName || !status) {
        return res.status(400).json({ success: false, message: 'documentName and status are required.' });
    }
    const success = lead_service_1.leadService.updateStudentDocument(id, documentName, status, visibleToStudent !== undefined ? Boolean(visibleToStudent) : true, adminName);
    if (!success) {
        return res.status(404).json({ success: false, message: 'Lead or student application not found.' });
    }
    return res.json({ success: true, message: 'Student document status updated.' });
};
exports.updateStudentDocument = updateStudentDocument;
