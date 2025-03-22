// import { Video, Phone, MoreVertical } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useSocket } from '../../contexts/SocketContext';

// const ChatHeader = ({ name, online: initialOnline }: any) => {
//   const [isOnline, setIsOnline] = useState(initialOnline);
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.on("userStatus", ({ userId, online }:any) => {
//       console.log(userId)
//       // Assuming `name` corresponds to the other participant's name or ID
//       setIsOnline(online); // Update based on real-time status
//     });

//     return () => {
//       socket.off("userStatus");
//     };
//   }, [socket, name]);

//   return (
//     <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
//       <div className="flex items-center space-x-4">
//         <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center shadow-md">
//           <span className="text-white font-medium text-sm">{name.charAt(0)}</span>
//         </div>
//         <div>
//           <h3 className="text-gray-800 font-semibold">{name}</h3>
//           <p className="text-sm text-gray-600 flex items-center">
//             {isOnline && <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>}
//             {isOnline ? 'Online' : 'Offline'}
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-2">
//         <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
//           <Video className="w-5 h-5 text-blue-600" />
//         </button>
//         <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
//           <Phone className="w-5 h-5 text-blue-600" />
//         </button>
//         <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
//           <MoreVertical className="w-5 h-5 text-blue-600" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

import { Video, Phone, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';

const ChatHeader = ({ name, online: initialOnline }: any) => {
  const [isOnline, setIsOnline] = useState(initialOnline);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("userStatus", ({ userId, online }:any) => {
      console.log(userId)
      // Assuming `name` corresponds to the other participant's name or ID
      setIsOnline(online); // Update based on real-time status
    });

    return () => {
      socket.off("userStatus");
    };
  }, [socket, name]);

  return (
    <div className="flex items-center justify-between p-4 bg-[#FFFCEF] border-b border-[#E8E5D8]">
      <div className="flex items-center space-x-4">
        <div className="w-11 h-11 rounded-full bg-[#5C899D] flex items-center justify-center shadow-md">
          <span className="text-[#FFFCEF] font-medium text-sm">{name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-[#3A3A3A] font-semibold">{name}</h3>
          <p className="text-sm text-[#5E5E5E] flex items-center">
            {isOnline && <span className="w-2 h-2 bg-[#5C899D] rounded-full mr-2 animate-pulse"></span>}
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2.5 hover:bg-[#E8E5D8] rounded-xl transition-colors">
          <Video className="w-5 h-5 text-[#5C899D]" />
        </button>
        <button className="p-2.5 hover:bg-[#E8E5D8] rounded-xl transition-colors">
          <Phone className="w-5 h-5 text-[#5C899D]" />
        </button>
        <button className="p-2.5 hover:bg-[#E8E5D8] rounded-xl transition-colors">
          <MoreVertical className="w-5 h-5 text-[#5C899D]" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;