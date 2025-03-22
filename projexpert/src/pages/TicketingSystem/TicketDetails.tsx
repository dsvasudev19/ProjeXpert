// // components/TicketDetail.tsx
// import React, { useState } from 'react';
// import { FileText, MessageSquare, Clock, Paperclip } from 'lucide-react';

// import DetailsTab from './DetailsTab';
// import CommentsTab from './CommentsTab';
// import HistoryTab from './HistoryTab';
// import AttachmentsTab from './AttachmentsTab';
// import { Ticket } from '../../types/TicketData';
// import { ticketService } from '../../services/ticketingService';
// import Badge from '../../components/Badge';

// const TicketDetail = ({ ticket }: { ticket: Ticket }) => {
//   const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history' | 'attachments'>('details');

//   const handleUpdateTicket = async (updates: Partial<Ticket>) => {
//     try {
//       const response = await ticketService.updateTicket(ticket.id, updates);
//       // Update ticket state in parent component would be ideal
//       console.log('Ticket updated:', response.data);
//     } catch (error) {
//       console.error('Failed to update ticket:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 overflow-auto">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <div className="flex items-center">
//             <h2 className="font-semibold text-gray-800 text-lg">{ticket.title}</h2>
//             <span className="ml-2 text-gray-500 text-sm">#{ticket.id}</span>
//           </div>
//           <div className="flex gap-2 mt-1">
//             <Badge text={ticket.status} type="status" category={ticket.status} />
//             <Badge text={ticket.priority} type="priority" category={ticket.priority} />
//             <Badge text={ticket.category} type="category" category={ticket.category} />
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button 
//             onClick={() => {/* Add edit form logic */}}
//             className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm flex items-center transition"
//           >
//             <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//             </svg>
//             Edit
//           </button>
//           <button className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm flex items-center transition">
//             <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//             </svg>
//             More
//           </button>
//         </div>
//       </div>

//       <div className="border-b mb-4">
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setActiveTab('details')}
//             className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
//           >
//             <FileText className="h-4 w-4 inline mr-1" />
//             Details
//           </button>
//           <button
//             onClick={() => setActiveTab('comments')}
//             className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'comments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
//           >
//             <MessageSquare className="h-4 w-4 inline mr-1" />
//             Comments ({ticket?.comments?.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('history')}
//             className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
//           >
//             <Clock className="h-4 w-4 inline mr-1" />
//             History
//           </button>
//           <button
//             onClick={() => setActiveTab('attachments')}
//             className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'attachments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
//           >
//             <Paperclip className="h-4 w-4 inline mr-1" />
//             Attachments ({ticket.attachments.length})
//           </button>
//         </div>
//       </div>

//       <div className="p-1">
//         {activeTab === 'details' && <DetailsTab ticket={ticket} />}
//         {activeTab === 'comments' && <CommentsTab ticket={ticket} />}
//         {activeTab === 'history' && <HistoryTab ticket={ticket} />}
//         {activeTab === 'attachments' && <AttachmentsTab ticket={ticket} />}
//       </div>
//     </div>
//   );
// };

// export default TicketDetail;
import { useState } from 'react';
import { FileText, MessageSquare, Clock, Paperclip } from 'lucide-react';

import DetailsTab from './DetailsTab';
import CommentsTab from './CommentsTab';
import HistoryTab from './HistoryTab';
import AttachmentsTab from './AttachmentsTab';
import { Ticket } from '../../types/TicketData';
// import { ticketService } from '../../services/ticketingService';
import Badge from '../../components/Badge';

const TicketDetail = ({ ticket,updateTicket }: { ticket: Ticket ,updateTicket:any}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history' | 'attachments'>('details');

//   const handleUpdateTicket = async (updates: Partial<Ticket>) => {
//     try {
//       const response = await ticketService.updateTicket(ticket.id, updates);
//       console.log('Ticket updated:', response.data);
//     } catch (error) {
//       console.error('Failed to update ticket:', error);
//     }
//   };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-800 text-lg">{ticket.title}</h2>
            <span className="ml-2 text-gray-500 text-sm">#{ticket.id}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <Badge text={ticket.status} type="status" category={ticket.status} />
            <Badge text={ticket.priority} type="priority" category={ticket.priority} />
            <Badge text={ticket.category} type="category" category={ticket.category} />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {/* Add edit form logic */}}
            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm flex items-center transition"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm flex items-center transition">
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            More
          </button>
        </div>
      </div>

      <div className="border-b mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <FileText className="h-4 w-4 inline mr-1" />
            Details
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'comments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Comments ({ticket?.comments?.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <Clock className="h-4 w-4 inline mr-1" />
            History
          </button>
          <button
            onClick={() => setActiveTab('attachments')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'attachments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <Paperclip className="h-4 w-4 inline mr-1" />
            Attachments ({ticket.attachments.length})
          </button>
        </div>
      </div>

      {/* Scrollable content area with bottom margin */}
      <div className="overflow-auto max-h-[500px] p-1 mb-16">
        {activeTab === 'details' && <DetailsTab ticket={ticket} />}
        {activeTab === 'comments' && <CommentsTab ticket={ticket} updateTicketDetails={updateTicket}/>}
        {activeTab === 'history' && <HistoryTab ticket={ticket} />}
        {activeTab === 'attachments' && <AttachmentsTab ticket={ticket} />}
      </div>
    </div>
  );
};

export default TicketDetail;