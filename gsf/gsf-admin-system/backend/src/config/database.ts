import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { Lead, LeadActivity, FollowUpItem } from '../shared/types/lead';
import { AdminUser } from '../shared/types/admin';
import { AdminNotification } from '../shared/types/notification';
import { hashPassword } from '../utils/password';

// Interface definitions
export interface StudentAccount {
  studentId: string;
  fullName: string;
  email: string;
  mobile: string;
  applicationId: string;
  isActive: boolean;
  isPasswordSet: boolean;
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentLoanApplication {
  applicationId: string;
  studentId: string;
  leadId: string;
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  university: string;
  course: string;
  qualificationLevel: string;
  intake: string;
  admissionStatus: string;
  loanAmount: number;
  address: string;
  applicationStatus: 'SUBMITTED' | 'DOCUMENTS_PENDING' | 'DOCUMENTS_VERIFIED' | 'UNDER_REVIEW' | 'ACTION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'ON_HOLD' | 'COMPLETED';
  loanStatus: 'NOT_STARTED' | 'PROCESSING' | 'UNDER_REVIEW' | 'SANCTIONED' | 'DISBURSED' | 'REJECTED' | 'ON_HOLD';
  createdAt: string;
  updatedAt: string;
}

export interface StudentUpdateItem {
  id: string;
  applicationId: string;
  studentId: string;
  date: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface StudentNotificationItem {
  id: string;
  applicationId: string;
  studentId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface StudentDocumentItem {
  id: string;
  applicationId: string;
  studentId: string;
  leadId: string;
  documentName: string;
  status: 'VERIFIED' | 'PENDING' | 'ACTION_REQUIRED';
  visibleToStudent: boolean;
  fileUrl?: string;
  updatedAt: string;
}

// Initial Seeds
//
// Demo admin passwords can be overridden via env vars (SEED_ADMIN_PASSWORD /
// SEED_COUNSELOR_PASSWORD). Previously these accounts had no password check
// at all server-side (any password value authenticated as SuperAdmin) — the
// hash below is now actually verified in auth.controller.ts.
export const initialAdmins: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Senior Finance Admin',
    email: 'admin@gsf.com',
    role: 'SuperAdmin',
    passwordHash: hashPassword(process.env.SEED_ADMIN_PASSWORD || 'Admin@123'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'admin-2',
    name: 'Counselor Priya',
    email: 'priya@gsf.com',
    role: 'Counselor',
    passwordHash: hashPassword(process.env.SEED_COUNSELOR_PASSWORD || 'Priya@123'),
    createdAt: new Date().toISOString()
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    name: 'Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'rohan.sharma@example.com',
    destination: 'USA',
    country: 'United States',
    university: 'Northeastern University',
    course: 'MS in Computer Science',
    intake: 'Fall 2026',
    loanAmount: 6500000,
    loanType: 'Non-Collateral',
    hasCollateral: false,
    studentSelectedClassification: 'HOT',
    leadClassification: 'HOT',
    leadScore: 75,
    leadScoreBreakdown: '+25 Destination (USA/Canada), +25 Loan Amount (>=50L), +10 Non-Collateralized, +10 Admission Pending, +5 Qualification Default',
    status: 'Application Submitted',
    source: 'GSF Website',
    campaign: 'US STEM Fall 2026',
    assignedEmployee: 'Anand V.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    activities: [
      {
        id: `act-1`,
        leadId: 'lead-101',
        actionType: 'CREATED',
        title: 'Lead Created',
        description: 'Student submitted application form on GSF Website selecting HOT classification.',
        performedBy: 'Student (Website API)',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    followUps: [
      {
        id: `fol-1`,
        leadId: 'lead-101',
        studentName: 'Rohan Sharma',
        phone: '+91 98765 43210',
        classification: 'HOT',
        date: new Date().toISOString().split('T')[0],
        time: '11:00 AM',
        assignedEmployee: 'Anand V.',
        notes: 'Follow up on financial co-applicant ITR submission',
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: 'lead-102',
    name: 'Ananya Verma',
    phone: '+91 91234 56789',
    email: 'ananya.v@example.com',
    destination: 'UK',
    country: 'United Kingdom',
    university: 'University of Manchester',
    course: 'MSc Data Science',
    intake: 'Fall 2026',
    loanAmount: 4500000,
    loanType: 'Non-Collateral',
    hasCollateral: false,
    studentSelectedClassification: 'HOT',
    leadClassification: 'HOT',
    leadScore: 65,
    leadScoreBreakdown: '+20 Destination (UK/EU/AU), +20 Loan Amount (30L-49L), +10 Non-Collateralized, +10 Admission Pending, +5 Qualification Default',
    status: 'Sanctioned',
    source: 'GSF Website',
    campaign: 'UK Masters 2026',
    assignedEmployee: 'Counselor Priya',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    activities: [],
    followUps: []
  }
];

export const initialNotifications: AdminNotification[] = [
  {
    id: 'notif-101',
    leadId: 'lead-101',
    type: 'NEW_LEAD',
    title: '🔥 New Hot Lead',
    message: 'Rohan Sharma submitted a new loan enquiry for USA.',
    classification: 'HOT',
    studentName: 'Rohan Sharma',
    country: 'USA',
    university: 'Northeastern University',
    intake: 'Fall 2026',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  }
];

export const initialStudents: StudentAccount[] = [
  {
    studentId: 'student-101',
    fullName: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    mobile: '+919876543210',
    applicationId: 'GSF-2026-00101',
    isActive: true,
    isPasswordSet: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialApplications: StudentLoanApplication[] = [
  {
    applicationId: 'GSF-2026-00101',
    studentId: 'student-101',
    leadId: 'lead-101',
    fullName: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    mobile: '+919876543210',
    country: 'United States',
    university: 'Northeastern University',
    course: 'MS in Computer Science',
    qualificationLevel: 'PG',
    intake: 'Fall 2026',
    admissionStatus: 'CONFIRMED',
    loanAmount: 6500000,
    address: '42 MG Road, Indiranagar, Bengaluru, Karnataka 560038',
    applicationStatus: 'UNDER_REVIEW',
    loanStatus: 'PROCESSING',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialStudentUpdates: StudentUpdateItem[] = [
  {
    id: 'update-101-1',
    applicationId: 'GSF-2026-00101',
    studentId: 'student-101',
    date: new Date().toISOString().split('T')[0],
    title: 'Application Under Review',
    description: 'Your application is currently under review by the GSF credit assessment team.',
    createdAt: new Date().toISOString()
  }
];

export const initialStudentNotifications: StudentNotificationItem[] = [
  {
    id: 'snotif-101-1',
    applicationId: 'GSF-2026-00101',
    studentId: 'student-101',
    title: '🔔 Application Status Updated',
    message: 'Your application status is now Application Under Review.',
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

export const initialStudentDocuments: StudentDocumentItem[] = [
  {
    id: 'doc-101-1',
    applicationId: 'GSF-2026-00101',
    studentId: 'student-101',
    leadId: 'lead-101',
    documentName: 'Admission Letter',
    status: 'VERIFIED',
    visibleToStudent: true,
    updatedAt: new Date().toISOString()
  }
];

// Active Stores in Memory (Exported for direct access)
export let leadsStore: Lead[] = [...initialLeads];
export let notificationsStore: AdminNotification[] = [...initialNotifications];
export let studentsStore: StudentAccount[] = [...initialStudents];
export let applicationsStore: StudentLoanApplication[] = [...initialApplications];
export let studentUpdatesStore: StudentUpdateItem[] = [...initialStudentUpdates];
export let studentNotificationsStore: StudentNotificationItem[] = [...initialStudentNotifications];
export let studentDocumentsStore: StudentDocumentItem[] = [...initialStudentDocuments];
export interface BranchLocation {
  id: string;
  name: string;
  city: string;
  phone: string;
  rawPhone: string;
  address: string;
  timings: string;
  email: string;
  lat: number;
  lng: number;
}

export const initialBranches: BranchLocation[] = [
  {
    id: "Nellore-1 (Ramalinga Puram)",
    name: "Nellore-1 (Ramalinga Puram)",
    city: "Nellore",
    phone: "+91 98765 43210",
    rawPhone: "+919876543210",
    address: "Srivari Plaza, Circle, Ramalinga Puram, Nellore, Andhra Pradesh 524003, India",
    timings: "9:30 AM - 6:30 PM",
    email: "nellore@gsf.com",
    lat: 14.4455,
    lng: 79.9790
  },
  {
    id: "Nellore-2 (Magunta Layout)",
    name: "Nellore-2 (Magunta Layout)",
    city: "Nellore",
    phone: "+91 99887 76655",
    rawPhone: "+919988776655",
    address: "Near viswasai school, Central Avenue, Dargamitta, Magunta Layout, Nellore, Andhra Pradesh 524003, India",
    timings: "9:30 AM - 6:30 PM",
    email: "bangalore@gsf.com",
    lat: 14.4370,
    lng: 79.9780
  },
  {
    id: "Hyderabad",
    name: "Hyderabad",
    city: "Hyderabad",
    phone: "+91 91234 56789",
    rawPhone: "+919123456789",
    address: "Hitec City, Madhapur, Hyderabad, Telangana",
    timings: "9:30 AM - 6:30 PM",
    email: "hyderabad@gsf.com",
    lat: 17.4483,
    lng: 78.3741
  },
  {
    id: "Tirupati",
    name: "Tirupati",
    city: "Tirupati",
    phone: "+91 95544 33221",
    rawPhone: "+919554433221",
    address: "GSF, Mr.palli circle, road, near lenskart, fashion zone, Avilali, Andhra Pradesh 517502, India",
    timings: "9:30 AM - 6:30 PM",
    email: "vijayawada@gsf.com",
    lat: 13.6190,
    lng: 79.4095
  },
  {
    id: "chennai",
    name: "Chennai",
    city: "Chennai",
    phone: "+91 94433 22110",
    rawPhone: "+919443322110",
    address: "Anna Salai, T. Nagar, Chennai, Tamil Nadu",
    timings: "9:30 AM - 6:30 PM",
    email: "chennai@gsf.com",
    lat: 13.0418,
    lng: 80.2341
  }
];

export let cmsStore: Record<string, any> = {};

// Database Pool Connection (PostgreSQL or Disk File Storage)
let pool: Pool | null = null;
const dbFilePath = path.join(__dirname, '../../data/db.json');

if (process.env.DATABASE_URL) {
  console.log('🐘 PostgreSQL DATABASE_URL detected. Connecting to PostgreSQL...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  console.log('📁 Local storage path set for persistent JSON disk cache:', dbFilePath);
}

/**
 * Initialize Database Schema and Load Saved Data
 */
export async function initDatabase(): Promise<void> {
  if (pool) {
    try {
      // Create PostgreSQL Tables if they do not exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS gsf_leads (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_notifications (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_students (
          student_id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_applications (
          application_id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_student_updates (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_student_notifications (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gsf_student_documents (
          id VARCHAR(100) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Load existing records from PostgreSQL
      const leadsRes = await pool.query('SELECT data FROM gsf_leads');
      if (leadsRes.rows.length > 0) {
        leadsStore.length = 0;
        leadsRes.rows.forEach(r => leadsStore.push(r.data));
      } else {
        await saveDatabase(); // Seed PostgreSQL
      }

      const notifRes = await pool.query('SELECT data FROM gsf_notifications');
      if (notifRes.rows.length > 0) {
        notificationsStore.length = 0;
        notifRes.rows.forEach(r => notificationsStore.push(r.data));
      }

      const studentsRes = await pool.query('SELECT data FROM gsf_students');
      if (studentsRes.rows.length > 0) {
        studentsStore.length = 0;
        studentsRes.rows.forEach(r => studentsStore.push(r.data));
      }

      const appsRes = await pool.query('SELECT data FROM gsf_applications');
      if (appsRes.rows.length > 0) {
        applicationsStore.length = 0;
        appsRes.rows.forEach(r => applicationsStore.push(r.data));
      }

      const updatesRes = await pool.query('SELECT data FROM gsf_student_updates');
      if (updatesRes.rows.length > 0) {
        studentUpdatesStore.length = 0;
        updatesRes.rows.forEach(r => studentUpdatesStore.push(r.data));
      }

      const sNotifRes = await pool.query('SELECT data FROM gsf_student_notifications');
      if (sNotifRes.rows.length > 0) {
        studentNotificationsStore.length = 0;
        sNotifRes.rows.forEach(r => studentNotificationsStore.push(r.data));
      }

      const docsRes = await pool.query('SELECT data FROM gsf_student_documents');
      if (docsRes.rows.length > 0) {
        studentDocumentsStore.length = 0;
        docsRes.rows.forEach(r => studentDocumentsStore.push(r.data));
      }

      console.log('✅ PostgreSQL Schema initialized and persistent state loaded.');
    } catch (err) {
      console.error('❌ PostgreSQL Initialization Error:', err);
    }
  } else {
    // Disk File Persistence Fallback
    try {
      const dataDir = path.dirname(dbFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(dbFilePath)) {
        const fileContent = fs.readFileSync(dbFilePath, 'utf-8');
        const data = JSON.parse(fileContent);

        if (Array.isArray(data.leadsStore)) {
          leadsStore.length = 0;
          leadsStore.push(...data.leadsStore);
        }
        if (Array.isArray(data.notificationsStore)) {
          notificationsStore.length = 0;
          notificationsStore.push(...data.notificationsStore);
        }
        if (Array.isArray(data.studentsStore)) {
          studentsStore.length = 0;
          studentsStore.push(...data.studentsStore);
        }
        if (Array.isArray(data.applicationsStore)) {
          applicationsStore.length = 0;
          applicationsStore.push(...data.applicationsStore);
        }
        if (Array.isArray(data.studentUpdatesStore)) {
          studentUpdatesStore.length = 0;
          studentUpdatesStore.push(...data.studentUpdatesStore);
        }
        if (Array.isArray(data.studentNotificationsStore)) {
          studentNotificationsStore.length = 0;
          studentNotificationsStore.push(...data.studentNotificationsStore);
        }
        if (Array.isArray(data.studentDocumentsStore)) {
          studentDocumentsStore.length = 0;
          studentDocumentsStore.push(...data.studentDocumentsStore);
        }
        if (data.cmsStore) {
          Object.assign(cmsStore, data.cmsStore);
        }
        if (!cmsStore.branches) {
          cmsStore.branches = [...initialBranches];
          await saveDatabase();
        }

        console.log('✅ Local persistent JSON disk database loaded successfully.');
      } else {
        cmsStore.branches = [...initialBranches];
        await saveDatabase(); // Seed initial JSON file
        console.log('✅ Local persistent JSON disk database seeded successfully.');
      }
    } catch (err) {
      console.error('❌ Local Storage Initialization Error:', err);
    }
  }
}

/**
 * Persist Current Memory State to PostgreSQL / Local Disk File
 */
export async function saveDatabase(): Promise<void> {
  if (pool) {
    try {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Upsert Leads
        for (const item of leadsStore) {
          await client.query(
            'INSERT INTO gsf_leads (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [item.id, JSON.stringify(item)]
          );
        }

        // Upsert Notifications
        for (const item of notificationsStore) {
          await client.query(
            'INSERT INTO gsf_notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [item.id, JSON.stringify(item)]
          );
        }

        // Upsert Students
        for (const item of studentsStore) {
          await client.query(
            'INSERT INTO gsf_students (student_id, data) VALUES ($1, $2) ON CONFLICT (student_id) DO UPDATE SET data = EXCLUDED.data',
            [item.studentId, JSON.stringify(item)]
          );
        }

        // Upsert Applications
        for (const item of applicationsStore) {
          await client.query(
            'INSERT INTO gsf_applications (application_id, data) VALUES ($1, $2) ON CONFLICT (application_id) DO UPDATE SET data = EXCLUDED.data',
            [item.applicationId, JSON.stringify(item)]
          );
        }

        // Upsert Student Updates
        for (const item of studentUpdatesStore) {
          await client.query(
            'INSERT INTO gsf_student_updates (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [item.id, JSON.stringify(item)]
          );
        }

        // Upsert Student Notifications
        for (const item of studentNotificationsStore) {
          await client.query(
            'INSERT INTO gsf_student_notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [item.id, JSON.stringify(item)]
          );
        }

        // Upsert Student Documents
        for (const item of studentDocumentsStore) {
          await client.query(
            'INSERT INTO gsf_student_documents (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [item.id, JSON.stringify(item)]
          );
        }

        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Error saving to PostgreSQL transaction:', err);
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('❌ PostgreSQL Save Connection Error:', err);
    }
  } else {
    // Save to disk JSON file
    try {
      const dataDir = path.dirname(dbFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const snapshot = {
        leadsStore,
        notificationsStore,
        studentsStore,
        applicationsStore,
        studentUpdatesStore,
        studentNotificationsStore,
        studentDocumentsStore,
        cmsStore
      };

      fs.writeFileSync(dbFilePath, JSON.stringify(snapshot, null, 2), 'utf-8');
    } catch (err) {
      console.error('❌ Error saving local JSON disk file:', err);
    }
  }
}
