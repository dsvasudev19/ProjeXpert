import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { axiosInstance } from './axiosIntance'

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false); // Use specific type
    const [user, setUser] = useState<any>(null); // Initialize with null

    const login = useCallback(async (data: any) => {
        try {
            const res = await axiosInstance.post("/auth/login", data)
            if (res.status === 200) {
                localStorage.setItem("__auth", res.data.token)
                localStorage.setItem("request_retries",JSON.stringify(1));
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }, []);

    const getUserByToken = useCallback(async () => {
        try {
            setLoading(true)
            const header = localStorage.getItem("__auth")
            if (!header) return; // Early return if no token

            const res = await axiosInstance.get("/auth/user/token")
            if (res?.status === 200) {
                setUser(res.data)
            }
        } catch (error) {
            console.error(error) 
        } finally {
            setLoading(false) 
        }
    }, []);

    const logout = useCallback(() => {
        try {
            localStorage.removeItem("__auth")
            setUser(null); // Clear user state on logout
        } catch (error) {
            console.error(error)
        }
    }, []);

    useEffect(() => {
        getUserByToken()
    }, [getUserByToken]); // Add dependency

    const contextValue = useMemo(() => ({
        loading,
        user,
        logout,
        login
    }), [loading, user, logout, login]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context) {
        return context;
    }
    throw new Error("useAuth must be used within an AuthProvider");
}
