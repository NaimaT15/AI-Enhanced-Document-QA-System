import React, { useState } from 'react';
import axios from 'axios';


function UploadComponent() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await axios.post('http://localhost:3000/ingest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading document:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadComponent;
