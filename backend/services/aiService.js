const { retrieveFromPinecone } = require('./pineconeService');
const axios = require('axios');

const openaiApiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key
const aiModel = 'AI_MODEL'; // or 'claude-v1.3'

async function getAIResponse(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: aiModel,
        prompt: prompt,
        max_tokens: 150, // Adjust as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );
    return response.data.choices[0].text.trim(); // Adjust based on the response format
  } catch (error) {
    console.error('Error getting AI response:', error.message);
    throw new Error('Failed to get AI response');
  }
}

async function answerQuestion(question) {
  try {
    // Retrieve relevant chunks from Pinecone
    const relevantChunks = await retrieveFromPinecone(question);

    // Enhance the prompt with retrieved context
    const enhancedPrompt = `${relevantChunks.join('\n')}\n\n${question}`;

    // Get the AI response using the enhanced prompt
    const aiResponse = await getAIResponse(enhancedPrompt);

    return aiResponse;
  } catch (error) {
    console.error('Error answering question:', error.message);
    throw new Error('Failed to answer the question');
  }
}

module.exports = { answerQuestion };
