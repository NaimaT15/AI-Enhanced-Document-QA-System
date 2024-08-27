import React from 'react';
import './App.css'; 
import UploadComponent from './components/UploadComponent';
import QuestionComponent from './components/QuestionComponent';
import VisualizationComponent from './components/VisualizationComponent';

function App() {
  return (
    <div>
      <UploadComponent />
      <QuestionComponent />
      <VisualizationComponent />
    </div>
  );
}

export default App;
