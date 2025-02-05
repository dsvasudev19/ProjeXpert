const express = require('express');
const DatabaseConfigManager = require('../../utils/managers/databaseConfigManager');

const router = express.Router();

// Update database configuration
router.post('/', (req, res) => {
  try {
    const { env, config } = req.body;
    DatabaseConfigManager.updateConfig(env, config);
    res.status(200).json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test database connection
router.get('/test', async (req, res) => {
  const { env = 'development' } = req.query;
  const testResult = await DatabaseConfigManager.testConnection(env);
  res.json(testResult);
});

module.exports = router;