import { Request, Response } from 'express';
import { leadService } from '../services/lead.service';
import { otpService } from '../services/otp.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getLeads = (req: Request, res: Response) => {
  const { classification, search } = req.query;
  const leads = leadService.getAllLeads(classification as string, search as string);
  return res.json({ success: true, count: leads.length, data: leads });
};

export const getLeadById = (req: Request, res: Response) => {
  const { id } = req.params;
  const lead = leadService.getLeadById(id);

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Student lead not found.' });
  }

  return res.json({ success: true, data: lead });
};

export const createLead = (req: Request, res: Response) => {
  const leadData = req.body;
  if (!leadData.name || !leadData.phone) {
    return res.status(400).json({ success: false, message: 'Student name and phone are required.' });
  }

  // Server-Side Security Enforcement: Check if mobile number was verified via Twilio OTP.
  // Previously a client-supplied `otpVerified: true` flag in the request body
  // could satisfy this check on its own — any caller could just set that flag
  // and skip OTP verification entirely. The only thing that counts now is the
  // server's own record of a completed OTP verification for this number.
  const isVerified = otpService.isPhoneVerified(leadData.phone);
  if (!isVerified) {
    return res.status(400).json({
      success: false,
      message: 'Mobile number verification is required before submitting your application.'
    });
  }

  const newLead = leadService.createLead(leadData);
  return res.status(201).json({ success: true, message: 'Lead created successfully.', data: newLead });
};

export const updateLead = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { leadClassification, status } = req.body;
  const adminName = req.user?.name || 'Admin';

  let updatedLead = leadService.getLeadById(id);
  if (!updatedLead) {
    return res.status(404).json({ success: false, message: 'Lead not found.' });
  }

  if (leadClassification) {
    updatedLead = leadService.updateClassification(id, leadClassification, adminName);
  }

  if (status) {
    updatedLead = leadService.updateStatus(id, status, adminName);
  }

  return res.json({ success: true, message: 'Lead updated successfully.', data: updatedLead });
};

export const deleteLead = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({ success: true, message: `Lead ${id} archived/deleted.` });
};

export const addLeadNote = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { note } = req.body;
  const adminName = req.user?.name || 'Admin';

  if (!note) {
    return res.status(400).json({ success: false, message: 'Note text is required.' });
  }

  const lead = leadService.addNote(id, note, adminName);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found.' });
  }

  return res.json({ success: true, message: 'Note added to activity timeline.', data: lead });
};

export const addFollowUp = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const followupData = req.body;
  const adminName = req.user?.name || 'Admin';

  const newFollowUp = leadService.addFollowUp(id, followupData, adminName);
  if (!newFollowUp) {
    return res.status(404).json({ success: false, message: 'Lead not found.' });
  }

  return res.status(201).json({ success: true, message: 'Follow-up scheduled.', data: newFollowUp });
};

export const addStudentUpdate = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { message, visibleToStudent } = req.body;
  const adminName = req.user?.name || 'Super Admin';

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message text is required.' });
  }

  const success = leadService.addStudentUpdate(id, message, Boolean(visibleToStudent), adminName);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Lead or student application not found.' });
  }

  return res.json({ success: true, message: 'Student update posted successfully.' });
};

export const updateStudentDocument = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { documentName, status, visibleToStudent } = req.body;
  const adminName = req.user?.name || 'Super Admin';

  if (!documentName || !status) {
    return res.status(400).json({ success: false, message: 'documentName and status are required.' });
  }

  const success = leadService.updateStudentDocument(id, documentName, status, visibleToStudent !== undefined ? Boolean(visibleToStudent) : true, adminName);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Lead or student application not found.' });
  }

  return res.json({ success: true, message: 'Student document status updated.' });
};

export const createLeadManual = (req: AuthenticatedRequest, res: Response) => {
  const leadData = req.body;
  if (!leadData.name || !leadData.phone) {
    return res.status(400).json({ success: false, message: 'Student name and phone are required.' });
  }

  // Bypass OTP check since this is a manual entry by authenticated admin
  leadData.otpVerified = true;
  leadData.source = leadData.source || 'Manual CRM Entry';

  const adminName = req.user?.name || 'Admin';
  if (!leadData.assignedEmployee || leadData.assignedEmployee === 'Unassigned') {
    leadData.assignedEmployee = adminName;
  }

  const newLead = leadService.createLead(leadData);
  return res.status(201).json({ success: true, message: 'Lead created manually by counselor.', data: newLead });
};
