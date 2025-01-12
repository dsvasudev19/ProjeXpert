import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RUNTIME == "production" ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("__auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if it's successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      let retries: any = localStorage.getItem("request_retries");
      retries = retries ? parseInt(retries, 10) : 0;

      if (!retries) {
        try {
          localStorage.setItem("request_retries", "1");

          const tokenFound = localStorage.getItem("refreshToken")

          const refreshResponse = await axiosInstance.post("/auth/refresh-token?token=" + tokenFound);

          if (refreshResponse.status === 200) {
            const newToken = refreshResponse.data.token;

            localStorage.setItem("__auth", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            localStorage.setItem("request_retries", "0");
          } else {
            // If status is not 200, redirect to login
            localStorage.removeItem("__auth");
            window.location.href = "/auth/login";
          }

          return axiosInstance(originalRequest);

        } catch (refreshError) {

          console.error("Token refresh failed", refreshError);
        }
      }

      // If refresh token fails or retries are greater than 0, redirect to login
      localStorage.removeItem("__auth");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

