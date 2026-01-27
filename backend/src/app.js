const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const mlService = require('./services/ml.service');
const { errorHandler } = require('./utils/error-handler');
const logger = require('./utils/logger');

const adminRoutes = require('./routes/admin.routes');
const taskRoutes = require('./routes/task.routes');
const leaveRoutes = require('./routes/leave.routes');
const skillRoutes = require('./routes/skill.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const salaryRoutes = require('./routes/salary.routes');
const notificationRoutes = require('./routes/notification.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging Middleware
app.use(morgan('dev'));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//  API ROUTES (must come before static files)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', adminRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ml', require('./routes/ml.routes'));

// API Health check endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health/ml-service', async (req, res) => {
  try {
    const health = await mlService.checkMLServiceHealth();
    res.status(health.healthy ? 200 : 503).json(health);
  } catch (error) {
    logger.error('ML Service health check failed', { error: error.message });
    res.status(503).json({
      success: false,
      healthy: false,
      message: 'Unable to check ML service health',
      error: error.message
    });
  }
});

// Serve static frontend files (after API routes)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Redirect root to homepage
app.get('/', (req, res) => {
  res.redirect('/1-homepage/index.html');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health/ml-service', async (req, res) => {
  try {
    const health = await mlService.checkMLServiceHealth();
    res.status(health.healthy ? 200 : 503).json(health);
  } catch (error) {
    logger.error('ML Service health check failed', { error: error.message });
    res.status(503).json({
      success: false,
      healthy: false,
      message: 'Unable to check ML service health',
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    code: 'ROUTE_NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
