import React, { useState } from 'react';
import axios from 'axios';


function QuestionComponent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    const response = await axios.post('http://localhost:3000/ask', { question });
    setAnswer(response.data.answer);
  };

  return (
    <div>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button onClick={handleAsk}>Ask</button>
      <p>{answer}</p>
    </div>
  );
}

export default QuestionComponent;
