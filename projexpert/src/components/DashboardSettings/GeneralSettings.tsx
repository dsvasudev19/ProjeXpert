import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useConfig } from '../../contexts/ConfigurationsContext';

const GeneralSettings = () => {
  const { config, updateConfig, isLoading } = useConfig();
  const [appConfig, setAppConfig] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when config changes from context
  useEffect(() => {
    setAppConfig(config);
  }, [config]);

  const handleSaveAppConfig = async () => {
    // Validate required fields
    if (!appConfig.appName || !appConfig.appUrl || !appConfig.supportEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      await updateConfig(appConfig);
      toast.success('Application settings saved successfully');
    } catch (error) {
      toast.error('Failed to save application settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Handle case when config data is not present
  if (!config || Object.keys(config).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600">No configuration data available.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Application Settings</h3>
          {/* Show when changes are made */}
          {JSON.stringify(appConfig) !== JSON.stringify(config) && (
            <span className="text-sm text-amber-600">* You have unsaved changes</span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={appConfig.appName}
              onChange={(e) => setAppConfig({ ...appConfig, appName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter application name"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={appConfig.appUrl}
              onChange={(e) => setAppConfig({ ...appConfig, appUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={appConfig.supportEmail}
              onChange={(e) => setAppConfig({ ...appConfig, supportEmail: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="support@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              min="0"
              value={appConfig.maxFileSize}
              onChange={(e) => setAppConfig({ ...appConfig, maxFileSize: parseInt(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter max file size"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={appConfig.sessionTimeout}
              onChange={(e) => setAppConfig({ ...appConfig, sessionTimeout: parseInt(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter session timeout"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          {/* Reset button - only show if there are changes */}
          {JSON.stringify(appConfig) !== JSON.stringify(config) && (
            <button
              onClick={() => setAppConfig(config)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              disabled={isSaving}
            >
              Reset Changes
            </button>
          )}
          
          <button
            onClick={handleSaveAppConfig}
            disabled={isSaving || JSON.stringify(appConfig) === JSON.stringify(config)}
            className={`px-6 py-2 rounded-lg transition flex items-center ${
              isSaving || JSON.stringify(appConfig) === JSON.stringify(config)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSaving ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;