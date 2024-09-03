const express = require('express');
const multer = require('multer');
const { processDocument } = require('../services/documentService');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('document'), async (req, res, next) => {
  try {
    console.log('Received file:', req.file); // Debugging log to check the file
    const result = await processDocument(req.file);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /ingest route:', error.message);
    next(error); // Pass the error to the global error handler
  }
});

module.exports = router;
