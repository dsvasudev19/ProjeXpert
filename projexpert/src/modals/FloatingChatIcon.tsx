import  { useState } from 'react';
import { Bot } from 'lucide-react';
import ChatbotModal from './ChatBotModal'; // We'll create this next

const FloatingChatIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50"
        aria-label="Open chatbot"
      >
        <Bot size={24} />
      </button>

      {isModalOpen && (
        <ChatbotModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default FloatingChatIcon;