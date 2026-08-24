import { LeadClassification } from '../constants/leadClassification';

export type NotificationType =
  | 'NEW_LEAD'
  | 'STATUS_CHANGED'
  | 'FOLLOW_UP_DUE'
  | 'FOLLOW_UP_OVERDUE'
  | 'DOCUMENT_RECEIVED'
  | 'APPLICATION_SUBMITTED'
  | 'LOAN_SANCTIONED'
  | 'LOAN_DISBURSED';

export interface AdminNotification {
  id: string;
  adminId?: string;
  leadId: string;
  type: NotificationType;
  title: string;
  message: string;
  classification: LeadClassification;
  studentName: string;
  country: string;
  university?: string;
  intake?: string;
  isRead: boolean;
  createdAt: string;
}
