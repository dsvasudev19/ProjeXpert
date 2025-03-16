// import { useAuth } from "../../contexts/AuthContext";
// import { useState, useEffect, useRef } from "react";
// import { Download, X } from "lucide-react";

// interface Sender {
//   id: number;
//   name: string;
//   avatar: string | null;
// }

// interface Message {
//   id: number;
//   chatRoomId: number;
//   senderId: number;
//   content: string;
//   attachment?: string | null;
//   isRead: boolean;
//   createdAt: string;
//   updatedAt: string;
//   sender: Sender;
// }

// interface MessageListProps {
//   messages: Message[];
//   loadMore: () => void;
//   hasMore: boolean;
//   isInitialLoad: boolean; // New prop
// }

// const MessageList = ({ messages, loadMore, hasMore, isInitialLoad }: MessageListProps) => {
//   const { user, loading } = useAuth();
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const messagesTopRef = useRef<HTMLDivElement>(null); // Ref for top of messages

//   useEffect(() => {
//     if (isInitialLoad) {
//       scrollToBottom(); // Scroll to bottom only on initial load
//     }
//   }, [messages, isInitialLoad]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const scrollToTop = () => {
//     messagesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleLoadMore = () => {
//     loadMore();
//     setTimeout(scrollToTop, 100); // Scroll to top after loading more
//   };

//   if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

//   if (!user?.user) {
//     return <div className="flex-1 flex items-center justify-center">Please log in to view messages</div>;
//   }

//   if (!messages || messages.length === 0) {
//     return <div className="flex-1 flex items-center justify-center">No messages yet</div>;
//   }

//   const formatTime = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return 'Invalid date';
//       }
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   const handleImageClick = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <>
//       <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundImage: 'url("/chat-bg.png")' }}>
//         <div ref={messagesTopRef} /> {/* Top anchor */}
//         {hasMore && (
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={handleLoadMore}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//         {messages.map((message) => {
//           if (!message?.sender) {
//             return null;
//           }

//           const isSentByMe = message.sender.id === user.user.id;

//           return (
//             <div
//               key={message.id || `msg-${Math.random()}`}
//               className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[70%] rounded-lg p-3 shadow-sm relative
//                   ${isSentByMe
//                     ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-tr-none'
//                     : 'bg-white rounded-tl-none'
//                   }`}
//               >
//                 {!isSentByMe && (
//                   <p className="text-xs text-gray-600 mb-1">{message.sender.name || 'Unknown User'}</p>
//                 )}

//                 {message.content && (
//                   <p className="text-sm mb-2">{message.content}</p>
//                 )}

//                 {message.attachment && (
//                   <div className="mt-2 rounded-lg overflow-hidden">
//                     <img
//                       src={message.attachment}
//                       alt="attachment"
//                       className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
//                       style={{ maxHeight: '200px' }}
//                       loading="lazy"
//                       onClick={() => handleImageClick(message.attachment!)}
//                     />
//                   </div>
//                 )}

//                 <p className={`text-[10px] mt-1 text-right
//                   ${isSentByMe ? 'text-white/80' : 'text-gray-500'}`}
//                 >
//                   {formatTime(message.createdAt)}
//                   {!isSentByMe && message.isRead === false && (
//                     <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
//                   )}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div className="relative max-w-[90%] max-h-[90vh]">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <a
//               href={selectedImage}
//               download
//               target="_blank"
//               rel="noopener noreferrer"
//               className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Download className="w-6 h-6" />
//             </a>
//             <img
//               src={selectedImage}
//               alt="Preview"
//               className="max-w-full max-h-[90vh] object-contain"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MessageList;

import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Download, X } from "lucide-react";
import { useSocket } from "../../contexts/SocketContext";

interface Sender {
  id: number;
  name: string;
  avatar: string | null;
}

interface Message {
  id: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  attachment?: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender: Sender;
}

interface MessageListProps {
  messages: Message[];
  loadMore: () => void;
  hasMore: boolean;
  isInitialLoad: boolean;
}

const MessageList = ({ messages, loadMore, hasMore, isInitialLoad }: MessageListProps) => {
  const { user, loading } = useAuth();
  const { socket } = useSocket();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInitialLoad) {
      scrollToBottom();
    }
  }, [messages, isInitialLoad]);

  useEffect(() => {
    if (!socket) return;

    socket.on("typing", ({ userId, isTyping }:any) => {
      if (userId !== user?.user?.id) {
        setTypingUser(isTyping ? "Someone" : null); // Replace "Someone" with actual name if available
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [socket, user?.user?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    messagesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    loadMore();
    setTimeout(scrollToTop, 100);
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

  if (!user?.user) {
    return <div className="flex-1 flex items-center justify-center">Please log in to view messages</div>;
  }

  if (!messages || messages.length === 0) {
    return <div className="flex-1 flex items-center justify-center">No messages yet</div>;
  }

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundImage: 'url("/chat-bg.png")' }}>
        <div ref={messagesTopRef} />
        {hasMore && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
        {messages.map((message) => {
          if (!message?.sender) {
            return null;
          }

          const isSentByMe = message.sender.id === user.user.id;

          return (
            <div
              key={message.id || `msg-${Math.random()}`}
              className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 shadow-sm relative
                  ${isSentByMe
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-tr-none'
                    : 'bg-white rounded-tl-none'
                  }`}
              >
                {!isSentByMe && (
                  <p className="text-xs text-gray-600 mb-1">{message.sender.name || 'Unknown User'}</p>
                )}

                {message.content && (
                  <p className="text-sm mb-2">{message.content}</p>
                )}

                {message.attachment && (
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <img
                      src={message.attachment}
                      alt="attachment"
                      className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ maxHeight: '200px' }}
                      loading="lazy"
                      onClick={() => handleImageClick(message.attachment!)}
                    />
                  </div>
                )}

                <p className={`text-[10px] mt-1 text-right
                  ${isSentByMe ? 'text-white/80' : 'text-gray-500'}`}
                >
                  {formatTime(message.createdAt)}
                  {!isSentByMe && message.isRead === false && (
                    <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </p>
              </div>
            </div>
          );
        })}
        {typingUser && (
          <div className="flex justify-start">
            <p className="text-sm text-gray-500 italic">{typingUser} is typing...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-[90%] max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <a
              href={selectedImage}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-6 h-6" />
            </a>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;