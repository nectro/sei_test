/**
 * Logging utilities for voice application
 */

function logCall(message, data = {}) {
  console.log(`📞 ${message}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
}

function logSpeech(message, data = {}) {
  console.log(`🎤 ${message}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
}

function logTransfer(message, data = {}) {
  console.log(`📞 ${message}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
}

function logError(message, error = null) {
  const logData = {
    timestamp: new Date().toISOString()
  };

  if (error) {
    logData.error = error.message || error.toString();
    logData.stack = error.stack;
  }

  console.error(`❌ ${message}:`, logData);
}

function logInfo(message, data = {}) {
  console.log(`ℹ️ ${message}:`, {
    timestamp: new Date().toISOString(),
    ...data
  });
}

module.exports = {
  logCall,
  logSpeech,
  logTransfer,
  logError,
  logInfo
};