const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, './../config/integrations-config.json');

// Helper function to read and write JSON safely
const readConfig = () => {
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
        console.error('Error reading integration config:', error);
        return {};
    }
};

const writeConfig = (config) => {
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing integration config:', error);
    }
};

// Get all integrations or a specific integration config
router.get('/:integration?', (req, res) => {
    try {
        const config = readConfig();
        if (req.params.integration) {
            const integrationConfig = config[req.params.integration];
            if (!integrationConfig) {
                return res.status(404).json({ error: 'Integration configuration not found' });
            }
            return res.json({ [req.params.integration]: integrationConfig });
        }
        res.json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load integration configuration' });
    }
});

// Update a specific integration
router.put('/:integration', (req, res) => {
    try {
        const config = readConfig();
        const integrationKey = req.params.integration;
        const { config: newConfig } = req.body;
        console.log(req.body);  
        if (!config[integrationKey]) {
            return res.status(404).json({ error: 'Integration not found' });
        }

        // Ensure JSON format is correct
        let parsedConfig;
        if (typeof newConfig === 'object') {
            parsedConfig = newConfig;
        } else {
            try {
                parsedConfig = JSON.parse(newConfig);
            } catch {
                
                return res.status(400).json({ error: 'Invalid JSON format' });
            }
        }

        // Store config directly inside integrationKey
        config[integrationKey] = {
            enabled: Boolean(config.enabled),
            ...parsedConfig, // Merge parsedConfig directly inside integrationKey
        };

        writeConfig(config);

        res.status(200).json({ message: `${integrationKey} updated successfully`, data: config[integrationKey] });
    } catch (error) {
        console.error('Error updating integration:', error);
        res.status(500).json({ error: 'Failed to update integration' });
    }
});

module.exports = router;
