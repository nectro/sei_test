/**
 * Simple Knowledge Base Service - just get all data
 */

const { supabase } = require('../config/supabase');

class KnowledgeBaseService {
  /**
   * Get all knowledge base entries from Supabase
   */
  static async getAllKnowledge() {
    const { data } = await supabase
      .from('knowledge_base')
      .select('*');
    
    // Convert to format expected by AI service
    const formattedData = {};
    data.forEach(row => {
      formattedData[row.topic] = {
        questions: row.questions,
        keywords: row.keywords,
        answer: row.answer
      };
    });
    
    return formattedData;
  }
}

module.exports = KnowledgeBaseService;