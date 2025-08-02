const { logInfo } = require('../utils/logger');

/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  
  // Log incoming request
  logInfo('Incoming request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    callSid: req.body?.CallSid || null
  });

  // Log response when it finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    logInfo('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      callSid: req.body?.CallSid || null
    });
  });

  next();
}

module.exports = requestLogger;