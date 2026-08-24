import { Router } from 'express';
import { getFollowUps } from '../controllers/followup.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/follow-ups', authenticateAdmin, getFollowUps);

export default router;
