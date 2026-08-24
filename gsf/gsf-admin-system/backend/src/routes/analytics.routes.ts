import { Router } from 'express';
import { getAnalyticsStats } from '../controllers/analytics.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// GET is protected so only logged-in CRM users can see pipeline graphs
router.get('/stats', authenticateAdmin, getAnalyticsStats);

export default router;
