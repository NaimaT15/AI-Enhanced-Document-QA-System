import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const uploadDocument = (formData) => apiClient.post('/ingest', formData);
export const askQuestion = (question) => apiClient.post('/ask', { question });
