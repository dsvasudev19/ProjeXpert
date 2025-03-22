import { Paperclip, Send, X, Loader2 } from 'lucide-react';
import { useRef } from 'react';

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
    <div className="p-2 bg-[#FFFCEF] border-t border-[#E8E5D8]">
      <div className="flex flex-col space-y-2">
        {/* File attachment display */}
        {selectedFile && (
          <div className="flex items-center px-4 py-2 bg-white/70 rounded-lg border border-[#D6D3C6]">
            <span className="text-sm text-[#5E5E5E] flex-1 truncate">
              {isUploading ? 'Uploading...' : selectedFile.name}
            </span>
            {isUploading ? (
              <Loader2 className="w-4 h-4 text-[#5C899D] animate-spin" />
            ) : (
              <button
                onClick={removeFile}
                className="ml-2 p-1 hover:bg-[#E8E5D8] rounded-full"
              >
                <X className="w-4 h-4 text-[#5E5E5E]" />
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
                className="p-2.5 hover:bg-[#E8E5D8] rounded-xl transition-colors"
                disabled={disabled || isUploading}
              >
                <Paperclip className="w-5 h-5 text-[#5C899D]" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.png,.jpeg,.webp"
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
            className="flex-1 px-4 py-2.5 bg-white/70 rounded-xl border border-[#D6D3C6] focus:outline-none focus:border-[#5C899D] focus:ring-1 focus:ring-[#5C899D] transition-all placeholder-[#7A7A7A] text-[#3A3A3A] disabled:bg-[#E8E5D8] disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={disabled || isUploading || (!newMessage.trim() && !selectedFile)}
            className="p-3 bg-[#5C899D] text-[#FFFCEF] rounded hover:shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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