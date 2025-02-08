import { axiosInstance } from "../axiosIntance";

export interface GeneralConfig {
  appName: string;
  appUrl: string;
  supportEmail: string;
  maxFileSize: number;
  sessionTimeout: number;
}

export const configService = {
  getGeneralConfig: async (): Promise<GeneralConfig> => {
    const response = await axiosInstance.get(`/config/general`);
    if (response.status !== 200) {
      throw new Error('Failed to load configuration');
    }
    return response.data;
  },

  updateGeneralConfig: async (config: GeneralConfig): Promise<void> => {
    const response = await axiosInstance.put(`/config/general`, config);
    
    if (response.status !== 200) {
      throw new Error('Failed to update configuration');
    }
  }
};
