import { Response } from 'express';
import { AuthenticatedStudentRequest } from '../middleware/studentAuth.middleware';
import { otpService } from '../services/otp.service';
import { generateStudentToken } from '../utils/jwt';
import { hashPassword } from '../utils/password';
import {
  studentsStore,
  applicationsStore,
  studentUpdatesStore,
  studentNotificationsStore,
  studentDocumentsStore,
  saveDatabase
} from '../config/database';

export class StudentController {
  /**
   * Password-based Login for Student Panel
   */
  async login(req: AuthenticatedStudentRequest, res: Response): Promise<void> {
    try {
      const { mobile, password } = req.body;
      if (!mobile || !password) {
        res.status(400).json({ success: false, message: 'Mobile number and password are required.' });
        return;
      }

      const e164 = otpService.normalizePhone(mobile);
      const student = studentsStore.find(
        s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === mobile
      );

      // SECURITY RULE: Never reveal if the mobile number exists
      if (!student || !student.isActive || !student.isPasswordSet || !student.passwordHash) {
        res.status(401).json({
          success: false,
          message: 'Invalid mobile number or password.'
        });
        return;
      }

      const inputHash = hashPassword(password);
      if (student.passwordHash !== inputHash) {
        res.status(401).json({
          success: false,
          message: 'Invalid mobile number or password.'
        });
        return;
      }

      const application = applicationsStore.find(a => a.studentId === student.studentId);

      res.json({
        success: true,
        token: generateStudentToken(student.studentId, student.mobile),
        student: {
          studentId: student.studentId,
          fullName: student.fullName,
          email: student.email,
          mobile: student.mobile,
          applicationId: student.applicationId,
          isPasswordSet: student.isPasswordSet
        },
        applicationId: application?.applicationId
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'An internal login error occurred.' });
    }
  }

  /**
   * Send OTP for First-Time Password Creation ("New? Create a Password")
   */
  async createPasswordSendOtp(req: AuthenticatedStudentRequest, res: Response): Promise<void> {
    try {
      const { phone } = req.body;
      if (!phone) {
        res.status(400).json({ success: false, message: 'Mobile number is required.' });
        return;
      }

      const e164 = otpService.normalizePhone(phone);
      const student = studentsStore.find(
        s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone
      );

      // CRITICAL RULE: If account does not exist, reject with explicit guidance
      if (!student) {
        res.status(404).json({
          success: false,
          message: 'No student account was found for this mobile number. Please submit your GSF education loan application first.'
        });
        return;
      }

      const result = await otpService.sendOtp(phone);
      res.json({
        success: true,
        message: 'OTP sent to your registered mobile number.',
        e164Phone: result.e164Phone
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Failed to send OTP.' });
    }
  }

  /**
   * Verify OTP and Set Password for First-Time Password Creation or Reset
   */
  async createPasswordVerify(req: AuthenticatedStudentRequest, res: Response): Promise<void> {
    try {
      const { phone, code, newPassword } = req.body;
      if (!phone || !code || !newPassword) {
        res.status(400).json({ success: false, message: 'Mobile number, OTP code, and new password are required.' });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        return;
      }

      const result = await otpService.verifyOtp(phone, code);
      if (!result.success) {
        res.status(400).json({ success: false, message: result.message || 'Invalid OTP code.' });
        return;
      }

      const e164 = result.e164Phone;
      const student = studentsStore.find(
        s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone
      );

      if (!student) {
        res.status(404).json({
          success: false,
          message: 'No student account was found for this mobile number. Please submit your GSF education loan application first.'
        });
        return;
      }

      // Hash password and save to existing student account
      student.passwordHash = hashPassword(newPassword);
      student.isPasswordSet = true;
      student.updatedAt = new Date().toISOString();
      saveDatabase();

      res.json({
        success: true,
        message: 'Password created successfully! You can now log in to your Student Portal.'
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Failed to create password.' });
    }
  }

  /**
   * Legacy Direct OTP Login Support
   */
  async sendOtp(req: AuthenticatedStudentRequest, res: Response): Promise<void> {
    try {
      const { phone } = req.body;
      if (!phone) {
        res.status(400).json({ success: false, message: 'Mobile number is required.' });
        return;
      }

      const e164 = otpService.normalizePhone(phone);
      const student = studentsStore.find(
        s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone
      );

      if (!student) {
        res.status(404).json({
          success: false,
          message: 'No education loan application was found for this mobile number.'
        });
        return;
      }

      const result = await otpService.sendOtp(phone);
      res.json({
        success: true,
        message: 'OTP sent to mobile number successfully.',
        e164Phone: result.e164Phone
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Failed to send OTP.' });
    }
  }

  async verifyOtp(req: AuthenticatedStudentRequest, res: Response): Promise<void> {
    try {
      const { phone, code } = req.body;
      if (!phone || !code) {
        res.status(400).json({ success: false, message: 'Mobile number and verification code are required.' });
        return;
      }

      const result = await otpService.verifyOtp(phone, code);
      if (!result.success) {
        res.status(400).json({ success: false, verified: false, message: result.message || 'Invalid OTP code.' });
        return;
      }

      const e164 = result.e164Phone;
      const student = studentsStore.find(
        s => s.mobile === e164 || s.mobile.replace(/\s+/g, '') === e164.replace(/\s+/g, '') || s.mobile === phone
      );

      if (!student) {
        res.status(404).json({
          success: false,
          verified: false,
          message: 'No education loan application was found for this mobile number.'
        });
        return;
      }

      const application = applicationsStore.find(a => a.studentId === student.studentId);

      res.json({
        success: true,
        verified: true,
        token: generateStudentToken(student.studentId, student.mobile),
        student: {
          studentId: student.studentId,
          fullName: student.fullName,
          email: student.email,
          mobile: student.mobile,
          applicationId: student.applicationId,
          isPasswordSet: student.isPasswordSet
        },
        applicationId: application?.applicationId
      });
    } catch (error: any) {
      res.status(400).json({ success: false, verified: false, message: error.message || 'OTP verification failed.' });
    }
  }

  getProfile(req: AuthenticatedStudentRequest, res: Response): void {
    const student = studentsStore.find(s => s.studentId === req.studentId);
    if (!student) {
      res.status(404).json({ success: false, message: 'Student profile not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        studentId: student.studentId,
        fullName: student.fullName,
        email: student.email,
        mobile: student.mobile,
        applicationId: student.applicationId,
        isActive: student.isActive,
        isPasswordSet: student.isPasswordSet,
        createdAt: student.createdAt
      }
    });
  }

  getApplication(req: AuthenticatedStudentRequest, res: Response): void {
    const app = applicationsStore.find(a => a.studentId === req.studentId);
    if (!app) {
      res.status(404).json({ success: false, message: 'Unable to load your application. Please try again later.' });
      return;
    }

    // Explicitly exclude internal GSF lead classifications (HOT, MEDIUM, COLD)
    res.json({
      success: true,
      data: {
        applicationId: app.applicationId,
        fullName: app.fullName,
        email: app.email,
        mobile: app.mobile,
        country: app.country,
        university: app.university,
        course: app.course,
        qualificationLevel: app.qualificationLevel,
        intake: app.intake,
        admissionStatus: app.admissionStatus,
        loanAmount: app.loanAmount,
        address: app.address,
        applicationStatus: app.applicationStatus,
        loanStatus: app.loanStatus,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt
      }
    });
  }

  getStatus(req: AuthenticatedStudentRequest, res: Response): void {
    const app = applicationsStore.find(a => a.studentId === req.studentId);
    if (!app) {
      res.status(404).json({ success: false, message: 'Application status not available.' });
      return;
    }

    const appStatusLabels: Record<string, string> = {
      SUBMITTED: '🟢 Application Submitted',
      DOCUMENTS_PENDING: '🟡 Documents Pending',
      DOCUMENTS_VERIFIED: '🟢 Documents Verified',
      UNDER_REVIEW: '🟡 Application Under Review',
      ACTION_REQUIRED: '🟠 Action Required',
      APPROVED: '🟢 Application Approved',
      REJECTED: '🔴 Application Rejected',
      ON_HOLD: '⚪ On Hold',
      COMPLETED: '🟢 Loan Completed'
    };

    const loanStatusLabels: Record<string, string> = {
      NOT_STARTED: '⚪ Not Started',
      PROCESSING: '🟡 Loan Processing',
      UNDER_REVIEW: '🟡 Under Review',
      SANCTIONED: '🟢 Loan Sanctioned',
      DISBURSED: '🟢 Loan Disbursed',
      REJECTED: '🔴 Loan Rejected',
      ON_HOLD: '⚪ On Hold'
    };

    res.json({
      success: true,
      data: {
        applicationId: app.applicationId,
        applicationStatus: app.applicationStatus,
        applicationStatusLabel: appStatusLabels[app.applicationStatus] || `🟡 ${app.applicationStatus}`,
        loanStatus: app.loanStatus,
        loanStatusLabel: loanStatusLabels[app.loanStatus] || `🟡 ${app.loanStatus}`,
        updatedAt: app.updatedAt
      }
    });
  }

  getUpdates(req: AuthenticatedStudentRequest, res: Response): void {
    const updates = studentUpdatesStore.filter(u => u.studentId === req.studentId);
    res.json({
      success: true,
      data: updates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
  }

  getNotifications(req: AuthenticatedStudentRequest, res: Response): void {
    const notifs = studentNotificationsStore.filter(n => n.studentId === req.studentId);
    res.json({
      success: true,
      data: notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
  }

  getDocuments(req: AuthenticatedStudentRequest, res: Response): void {
    const docs = studentDocumentsStore.filter(d => d.studentId === req.studentId && d.visibleToStudent);
    res.json({
      success: true,
      data: docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    });
  }
}

export const studentController = new StudentController();
