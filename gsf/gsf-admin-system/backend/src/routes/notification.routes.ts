import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Previously fully public — anyone could read the live feed of every new
// lead (student name, destination, university) with no login at all.
router.get('/notifications', authenticateAdmin, (req, res) => notificationController.getNotifications(req, res));
router.get('/notifications/unread-count', authenticateAdmin, (req, res) => notificationController.getUnreadCount(req, res));
router.patch('/notifications/read-all', authenticateAdmin, (req, res) => notificationController.markAllAsRead(req, res));
router.patch('/notifications/:id/read', authenticateAdmin, (req, res) => notificationController.markAsRead(req, res));

export default router;
