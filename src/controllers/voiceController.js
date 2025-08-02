const { generateTwiML } = require('../utils/twimlGenerator');
const { logCall, logSpeech, logTransfer } = require('../utils/logger');
const config = require('../config');
const AIService = require('../services/aiService');

class VoiceController {
  // Main greeting endpoint for incoming calls
  static greeting(req, res) {
    logCall('Incoming call received', {
      callSid: req.body.CallSid,
      from: req.body.From,
      to: req.body.To,
      fromCity: req.body.FromCity,
      fromState: req.body.FromState,
      fromCountry: req.body.FromCountry
    });

    const twiml = generateTwiML('greeting');
    res.set('Content-Type', 'text/xml');
    res.send(twiml);
  }

  // Process speech input from caller
  static async processInput(req, res) {
    const speechResult = req.body.SpeechResult || '';
    const confidence = parseFloat(req.body.Confidence || 0);

    logSpeech('Speech input received', {
      speechResult,
      confidence,
      callSid: req.body.CallSid
    });

    // Process input with knowledge base (async)
    const aiResponse = await AIService.processUserInput(speechResult, confidence);
    const formattedResponse = AIService.formatResponseForTwiML(aiResponse);

    let twimlType;
    let twimlData = formattedResponse;

    // Choose response type
    if (confidence < config.SPEECH_CONFIDENCE_THRESHOLD) {
      twimlType = 'aiResponseWithTransfer';
      twimlData = {
        answer: 'I could not understand you clearly. Let me connect you with an agent.',
        needsAgent: true
      };
    } else if (aiResponse.needsAgent) {
      twimlType = 'aiResponseWithTransfer';
    } else {
      twimlType = 'aiResponse';
    }

    const twiml = generateTwiML(twimlType, twimlData);
    res.set('Content-Type', 'text/xml');
    res.send(twiml);
  }

  // Handle agent transfer
  static transferAgent(req, res) {
    const digits = req.body.Digits;
    
    logTransfer('Transfer request', { 
      digits, 
      reqBody: req.body,
      callSid: req.body.CallSid 
    });

    const twimlType = digits === '0' ? 'endCall' : digits === '2' ? 'continueWithAiAgent' : 'endCall';
    const twiml = generateTwiML(twimlType);
    res.set('Content-Type', 'text/xml');
    res.send(twiml);
  }
}

module.exports = VoiceController;