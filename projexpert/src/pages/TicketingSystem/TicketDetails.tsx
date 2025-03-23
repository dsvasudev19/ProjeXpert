import { useState } from 'react';
import { FileText, MessageSquare, Clock, Paperclip } from 'lucide-react';
import { ticketService } from '../../services/ticketingService';
import DetailsTab from './DetailsTab';
import CommentsTab from './CommentsTab';
import HistoryTab from './HistoryTab';
import AttachmentsTab from './AttachmentsTab';
import { Ticket } from '../../types/TicketData';
import Badge from '../../components/Badge';
import { axiosInstance } from '../../axiosIntance';

const TicketDetail = ({ ticket, updateTicket }: { ticket: Ticket, updateTicket: any }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history' | 'attachments'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Loading state
  const [success, setSuccess] = useState<string | null>(null); // Success state
  const [error, setError] = useState<string | null>(null); // Error state
  const [employees,setEmployees]=useState<any>([])

  const handleEditClick = async () => {
    setIsEditing(true);
    // Ensure we're on the details tab when editing
    
    setActiveTab('details');

    try {
      const res=await axiosInstance.get("/admin/client/team/internal-only")
      if(res.status===200){
        setEmployees(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSaveChanges = async (updatedTicketData: Partial<Ticket>) => {
    setIsSaving(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await ticketService.updateTicket(ticket.id, updatedTicketData);

      if (response.status === 200) {
        setSuccess('Ticket updated successfully!');
        setTimeout(() => setSuccess(null), 3000); // Auto-dismiss success
        setIsEditing(false);
        updateTicket();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update ticket. Please try again.');
      setTimeout(() => setError(null), 5000); // Auto-dismiss error
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

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
            onClick={handleEditClick}
            disabled={isEditing}
            className={`text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm flex items-center transition ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {isEditing ? 'Editing...' : 'Edit'}
          </button>
          <button className={`text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm flex items-center transition ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
            Details {isEditing && '(Editing)'}
          </button>
          <button
            onClick={() => !isEditing && setActiveTab('comments')}
            disabled={isEditing}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''} ${activeTab === 'comments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Comments ({ticket?.comments?.length})
          </button>
          <button
            onClick={() => !isEditing && setActiveTab('history')}
            disabled={isEditing}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''} ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <Clock className="h-4 w-4 inline mr-1" />
            History
          </button>
          <button
            onClick={() => !isEditing && setActiveTab('attachments')}
            disabled={isEditing}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''} ${activeTab === 'attachments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
          >
            <Paperclip className="h-4 w-4 inline mr-1" />
            Attachments ({ticket.attachments.length})
          </button>
        </div>
      </div>



      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md animate-fade-in mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md animate-fade-in mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable content area with bottom margin */}
      <div className="overflow-auto max-h-[500px] p-1 mb-16">
        {activeTab === 'details' &&
          <DetailsTab
            ticket={ticket}
            isEditing={isEditing}
            onSave={handleSaveChanges}
            onCancel={handleCancelEdit}
            users={employees}
            isSaving={isSaving}
          />
        }
        {activeTab === 'comments' && <CommentsTab ticket={ticket} updateTicketDetails={updateTicket} />}
        {activeTab === 'history' && <HistoryTab ticket={ticket} />}
        {activeTab === 'attachments' && <AttachmentsTab ticket={ticket} updateTicket={updateTicket} />}
      </div>
    </div>
  );
};

export default TicketDetail;

