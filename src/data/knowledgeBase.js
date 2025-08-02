/**
 * Simple Knowledge Base for Voice Agent
 */

const knowledgeBase = {
  // Company Information
  company: {
    questions: [
      'what is instacall',
      'tell me about your company',
      'who are you',
      'what does instacall do',
      'what is your business',
      'about your company'
    ],
    keywords: ['company', 'business', 'about', 'who', 'instacall'],
    answer: 'InstaCall is an AI voice assistant that helps with customer support. We provide automated phone assistance for businesses.'
  },

  // Availability
  availability: {
    questions: [
      'what are your hours',
      'when are you open',
      'are you open now',
      'what time do you close',
      'when can i call',
      'are you available'
    ],
    keywords: ['hours', 'open', 'closed', 'time', 'when', 'available'],
    answer: 'We provide 24/7 support. Our voice assistant and agents are available around the clock to help you.'
  },

  // Contact & Support
  support: {
    questions: [
      'can you help me',
      'i need help',
      'can i speak to someone',
      'i want to talk to an agent',
      'connect me to a person',
      'transfer me to support'
    ],
    keywords: ['help', 'support', 'assist', 'agent', 'human', 'person'],
    answer: 'I can connect you with one of our agents for personalized assistance. Would you like me to transfer you now?'
  },

  // Technical Issues
  technical: {
    questions: [
      'i have a technical problem',
      'something is not working',
      'i need technical support',
      'there is an error',
      'my system is broken',
      'technical issue'
    ],
    keywords: ['technical', 'problem', 'issue', 'not working', 'error', 'broken'],
    answer: 'For technical issues, let me connect you with our technical support team who can help you immediately.'
  },

  // Emergency/Urgent
  urgent: {
    questions: [
      'this is an emergency',
      'i need help immediately',
      'this is urgent',
      'critical problem',
      'emergency support',
      'help me now'
    ],
    keywords: ['emergency', 'urgent', 'critical', 'immediately', 'asap', 'help'],
    answer: 'I understand this is urgent. Let me connect you with an agent right away.'
  },

  // Greetings
  greeting: {
    questions: [
      'hello',
      'hi',
      'hey',
      'good morning',
      'good afternoon',
      'good evening'
    ],
    keywords: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening'],
    answer: 'Hello! I can help you with questions about our company, services, or connect you with an agent. We are available 24/7. What do you need?'
  }
};

module.exports = { knowledgeBase };