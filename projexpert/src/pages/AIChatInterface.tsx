import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, XCircle } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';
import ReactMarkdown from 'react-markdown';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<{ type: string; content: string; timestamp: string; isMarkdown?: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMarkdown = (content: string) => {
    const markdownPatterns = [
      /^#\s+/m,
      /\*\*.*\*\*/,
      /\*.*\*/,
      /\[.*\]\(.*\)/,
      /```[\s\S]*?```/,
      /^\s*-\s+/m,
      /^\s*\d+\.\s+/m,
      /\|.*\|.*\|/,
      /^>\s+/m,
    ];
    return markdownPatterns.some(pattern => pattern.test(content));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/admin/ai/gen', {
        prompt: userMessage.content,
      });

      const result = response.data;

      if (result.success) {
        const botMessage = {
          type: 'bot',
          content: result.data,
          isMarkdown: isMarkdown(result.data),
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        setMessages(prev => [...prev, {
          type: 'error',
          content: result.message || 'Something went wrong',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: error.response?.data?.message || 'Network error',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bot size={24} />
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
        >
          <XCircle size={18} />
          <span className="text-sm font-medium">Clear Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-blue-50 to-green-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-full mb-6 shadow-lg">
              <Bot size={48} className="text-white" />
            </div>
            <h2 className="text-xl font-medium mb-2 text-gray-700">Welcome to AI Assistant</h2>
            <p className="text-center max-w-md mb-8">
              I'm here to help answer your questions and assist with tasks. What would you like to know?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {[
                "How can I improve my workflow?",
                "Tell me about the latest AI trends",
                "Help me draft an email",
                "What are some productivity tips?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(suggestion);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-2xl lg:max-w-3xl rounded-2xl px-5 py-3 shadow-sm ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-br-none'
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-800 rounded-bl-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === 'user' ? (
                    <User size={16} className="text-white/80" />
                  ) : message.type === 'error' ? (
                    <XCircle size={16} className="text-red-500" />
                  ) : (
                    <Bot size={16} className="text-blue-500" />
                  )}
                  <span className="text-xs opacity-75">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {message.isMarkdown ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-5 py-3 rounded-bl-none shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-1">
                  <Loader2 size={16} className="animate-spin text-white" />
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            autoFocus
          />
          <button
            className={`p-3 rounded-full ${
              isLoading || inputValue.trim() === ''
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-md'
            }`}
            disabled={isLoading || inputValue.trim() === ''}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotInterface;