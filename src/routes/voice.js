const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

// Main voice endpoints
router.post('/greeting', voiceController.greeting);

// Speech and input processing
router.post('/process-input', voiceController.processInput);

// Agent transfer
router.post('/transfer-agent', voiceController.transferAgent);

module.exports = router;