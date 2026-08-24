import { Request, Response } from 'express';
import { notificationService } from '../services/notification.service';

export class NotificationController {
  getNotifications(req: Request, res: Response): void {
    try {
      const notifications = notificationService.getAllNotifications();
      const unreadCount = notificationService.getUnreadCount();
      res.json({
        success: true,
        count: notifications.length,
        unreadCount,
        data: notifications
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  getUnreadCount(req: Request, res: Response): void {
    try {
      const unreadCount = notificationService.getUnreadCount();
      res.json({
        success: true,
        unreadCount
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  markAsRead(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const updated = notificationService.markAsRead(id);

      if (!updated) {
        res.status(404).json({ success: false, error: 'Notification not found' });
        return;
      }

      res.json({
        success: true,
        data: updated,
        unreadCount: notificationService.getUnreadCount()
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  markAllAsRead(req: Request, res: Response): void {
    try {
      notificationService.markAllAsRead();
      res.json({
        success: true,
        message: 'All notifications marked as read',
        unreadCount: 0
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

export const notificationController = new NotificationController();
