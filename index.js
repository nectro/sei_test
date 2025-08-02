const express = require('express');
const cors = require('cors');
const config = require('./src/config/environment');

// Import routes
const voiceRoutes = require('./src/routes/voice');

// Import middleware
const requestLogger = require('./src/middleware/requestLogger');
const errorHandler = require('./src/middleware/errorHandler');
const validateTwilioSignature = require('./src/middleware/validateTwilio');

// Import utilities
const { logInfo } = require('./src/utils/logger');

const app = express();

// Global middleware
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (log all requests)
app.use(requestLogger);

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to InstaCall API',
    status: 'Server is running successfully',
    version: '2.0.0',
    environment: config.NODE_ENV,
    port: config.PORT
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '2.0.0'
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'InstaCall Voice API',
    version: '2.0.0',
    description: 'AI-powered voice assistant for automated customer support',
    endpoints: {
      voice: '/voice/*',
      health: '/health',
      info: '/api/info'
    },
    features: [
      'Smart voice responses',
      'Supabase knowledge base',
      'Question & keyword matching',
      'Agent transfer',
      '24/7 support'
    ]
  });
});

// Twilio webhook validation for voice endpoints
app.use('/voice', validateTwilioSignature);

// Voice routes
app.use('/voice', voiceRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The endpoint ${req.method} ${req.path} was not found.`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/info',
      'POST /voice/greeting',
      'POST /voice/process-input',
      'POST /voice/transfer-agent'
    ]
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  logInfo('Server started successfully', {
    port: config.PORT,
    environment: config.NODE_ENV,
    version: '2.0.0'
  });
  
  console.log(`🚀 InstaCall Voice API v2.0.0`);
  console.log(`📍 Server running at: http://localhost:${config.PORT}`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
  console.log(`📊 Health check: http://localhost:${config.PORT}/health`);
  console.log(`📋 API info: http://localhost:${config.PORT}/api/info`);
});

module.exports = app;