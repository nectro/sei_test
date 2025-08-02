/**
 * Unified Configuration
 * Separates environment variables from application constants
 */

require('dotenv').config();

// ================================
// ENVIRONMENT VARIABLES (configurable per deployment)
// ================================
const environment = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Twilio (secrets)
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  
  // Voice Agent (deployment specific)
  AGENT_PHONE_NUMBER: process.env.AGENT_PHONE_NUMBER || '+1234567890',
  
  // Supabase (secrets)
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  
  // Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

// ================================
// APPLICATION CONSTANTS (never change)
// ================================
const constants = {
  // Voice Settings
  VOICE: 'alice',
  LANGUAGE: 'en-US',
  
  // Speech Recognition
  SPEECH_CONFIDENCE_THRESHOLD: 0.4,
  SPEECH_TIMEOUT: 3,
  GATHER_TIMEOUT: 10,
  
  // Call Flow
  DIAL_TIMEOUT: 30,
  
  // Application
  APP_NAME: 'InstaCall',
  APP_DESCRIPTION: 'AI Voice Assistant for automated customer support',
  SUPPORT_TYPE: '24/7'
};

// ================================
// VALIDATION
// ================================
function validateEnvironment() {
  const optional = ['TWILIO_AUTH_TOKEN', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = [];
  
  optional.forEach(key => {
    if (!environment[key]) {
      missing.push(key);
    }
  });
  
  if (missing.length > 0) {
    console.warn(`⚠️ Missing optional environment variables: ${missing.join(', ')}`);
    console.warn('The application will use default values where possible.');
  }
  
  // Log configuration in development
  if (environment.NODE_ENV === 'development') {
    console.log('📋 Unified Configuration:');
    console.log(`   PORT: ${environment.PORT}`);
    console.log(`   NODE_ENV: ${environment.NODE_ENV}`);
    console.log(`   TWILIO_AUTH_TOKEN: ${environment.TWILIO_AUTH_TOKEN ? '***configured***' : 'not set'}`);
    console.log(`   AGENT_PHONE_NUMBER: ${environment.AGENT_PHONE_NUMBER}`);
    console.log(`   SUPABASE_URL: ${environment.SUPABASE_URL ? 'configured' : 'not set'}`);
  }
}

validateEnvironment();

// ================================
// UNIFIED EXPORT
// ================================
module.exports = {
  ...environment,
  ...constants,
  
  // Environment check helpers
  isDevelopment: environment.NODE_ENV === 'development',
  isProduction: environment.NODE_ENV === 'production'
};