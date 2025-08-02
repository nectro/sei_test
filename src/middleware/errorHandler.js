const { logError } = require('../utils/logger');
const { generateTwiML } = require('../utils/twimlGenerator');

/**
 * Global error handler middleware for voice endpoints
 */
function errorHandler(err, req, res, next) {
  logError('Unhandled error in voice endpoint', err);

  // For voice endpoints, always return TwiML error response
  if (req.path.startsWith('/voice/')) {
    const errorTwiML = generateTwiML('endCall');
    res.set('Content-Type', 'text/xml');
    res.status(500).send(errorTwiML);
  } else {
    // For other endpoints, return JSON error
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
}

module.exports = errorHandler;