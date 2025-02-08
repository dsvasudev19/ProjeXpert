import { useState } from 'react';

import { toast } from 'react-hot-toast';

// Add this CSS class to your global styles or component
const switchButtonStyle = `
  relative inline-flex h-6 w-11 items-center rounded-full
  transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
`;

const switchKnobStyle = `
  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
`;


const DatabaseSettings = () => {


  // Add new database configuration state
  const [databaseConfig, setDatabaseConfig] = useState({
    host: 'localhost',
    port: '5432',
    databaseName: 'projexpert_db',
    username: '',
    password: '',
    sslEnabled: true,
    connectionPool: {
      minConnections: 5,
      maxConnections: 20,
      idleTimeout: 10000
    },
    backupSettings: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '00:00',
      retentionDays: 30,
      backupLocation: '/backups'
    }
  });


     // Add new handler for database settings
  const handleSaveDatabaseConfig = async () => {
    try {
      // Add API call here to save database configuration
      toast.success('Database settings saved successfully');
    } catch (error) {
      toast.error('Failed to save database settings');
    }
  };

  const handleTestConnection = async () => {
    try {
      // Add API call here to test database connection
      toast.success('Database connection successful');
    } catch (error) {
      toast.error('Database connection failed');
    }
  };


    return (
        <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Database Configuration</h3>
        
        {/* Connection Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Connection Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
              <input
                type="text"
                value={databaseConfig.host}
                onChange={(e) => setDatabaseConfig({ ...databaseConfig, host: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="localhost"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
              <input
                type="text"
                value={databaseConfig.port}
                onChange={(e) => setDatabaseConfig({ ...databaseConfig, port: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="5432"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Database Name</label>
              <input
                type="text"
                value={databaseConfig.databaseName}
                onChange={(e) => setDatabaseConfig({ ...databaseConfig, databaseName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={databaseConfig.username}
                onChange={(e) => setDatabaseConfig({ ...databaseConfig, username: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={databaseConfig.password}
                onChange={(e) => setDatabaseConfig({ ...databaseConfig, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDatabaseConfig({ 
                    ...databaseConfig, 
                    sslEnabled: !databaseConfig.sslEnabled 
                  })}
                  className={`${switchButtonStyle} ${
                    databaseConfig.sslEnabled ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`${switchKnobStyle} ${
                      databaseConfig.sslEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Enable SSL Connection</span>
              </label>
            </div>
          </div>
        </div>

        {/* Connection Pool Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Connection Pool</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Connections</label>
              <input
                type="number"
                value={databaseConfig.connectionPool.minConnections}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  connectionPool: {
                    ...databaseConfig.connectionPool,
                    minConnections: parseInt(e.target.value)
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Connections</label>
              <input
                type="number"
                value={databaseConfig.connectionPool.maxConnections}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  connectionPool: {
                    ...databaseConfig.connectionPool,
                    maxConnections: parseInt(e.target.value)
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Idle Timeout (ms)</label>
              <input
                type="number"
                value={databaseConfig.connectionPool.idleTimeout}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  connectionPool: {
                    ...databaseConfig.connectionPool,
                    idleTimeout: parseInt(e.target.value)
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Backup Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDatabaseConfig({
                    ...databaseConfig,
                    backupSettings: {
                      ...databaseConfig.backupSettings,
                      autoBackup: !databaseConfig.backupSettings.autoBackup
                    }
                  })}
                  className={`${switchButtonStyle} ${
                    databaseConfig.backupSettings.autoBackup ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`${switchKnobStyle} ${
                      databaseConfig.backupSettings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Enable Automatic Backups</span>
              </label>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
              <select
                value={databaseConfig.backupSettings.backupFrequency}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  backupSettings: {
                    ...databaseConfig.backupSettings,
                    backupFrequency: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Time</label>
              <input
                type="time"
                value={databaseConfig.backupSettings.backupTime}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  backupSettings: {
                    ...databaseConfig.backupSettings,
                    backupTime: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
              <input
                type="number"
                value={databaseConfig.backupSettings.retentionDays}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  backupSettings: {
                    ...databaseConfig.backupSettings,
                    retentionDays: parseInt(e.target.value)
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="form-group col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Location</label>
              <input
                type="text"
                value={databaseConfig.backupSettings.backupLocation}
                onChange={(e) => setDatabaseConfig({
                  ...databaseConfig,
                  backupSettings: {
                    ...databaseConfig.backupSettings,
                    backupLocation: e.target.value
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="/path/to/backup/directory"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleTestConnection}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Test Connection
          </button>
          <button
            onClick={handleSaveDatabaseConfig}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Save Database Settings
          </button>
        </div>
      </div>
    )
}

export default DatabaseSettings;