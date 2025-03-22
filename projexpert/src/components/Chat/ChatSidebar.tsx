// import { Search, MoreVertical, Plus, X, Users, MessageSquare } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { axiosInstance } from '../../axiosIntance';

// const ChatSidebar = ({ chats, activeChat, setActiveChat, refreshChats }: any) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [chatName, setChatName] = useState('');
//   const [participantId, setParticipantId] = useState('');
//   const [participantEmail, setParticipantEmail] = useState('');
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [searchText, setSearchText] = useState('');
//   const [filteredChats, setFilteredChats] = useState(chats);

//   // Custom color palette
//   const colors = {
//     primary: '#5C899D',
//     primaryHover: '#4A7585',
//     background: '#FFFCEF',
//     lightAccent: '#E8E5D8',
//     mediumAccent: '#D6D3C6',
//     darkText: '#3A3A3A',
//     mediumText: '#5E5E5E',
//     lightText: '#7A7A7A'
//   };

//   useEffect(() => {
//     if (searchText.trim() === '') {
//       setFilteredChats(chats);
//     } else {
//       setFilteredChats(
//         chats.filter((chat: any) => 
//           chat.name.toLowerCase().includes(searchText.toLowerCase())
//         )
//       );
//     }
//   }, [searchText, chats]);

//   const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setParticipantEmail(value);
//     setParticipantId(''); // Clear ID when user is typing
    
//     if (value.length > 0) {
//       try {
//         const response = await axiosInstance.get('/admin/client/chat/participants', {
//           params: { searchTerm: value }
//         });

//         const users = response.data.data;
//         setSuggestions(users.map((user: { email: string, id: string }) => ({ 
//           email: user.email, 
//           id: user.id 
//         })));
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//         setSuggestions([]);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleStartChat = async () => {
//     if (!chatName || !participantId) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     try {
//       const res = await axiosInstance.post("/rooms", { participantId, chatName });
      
//       if (res?.status === 200) {
//         toast.success('New chat created!');
//         setIsModalOpen(false);
//         setChatName('');
//         setParticipantId('');
//         setParticipantEmail('');
//         refreshChats();
//       }
//     } catch (error) {
//       toast.error('Failed to create chat');
//       console.error(error);
//     }
//   };

//   // Custom monogram colors using our palette
//   const getMonogramColor = (name: string) => {
//     const monogramColors = [
//       { bg: 'bg-[#5C899D]', text: 'text-[#FFFCEF]' },
//       { bg: 'bg-[#4A7585]', text: 'text-[#FFFCEF]' },
//       { bg: 'bg-[#6A97AB]', text: 'text-[#FFFCEF]' },
//       { bg: 'bg-[#7EABC0]', text: 'text-[#FFFCEF]' },
//       { bg: 'bg-[#8BC0D5]', text: 'text-[#FFFCEF]' },
//     ];
    
//     const charCode = name.charCodeAt(0) || 0;
//     return monogramColors[charCode % monogramColors.length];
//   };

//   return (
//     <div className="w-[380px] flex flex-col bg-[#FFFCEF] border-r border-[#E8E5D8] shadow-sm">
//       {/* Header */}
//       <div className="p-5 bg-[#5C899D] border-b border-[#4A7585]">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-full bg-[#FFFCEF] border border-[#E8E5D8] flex items-center justify-center">
//               <MessageSquare className="w-5 h-5 text-[#5C899D]" />
//             </div>
//             <div>
//               <h2 className="text-[#FFFCEF] font-serif text-lg">Conversations</h2>
//               <p className="text-[#E8E5D8] text-xs font-light">{chats.length} messages</p>
//             </div>
//           </div>
//           <button className="p-2 hover:bg-[#4A7585] rounded-full transition-colors">
//             <MoreVertical className="w-5 h-5 text-[#FFFCEF]" />
//           </button>
//         </div>
//       </div>

//       {/* Search Box */}
//       <div className="p-4 sticky top-0 z-10 bg-[#FFFCEF] border-b border-[#E8E5D8]">
//         <div className="relative flex items-center">
//           <input
//             type="text"
//             placeholder="Search conversations..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             className="w-full pl-10 pr-10 py-2.5 bg-white rounded-md border border-[#E8E5D8] focus:outline-none focus:border-[#5C899D] focus:ring-1 focus:ring-[#5C899D] transition-all placeholder:text-[#7A7A7A] text-[#3A3A3A] text-sm"
//           />
//           <Search className="w-4 h-4 text-[#7A7A7A] absolute left-4 top-3" />
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="absolute right-3 p-1.5 bg-[#5C899D] hover:bg-[#4A7585] text-[#FFFCEF] rounded-full transition-all border border-[#4A7585]"
//             title="New Conversation"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* New Chat Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-[#FFFCEF] rounded-lg p-6 w-[420px] shadow-xl max-w-full mx-4">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-serif text-[#3A3A3A]">New Conversation</h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-1.5 hover:bg-[#E8E5D8] rounded-full transition-colors"
//               >
//                 <X className="w-4 h-4 text-[#5C899D]" />
//               </button>
//             </div>
            
//             <div className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-[#3A3A3A] mb-1.5">Conversation Name</label>
//                 <input
//                   type="text"
//                   value={chatName}
//                   onChange={(e) => setChatName(e.target.value)}
//                   className="w-full px-3 py-2 border border-[#D6D3C6] rounded focus:outline-none focus:ring-1 focus:ring-[#5C899D] focus:border-[#5C899D] transition-all text-sm"
//                   placeholder="Enter a name for this conversation"
//                 />
//               </div>
              
//               <div className="relative">
//                 <label className="block text-sm font-medium text-[#3A3A3A] mb-1.5">Participant Email</label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     value={participantEmail}
//                     onChange={handleEmailChange}
//                     className="w-full px-3 py-2 border border-[#D6D3C6] rounded focus:outline-none focus:ring-1 focus:ring-[#5C899D] focus:border-[#5C899D] transition-all pl-9 text-sm"
//                     placeholder="Search by email address"
//                   />
//                   <Users className="w-4 h-4 text-[#7A7A7A] absolute left-3 top-2.5" />
//                 </div>
                
//                 {suggestions.length > 0 && (
//                   <div className="absolute w-full mt-1 bg-white border border-[#E8E5D8] rounded shadow-lg max-h-60 overflow-y-auto z-20">
//                     {suggestions.map((suggestion: any, index: any) => (
//                       <div
//                         key={index}
//                         className="px-3 py-2.5 hover:bg-[#FFFCEF] cursor-pointer flex items-center space-x-3 border-b border-[#E8E5D8] last:border-0"
//                         onClick={() => {
//                           setParticipantId(suggestion.id);
//                           setParticipantEmail(suggestion.email);
//                           setSuggestions([]);
//                         }}
//                       >
//                         <div className="w-7 h-7 rounded-full bg-[#5C899D] flex items-center justify-center">
//                           <span className="text-[#FFFCEF] font-medium text-xs">{suggestion.email.charAt(0).toUpperCase()}</span>
//                         </div>
//                         <span className="text-[#3A3A3A] text-sm">{suggestion.email}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-[#E8E5D8]">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 text-[#5C899D] hover:bg-[#E8E5D8] rounded border border-[#D6D3C6] transition-colors text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleStartChat}
//                 className="px-4 py-2 bg-[#5C899D] text-[#FFFCEF] rounded hover:bg-[#4A7585] transition-colors text-sm"
//               >
//                 Create Conversation
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {filteredChats.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 text-center p-6">
//             <div className="w-14 h-14 rounded-full bg-[#E8E5D8] flex items-center justify-center mb-4">
//               <MessageSquare className="w-6 h-6 text-[#5C899D]" />
//             </div>
//             <h3 className="text-base font-medium text-[#3A3A3A]">No conversations</h3>
//             <p className="text-[#5E5E5E] mt-1 max-w-xs text-sm">
//               {searchText ? "Try a different search term" : "Start a new conversation"}
//             </p>
//             {!searchText && (
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="mt-4 px-3 py-1.5 bg-[#5C899D] text-[#FFFCEF] rounded border border-[#4A7585] hover:bg-[#4A7585] transition-colors text-sm flex items-center"
//               >
//                 <Plus className="w-4 h-4 mr-1.5" /> New Conversation
//               </button>
//             )}
//           </div>
//         ) : (
//           filteredChats.map((chat: any) => {
//             const monogramColors = getMonogramColor(chat?.name);
//             return (
//               <div
//                 key={chat.id}
//                 onClick={() => setActiveChat(chat)}
//                 className={`flex items-center p-4 cursor-pointer transition-all hover:bg-[#E8E5D8] relative ${
//                   activeChat?.id === chat?.id 
//                     ? 'bg-[#E8E5D8] border-l-2 border-[#5C899D]' 
//                     : 'border-l-2 border-transparent'
//                 }`}
//               >
//                 <div className="relative">
//                   <div className={`w-10 h-10 rounded-full ${monogramColors.bg} flex items-center justify-center`}>
//                     <span className={`${monogramColors.text} font-medium`}>{chat?.name?.charAt(0).toUpperCase()}</span>
//                   </div>
//                   {chat.online && (
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#5C899D] rounded-full border border-[#FFFCEF]"></div>
//                   )}
//                 </div>
                
//                 <div className="ml-3 flex-1 overflow-hidden">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-medium text-[#3A3A3A] truncate text-sm">{chat.name}</h3>
//                     <span className="text-xs text-[#5E5E5E] ml-2 whitespace-nowrap">
//                       {new Date(chat?.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                     </span>
//                   </div>
                  
//                   <div className="flex justify-between items-center mt-0.5">
//                     <p className="text-xs text-[#7A7A7A] truncate pr-4 w-full font-light">
//                       {chat?.lastMessage || "No messages yet"}
//                     </p>
//                     {chat.unread > 0 && (
//                       <span className="bg-[#5C899D] text-[#FFFCEF] rounded-full min-w-[18px] h-4 px-1.5 flex items-center justify-center text-xs font-medium shrink-0">
//                         {chat.unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSidebar;



import { Search, MoreVertical, Plus, X, Users, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../axiosIntance';
import { useAuth } from '../../contexts/AuthContext';

const ChatSidebar = ({ chats, activeChat, setActiveChat, refreshChats }: any) => {
  const { user, loading } = useAuth(); // Get current user data
  const currentUserId = !loading && user?.user?.id;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  // Custom color palette
  // const colors = {
  //   primary: '#5C899D',
  //   primaryHover: '#4A7585',
  //   background: '#FFFCEF',
  //   lightAccent: '#E8E5D8',
  //   mediumAccent: '#D6D3C6',
  //   darkText: '#3A3A3A',
  //   mediumText: '#5E5E5E',
  //   lightText: '#7A7A7A'
  // };

  // Get other participant's name for display
  const getOtherParticipantName = (chat: any) => {
    
    if (!currentUserId || !chat) return chat?.name || 'Unknown';
    
    // Determine which participant is the other user
    if (chat.participant1Id === currentUserId) {
      return chat.participant2?.name || 'Unknown User';
    } else {
      return chat.participant1?.name || 'Unknown User';
    }
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredChats(chats);
    } else {
      setFilteredChats(
        chats.filter((chat: any) => {
          const otherParticipantName = getOtherParticipantName(chat);
          return otherParticipantName.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    }
  }, [searchText, chats, currentUserId]);

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParticipantEmail(value);
    setParticipantId(''); // Clear ID when user is typing
    
    if (value.length > 0) {
      try {
        const response = await axiosInstance.get('/admin/client/chat/participants', {
          params: { searchTerm: value }
        });

        const users = response.data.data;
        setSuggestions(users.map((user: { email: string, id: string }) => ({ 
          email: user.email, 
          id: user.id 
        })));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleStartChat = async () => {
    if (!chatName || !participantId) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axiosInstance.post("/rooms", { participantId, chatName });
      
      if (res?.status === 200) {
        toast.success('New chat created!');
        setIsModalOpen(false);
        setChatName('');
        setParticipantId('');
        setParticipantEmail('');
        refreshChats();
      }
    } catch (error) {
      toast.error('Failed to create chat');
      console.error(error);
    }
  };

  // Custom monogram colors using our palette
  const getMonogramColor = (name: string) => {
    const monogramColors = [
      { bg: 'bg-[#5C899D]', text: 'text-[#FFFCEF]' },
      { bg: 'bg-[#4A7585]', text: 'text-[#FFFCEF]' },
      { bg: 'bg-[#6A97AB]', text: 'text-[#FFFCEF]' },
      { bg: 'bg-[#7EABC0]', text: 'text-[#FFFCEF]' },
      { bg: 'bg-[#8BC0D5]', text: 'text-[#FFFCEF]' },
    ];
    
    const charCode = name?.charCodeAt(0) || 0;
    return monogramColors[charCode % monogramColors.length];
  };

  return (
    <div className="w-[380px] flex flex-col bg-[#FFFCEF] border-r border-[#E8E5D8] shadow-sm">
      {/* Header */}
      <div className="p-5 bg-[#5C899D] border-b border-[#4A7585]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#FFFCEF] border border-[#E8E5D8] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#5C899D]" />
            </div>
            <div>
              <h2 className="text-[#FFFCEF] font-serif text-lg">Conversations</h2>
              <p className="text-[#E8E5D8] text-xs font-light">{chats.length} messages</p>
            </div>
          </div>
          <button className="p-2 hover:bg-[#4A7585] rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-[#FFFCEF]" />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-4 sticky top-0 z-10 bg-[#FFFCEF] border-b border-[#E8E5D8]">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white rounded-md border border-[#E8E5D8] focus:outline-none focus:border-[#5C899D] focus:ring-1 focus:ring-[#5C899D] transition-all placeholder:text-[#7A7A7A] text-[#3A3A3A] text-sm"
          />
          <Search className="w-4 h-4 text-[#7A7A7A] absolute left-4 top-3" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute right-3 p-1.5 bg-[#5C899D] hover:bg-[#4A7585] text-[#FFFCEF] rounded-full transition-all border border-[#4A7585]"
            title="New Conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#FFFCEF] rounded-lg p-6 w-[420px] shadow-xl max-w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif text-[#3A3A3A]">New Conversation</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-[#E8E5D8] rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#5C899D]" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#3A3A3A] mb-1.5">Conversation Name</label>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D6D3C6] rounded focus:outline-none focus:ring-1 focus:ring-[#5C899D] focus:border-[#5C899D] transition-all text-sm"
                  placeholder="Enter a name for this conversation"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-[#3A3A3A] mb-1.5">Participant Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={participantEmail}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-[#D6D3C6] rounded focus:outline-none focus:ring-1 focus:ring-[#5C899D] focus:border-[#5C899D] transition-all pl-9 text-sm"
                    placeholder="Search by email address"
                  />
                  <Users className="w-4 h-4 text-[#7A7A7A] absolute left-3 top-2.5" />
                </div>
                
                {suggestions.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white border border-[#E8E5D8] rounded shadow-lg max-h-60 overflow-y-auto z-20">
                    {suggestions.map((suggestion: any, index: any) => (
                      <div
                        key={index}
                        className="px-3 py-2.5 hover:bg-[#FFFCEF] cursor-pointer flex items-center space-x-3 border-b border-[#E8E5D8] last:border-0"
                        onClick={() => {
                          setParticipantId(suggestion.id);
                          setParticipantEmail(suggestion.email);
                          setSuggestions([]);
                        }}
                      >
                        <div className="w-7 h-7 rounded-full bg-[#5C899D] flex items-center justify-center">
                          <span className="text-[#FFFCEF] font-medium text-xs">{suggestion.email.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-[#3A3A3A] text-sm">{suggestion.email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-[#E8E5D8]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-[#5C899D] hover:bg-[#E8E5D8] rounded border border-[#D6D3C6] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleStartChat}
                className="px-4 py-2 bg-[#5C899D] text-[#FFFCEF] rounded hover:bg-[#4A7585] transition-colors text-sm"
              >
                Create Conversation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <div className="w-14 h-14 rounded-full bg-[#E8E5D8] flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-[#5C899D]" />
            </div>
            <h3 className="text-base font-medium text-[#3A3A3A]">No conversations</h3>
            <p className="text-[#5E5E5E] mt-1 max-w-xs text-sm">
              {searchText ? "Try a different search term" : "Start a new conversation"}
            </p>
            {!searchText && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-3 py-1.5 bg-[#5C899D] text-[#FFFCEF] rounded border border-[#4A7585] hover:bg-[#4A7585] transition-colors text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1.5" /> New Conversation
              </button>
            )}
          </div>
        ) : (
          filteredChats.map((chat: any) => {
            const otherParticipantName = getOtherParticipantName(chat);
            const monogramColors = getMonogramColor(otherParticipantName);
            
            // Get avatar of other participant
            const otherParticipantAvatar = currentUserId === chat.participant1Id 
              ? chat.participant2?.avatar 
              : chat.participant1?.avatar;
              
            return (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`flex items-center p-4 cursor-pointer transition-all hover:bg-[#E8E5D8] relative ${
                  activeChat?.id === chat?.id 
                    ? 'bg-[#E8E5D8] border-l-2 border-[#5C899D]' 
                    : 'border-l-2 border-transparent'
                }`}
              >
                <div className="relative">
                  {otherParticipantAvatar ? (
                    <img 
                      src={otherParticipantAvatar} 
                      alt={otherParticipantName}
                      className="w-10 h-10 rounded-full object-cover border border-[#E8E5D8]"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${monogramColors.bg} flex items-center justify-center`}>
                      <span className={`${monogramColors.text} font-medium`}>
                        {otherParticipantName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#5C899D] rounded-full border border-[#FFFCEF]"></div>
                  )}
                </div>
                
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-[#3A3A3A] truncate text-sm">{otherParticipantName}</h3>
                    <span className="text-xs text-[#5E5E5E] ml-2 whitespace-nowrap">
                      {new Date(chat?.lastMessageAt || chat?.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-xs text-[#7A7A7A] truncate pr-4 w-full font-light">
                      {chat?.lastMessage || "No messages yet"}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-[#5C899D] text-[#FFFCEF] rounded-full min-w-[18px] h-4 px-1.5 flex items-center justify-center text-xs font-medium shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;