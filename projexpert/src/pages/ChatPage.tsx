// import { useCallback, useEffect, useRef, useState } from 'react';
// import MessageList from '../components/Chat/MessageList';
// import MessageInput from '../components/Chat/MessageInput';
// import ChatHeader from '../components/Chat/ChatHeader';
// import { axiosInstance } from '../axiosIntance';
// import axios from 'axios';
// import { useSocket } from '../contexts/SocketContext';
// import { useAuth } from '../contexts/AuthContext';
// import ChatSidebar from '../components/Chat/ChatSidebar';

// const ChatPage = () => {
//   const [activeChat, setActiveChat] = useState<any>(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [chats, setChats] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [offset, setOffset] = useState(0);
//   const [totalMessages, setTotalMessages] = useState(0);
//   const [hasMore, setHasMore] = useState(false);
//   const [isInitialLoad, setIsInitialLoad] = useState(true); 
//   const { socket, isConnected } = useSocket();
//   const { user } = useAuth();
//   const messagesEndRef = useRef<any>(null);
//   const chatContainerRef = useRef<any>(null);

//   const isAtBottom = () => {
//     if (chatContainerRef.current) {
//       const { scrollHeight, scrollTop, clientHeight } = chatContainerRef.current;
//       return scrollHeight - scrollTop - clientHeight <= 100;
//     }
//     return true;
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleNewMessage = useCallback((data: any) => {
//     if (data.senderId === user?.user?.id) return;

//     console.log('Received message:', data);
//     const normalizedMessage = {
//       id: data.id || Date.now(),
//       chatRoomId: data.chatRoomId,
//       senderId: data.senderId,
//       content: data.message || '',
//       attachment: data.attachment || null,
//       isRead: false,
//       createdAt: new Date().toISOString(),
//       sender: data.sender || { id: data.senderId, name: 'Unknown' },
//     };
//     setMessages((prev: any) => {
//       if (prev.some((msg: any) => msg.id === normalizedMessage.id)) return prev;
//       const wasAtBottom = isAtBottom();
//       const newMessages = [...prev, normalizedMessage];
//       if (wasAtBottom) setTimeout(scrollToBottom, 100);
//       return newMessages;
//     });
//     setChats((prevChats: any) =>
//       prevChats.map((chat: any) =>
//         chat.id === data.chatRoomId ? { ...chat, unread: (chat.unread || 0) + 1 } : chat
//       )
//     );
//   }, [user?.user?.id]);

//   const handleSendMessage = async () => {
//     if (!activeChat?.id || (!newMessage.trim() && !selectedFile)) return;

//     const tempId = Date.now();
//     try {
//       setError(null);
//       let attachmentUrl = null;
//       if (selectedFile) {
//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('upload_preset', 'chatterbox');
//         formData.append('cloud_name', 'dp8bdt1zu');
//         const uploadResponse = await axios.post(
//           'https://api.cloudinary.com/v1_1/dp8bdt1zu/image/upload',
//           formData
//         );
//         attachmentUrl = uploadResponse.data.secure_url;
//       }

//       const message = {
//         id: tempId,
//         content: newMessage,
//         attachment: attachmentUrl,
//         senderId: user?.user?.id,
//         chatRoomId: activeChat.id,
//         createdAt: new Date().toISOString(),
//         sender: { id: user?.user?.id, name: user?.user?.name || 'Me' },
//         isRead: false,
//       };

//       const wasAtBottom = isAtBottom();
//       setMessages((prev: any) => [...prev, message]);
//       if (wasAtBottom) setTimeout(scrollToBottom, 100);

//       setNewMessage('');
//       setSelectedFile(null);
//       setIsUploading(false);

//       const response = await axiosInstance.post('/rooms/messages', message);
//       if (response.status === 200) {
//         setMessages((prev: any) =>
//           prev.map((msg: any) =>
//             msg.id === tempId ? { ...response.data, sender: { id: user?.user?.id, name: user?.user?.name || 'Me' } } : msg
//           )
//         );
//         socket?.emit('privateMessage', {
//           chatRoomId: activeChat.id,
//           message: newMessage,
//           senderId: user?.user?.id,
//           attachment: attachmentUrl,
//         });
//       }
//     } catch (error) {
//       setMessages((prev: any) => prev.filter((msg: any) => msg.id !== tempId));
//       setError('Failed to send message');
//       setIsUploading(false);
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (!activeChat?.id) return;
//     socket?.emit('join', { chatRoomId: activeChat.id });
//     setOffset(0); // Reset offset when changing chats
//     setIsInitialLoad(true); // Mark as initial load
//     getAllMessages(0);

//     socket?.on('receiveMessage', handleNewMessage);
//     return () => {
//       socket?.off('receiveMessage', handleNewMessage);
//       socket?.emit('leave', { chatRoomId: activeChat.id });
//     };
//   }, [activeChat, socket, handleNewMessage]);

//   const getAllMessages = async (newOffset = 0) => {
//     if (!activeChat?.id) return;
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await axiosInstance.get(`/rooms/${activeChat.id}/messages`, {
//         params: { limit: newOffset === 0 ? 15 : 100, offset: newOffset }
//       });
//       if (res.status === 200) {
//         setMessages((prev) => newOffset === 0 ? res.data.messages : [...res.data.messages, ...prev]);
//         setTotalMessages(res.data.totalMessages);
//         setHasMore(res.data.hasMore);
//         setOffset(newOffset + res.data.messages.length);
//       }
//     } catch (error) {
//       setError('Failed to load messages');
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadMoreMessages = () => {
//     setIsInitialLoad(false); // Not an initial load
//     getAllMessages(offset);
//   };

//   const getAllChats = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await axiosInstance.get('/rooms');
//       if (res.status === 200) setChats(res.data);
//     } catch (error) {
//       setError('Failed to load chats');
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllChats();
//   }, []);

//   return (
//     <div className="flex h-[calc(100vh-4.5rem)] rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
//       {!isConnected && (
//         <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//           Reconnecting...
//         </div>
//       )}
//       <ChatSidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
//       {!activeChat ? (
//         <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
//           <p className="text-gray-500">Select a chat to start messaging</p>
//         </div>
//       ) : isLoading && offset === 0 ? (
//         <div className="flex-1 flex items-center justify-center">Loading messages...</div>
//       ) : error ? (
//         <div className="flex-1 flex items-center justify-center text-red-500">{error}</div>
//       ) : (
//         <div className="flex-1 flex flex-col bg-[#f0f2f5]">
//           <ChatHeader name={activeChat?.name || 'Unknown'} online={activeChat?.online || false} />
//           <div
//             className="flex-1 overflow-y-auto p-4 space-y-3"
//             ref={chatContainerRef}
//             style={{ backgroundImage: 'url("/chat-bg.png")' }}
//           >
//             <MessageList messages={messages} loadMore={loadMoreMessages} hasMore={hasMore} isInitialLoad={isInitialLoad} />
//             <div ref={messagesEndRef} />
//           </div>
//           <MessageInput
//             newMessage={newMessage}
//             setNewMessage={setNewMessage}
//             handleSendMessage={handleSendMessage}
//             disabled={!activeChat || isUploading}
//             selectedFile={selectedFile}
//             setSelectedFile={setSelectedFile}
//             isUploading={isUploading}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

import {  useCallback, useEffect, useRef, useState } from 'react';
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
  const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [offset, setOffset] = useState(0);
  const [_, setTotalMessages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<any>(null);
  const chatContainerRef = useRef<any>(null);

  const isAtBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = chatContainerRef.current;
      return scrollHeight - scrollTop - clientHeight <= 100;
    }
    return true;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewMessage = useCallback((data: any) => {
    if (data.senderId === user?.user?.id) return;

    const normalizedMessage = {
      id: data.id || Date.now(),
      chatRoomId: data.chatRoomId,
      senderId: data.senderId,
      content: data.message || '',
      attachment: data.attachment || null,
      isRead: false,
      createdAt: new Date().toISOString(),
      sender: data.sender || { id: data.senderId, name: 'Unknown' },
    };
    setMessages((prev: any) => {
      if (prev.some((msg: any) => msg.id === normalizedMessage.id)) return prev;
      const wasAtBottom = isAtBottom();
      const newMessages = [...prev, normalizedMessage];
      if (wasAtBottom) setTimeout(scrollToBottom, 100);
      return newMessages;
    });
    setChats((prevChats: any) =>
      prevChats.map((chat: any) =>
        chat.id === data.chatRoomId ? { ...chat, unread: (chat.unread || 0) + 1 } : chat
      )
    );
  }, [user?.user?.id]);

  const handleSendMessage = async () => {
    if (!activeChat?.id || (!newMessage.trim() && !selectedFile)) return;

    const tempId = Date.now();
    try {
      setError(null);
      let attachmentUrl = null;
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
        id: tempId,
        content: newMessage,
        attachment: attachmentUrl,
        senderId: user?.user?.id,
        chatRoomId: activeChat.id,
        createdAt: new Date().toISOString(),
        sender: { id: user?.user?.id, name: user?.user?.name || 'Me' },
        isRead: false,
      };

      const wasAtBottom = isAtBottom();
      setMessages((prev: any) => [...prev, message]);
      if (wasAtBottom) setTimeout(scrollToBottom, 100);

      setNewMessage('');
      setSelectedFile(null);
      setIsUploading(false);
      socket?.emit('stopTyping', { chatRoomId: activeChat.id, userId: user?.user?.id });

      const response = await axiosInstance.post('/rooms/messages', message);
      if (response.status === 200) {
        setMessages((prev: any) =>
          prev.map((msg: any) =>
            msg.id === tempId ? { ...response.data, sender: { id: user?.user?.id, name: user?.user?.name || 'Me' } } : msg
          )
        );
        socket?.emit('privateMessage', {
          chatRoomId: activeChat.id,
          message: newMessage,
          senderId: user?.user?.id,
          attachment: attachmentUrl,
        });
      }
    } catch (error) {
      setMessages((prev: any) => prev.filter((msg: any) => msg.id !== tempId));
      setError('Failed to send message');
      setIsUploading(false);
      console.error(error);
    }
  };

  const handleTyping = (value: string) => {
    if (value.length > 0) {
      socket?.emit('typing', { chatRoomId: activeChat?.id, userId: user?.user?.id });
    } else {
      socket?.emit('stopTyping', { chatRoomId: activeChat?.id, userId: user?.user?.id });
    }
  };

  useEffect(() => {
    console.log(activeChat)
    if (!activeChat?.id || !user?.user?.id) return;
    socket?.emit('join', { chatRoomId: activeChat.id, userId: user.user.id });
    setOffset(0);
    setIsInitialLoad(true);
    getAllMessages(0);

    socket?.on('receiveMessage', handleNewMessage);
    return () => {
      socket?.off('receiveMessage', handleNewMessage);
      socket?.emit('leave', { chatRoomId: activeChat.id, userId: user?.user?.id });
    };
  }, [activeChat, socket, handleNewMessage, user?.user?.id]);

  const getAllMessages = async (newOffset = 0) => {
    if (!activeChat?.id) return;
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get(`/rooms/${activeChat.id}/messages`, {
        params: { limit: newOffset === 0 ? 15 : 100, offset: newOffset }
      });
      if (res.status === 200) {
        setMessages((prev) => newOffset === 0 ? res.data.messages : [...res.data.messages, ...prev]);
        setTotalMessages(res.data.totalMessages);
        setHasMore(res.data.hasMore);
        setOffset(newOffset + res.data.messages.length);
      }
    } catch (error) {
      setError('Failed to load messages');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMessages = () => {
    setIsInitialLoad(false);
    getAllMessages(offset);
  };

  const getAllChats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get('/rooms');
      if (res.status === 200) setChats(res.data);
    } catch (error) {
      setError('Failed to load chats');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4.5rem)] rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
      {!isConnected && (
        <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
          Reconnecting...
        </div>
      )}
      <ChatSidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} refreshChats={getAllChats} />
      {!activeChat ? (
        <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      ) : isLoading && offset === 0 ? (
        <div className="flex-1 flex items-center justify-center">Loading messages...</div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-red-500">{error}</div>
      ) : (
        <div className="flex-1 flex flex-col bg-[#f0f2f5]">
          <ChatHeader name={activeChat?.name || 'Unknown'} online={activeChat?.online || false} />
          <div
            className="flex-1 overflow-y-auto space-y-0"
            ref={chatContainerRef}
            style={{ backgroundImage: 'url("/chat-bg.png")' }}
          >
            <MessageList messages={messages} loadMore={loadMoreMessages} hasMore={hasMore} isInitialLoad={isInitialLoad} />
            <div ref={messagesEndRef} />
          </div>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={(value) => {
              setNewMessage(value);
              handleTyping(value);
            }}
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