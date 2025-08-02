/**
 * Simple AI Service for voice processing
 */

const { knowledgeBase } = require('../data/knowledgeBase');
const { logInfo } = require('../utils/logger');
const config = require('../config/constants');

class AIService {
  /**
   * Process user speech and find matching response
   */
  static processUserInput(speechInput, confidence = 0) {
    logInfo('Processing voice input', { speechInput, confidence });

    const cleanInput = speechInput.toLowerCase().trim();
    
    if (!cleanInput || confidence < config.SPEECH_CONFIDENCE_THRESHOLD) {
      return {
        topic: 'agent_transfer',
        answer: 'I did not understand that clearly. Let me connect you with an agent who can better assist you.',
        needsAgent: true
      };
    }

    return this.findBestMatch(cleanInput);
  }

  /**
   * Find best matching response using hierarchy: questions -> keywords -> agent transfer
   */
  static findBestMatch(input) {
    // Step 1: Try to match questions first
    const questionMatch = this.matchQuestions(input);
    if (questionMatch) {
      return questionMatch;
    }

    // Step 2: Try to match keywords
    const keywordMatch = this.matchKeywords(input);
    if (keywordMatch) {
      return keywordMatch;
    }

    // Step 3: No match found - transfer to agent
    return {
      topic: 'agent_transfer',
      answer: 'I could not find a specific answer to your question. Let me connect you with one of our agents who can help you better.',
      needsAgent: true
    };
  }

  /**
   * Match user input against questions
   */
  static matchQuestions(input) {
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (!data.questions) continue;

      // Check if input matches any question
      for (const question of data.questions) {
        if (this.calculateSimilarity(input, question) > 0.7) {
          return {
            topic,
            answer: data.answer,
            needsAgent: this.shouldTransferToAgent(topic)
          };
        }
      }
    }
    return null;
  }

  /**
   * Match user input against keywords
   */
  static matchKeywords(input) {
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (!data.keywords) continue;

      // Check if any keywords match
      for (const keyword of data.keywords) {
        if (input.includes(keyword)) {
          return {
            topic,
            answer: data.answer,
            needsAgent: this.shouldTransferToAgent(topic)
          };
        }
      }
    }
    return null;
  }

  /**
   * Calculate similarity between user input and predefined question
   */
  static calculateSimilarity(input, question) {
    const inputWords = input.split(' ');
    const questionWords = question.toLowerCase().split(' ');
    
    let matchedWords = 0;
    for (const word of inputWords) {
      if (questionWords.includes(word)) {
        matchedWords++;
      }
    }
    
    return matchedWords / Math.max(inputWords.length, questionWords.length);
  }

  /**
   * Check if topic needs agent transfer
   */
  static shouldTransferToAgent(topic) {
    const agentTopics = ['technical', 'urgent', 'support'];
    return agentTopics.includes(topic);
  }

  /**
   * Format response for voice output
   */
  static formatResponseForTwiML(matchResult) {
    return {
      answer: matchResult.answer,
      topic: matchResult.topic,
      needsAgent: matchResult.needsAgent,
      followUp: matchResult.needsAgent ? 
        'Would you like me to connect you with an agent?' : 
        'Is there anything else I can help you with?'
    };
  }
}

module.exports = AIService;