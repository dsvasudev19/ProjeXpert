import { Paperclip, Send, X, Loader2 } from 'lucide-react';
import {  useRef } from 'react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  disabled?: boolean;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isUploading?: boolean;
}

const MessageInput = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  disabled,
  selectedFile,
  setSelectedFile,
  isUploading = false
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-2 bg-gradient-to-r from-blue-50 to-green-50 border-t border-blue-100">
      <div className="flex flex-col space-y-2">
        {/* File attachment display */}
        {selectedFile && (
          <div className="flex items-center px-4 py-2 bg-white/70 rounded-lg border border-blue-200">
            <span className="text-sm text-gray-600 flex-1 truncate">
              {isUploading ? 'Uploading...' : selectedFile.name}
            </span>
            {isUploading ? (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            ) : (
              <button
                onClick={removeFile}
                className="ml-2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Input area */}
        <div className="flex items-center space-x-3">
          {!selectedFile && (
            <>
              <button 
                onClick={handleFileClick}
                className="p-2.5 hover:bg-blue-100/50 rounded-xl transition-colors"
                disabled={disabled || isUploading}
              >
                <Paperclip className="w-5 h-5 text-blue-500" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </>
          )}
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isUploading && handleSendMessage()}
            placeholder={isUploading ? "Uploading file..." : "Type your message..."}
            disabled={disabled || isUploading}
            className="flex-1 px-4 py-2.5 bg-white/70 rounded-xl border border-blue-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all placeholder-gray-400 text-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={disabled || isUploading || (!newMessage.trim() && !selectedFile)}
            className="p-3 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded hover:shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;