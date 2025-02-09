const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, './../config/general-config.json');

router.get('/', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    res.json(config);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

router.put('/', (req, res) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Configuration updated successfully',data:req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

module.exports = router;