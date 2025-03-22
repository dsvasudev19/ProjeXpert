import React, { useRef } from 'react';
import { FileText, Paperclip } from 'lucide-react';

import { ticketService } from '../../services/ticketingService';
import { Ticket } from '../../types/TicketData';

const AttachmentsTab = ({ ticket }: { ticket: Ticket }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await ticketService.addAttachment(ticket.id, file);
      // Refresh attachments - in a real app, you'd update state in parent
    } catch (error) {
      console.error('Failed to upload attachment:', error);
    }
  };

  return (
    <div className='mb-12'>
      {ticket?.attachments?.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No attachments</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ticket?.attachments?.map((attachment:any) => (
            <div key={attachment.id} className="border border-gray-200 rounded-lg p-3 flex items-center bg-gray-50 hover:bg-gray-100 transition">
              <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-800 truncate">{attachment?.fileName}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>{Math.round(attachment?.fileSize / 1024)} KB</span>
                  <span className="mx-2">•</span>
                  <span>{attachment?.uploader?.name}</span>
                </div>
              </div>
              <a href={attachment?.url} download className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition bg-gray-50 hover:bg-gray-100"
        >
          <Paperclip className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Upload New Attachment</span>
          <span className="text-xs mt-1">Drag & drop or click to browse</span>
        </button>
      </div>
    </div>
  );
};

export default AttachmentsTab;