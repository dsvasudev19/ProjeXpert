const express=require("express")
const EmailConfigManager = require('../../utils/managers/emailConfigManager');

const router = express.Router();

// Update email configuration
router.put('/', async (req, res) => {
  try {
    const newConfig = req.body;
    EmailConfigManager.updateConfig(newConfig);
    res.status(200).json({ message: 'Configuration updated successfully',data:newConfig });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test SMTP connection
router.get('/test', async (req, res) => {
  const testResult = await EmailConfigManager.testConnection();
  res.json(testResult);
});

// Get current email configuration
router.get('/', async (req, res) => {
  try {
    const config = await EmailConfigManager.getConfig();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;