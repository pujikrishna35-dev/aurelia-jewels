import { Router } from 'express';
import { settingsController } from '../controllers/settings.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Previously fully public — anyone could read or overwrite admin
// notification settings with no login at all.
router.get('/settings', authenticateAdmin, (req, res) => settingsController.getSettings(req, res));
router.patch('/settings', authenticateAdmin, (req, res) => settingsController.updateSettings(req, res));

export default router;
