import { Search, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ChatSidebar = ({ chats, activeChat, setActiveChat }:any) => {
  console.log(chats)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParticipantEmail(value);
    
    // Mock suggestions - replace with actual API call
    if (value.length > 0) {
      setSuggestions([
        `${value}@gmail.com`,
        `${value}@outlook.com`,
        `${value}@yahoo.com`
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleStartChat = () => {
    if (!chatName || !participantEmail) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Add your chat creation logic here
    toast.success('New chat created!');
    setIsModalOpen(false);
    setChatName('');
    setParticipantEmail('');
  };

  return (
    <div className="w-[380px] flex flex-col border-r border-blue-100 ">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center shadow-md">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <h2 className="text-gray-800 font-semibold text-lg">Messages</h2>
          </div>
          <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-11 pr-4 py-2.5 bg-white/70 rounded-xl border border-blue-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
          />
          <Search className="w-5 h-5 text-blue-400 absolute left-4 top-3" />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute right-4 p-1.5 hover:bg-blue-100/50 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      {/* New Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-[400px] shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Start New Chat</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chat Name</label>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="Enter chat name"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Participant Email</label>
                <input
                  type="email"
                  value={participantEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="Enter email"
                />
                {suggestions.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setParticipantEmail(suggestion);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartChat}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded hover:opacity-90 transition-opacity"
              >
                Start New Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length>0 && chats?.map((chat:any) => (
          <div 
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`flex items-center p-4 cursor-pointer hover:bg-blue-50/50 transition-all
              ${activeChat?.id === chat?.id ? 'bg-gradient-to-r from-blue-100/50 to-green-100/50 border-l-4 border-teal-400' : ''}`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center shadow-md">
                <span className="text-white font-medium">{chat.name.charAt(0)}</span>
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-teal-400 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                <span className="text-xs text-gray-600">{new Date(chat?.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                {/* <p className="text-sm text-gray-600 truncate pr-4">{chat?.messages[0]?.content}</p> */}
                {chat.unread > 0 && (
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium shadow-sm">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;