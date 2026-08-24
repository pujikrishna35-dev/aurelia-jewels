"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = exports.setSocketServer = void 0;
const database_1 = require("../config/database");
let ioInstance = null;
const setSocketServer = (io) => {
    ioInstance = io;
};
exports.setSocketServer = setSocketServer;
class NotificationService {
    getAllNotifications() {
        return [...database_1.notificationsStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getUnreadCount() {
        return database_1.notificationsStore.filter(n => !n.isRead).length;
    }
    markAsRead(id) {
        const notification = database_1.notificationsStore.find(n => n.id === id);
        if (!notification)
            return null;
        notification.isRead = true;
        return notification;
    }
    markAllAsRead() {
        database_1.notificationsStore.forEach(n => {
            n.isRead = true;
        });
    }
    createLeadNotification(lead) {
        const classification = lead.leadClassification || lead.studentSelectedClassification || 'MEDIUM';
        let emoji = '🟡';
        if (classification === 'HOT')
            emoji = '🔥';
        if (classification === 'COLD')
            emoji = '🔵';
        const title = `${emoji} New ${classification.charAt(0) + classification.slice(1).toLowerCase()} Lead`;
        const notification = {
            id: `notif-${Date.now()}`,
            leadId: lead.id,
            type: 'NEW_LEAD',
            title,
            message: `${lead.name} submitted a new loan enquiry for ${lead.destination || lead.country || 'Global'}.`,
            classification,
            studentName: lead.name,
            country: lead.destination || lead.country || 'Global',
            university: lead.university || undefined,
            intake: lead.intake || undefined,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        database_1.notificationsStore.unshift(notification);
        if (ioInstance) {
            ioInstance.emit('new_notification', notification);
        }
        return notification;
    }
    notifyClassificationChange(lead, oldClass, newClass, adminName) {
        const notification = {
            id: `notif-${Date.now()}`,
            leadId: lead.id,
            type: 'STATUS_CHANGED',
            title: `⚡ Classification Changed`,
            message: `${lead.name}'s classification updated to ${newClass} by ${adminName}.`,
            classification: newClass,
            studentName: lead.name,
            country: lead.destination || lead.country || 'Global',
            university: lead.university || undefined,
            intake: lead.intake || undefined,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        database_1.notificationsStore.unshift(notification);
        if (ioInstance)
            ioInstance.emit('new_notification', notification);
        return notification;
    }
    notifyStatusChange(lead, oldStatus, newStatus, adminName) {
        const notification = {
            id: `notif-${Date.now()}`,
            leadId: lead.id,
            type: 'STATUS_CHANGED',
            title: `📌 Status Updated`,
            message: `${lead.name}'s status changed to "${newStatus}" by ${adminName}.`,
            classification: lead.leadClassification,
            studentName: lead.name,
            country: lead.destination || lead.country || 'Global',
            university: lead.university || undefined,
            intake: lead.intake || undefined,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        database_1.notificationsStore.unshift(notification);
        if (ioInstance)
            ioInstance.emit('new_notification', notification);
        return notification;
    }
    notifyStudentUpdate(data) {
        if (ioInstance) {
            ioInstance.emit('student_update', data);
        }
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
