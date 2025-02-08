import React, { createContext, useContext, useState, useEffect } from 'react';
import { GeneralConfig, configService } from '../services/configurationService';

interface ConfigContextType {
  config: GeneralConfig;
  updateConfig: (newConfig: GeneralConfig) => Promise<void>;
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<GeneralConfig>({
    appName: '',
    appUrl: '',
    supportEmail: '',
    maxFileSize: 0,
    sessionTimeout: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const loadedConfig = await configService.getGeneralConfig();
      console.log(loadedConfig);
      setConfig(loadedConfig);
    } catch (error) {
      console.error('Failed to load configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async (newConfig: GeneralConfig) => {
    try {
      await configService.updateGeneralConfig(newConfig);
      setConfig(newConfig);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
