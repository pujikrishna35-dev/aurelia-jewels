"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = exports.NotificationController = void 0;
const notification_service_1 = require("../services/notification.service");
class NotificationController {
    getNotifications(req, res) {
        try {
            const notifications = notification_service_1.notificationService.getAllNotifications();
            const unreadCount = notification_service_1.notificationService.getUnreadCount();
            res.json({
                success: true,
                count: notifications.length,
                unreadCount,
                data: notifications
            });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    getUnreadCount(req, res) {
        try {
            const unreadCount = notification_service_1.notificationService.getUnreadCount();
            res.json({
                success: true,
                unreadCount
            });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    markAsRead(req, res) {
        try {
            const { id } = req.params;
            const updated = notification_service_1.notificationService.markAsRead(id);
            if (!updated) {
                res.status(404).json({ success: false, error: 'Notification not found' });
                return;
            }
            res.json({
                success: true,
                data: updated,
                unreadCount: notification_service_1.notificationService.getUnreadCount()
            });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    markAllAsRead(req, res) {
        try {
            notification_service_1.notificationService.markAllAsRead();
            res.json({
                success: true,
                message: 'All notifications marked as read',
                unreadCount: 0
            });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
exports.NotificationController = NotificationController;
exports.notificationController = new NotificationController();
