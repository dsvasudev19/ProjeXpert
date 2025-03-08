import { useCallback, useEffect, useRef, useState } from 'react';
import MessageList from '../components/Chat/MessageList';
import MessageInput from '../components/Chat/MessageInput';
import ChatHeader from '../components/Chat/ChatHeader';
import { axiosInstance } from '../axiosIntance';
import axios from 'axios';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import ChatSidebar from '../components/Chat/ChatSidebar';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<any>(null);
  const chatContainerRef = useRef<any>(null);

  // Add this function to check if we're at the bottom
  const isAtBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const threshold = 100; 
      return container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
    }
    return true;
  };

  // Update the scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update the message handler
  const handleNewMessage = useCallback((message: any) => {
    console.log('Received message:', message);
    setMessages((prevMessages: any) => {
      // Check if message already exists to prevent duplicates
      const messageExists = prevMessages.some((msg: any) => msg.id === message.id);
      if (messageExists) {
        return prevMessages;
      }
      return [...prevMessages, message];
    });
  }, []); // Empty dependency array since it only uses setState

  // Update the send message handler
  const handleSendMessage = async () => {
    if (!activeChat?.id) {
      setError("Please select a chat first");
      return;
    }

    if (!newMessage.trim() && !selectedFile) {
      return;
    }

    try {
      let attachmentUrl = null;

      // If there's a file, upload it first
      if (selectedFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'chatterbox');
        formData.append('cloud_name', 'dp8bdt1zu');

        const uploadResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dp8bdt1zu/image/upload',
          formData
        );
        attachmentUrl = uploadResponse.data.secure_url;
      }

      const message = {
        content: newMessage,
        attachment: attachmentUrl,
        senderId: user?.user?.id,
        chatRoomId: activeChat.id,
        createdAt: new Date()
      };

      // Optimistically add message
      const wasAtBottom = isAtBottom();
      setMessages((prev:any) => [...prev, message]);
      if (wasAtBottom) {
        setTimeout(scrollToBottom, 100);
      }

      // Reset form
      setNewMessage('');
      setSelectedFile(null);
      setIsUploading(false);

      // Send to server
      const response = await axiosInstance.post('/rooms/messages', message);

      // Emit socket event
      if(response.status === 200){
        socket?.emit('privateMessage', {
          chatRoomId: activeChat.id,
          message: newMessage,
          senderId: user?.user?.id,
          attachment: attachmentUrl
        });
      }
    } catch (error) {
      // Remove optimistically added message on error
      setMessages((prev:any) => prev.slice(0, -1));
      setError("Failed to send message");
      console.error(error);
    }
  };

  // Add scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Listen for new messages
  useEffect(() => {
    if (activeChat) {
      // Get initial messages
      getAllMessages();

      // Join the chat room
      socket?.emit("join", { chatRoomId: activeChat.id });

      // Set up socket listener
      socket?.on("receiveMessage", handleNewMessage);

      // Cleanup function
      return () => {
        socket?.off("receiveMessage", handleNewMessage);
        socket?.emit("leave", { chatRoomId: activeChat.id });
      };
    }
  }, [activeChat, handleNewMessage, socket]);

  const getAllMessages = async () => {
    if (!activeChat?.id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get(`/rooms/${activeChat.id}/messages`);
      if (res.status === 200) {
        setMessages(res.data);
      }
    } catch (error) {
      setError("Failed to load messages");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllChats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get("/rooms");
      if (res.status === 200) {
        setChats(res.data);
      }
    } catch (error) {
      setError("Failed to load chats");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  // Show loading state while initial chats are being fetched
  if (isLoading && chats.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center">
        <p>Loading chats...</p>
      </div>
    );
  }

  // Show error state if there's an error
  if (error && chats.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
      {/* Show socket connection status */}
      {!isConnected && (
        <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
          Reconnecting...
        </div>
      )}
      <ChatSidebar 
        chats={chats} 
        activeChat={activeChat} 
        setActiveChat={setActiveChat} 
      />
      {!activeChat ? (
        <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-[#f0f2f5]">
          <ChatHeader 
            name={activeChat?.name || 'Unknown'} 
            online={activeChat?.online || false} 
          />
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3" 
            ref={chatContainerRef}
            style={{ backgroundImage: 'url("/chat-bg.png")' }}
          >
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </div>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            disabled={!activeChat || isUploading}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            isUploading={isUploading}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;