require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());

// CORS configuration
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:8080';
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // In local development, check allowed origin
    if (origin === allowedOrigin || allowedOrigin === '*' || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Parse body params
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Register API Routes
app.use('/api', apiRoutes);

// Fallback route for 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);

  const isProduction = process.env.NODE_ENV === 'production';
  
  // Custom CORS error handling
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Blocked by CORS configuration.'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: isProduction ? {} : { message: err.message }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Aurelia Jewellery API Server Started!`);
  console.log(` Port: ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Allowed Origin: ${allowedOrigin}`);
  console.log(`=========================================`);
});
