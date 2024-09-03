/* import React, { useState } from 'react';
import './App.css';
import DocumentUpload from './components/DocumentUpload';
import QuestionAnswer from './components/QuestionAnswer';

const App: React.FC = () => {
  const [context] = useState('');

  return (
    <div className="App">
      <h1>AI-Enhanced Document QA System</h1>
      <DocumentUpload  />
      {context && <QuestionAnswer context={context} />}
    </div>
  );
};

export default App;
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DocumentUpload from './DocumentUpload';
import QuestionAnswer from './QuestionAnswer';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={DocumentUpload} />
        <Route path="/question-answer" component={QuestionAnswer} />
      </Switch>
    </Router>
  );
};

export default App;
