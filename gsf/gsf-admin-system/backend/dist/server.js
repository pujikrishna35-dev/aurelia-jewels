"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const lead_routes_1 = __importDefault(require("./routes/lead.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const followup_routes_1 = __importDefault(require("./routes/followup.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const otp_routes_1 = __importDefault(require("./routes/otp.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const cms_routes_1 = __importDefault(require("./routes/cms.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const branch_routes_1 = __importDefault(require("./routes/branch.routes"));
const notification_service_1 = require("./services/notification.service");
const database_1 = require("./config/database");
const jwt_1 = require("./utils/jwt");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
const HOST = '127.0.0.1';
const server = http_1.default.createServer(app);
// Production & Local Development CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    process.env.CLIENT_URL,
    process.env.PUBLIC_WEBSITE_URL,
    process.env.ADMIN_DASHBOARD_URL
].filter((origin) => Boolean(origin));
const isOriginAllowed = (origin) => {
    if (!origin)
        return true; // non-browser clients (curl, mobile apps, server-to-server)
    if (process.env.NODE_ENV !== 'production')
        return true;
    return allowedOrigins.includes(origin);
};
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (isOriginAllowed(origin)) {
            callback(null, true);
        }
        else {
            // Previously this branch also called callback(null, true), which meant
            // the allowlist above had no actual effect and every origin was
            // accepted in production. This now genuinely rejects unknown origins.
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express_1.default.json());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (isOriginAllowed(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        credentials: true
    }
});
// Pass Socket.IO instance to notification service
(0, notification_service_1.setSocketServer)(io);
// Require a valid admin session token to open a socket connection.
// Previously any client — from any origin, with no login at all — could
// connect and receive the live "new_notification" stream, which includes
// student names, destinations and universities.
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error('Authentication required.'));
    }
    try {
        (0, jwt_1.verifyToken)(token);
        next();
    }
    catch (err) {
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
app.use('/api/auth', auth_routes_1.default);
app.use('/api/cms', cms_routes_1.default);
app.use('/api/analytics', analytics_routes_1.default);
app.use('/api/branches', branch_routes_1.default);
app.use('/api', lead_routes_1.default);
app.use('/api', dashboard_routes_1.default);
app.use('/api', followup_routes_1.default);
app.use('/api', notification_routes_1.default);
app.use('/api', otp_routes_1.default);
app.use('/api', settings_routes_1.default);
app.use('/api', student_routes_1.default);
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
(0, database_1.initDatabase)().then(() => {
    server.listen(PORT, HOST, () => {
        console.log(`=======================================================`);
        console.log(`🚀 GSF Backend API running on http://${HOST}:${PORT}`);
        console.log(`⚡ Real-Time Socket.IO Server active`);
        console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
        console.log(`=======================================================`);
    });
});
