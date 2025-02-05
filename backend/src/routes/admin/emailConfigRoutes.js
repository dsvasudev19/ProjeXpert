const express=require("express")
const EmailConfigManager = require('../../utils/managers/emailConfigManager');

const router = express.Router();

// Update email configuration
router.post('/', async (req, res) => {
  try {
    const newConfig = req.body;
    EmailConfigManager.updateConfig(newConfig);
    res.status(200).json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test SMTP connection
router.get('/test', async (req, res) => {
  const testResult = await EmailConfigManager.testConnection();
  res.json(testResult);
});

module.exports=router;