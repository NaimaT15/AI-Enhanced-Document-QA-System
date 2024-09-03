const express = require('express');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001' // Allow only this origin
}));

app.use(express.json());

app.use('/ingest', documentRoutes);
app.use('/', questionRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  console.error('Error message:', err.message);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
