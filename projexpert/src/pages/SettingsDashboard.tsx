import { useEffect, useState } from 'react';
import { CogIcon, PaletteIcon, BellIcon, UsersIcon, ShieldIcon, Mail, KeyIcon, 
  Github, SlackIcon, ActivityIcon, ShieldCheckIcon, KeySquareIcon,
  DatabaseIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Add this CSS class to your global styles or component
const switchButtonStyle = `
  relative inline-flex h-6 w-11 items-center rounded-full
  transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
`;

const switchKnobStyle = `
  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
`;

export default function SettingsDashboard() {
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('settingsDashboardTab') || 'general';
      });
  const [themeConfig, setThemeConfig] = useState<any>({
    primaryColor: '#2E7D32',
    secondaryColor: '#1565C0',
    gradientIntensity: 75,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    sms: false,
  });
  const [appConfig, setAppConfig] = useState({
    appName: 'ProjeXpert',
    appUrl: 'https://projexpert.com',
    supportEmail: 'support@projexpert.com',
    maxFileSize: 10, // in MB
    sessionTimeout: 30, // in minutes
  });
  
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    senderName: 'ProjeXpert',
    senderEmail: 'noreply@projexpert.com',
    enableSSL: true,
  });

  // New state for additional features
  const [securityConfig, setSecurityConfig] = useState({
    mfaEnabled: false,
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    maxLoginAttempts: 5,
    ipWhitelist: '',
  });

  const [rolesConfig, setRolesConfig] = useState<any>({
    roles: [
      {
        id: 1,
        name: 'Admin',
        description: 'Full system access',
        permissions: ['all'],
      },
      {
        id: 2,
        name: 'Project Manager',
        description: 'Manage projects and teams',
        permissions: ['manage_projects', 'manage_teams', 'view_reports'],
      },
      {
        id: 3,
        name: 'Developer',
        description: 'Access to assigned projects',
        permissions: ['view_projects', 'manage_tasks'],
      },
      {
        id: 4,
        name: 'Viewer',
        description: 'View-only access',
        permissions: ['view_projects'],
      },
    ],
    customRoles: [],
  });

  const getAllRoles = async () => {
    try {
        setRolesConfig([
            {
              id: 1,
              name: 'Admin',
              description: 'Full system access',
              permissions: ['all'],
            },
            {
              id: 2,
              name: 'Project Manager',
              description: 'Manage projects and teams',
              permissions: ['manage_projects', 'manage_teams', 'view_reports'],
            },
            {
              id: 3,
              name: 'Developer',
              description: 'Access to assigned projects',
              permissions: ['view_projects', 'manage_tasks'],
            },
            {
              id: 4,
              name: 'Viewer',
              description: 'View-only access',
              permissions: ['view_projects'],
            },
          ])
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllRoles();
  }, []);

  const [integrationConfig, setIntegrationConfig] = useState<any>({
    apiKeys: [],
    githubEnabled: false,
    githubConfig: {
      clientId: '',
      clientSecret: '',
    },
    slackEnabled: false,
    slackConfig: {
      webhookUrl: '',
      channelId: '',
    },
  });

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

  const tabs = [
    { id: 'general', name: 'General Settings', icon: <CogIcon className="w-5 h-5" /> },
    { id: 'theme', name: 'Theme Customization', icon: <PaletteIcon className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'members', name: 'Team Management', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'email', name: 'Email Settings', icon: <Mail className="w-5 h-5" /> },
    { id: 'advanced', name: 'Advanced', icon: <ShieldIcon className="w-5 h-5" /> },
    { id: 'roles', name: 'Roles & Permissions', icon: <KeyIcon className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'integrations', name: 'Integrations', icon: <Github className="w-5 h-5" /> },
    { id: 'audit', name: 'Audit Logs', icon: <ActivityIcon className="w-5 h-5" /> },
    { id: 'database', name: 'Database Settings', icon: <DatabaseIcon className="w-5 h-5" /> },
  ];

  const handleSaveEmailConfig = async () => {
    try {
      // Add API call here to save email configuration
      toast.success('Email settings saved successfully');
    } catch (error) {
      toast.error('Failed to save email settings');
    }
  };

  const handleSaveAppConfig = async () => {
    try {
      // Add API call here to save application configuration
      toast.success('Application settings saved successfully');
    } catch (error) {
      toast.error('Failed to save application settings');
    }
  };

  const handleSaveSecurityConfig = async () => {
    try {
      // Add API call here
      toast.success('Security settings saved successfully');
    } catch (error) {
      toast.error('Failed to save security settings');
    }
  };

  const generateApiKey = async () => {
    try {
      // Add API call here
      const newKey = 'pk_' + Math.random().toString(36).substr(2, 9);
      setIntegrationConfig((prev:any) => ({
        ...prev,
        apiKeys: [...prev.apiKeys, { key: newKey, created: new Date() }],
      }));
      toast.success('API key generated successfully');
    } catch (error) {
      toast.error('Failed to generate API key');
    }
  };

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    sessionStorage.setItem('settingsDashboardTab', tabId);
  };

  return (
    // Main container - allow full height scrolling
    <div className="min-h-screen bg-gradient-to-br p-2 overflow-auto">
      {/* Card container - maintain max width and allow content to scroll */}
      <div className="mx-auto bg-white rounded-2xl shadow-xl">
        {/* Flex container for sidebar and content */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)]">
          {/* Sidebar - fixed height with overflow */}
          <div className="w-full md:w-64 bg-gray-50 rounded-l-2xl overflow-y-auto">
            <div className="p-4 sticky top-0 bg-gray-50 z-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Settings</h2>
            </div>
            <nav className="space-y-2 p-4 pt-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main content area - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Application Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                      <input
                        type="text"
                        value={appConfig.appName}
                        onChange={(e) => setAppConfig({ ...appConfig, appName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Application URL</label>
                      <input
                        type="url"
                        value={appConfig.appUrl}
                        onChange={(e) => setAppConfig({ ...appConfig, appUrl: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                      <input
                        type="email"
                        value={appConfig.supportEmail}
                        onChange={(e) => setAppConfig({ ...appConfig, supportEmail: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                      <input
                        type="number"
                        value={appConfig.maxFileSize}
                        onChange={(e) => setAppConfig({ ...appConfig, maxFileSize: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={appConfig.sessionTimeout}
                        onChange={(e) => setAppConfig({ ...appConfig, sessionTimeout: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveAppConfig}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save Application Settings
                  </button>
                </div>
              )}

              {/* Theme Customization */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Visual Customization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                      <input
                        type="color"
                        value={themeConfig.primaryColor}
                        onChange={(e) => setThemeConfig({ ...themeConfig, primaryColor: e.target.value })}
                        className="w-20 h-10 rounded cursor-pointer"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                      <input
                        type="color"
                        value={themeConfig.secondaryColor}
                        onChange={(e) => setThemeConfig({ ...themeConfig, secondaryColor: e.target.value })}
                        className="w-20 h-10 rounded cursor-pointer"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Intensity</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={themeConfig.gradientIntensity}
                        onChange={(e) => setThemeConfig({ ...themeConfig, gradientIntensity: e.target.value })}
                        className="w-full range range-success"
                      />
                    </div>
                    <div className="form-group">
                      <div className="p-4 rounded-lg border"
                        style={{ 
                          background: `linear-gradient(${themeConfig.gradientIntensity}deg, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})`
                        }}
                      >
                        <p className="text-white text-center">Theme Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800 capitalize">{key}</h4>
                          <p className="text-sm text-gray-600">Receive notifications via {key}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => setNotifications({ ...notifications, [key]: !value })}
                          className="toggle toggle-success"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Management */}
              {activeTab === 'members' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Team Members</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="email"
                        placeholder="Invite by email"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                      <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Invite
                      </button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Member</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {[1, 2, 3].map((i) => (
                            <tr key={i}>
                              <td className="px-6 py-4">user{i}@example.com</td>
                              <td className="px-6 py-4">
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                  <option>Admin</option>
                                  <option>Member</option>
                                  <option>Viewer</option>
                                </select>
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Email Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                      <input
                        type="text"
                        value={emailConfig.smtpHost}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpHost: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="smtp.example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                      <input
                        type="text"
                        value={emailConfig.smtpPort}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="587"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                      <input
                        type="text"
                        value={emailConfig.smtpUsername}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpUsername: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                      <input
                        type="password"
                        value={emailConfig.smtpPassword}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpPassword: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
                      <input
                        type="text"
                        value={emailConfig.senderName}
                        onChange={(e) => setEmailConfig({ ...emailConfig, senderName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
                      <input
                        type="email"
                        value={emailConfig.senderEmail}
                        onChange={(e) => setEmailConfig({ ...emailConfig, senderEmail: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group col-span-2">
                      <label className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setEmailConfig({ ...emailConfig, enableSSL: !emailConfig.enableSSL })}
                          className={`${switchButtonStyle} ${
                            emailConfig.enableSSL ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${switchKnobStyle} ${
                              emailConfig.enableSSL ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-700">Enable SSL/TLS</span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveEmailConfig}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save Email Settings
                  </button>
                </div>
              )}

              {/* Advanced Settings */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Advanced Configuration</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-700">Permanently delete all project data</p>
                          <p className="text-xs text-red-600">This action cannot be undone</p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                          Delete All Data
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data Export</label>
                      <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition">
                        Export All Data (.csv)
                      </button>
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reset Defaults</label>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                        Restore Factory Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* New Roles & Permissions Tab */}
              {activeTab === 'roles' && (
                <div className="space-y-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-800">Roles & Permissions Management</h3>
                  
                  {/* Predefined Roles */}
                  <div className="space-y-4 ">
                    {rolesConfig.roles.map((role:any) => (
                      <div key={role.id} className="p-4 bg-white rounded-lg shadow border">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-800">{role.name}</h4>
                            <p className="text-sm text-gray-600">{role.description}</p>
                          </div>
                          <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                            Edit
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {role.permissions.map((permission:any) => (
                            <div key={permission} className="flex items-center gap-2">
                              <KeySquareIcon className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Custom Role Button */}
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Add Custom Role
                  </button>
                </div>
              )}

              {/* Security Settings Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MFA Settings */}
                    <div className="form-group">
                      <label className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setSecurityConfig({ ...securityConfig, mfaEnabled: !securityConfig.mfaEnabled })}
                          className={`${switchButtonStyle} ${
                            securityConfig.mfaEnabled ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${switchKnobStyle} ${
                              securityConfig.mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-700">Enable Multi-Factor Authentication</span>
                      </label>
                    </div>

                    {/* Password Requirements */}
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        value={securityConfig.passwordMinLength}
                        onChange={(e) => setSecurityConfig({ ...securityConfig, passwordMinLength: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* IP Whitelist */}
                    <div className="form-group col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IP Whitelist (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={securityConfig.ipWhitelist}
                        onChange={(e) => setSecurityConfig({ ...securityConfig, ipWhitelist: e.target.value })}
                        placeholder="e.g., 192.168.1.1, 10.0.0.1"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSecurityConfig}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save Security Settings
                  </button>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Integration Management</h3>
                  
                  {/* API Keys */}
                  <div className="bg-white p-4 rounded-lg shadow border">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">API Keys</h4>
                    <div className="space-y-4">
                      {integrationConfig.apiKeys.map((apiKey:any, index:any) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-mono text-sm">{apiKey.key}</p>
                            <p className="text-xs text-gray-500">Created: {apiKey.created.toLocaleDateString()}</p>
                          </div>
                          <button className="text-red-600 hover:text-red-700">Revoke</button>
                        </div>
                      ))}
                      <button
                        onClick={generateApiKey}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Generate New API Key
                      </button>
                    </div>
                  </div>

                  {/* Third-party Integrations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GitHub Integration */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Github className="w-5 h-5" />
                          <h4 className="font-medium">GitHub Integration</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIntegrationConfig({ 
                            ...integrationConfig, 
                            githubEnabled: !integrationConfig.githubEnabled 
                          })}
                          className={`${switchButtonStyle} ${
                            integrationConfig.githubEnabled ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${switchKnobStyle} ${
                              integrationConfig.githubEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {integrationConfig.githubEnabled && (
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Client ID"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          />
                          <input
                            type="password"
                            placeholder="Client Secret"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          />
                        </div>
                      )}
                    </div>

                    {/* Slack Integration */}
                    <div className="bg-white p-4 rounded-lg shadow border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <SlackIcon className="w-5 h-5" />
                          <h4 className="font-medium">Slack Integration</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIntegrationConfig({ 
                            ...integrationConfig, 
                            slackEnabled: !integrationConfig.slackEnabled 
                          })}
                          className={`${switchButtonStyle} ${
                            integrationConfig.slackEnabled ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${switchKnobStyle} ${
                              integrationConfig.slackEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {integrationConfig.slackEnabled && (
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Webhook URL"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          />
                          <input
                            type="text"
                            placeholder="Channel ID"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Audit Logs Tab */}
              {activeTab === 'audit' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Audit Logs</h3>
                  
                  {/* Search and Filters */}
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <select className="border border-gray-300 rounded-lg px-4 py-2">
                      <option>All Actions</option>
                      <option>Login</option>
                      <option>Settings Change</option>
                      <option>Project Creation</option>
                    </select>
                  </div>

                  {/* Logs Table */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {/* Sample log entries */}
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-500">2024-02-20 10:30:15</td>
                          <td className="px-6 py-4 text-sm text-gray-900">john.doe@example.com</td>
                          <td className="px-6 py-4 text-sm text-gray-900">Settings Update</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Modified email configuration</td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>

                  {/* Export Button */}
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Export Audit Logs
                  </button>
                </div>
              )}

              {/* New Database Settings Tab */}
              {activeTab === 'database' && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}