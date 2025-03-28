import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { axiosInstance } from '../axiosIntance';

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false); // Add this state

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
      const res = await axiosInstance.get("/auth/user/token");
      if (res?.status === 200) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user by token:", error);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/auth/logout", {})
      if (res.status === 200) {
        localStorage.removeItem("__auth");
        setUser(null);
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    if (!authChecked) {
      getUserByToken();
    }
  }, [authChecked, getUserByToken]);

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
