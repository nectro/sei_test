const config = require('../config/constants');

/**
 * Generate TwiML responses for different voice scenarios
 * @param {string} type - The type of TwiML response to generate
 * @param {object} data - Additional data for dynamic content
 * @returns {string} - TwiML XML response
 */
function generateTwiML(type, data = {}) {
  const templates = {
    greeting: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        Hello! Welcome to InstaCall. This is your AI voice assistant. 
        I'm here to help you with your queries.
    </Say>
    <Gather input="speech" action="/voice/process-input" method="POST" speechTimeout="3" timeout="10">
        <Say voice="${config.VOICE}" language="${config.LANGUAGE}">Please tell me how I can help you.</Say>
    </Gather>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">I wasn’t able to hear anything. Please feel free to call back at your convenience..</Say>
    <Hangup/>
</Response>`,

    continueWithAiAgent: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="/voice/process-input" method="POST" speechTimeout="3" timeout="10">
        <Say voice="${config.VOICE}" language="${config.LANGUAGE}">Please tell me how I can help you.</Say>
    </Gather>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">I wasn’t able to hear anything. Please feel free to call back at your convenience..</Say>
    <Hangup/>
</Response>`,

    transferToAgent: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        Transferring you to an available agent. Please hold.
    </Say>
    <Dial timeout="30" record="record-from-answer">
        <Number>${config.AGENT_PHONE_NUMBER}</Number>
    </Dial>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        I'm sorry, all agents are currently busy. Please try calling back later.
    </Say>
    <Hangup/>
</Response>`,

    endCall: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        Thank you for calling InstaCall. Have a great day!
    </Say>
    <Hangup/>
</Response>`,

    // Knowledge Base Response Templates
    aiResponse: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        ${data.answer || 'I apologize, but I cannot process your request right now.'}
    </Say>
    <Pause length="1"/>
    <Gather input="speech" action="/voice/process-input" method="POST" speechTimeout="3" timeout="10" enhanced="true">
        <Say voice="${config.VOICE}" language="${config.LANGUAGE}">${data.followUp || 'Is there anything else I can help you with?'}</Say>
    </Gather>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">Thank you for calling InstaCall. Have a great day!</Say>
    <Hangup/>
</Response>`,

    aiResponseWithTransfer: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="${config.VOICE}" language="${config.LANGUAGE}">
        ${data.answer || 'I understand you need assistance.'}
    </Say>
    <Pause length="1"/>
    <Gather input="dtmf" numDigits="1" action="/voice/transfer-agent" method="POST" timeout="10">
        <Say voice="${config.VOICE}" language="${config.LANGUAGE}">Press 1 to speak with an agent, or press 2 to continue with me.</Say>
    </Gather>
    <Redirect>/voice/transfer-agent</Redirect>
</Response>`,
  };

  return templates[type] || templates.endCall;
}

module.exports = { generateTwiML };