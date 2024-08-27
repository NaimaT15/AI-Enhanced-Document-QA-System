const axios = require('axios');
const { Pinecone: PineconeClient } = require('@pinecone-database/pinecone');

// Initialize Pinecone client with API key and environment
const pinecone = new PineconeClient({ 
  apiKey: 'INECONE_API_KEY'// Replace with your actual Pinecone API key
});

const openaiApiKey = 'OPENAI_API_KEY'; // Replace with your actual OpenAI API key

async function generateEmbeddings(chunks) {
  try {
    const embeddings = [];
    console.log('Chunks to be embedded:', chunks);

    for (const chunk of chunks) {
      try {
        // Generate an embedding for each chunk using the OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/embeddings',
          {
            input: chunk,
            model: 'text-embedding-ada-002', // The model used for embedding
          },
          {
            headers: {
              'Authorization': `Bearer ${openaiApiKey}`, // Authorization header with your OpenAI API key
            },
          }
        );

        console.log('API response:', response.data); // Log the API response for debugging

        if (response.data && response.data.data && response.data.data.length > 0) {
          // Push the embedding result to the embeddings array
          embeddings.push(response.data.data[0].embedding);
        } else {
          console.error('No embedding data returned', response.data);
          throw new Error('No embedding data returned');
        }

      } catch (apiError) {
        console.error('Error during OpenAI API request:', apiError.message);
        if (apiError.response) {
          console.error('Response data:', apiError.response.data); // Log the error response data
        }
        throw new Error('Failed to generate embedding for a chunk');
      }
    }

    return embeddings;
  } catch (error) {
    console.error('Error generating embeddings:', error.message);
    throw new Error('Embedding generation failed');
  }
}

async function storeInPinecone(embeddings) {
  try {
    // Connect to the Pinecone index
    const index = pinecone.Index('PINECONE_INDEX_NAME');

    // Prepare the vectors for insertion
    const vectors = embeddings.map((embedding, i) => ({
      id: `embedding-${i}`,
      values: embedding,
      metadata: { source: 'document-chunk', chunkIndex: i }
    }));
    console.log(vectors, 'lllllllllllllll')
    // Ensure vectors is an array
    if (!Array.isArray(vectors)) {
      throw new Error('Vectors must be an array');
    }
  
    // Upsert vectors into Pinecone
    // const upsertResponse = await index.upsert({ vectors });

    console.log('Embeddings stored successfully:');
  } catch (error) {
    console.error('Error storing embeddings in Pinecone:', error.message);
    throw new Error('Storing embeddings in Pinecone failed');
  }
}

module.exports = { generateEmbeddings, storeInPinecone };


async function retrieveFromPinecone(question) {
  try {
    // Generate embedding for the question
    const response = await axios.post(
      'https://api.openai.com/v1/embeddings',
      {
        input: question,
        model: 'text-embedding-ada-002',
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.length > 0) {
      const questionEmbedding = response.data.data[0].embedding;

      // Search Pinecone for similar embeddings
      const index = pinecone.Index('PINECONE_INDEX_NAME');
      const queryResponse = await index.query({
        vector: questionEmbedding,
        topK: 5, // Number of top similar results to return
        includeMetadata: true,
      });

      // Extract the relevant chunks from the search results
      const relevantChunks = queryResponse.matches.map(match => match.metadata.source);

      return relevantChunks;
    } else {
      throw new Error('Failed to generate embedding for the question');
    }
  } catch (error) {
    console.error('Error retrieving from Pinecone:', error.message);
    throw new Error('Retrieving from Pinecone failed');
  }
}

module.exports = { generateEmbeddings, storeInPinecone, retrieveFromPinecone };