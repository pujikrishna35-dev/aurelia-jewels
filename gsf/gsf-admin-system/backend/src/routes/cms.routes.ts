import { Router } from 'express';
import { getCmsByKey, updateCmsByKey } from '../controllers/cms.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// GET is public so the main website can fetch content dynamically
router.get('/:key', getCmsByKey);

// PUT is protected so only authenticated admins can save edits
router.put('/:key', authenticateAdmin, updateCmsByKey);

export default router;
