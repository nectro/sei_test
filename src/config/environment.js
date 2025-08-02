/**
 * Environment configuration and validation
 */

require('dotenv').config();

const config = {
  // Server settings
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Twilio settings
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  
  // Agent settings
  AGENT_PHONE_NUMBER: process.env.AGENT_PHONE_NUMBER || '+1234567890',
  
  // Audio settings
  HOLD_MUSIC_URL: process.env.HOLD_MUSIC_URL || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // CORS settings
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

// Validate required environment variables
function validateEnvironment() {
  const required = [];
  const missing = [];

  // Check for missing required variables
  required.forEach(key => {
    if (!config[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.warn(`⚠️ Missing optional environment variables: ${missing.join(', ')}`);
    console.warn('The application will use default values.');
  }

  // Log configuration in development
  if (config.NODE_ENV === 'development') {
    console.log('📋 Environment Configuration:');
    console.log(`   PORT: ${config.PORT}`);
    console.log(`   NODE_ENV: ${config.NODE_ENV}`);
    console.log(`   TWILIO_AUTH_TOKEN: ${config.TWILIO_AUTH_TOKEN ? '***configured***' : 'not set'}`);
    console.log(`   AGENT_PHONE_NUMBER: ${config.AGENT_PHONE_NUMBER}`);
  }
}

validateEnvironment();

module.exports = config;