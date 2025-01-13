import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { axiosInstance } from '../axiosIntance';

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true
  const [user, setUser] = useState<any>(null);

  const login = useCallback(async (data: any) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.status === 200) {
        localStorage.setItem("__auth", res.data.token);
        localStorage.setItem("request_retries", JSON.stringify(1));
        await getUserByToken(); // Fetch user immediately after login
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message);
    }
  }, []);

  const getUserByToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("__auth");
      if (!token) {
        setLoading(false); // Reset loading if no token is present
        return;
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axiosInstance.get("/auth/user/token");
      if (res?.status === 200) {
        setUser(res.data);
      } else {
        setUser(null);
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error("Error fetching user by token:", error);
      setUser(null);
      window.location.href = '/auth/login';
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("__auth");
    setUser(null);
    window.location.href = "/auth/login";
  }, []);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  const contextValue = useMemo(() => ({
    loading,
    user,
    logout,
    login,
  }), [loading, user, logout, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
