// import { useState } from 'react';
// import { Bot } from 'lucide-react';
// import ChatbotModal from './ChatBotModal';

// const FloatingChatIcon = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="fixed bottom-1 right-1 z-[100]">
//       {isModalOpen && (
//         <div className="absolute bottom-16 right-0 mb-2">
//           <ChatbotModal onClose={() => setIsModalOpen(false)} />
//         </div>
//       )}
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="relative p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group"
//         aria-label="Open chatbot"
//       >
//         {/* Transparent gradient circle with subtle border */}
//         <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/50 group-hover:from-blue-600/30 group-hover:to-green-600/30 transition-all duration-300 animate-pulse-slow" />
        
//         {/* Bot Icon */}
//         <Bot
//           size={24}
//           className="relative z-10 text-blue-500 group-hover:text-blue-600 animate-bounce-subtle"
//         />
//       </button>
//     </div>
//   );
// };

// export default FloatingChatIcon;


import { useState } from 'react';
import { Bot } from 'lucide-react';
import ChatbotModal from './ChatBotModal';

const FloatingChatIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {isModalOpen && (
        <div className="absolute bottom-16 right-0 mb-2">
          <ChatbotModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group animate-floating"
        aria-label="Open chatbot"
      >
        {/* Transparent gradient circle with subtle border */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/50 group-hover:from-blue-600/30 group-hover:to-green-600/30 transition-all duration-300 animate-pulse-slow" />
        
        {/* Bot Icon */}
        <Bot
          size={24}
          className="relative z-10 text-blue-500 group-hover:text-blue-600 animate-bounce-subtle"
        />
      </button>
    </div>
  );
};

export default FloatingChatIcon;
