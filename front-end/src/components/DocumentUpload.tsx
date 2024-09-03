import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';

const DocumentUpload: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState('');
  const history = useHistory();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);

    setProcessing(true);

    try {
      const response = await axios.post('http://localhost:5000/api/document/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setText(response.data.text);

      // Redirect to the Q&A page after processing
      history.push('/question-answer', { extractedText: response.data.text });
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="upload-box">
      <input {...getInputProps()} />
      <p>Drag 'n' drop a PDF here, or click to select one</p>
      {processing && <p>Processing...</p>}
    </div>
  );
};

export default DocumentUpload;
