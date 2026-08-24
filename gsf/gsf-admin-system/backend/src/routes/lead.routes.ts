import { Router } from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead, addLeadNote, addFollowUp, addStudentUpdate, updateStudentDocument, createLeadManual } from '../controllers/lead.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Website Submission API Endpoint (Unauthenticated so website form can post to it later)
router.post('/leads', createLead);

// Protected Admin API Endpoints
router.post('/leads/manual', authenticateAdmin, createLeadManual);
router.get('/leads', authenticateAdmin, getLeads);
router.get('/leads/:id', authenticateAdmin, getLeadById);
router.patch('/leads/:id', authenticateAdmin, updateLead);
router.delete('/leads/:id', authenticateAdmin, deleteLead);
router.post('/leads/:id/notes', authenticateAdmin, addLeadNote);
router.post('/leads/:id/follow-up', authenticateAdmin, addFollowUp);
router.post('/leads/:id/student-update', authenticateAdmin, addStudentUpdate);
router.post('/leads/:id/student-documents', authenticateAdmin, updateStudentDocument);

export default router;
