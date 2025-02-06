import { useEffect, useState } from 'react';
import MessageList from '../components/Chat/MessageList';
import ChatSidebar from '../components/Chat/ChatSidebar';
import MessageInput from '../components/Chat/MessageInput';
import ChatHeader from '../components/Chat/ChatHeader';
import { axiosInstance } from '../axiosIntance';
import axios from 'axios';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

      // If there's a file, upload to Cloudinary first
      if (selectedFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'chatterbox');
        formData.append('cloud_name', 'dp8bdt1zu');

        try {
          const uploadResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dp8bdt1zu/image/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          if (uploadResponse.status === 200) {
            attachmentUrl = uploadResponse.data.secure_url;
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          setError("Failed to upload file. Please try again.");
          return;
        } finally {
          setIsUploading(false);
        }
      }

      // Send message with or without attachment
      const messageData = {
        content: newMessage.trim(),
        chatRoomId: activeChat.id,
        attachment: attachmentUrl
      };

      const response = await axiosInstance.post(`/rooms/messages`, messageData);

      if (response.status === 200) {
        setMessages((prev:any) => [...prev, response.data]);
        setNewMessage('');
        setSelectedFile(null);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error(error);
    }
  };

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
    getAllMessages();
  }, [activeChat]);

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
          {error && (
            <div className="p-2 bg-red-100 text-red-600 text-center">
              {error}
            </div>
          )}
          <MessageList messages={messages} />
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