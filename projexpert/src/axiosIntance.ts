import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RUNTIME ==="production"? "https://pm.interactweb.agency/api/admin":"http://localhost:3000/api/v1/admin",
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem("__auth"); // or get it from another source
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
