import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_RUNTIME == "production" ? import.meta.env.VITE_API_SOCKET_PROD_URL : import.meta.env.VITE_API_SOCKET_DEV_URL; 

const socket = io(SOCKET_URL, {
    withCredentials: true, 
});

export default socket;
