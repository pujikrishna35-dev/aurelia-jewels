import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import dashboardRoutes from './routes/dashboard.routes';
import followupRoutes from './routes/followup.routes';
import notificationRoutes from './routes/notification.routes';
import otpRoutes from './routes/otp.routes';
import settingsRoutes from './routes/settings.routes';
import studentRoutes from './routes/student.routes';
import cmsRoutes from './routes/cms.routes';
import analyticsRoutes from './routes/analytics.routes';
import branchRoutes from './routes/branch.routes';
import { setSocketServer } from './services/notification.service';
import { initDatabase } from './config/database';
import { verifyToken } from './utils/jwt';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = '127.0.0.1';

const server = http.createServer(app);

// Production & Local Development CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.CLIENT_URL,
  process.env.PUBLIC_WEBSITE_URL,
  process.env.ADMIN_DASHBOARD_URL
].filter((origin): origin is string => Boolean(origin));

const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) return true; // non-browser clients (curl, mobile apps, server-to-server)
  if (process.env.NODE_ENV !== 'production') return true;
  return allowedOrigins.includes(origin);
};

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      // Previously this branch also called callback(null, true), which meant
      // the allowlist above had no actual effect and every origin was
      // accepted in production. This now genuinely rejects unknown origins.
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Pass Socket.IO instance to notification service
setSocketServer(io);

// Require a valid admin session token to open a socket connection.
// Previously any client — from any origin, with no login at all — could
// connect and receive the live "new_notification" stream, which includes
// student names, destinations and universities.
io.use((socket, next) => {
  const token = socket.handshake.auth?.token as string | undefined;
  if (!token) {
    return next(new Error('Authentication required.'));
  }
  try {
    verifyToken(token);
    next();
  } catch (err) {
    next(new Error('Invalid or expired session.'));
  }
});

io.on('connection', (socket) => {
  console.log(`⚡ Admin client connected to WebSocket: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// API Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api', leadRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', followupRoutes);
app.use('/api', notificationRoutes);
app.use('/api', otpRoutes);
app.use('/api', settingsRoutes);
app.use('/api', studentRoutes);

app.get(['/', '/api'], (req, res) => {
  res.json({
    status: 'OK',
    system: 'GSF Global Scholar Finance Backend API',
    message: 'Welcome to GSF REST API',
    endpoints: {
      health: 'GET /api/health',
      authLogin: 'POST /api/auth/login',
      dashboardStats: 'GET /api/dashboard/stats',
      leads: 'GET /api/leads',
      leadSubmission: 'POST /api/leads',
      otpSend: 'POST /api/otp/send',
      otpVerify: 'POST /api/otp/verify',
      followUps: 'GET /api/follow-ups',
      notifications: 'GET /api/notifications'
    }
  });
});

// Health check endpoint for Railway deployment monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'GSF Global Scholar Finance API',
    timestamp: new Date().toISOString()
  });
});

initDatabase().then(() => {
  server.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`🚀 GSF Backend API running on http://${HOST}:${PORT}`);
    console.log(`⚡ Real-Time Socket.IO Server active`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
});
