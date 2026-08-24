"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentDocumentsStore = exports.studentNotificationsStore = exports.studentUpdatesStore = exports.applicationsStore = exports.studentsStore = exports.notificationsStore = exports.leadsStore = exports.initialStudentDocuments = exports.initialStudentNotifications = exports.initialStudentUpdates = exports.initialApplications = exports.initialStudents = exports.initialNotifications = exports.initialLeads = exports.initialAdmins = void 0;
exports.initDatabase = initDatabase;
exports.saveDatabase = saveDatabase;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pg_1 = require("pg");
// Initial Seeds
exports.initialAdmins = [
    {
        id: 'admin-1',
        name: 'Senior Finance Admin',
        email: 'admin@gsf.com',
        role: 'SuperAdmin',
        createdAt: new Date().toISOString()
    },
    {
        id: 'admin-2',
        name: 'Counselor Priya',
        email: 'priya@gsf.com',
        role: 'Counselor',
        createdAt: new Date().toISOString()
    }
];
exports.initialLeads = [
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
        status: 'Application Submitted',
        source: 'GSF Website',
        campaign: 'US STEM Fall 2026',
        assignedEmployee: 'Anand V.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        activities: [
            {
                id: 'act-1',
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
                id: 'fol-1',
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
exports.initialNotifications = [
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
exports.initialStudents = [
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
exports.initialApplications = [
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
exports.initialStudentUpdates = [
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
exports.initialStudentNotifications = [
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
exports.initialStudentDocuments = [
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
exports.leadsStore = [...exports.initialLeads];
exports.notificationsStore = [...exports.initialNotifications];
exports.studentsStore = [...exports.initialStudents];
exports.applicationsStore = [...exports.initialApplications];
exports.studentUpdatesStore = [...exports.initialStudentUpdates];
exports.studentNotificationsStore = [...exports.initialStudentNotifications];
exports.studentDocumentsStore = [...exports.initialStudentDocuments];
// Database Pool Connection (PostgreSQL or Disk File Storage)
let pool = null;
const dbFilePath = path_1.default.join(__dirname, '../../data/db.json');
if (process.env.DATABASE_URL) {
    console.log('🐘 PostgreSQL DATABASE_URL detected. Connecting to PostgreSQL...');
    pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
}
else {
    console.log('📁 Local storage path set for persistent JSON disk cache:', dbFilePath);
}
/**
 * Initialize Database Schema and Load Saved Data
 */
async function initDatabase() {
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
                exports.leadsStore.length = 0;
                leadsRes.rows.forEach(r => exports.leadsStore.push(r.data));
            }
            else {
                await saveDatabase(); // Seed PostgreSQL
            }
            const notifRes = await pool.query('SELECT data FROM gsf_notifications');
            if (notifRes.rows.length > 0) {
                exports.notificationsStore.length = 0;
                notifRes.rows.forEach(r => exports.notificationsStore.push(r.data));
            }
            const studentsRes = await pool.query('SELECT data FROM gsf_students');
            if (studentsRes.rows.length > 0) {
                exports.studentsStore.length = 0;
                studentsRes.rows.forEach(r => exports.studentsStore.push(r.data));
            }
            const appsRes = await pool.query('SELECT data FROM gsf_applications');
            if (appsRes.rows.length > 0) {
                exports.applicationsStore.length = 0;
                appsRes.rows.forEach(r => exports.applicationsStore.push(r.data));
            }
            const updatesRes = await pool.query('SELECT data FROM gsf_student_updates');
            if (updatesRes.rows.length > 0) {
                exports.studentUpdatesStore.length = 0;
                updatesRes.rows.forEach(r => exports.studentUpdatesStore.push(r.data));
            }
            const sNotifRes = await pool.query('SELECT data FROM gsf_student_notifications');
            if (sNotifRes.rows.length > 0) {
                exports.studentNotificationsStore.length = 0;
                sNotifRes.rows.forEach(r => exports.studentNotificationsStore.push(r.data));
            }
            const docsRes = await pool.query('SELECT data FROM gsf_student_documents');
            if (docsRes.rows.length > 0) {
                exports.studentDocumentsStore.length = 0;
                docsRes.rows.forEach(r => exports.studentDocumentsStore.push(r.data));
            }
            console.log('✅ PostgreSQL Schema initialized and persistent state loaded.');
        }
        catch (err) {
            console.error('❌ PostgreSQL Initialization Error:', err);
        }
    }
    else {
        // Disk File Persistence Fallback
        try {
            const dataDir = path_1.default.dirname(dbFilePath);
            if (!fs_1.default.existsSync(dataDir)) {
                fs_1.default.mkdirSync(dataDir, { recursive: true });
            }
            if (fs_1.default.existsSync(dbFilePath)) {
                const fileContent = fs_1.default.readFileSync(dbFilePath, 'utf-8');
                const data = JSON.parse(fileContent);
                if (Array.isArray(data.leadsStore)) {
                    exports.leadsStore.length = 0;
                    exports.leadsStore.push(...data.leadsStore);
                }
                if (Array.isArray(data.notificationsStore)) {
                    exports.notificationsStore.length = 0;
                    exports.notificationsStore.push(...data.notificationsStore);
                }
                if (Array.isArray(data.studentsStore)) {
                    exports.studentsStore.length = 0;
                    exports.studentsStore.push(...data.studentsStore);
                }
                if (Array.isArray(data.applicationsStore)) {
                    exports.applicationsStore.length = 0;
                    exports.applicationsStore.push(...data.applicationsStore);
                }
                if (Array.isArray(data.studentUpdatesStore)) {
                    exports.studentUpdatesStore.length = 0;
                    exports.studentUpdatesStore.push(...data.studentUpdatesStore);
                }
                if (Array.isArray(data.studentNotificationsStore)) {
                    exports.studentNotificationsStore.length = 0;
                    exports.studentNotificationsStore.push(...data.studentNotificationsStore);
                }
                if (Array.isArray(data.studentDocumentsStore)) {
                    exports.studentDocumentsStore.length = 0;
                    exports.studentDocumentsStore.push(...data.studentDocumentsStore);
                }
                console.log('✅ Local persistent JSON disk database loaded successfully.');
            }
            else {
                await saveDatabase(); // Seed initial JSON file
                console.log('✅ Local persistent JSON disk database seeded successfully.');
            }
        }
        catch (err) {
            console.error('❌ Local Storage Initialization Error:', err);
        }
    }
}
/**
 * Persist Current Memory State to PostgreSQL / Local Disk File
 */
async function saveDatabase() {
    if (pool) {
        try {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                // Upsert Leads
                for (const item of exports.leadsStore) {
                    await client.query('INSERT INTO gsf_leads (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [item.id, JSON.stringify(item)]);
                }
                // Upsert Notifications
                for (const item of exports.notificationsStore) {
                    await client.query('INSERT INTO gsf_notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [item.id, JSON.stringify(item)]);
                }
                // Upsert Students
                for (const item of exports.studentsStore) {
                    await client.query('INSERT INTO gsf_students (student_id, data) VALUES ($1, $2) ON CONFLICT (student_id) DO UPDATE SET data = EXCLUDED.data', [item.studentId, JSON.stringify(item)]);
                }
                // Upsert Applications
                for (const item of exports.applicationsStore) {
                    await client.query('INSERT INTO gsf_applications (application_id, data) VALUES ($1, $2) ON CONFLICT (application_id) DO UPDATE SET data = EXCLUDED.data', [item.applicationId, JSON.stringify(item)]);
                }
                // Upsert Student Updates
                for (const item of exports.studentUpdatesStore) {
                    await client.query('INSERT INTO gsf_student_updates (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [item.id, JSON.stringify(item)]);
                }
                // Upsert Student Notifications
                for (const item of exports.studentNotificationsStore) {
                    await client.query('INSERT INTO gsf_student_notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [item.id, JSON.stringify(item)]);
                }
                // Upsert Student Documents
                for (const item of exports.studentDocumentsStore) {
                    await client.query('INSERT INTO gsf_student_documents (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data', [item.id, JSON.stringify(item)]);
                }
                await client.query('COMMIT');
            }
            catch (err) {
                await client.query('ROLLBACK');
                console.error('❌ Error saving to PostgreSQL transaction:', err);
            }
            finally {
                client.release();
            }
        }
        catch (err) {
            console.error('❌ PostgreSQL Save Connection Error:', err);
        }
    }
    else {
        // Save to disk JSON file
        try {
            const dataDir = path_1.default.dirname(dbFilePath);
            if (!fs_1.default.existsSync(dataDir)) {
                fs_1.default.mkdirSync(dataDir, { recursive: true });
            }
            const snapshot = {
                leadsStore: exports.leadsStore,
                notificationsStore: exports.notificationsStore,
                studentsStore: exports.studentsStore,
                applicationsStore: exports.applicationsStore,
                studentUpdatesStore: exports.studentUpdatesStore,
                studentNotificationsStore: exports.studentNotificationsStore,
                studentDocumentsStore: exports.studentDocumentsStore
            };
            fs_1.default.writeFileSync(dbFilePath, JSON.stringify(snapshot, null, 2), 'utf-8');
        }
        catch (err) {
            console.error('❌ Error saving local JSON disk file:', err);
        }
    }
}
