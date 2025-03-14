import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, X } from 'lucide-react';
import axios from 'axios';

const ChatbotModal = ({ onClose }:any) => {
  const [messages, setMessages] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages:any) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/gemini', {
        prompt: userMessage.content,
      });

      const botMessage = {
        type: 'bot',
        content: response.data.text, // Adjust based on your backend response
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages:any) => [...prevMessages, botMessage]);
    } catch (error:any) {
      const errorMessage = {
        type: 'error',
        content: error.response?.data?.message || 'Failed to get response from Gemini.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages:any) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const formatTime = (timestamp:any) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col h-[28rem] relative">
        {/* Modal Header */}
        <div className="bg-indigo-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h2 className="font-semibold">Gemini Chat</h2>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-100 hover:text-white"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Bot size={40} className="mb-2 text-indigo-300" />
              <p className="text-center">Ask me anything!</p>
            </div>
          ) : (
            messages.map((message:any, index:any) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : message.type === 'error'
                      ? 'bg-red-100 text-red-800 rounded-bl-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'user' ? (
                      <User size={14} className="text-indigo-200" />
                    ) : message.type === 'error' ? (
                      <X size={14} className="text-red-500" />
                    ) : (
                      <Bot size={14} className="text-gray-500" />
                    )}
                    <span className="text-xs opacity-75">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-indigo-600" />
                  <span className="text-sm text-gray-500">Processing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`p-2 rounded-full ${
                isLoading || inputValue.trim() === ''
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={isLoading || inputValue.trim() === ''}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotModal;