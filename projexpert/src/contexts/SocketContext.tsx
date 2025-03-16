import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.user?.id) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_RUNTIME == "production" ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL, {
        withCredentials: true,
      });

      // Socket event handlers
      newSocket.on('connect', () => {
        console.log('Connected to socket server');
        
        setIsConnected(true);
        // Changed to match backend expected data structure
        newSocket.emit('join', { chatId: user.user.id });
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
        setIsConnected(false);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
      };
    }
  }, [user?.user?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);