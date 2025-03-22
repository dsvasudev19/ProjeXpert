// export default MessageList;
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Download, X, Check, Clock } from "lucide-react";
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

  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-600">Loading...</div>;

  if (!user?.user) {
    return <div className="flex-1 flex items-center justify-center text-gray-600">Please log in to view messages</div>;
  }

  if (!messages || messages.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-gray-600">No messages yet</div>;
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
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();

  return (
    <>
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-6" 
        style={{ 
          backgroundColor: '#FFFCEF', 
          backgroundImage: 'url("/chat-bg-light.png")',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div ref={messagesTopRef} />
        
        {hasMore && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-[#5c899D] text-white rounded-full hover:bg-opacity-90 transition-colors shadow-md text-sm font-medium"
            >
              Load More Messages
            </button>
          </div>
        )}
        
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-[#5c899D]/10 text-[#5c899D] text-xs rounded-full">
                {date === new Date().toLocaleDateString() ? 'Today' : date}
              </span>
            </div>
            
            {dateMessages.map((message, index) => {
              if (!message?.sender) {
                return null;
              }

              const isSentByMe = message.sender.id === user.user.id;
              const showAvatar = !isSentByMe && 
                (index === 0 || dateMessages[index - 1]?.sender?.id !== message.sender.id);
              const isLastInSequence = 
                index === dateMessages.length - 1 || 
                dateMessages[index + 1]?.sender?.id !== message.sender.id;

              // Calculate if message is short based on content length
              const isShortMessage = !message.attachment && (!message.content || message.content.length < 20);
              
              return (
                <div
                  key={message.id || `msg-${Math.random()}`}
                  className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!isSentByMe && (
                    <div className="flex-shrink-0 w-8">
                      {showAvatar && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-xs">
                          {message.sender.avatar ? (
                            <img 
                              src={message.sender.avatar} 
                              alt={message.sender.name || 'User'} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{message.sender.name?.charAt(0)?.toUpperCase() || '?'}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] group relative ${isLastInSequence ? 'mb-3' : 'mb-1'}`}>
                    {!isSentByMe && showAvatar && (
                      <span className="text-xs text-gray-500 ml-2 mb-1 block">
                        {message.sender.name || 'Unknown'}
                      </span>
                    )}
                    
                    <div
                      className={`p-3 pb-6 shadow-sm rounded-2xl relative
                        ${isSentByMe 
                          ? 'bg-[#5c899D] text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none border border-[#5c899D]/10'
                        }
                        ${isShortMessage ? 'min-w-[120px]' : ''}
                      `}
                    >
                      {message.content && (
                        <p className="text-sm whitespace-pre-wrap break-words mb-2">
                          {message.content}
                        </p>
                      )}

                      {message.attachment && (
                        <div 
                          className={`mb-2 rounded-lg overflow-hidden ${message.content ? 'border-t pt-2' : ''} 
                            ${isSentByMe ? 'border-white/20' : 'border-gray-200'}`}
                        >
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
                      
                      <div className={`flex items-center gap-1 absolute bottom-1.5 right-3
                        ${isSentByMe ? 'text-white/80' : 'text-gray-400'}`}
                      >
                        <span className="text-xs">{formatTime(message.createdAt)}</span>
                        {isSentByMe && (
                          message.isRead 
                            ? <Check className="w-3 h-3" /> 
                            : <Clock className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`absolute w-3 h-3 bottom-0 
                        ${isSentByMe 
                          ? 'right-0 bg-[#5c899D]' 
                          : 'left-0 bg-white border-l border-b border-[#5c899D]/10'
                        }
                        ${isLastInSequence ? 'block' : 'hidden'}
                      `}
                      style={{
                        clipPath: isSentByMe 
                          ? 'polygon(0 0, 100% 0, 100% 100%)' 
                          : 'polygon(0 0, 0 100%, 100% 100%)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {typingUser && (
          <div className="flex justify-start items-end gap-2 ml-10">
            <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-[#5c899D]/10">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-[#5c899D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-[#5c899D] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                <span className="w-2 h-2 bg-[#5c899D] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic">{typingUser} is typing</p>
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