import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RUNTIME == "production" ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Create a separate axios instance for refresh token requests (to avoid interceptor loop)
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_RUNTIME == "production" ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use refreshAxios instead of axiosInstance to prevent interceptor loop
        const refreshResponse = await refreshAxios.post("/auth/refresh-token", {
          token: localStorage.getItem("refreshToken"),
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.accessToken;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Retry original request
        }
      } catch (refreshError:any) {
        // If refresh fails with 401, redirect to login
        if (refreshError.response?.status === 401) {
          return Promise.reject(refreshError);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
