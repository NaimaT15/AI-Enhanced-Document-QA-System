const express = require('express');
const { answerQuestion } = require('../services/aiService');

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await answerQuestion(question);
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
