// import React, { useRef } from 'react';
// import { FileText, Paperclip } from 'lucide-react';

// import { ticketService } from '../../services/ticketingService';
// import { Ticket } from '../../types/TicketData';

// const AttachmentsTab = ({ ticket }: { ticket: Ticket }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       await ticketService.addAttachment(ticket.id, file);
//       // Refresh attachments - in a real app, you'd update state in parent
//     } catch (error) {
//       console.error('Failed to upload attachment:', error);
//     }
//   };

//   return (
//     <div className='mb-12'>
//       {ticket?.attachments?.length === 0 ? (
//         <div className="text-center text-gray-500 py-8">No attachments</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {ticket?.attachments?.map((attachment:any) => (
//             <div key={attachment.id} className="border border-gray-200 rounded-lg p-3 flex items-center bg-gray-50 hover:bg-gray-100 transition">
//               <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
//                 <FileText className="h-6 w-6 text-blue-500" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="font-medium text-sm text-gray-800 truncate">{attachment?.fileName}</div>
//                 <div className="text-xs text-gray-500 flex items-center">
//                   <span>{Math.round(attachment?.fileSize / 1024)} KB</span>
//                   <span className="mx-2">•</span>
//                   <span>{attachment?.uploader?.name}</span>
//                 </div>
//               </div>
//               <a href={attachment?.url} download className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-6">
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//           className="hidden"
//         />
//         <button 
//           onClick={() => fileInputRef.current?.click()}
//           className="border border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition bg-gray-50 hover:bg-gray-100"
//         >
//           <Paperclip className="h-6 w-6 mb-2" />
//           <span className="text-sm font-medium">Upload New Attachment</span>
//           <span className="text-xs mt-1">Drag & drop or click to browse</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttachmentsTab;

import React, { useRef, useState } from 'react';
import { FileText, Paperclip } from 'lucide-react';

import { ticketService } from '../../services/ticketingService';
import { Ticket } from '../../types/TicketData';

const AttachmentsTab = ({ ticket ,updateTicket}: { ticket: Ticket ,updateTicket:any}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [success, setSuccess] = useState<string | null>(null); // Success state

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true); // Start loading
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success
    try {
      await ticketService.addAttachment(ticket.id, file);
      setSuccess('Attachment uploaded successfully!');
      setTimeout(() => setSuccess(null), 3000); // Auto-dismiss success after 3 seconds
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
      updateTicket();
    } catch (error) {
      setError('Failed to upload attachment. Please try again.');
      setTimeout(() => setError(null), 5000); // Auto-dismiss error after 5 seconds
      console.error('Failed to upload attachment:', error);
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <div className="mb-12">
      {ticket?.attachments?.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No attachments</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ticket?.attachments?.map((attachment: any) => (
            <div
              key={attachment.id}
              className="border border-gray-200 rounded-lg p-3 flex items-center bg-gray-50 hover:bg-gray-100 transition"
            >
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
              <a
                href={attachment?.url}
                download
                className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
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
          disabled={isUploading} // Disable input while uploading
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center transition ${
            isUploading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'text-gray-500 hover:text-blue-600 hover:border-blue-300 bg-gray-50 hover:bg-gray-100'
          }`}
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin h-6 w-6 mb-2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                />
              </svg>
              <span className="text-sm font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <Paperclip className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Upload New Attachment</span>
              <span className="text-xs mt-1">Drag & drop or click to browse</span>
            </>
          )}
        </button>

        {/* Success Alert */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md animate-fade-in mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md animate-fade-in mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentsTab;