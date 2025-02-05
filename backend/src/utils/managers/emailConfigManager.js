const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function createEmailConfigManager() {
  const CONFIG_PATH = path.resolve('./../../config/email-config.json');

  // Load initial configuration
  function loadConfig() {
    try {
      const configFile = fs.readFileSync(CONFIG_PATH, 'utf8');
      return JSON.parse(configFile);
    } catch (error) {
      console.error('Error loading email config:', error);
      return {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: '',
          pass: ''
        },
        fromName: 'Default Sender',
        fromEmail: ''
      };
    }
  }

  // Create transporter function
  function createTransporter(config) {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass
      }
    });
  }

  // Mutable state
  let currentConfig = loadConfig();
  let transporter = createTransporter(currentConfig);

  return {
    // Update configuration
    updateConfig(newConfig) {
      // Validate configuration
      if (!newConfig.host || !newConfig.auth.user || !newConfig.auth.pass) {
        throw new Error('Invalid email configuration');
      }

      // Merge and update configuration
      currentConfig = { ...currentConfig, ...newConfig };

      // Save to file
      fs.writeFileSync(
        CONFIG_PATH, 
        JSON.stringify(currentConfig, null, 2), 
        'utf8'
      );

      // Recreate transporter
      transporter = createTransporter(currentConfig);
    },

    // Send email
    async sendEmail(to, subject, html) {
      if (!transporter) {
        throw new Error('Email transporter not initialized');
      }

      try {
        return await transporter.sendMail({
          from: `"${currentConfig.fromName}" <${currentConfig.fromEmail}>`,
          to,
          subject,
          html
        });
      } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
      }
    },

    // Test SMTP connection
    async testConnection() {
      if (!transporter) {
        return { success: false, message: 'Transporter not initialized' };
      }

      try {
        await transporter.verify();
        return { success: true, message: 'SMTP connection successful' };
      } catch (error) {
        return { 
          success: false, 
          message: 'SMTP connection failed',
          error: error.message 
        };
      }
    },

    // Get current configuration
    getConfig() {
      return { ...currentConfig };
    }
  };
}

module.exports = createEmailConfigManager();