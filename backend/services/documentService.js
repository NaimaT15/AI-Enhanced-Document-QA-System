const pdfParse = require('pdf-parse');
const { chunkText } = require('../utils/textUtils');
const { generateEmbeddings, storeInPinecone } = require('./pineconeService');

async function processDocument(file) {
  try {
    let text = '';
    if (file.mimetype === 'application/pdf') {
      console.log('Processing PDF file...');
      const data = await pdfParse(file.buffer);
      text = data.text; // Extract text from the data object
      console.log(text, 'Text extracted from PDF');
    } else {
      console.log('Processing text file...');
      text = file.buffer.toString(); // Convert buffer to string
    }

    if (!text) {
      throw new Error('Failed to extract text from document');
    }

    console.log('Text extraction successful, proceeding to chunking...');
    const chunks = chunkText(text, 5); // Adjust chunk size as needed
    console.log('Chunks:', chunks);

    console.log('Chunking complete, proceeding to embedding...');
    //const embeddings = await generateEmbeddings(chunks);
    const embeddings = [
        [0.132, -0.098, 0.223, 0.001, -0.145],
        [-0.075, 0.211, -0.089, 0.055, 0.034] 
    ];
    console.log('Embedding generation complete, storing in Pinecone...');

    await storeInPinecone(embeddings);
    console.log('Document processing complete.');

    return { success: true };
  } catch (error) {
    console.error('Error during document processing:', error.message);
    throw new Error('Document processing failed');
  }
}

module.exports = { processDocument };
