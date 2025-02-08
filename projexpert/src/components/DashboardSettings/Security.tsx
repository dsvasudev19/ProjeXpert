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

const Security = () => {

     // New state for additional features
  const [securityConfig, setSecurityConfig] = useState({
    mfaEnabled: false,
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    maxLoginAttempts: 5,
    ipWhitelist: '',
  });


    const handleSaveSecurityConfig = async () => {
        try {
          // Add API call here
          toast.success('Security settings saved successfully');
        } catch (error) {
          toast.error('Failed to save security settings');
        }
      };


    return (
        <div>
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
        </div>
    )
}

export default Security;