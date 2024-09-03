function chunkText(text, chunkSize = 5) {
    // Split the text into sentences using a regular expression
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  
    // Array to hold the chunks
    const chunks = [];
  
    // Iterate over the sentences and create chunks
    for (let i = 0; i < sentences.length; i += chunkSize) {
      const chunk = sentences.slice(i, i + chunkSize).join(' ');
      chunks.push(chunk);
    }
  
    return chunks;
  }
  
  module.exports = { chunkText };
  