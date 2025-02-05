const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

function createDatabaseConfigManager() {
  const CONFIG_PATH = path.resolve('./config/database.js');

  // Load configuration
  function loadConfig() {
    try {
      return require(CONFIG_PATH);
    } catch (error) {
      console.error('Error loading database config:', error);
      return {
        development: {
          username: 'root',
          password: null,
          database: 'default_db',
          host: '127.0.0.1',
          dialect: 'mysql'
        }
      };
    }
  }

  // Mutable state
  let currentConfig = loadConfig();
  let currentConnections = {};

  // Create database connection
  function createConnection(config, env = 'development') {
    try {
      return new Sequelize(
        config.database, 
        config.username, 
        config.password, 
        {
          host: config.host,
          dialect: config.dialect,
          logging: false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
        }
      );
    } catch (error) {
      console.error(`Failed to create ${env} database connection:`, error);
      return null;
    }
  }

  // Initialize connections for all environments
  Object.keys(currentConfig).forEach(env => {
    currentConnections[env] = createConnection(currentConfig[env], env);
  });

  return {
    // Update configuration for a specific environment
    updateConfig(env, newConfig) {
      // Validate configuration
      if (!newConfig.database || !newConfig.username || !newConfig.host) {
        throw new Error('Invalid database configuration');
      }

      // Update config
      currentConfig[env] = { ...currentConfig[env], ...newConfig };

      // Write back to JS file
      const configContent = `module.exports = ${JSON.stringify(currentConfig, null, 2)}`;
      fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');

      // Recreate connection for this environment
      currentConnections[env] = createConnection(currentConfig[env], env);
    },

    // Get connection for a specific environment
    getConnection(env = 'development') {
      if (!currentConnections[env]) {
        throw new Error(`No connection configured for environment: ${env}`);
      }
      return currentConnections[env];
    },

    // Test database connection
    async testConnection(env = 'development') {
      const connection = currentConnections[env];
      if (!connection) {
        return { 
          success: false, 
          message: `No connection configured for ${env}` 
        };
      }

      try {
        await connection.authenticate();
        return { 
          success: true, 
          message: `Database connection successful for ${env}` 
        };
      } catch (error) {
        return { 
          success: false, 
          message: `Database connection failed for ${env}`,
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

module.exports = createDatabaseConfigManager();