import React, { useState } from 'react';
import axios from 'axios';

const QuestionAnswer: React.FC<{ context: string }> = ({ context }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/qa/ask', { question, context });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error getting answer:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={askQuestion}>Ask</button>
      {answer && (
        <div className="answer-box">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;
