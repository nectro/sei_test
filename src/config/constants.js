/**
 * Configuration constants for the voice application
 */

module.exports = {
  // Twilio voice settings
  VOICE: 'alice',
  LANGUAGE: 'en-US',
  
  // Speech recognition settings
  SPEECH_CONFIDENCE_THRESHOLD: 0.2,
  SPEECH_TIMEOUT: 3,
  GATHER_TIMEOUT: 10,
  
  // Recording settings
  MAX_RECORDING_LENGTH: 60,
  RECORDING_TIMEOUT: 10,
  FINISH_ON_KEY: '#',
  
  // Agent settings
  AGENT_PHONE_NUMBER: process.env.AGENT_PHONE_NUMBER || '+1234567890',
  DIAL_TIMEOUT: 30,
  
  // Audio settings
  HOLD_MUSIC_URL: process.env.HOLD_MUSIC_URL || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  
  // Support settings
  SUPPORT_TYPE: '24/7',
  
  // App settings
  APP_NAME: 'InstaCall',
  APP_DESCRIPTION: 'AI Voice Assistant for automated customer support'
};