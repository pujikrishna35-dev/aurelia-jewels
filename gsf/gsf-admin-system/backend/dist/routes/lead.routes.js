"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("../controllers/lead.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Website Submission API Endpoint (Unauthenticated so website form can post to it later)
router.post('/leads', lead_controller_1.createLead);
// Protected Admin API Endpoints
router.post('/leads/manual', auth_middleware_1.authenticateAdmin, lead_controller_1.createLeadManual);
router.get('/leads', auth_middleware_1.authenticateAdmin, lead_controller_1.getLeads);
router.get('/leads/:id', auth_middleware_1.authenticateAdmin, lead_controller_1.getLeadById);
router.patch('/leads/:id', auth_middleware_1.authenticateAdmin, lead_controller_1.updateLead);
router.delete('/leads/:id', auth_middleware_1.authenticateAdmin, lead_controller_1.deleteLead);
router.post('/leads/:id/notes', auth_middleware_1.authenticateAdmin, lead_controller_1.addLeadNote);
router.post('/leads/:id/follow-up', auth_middleware_1.authenticateAdmin, lead_controller_1.addFollowUp);
router.post('/leads/:id/student-update', auth_middleware_1.authenticateAdmin, lead_controller_1.addStudentUpdate);
router.post('/leads/:id/student-documents', auth_middleware_1.authenticateAdmin, lead_controller_1.updateStudentDocument);
exports.default = router;
