import { Video, Phone, MoreVertical } from 'lucide-react';

const ChatHeader = ({ name, online }:any) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
      <div className="flex items-center space-x-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center shadow-md">
          <span className="text-white font-medium text-sm">{name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            {online && <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>}
            {online ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
          <Video className="w-5 h-5 text-blue-600" />
        </button>
        <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
          <Phone className="w-5 h-5 text-blue-600" />
        </button>
        <button className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors">
          <MoreVertical className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;