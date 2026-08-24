import { notificationsStore } from '../config/database';
import { AdminNotification, NotificationType } from '../shared/types/notification';
import { Lead } from '../shared/types/lead';
import { Server as SocketIOServer } from 'socket.io';

let ioInstance: SocketIOServer | null = null;

export const setSocketServer = (io: SocketIOServer) => {
  ioInstance = io;
};

export class NotificationService {
  getAllNotifications(): AdminNotification[] {
    return [...notificationsStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getUnreadCount(): number {
    return notificationsStore.filter(n => !n.isRead).length;
  }

  markAsRead(id: string): AdminNotification | null {
    const notification = notificationsStore.find(n => n.id === id);
    if (!notification) return null;

    notification.isRead = true;
    return notification;
  }

  markAllAsRead(): void {
    notificationsStore.forEach(n => {
      n.isRead = true;
    });
  }

  createLeadNotification(lead: Lead): AdminNotification {
    const classification = lead.leadClassification || lead.studentSelectedClassification || 'MEDIUM';
    
    let emoji = '🟡';
    if (classification === 'HOT') emoji = '🔥';
    if (classification === 'COLD') emoji = '🔵';

    const title = `${emoji} New ${classification.charAt(0) + classification.slice(1).toLowerCase()} Lead`;

    const notification: AdminNotification = {
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

    notificationsStore.unshift(notification);

    if (ioInstance) {
      ioInstance.emit('new_notification', notification);
    }

    return notification;
  }

  notifyClassificationChange(lead: Lead, oldClass: string, newClass: string, adminName: string): AdminNotification {
    const notification: AdminNotification = {
      id: `notif-${Date.now()}`,
      leadId: lead.id,
      type: 'STATUS_CHANGED',
      title: `⚡ Classification Changed`,
      message: `${lead.name}'s classification updated to ${newClass} by ${adminName}.`,
      classification: newClass as any,
      studentName: lead.name,
      country: lead.destination || lead.country || 'Global',
      university: lead.university || undefined,
      intake: lead.intake || undefined,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    notificationsStore.unshift(notification);
    if (ioInstance) ioInstance.emit('new_notification', notification);
    return notification;
  }

  notifyStatusChange(lead: Lead, oldStatus: string, newStatus: string, adminName: string): AdminNotification {
    const notification: AdminNotification = {
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

    notificationsStore.unshift(notification);
    if (ioInstance) ioInstance.emit('new_notification', notification);
    return notification;
  }

  notifyStudentUpdate(data: any): void {
    if (ioInstance) {
      ioInstance.emit('student_update', data);
    }
  }
}

export const notificationService = new NotificationService();
