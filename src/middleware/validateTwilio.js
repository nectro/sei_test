const crypto = require('crypto');
const { logError } = require('../utils/logger');

/**
 * Middleware to validate Twilio webhook signatures
 * This ensures requests are actually from Twilio
 */
function validateTwilioSignature(req, res, next) {
  // Skip validation in development if no auth token is set
  if (process.env.NODE_ENV === 'development' && !process.env.TWILIO_AUTH_TOKEN) {
    return next();
  }

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    logError('Twilio auth token not configured - server configuration error');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const twilioSignature = req.get('X-Twilio-Signature');
  if (!twilioSignature) {
    logError('Missing Twilio signature header - request rejected');
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Get the full URL
  const protocol = req.get('X-Forwarded-Proto') || req.protocol;
  const host = req.get('Host');
  const url = `${protocol}://${host}${req.originalUrl}`;

  // Create the expected signature
  const expectedSignature = crypto
    .createHmac('sha1', authToken)
    .update(Buffer.concat([
      Buffer.from(url, 'utf-8'),
      Buffer.from(req.rawBody || '', 'utf-8')
    ]))
    .digest('base64');

  const computedSignature = `sha1=${expectedSignature}`;

  if (computedSignature !== twilioSignature) {
    logError(`Invalid Twilio signature - Expected: ${computedSignature}, Received: ${twilioSignature}, URL: ${url}`);
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

module.exports = validateTwilioSignature;