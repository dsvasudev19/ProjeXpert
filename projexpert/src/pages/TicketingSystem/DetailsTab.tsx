import { useState, useEffect } from 'react';
import { Users, Clock, Calendar, Tag, Flag, MessageCircle, Save, X } from 'lucide-react';
import { Ticket } from '../../types/TicketData';
import Badge from '../../components/Badge';
import { formatDate } from '../../data/tickets';
import { useAuth } from '../../contexts/AuthContext';

interface DetailsTabProps {
  ticket: Ticket;
  isEditing: boolean;
  onSave: (updatedTicket: Partial<Ticket>) => void;
  onCancel: () => void;
  users?: { id: string; name: string; email: string }[]; // For assignee dropdown
  isSaving?: boolean; // Loading state
}

const DetailsTab = ({ ticket, isEditing, onSave, onCancel, users = [], isSaving = false }: DetailsTabProps) => {
  const [editedTicket, setEditedTicket] = useState<Partial<Ticket>>({});
  const {user,loading}=useAuth();
  const [editing,setEditing]=useState(false)
  useEffect(() => {
    if (isEditing) {
      setEditedTicket({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        assignedTo: ticket.assignee?.id || 0,
        resolution: ticket.resolution || '',
      });
    }
  }, [isEditing, ticket]);


  useEffect(()=>{
    if(!loading && user?.user?.userType!=="admin"){
        setEditing(false);
    }
  },[user,loading])

  const handleChange = (field: string, value: string) => {
    setEditedTicket(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTicket);
  };

  const statusOptions = ['New', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
  const categoryOptions = ['Technical', 'Feature Request', 'Billing', 'Account', 'Other'];

  return (
    <div className="animate-fadeIn mb-12">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-blue-700 font-semibold">Editing Ticket #{ticket.id}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSaving}
                className={`flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={editedTicket.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              disabled={isSaving}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editedTicket.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              disabled={isSaving}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center text-gray-700 font-semibold mb-4">
                <Tag className="h-4 w-4 mr-2" />
                Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editedTicket.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isSaving}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={editedTicket.priority || ''}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isSaving}
                  >
                    {priorityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editedTicket.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isSaving}
                  >
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center text-gray-700 font-semibold mb-4">
                <Users className="h-4 w-4 mr-2" />
                People
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <select
                  value={editedTicket.assignedTo || ''}
                  onChange={(e) => handleChange('assignedTo', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  disabled={isSaving || editing}
                >
                  <option value="">-- Unassigned --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-600 flex items-center mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  Raised by {ticket.raiser.name} on {formatDate(ticket.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
            <textarea
              value={editedTicket.resolution || ''}
              onChange={(e) => handleChange('resolution', e.target.value)}
              rows={4}
              placeholder={editedTicket.status === 'Resolved' || editedTicket.status === 'Closed' ? "Enter resolution details..." : "Add resolution when ticket is resolved"}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              disabled={isSaving}
            ></textarea>
          </div>
        </form>
      ) : (
        // Read-only view remains unchanged
        // ... (same as your original code)
        <>
          <div className="mb-2 transition-all hover:shadow-md rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-l-4 border-indigo-500">
              <h3 className="flex items-center text-indigo-700 font-semibold mb-2">
                <MessageCircle className="h-4 w-4 mr-2" />
                Description
              </h3>
            </div>
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-b-xl">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-l-4 border-purple-500">
                <h3 className="flex items-center text-purple-700 font-semibold">
                  <Tag className="h-4 w-4 mr-2" />
                  Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                    Status
                  </div>
                  <div className="flex justify-end">
                    <Badge text={ticket.status} type="status" category={ticket.status} />
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
                    Priority
                  </div>
                  <div className="flex justify-end">
                    <Badge text={ticket.priority} type="priority" category={ticket.priority} />
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    Category
                  </div>
                  <div className="flex justify-end">
                    <Badge text={ticket.category} type="category" category={ticket.category} />
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                    Project
                  </div>
                  <div className="flex justify-end font-medium text-indigo-600">
                    {ticket?.project?.name}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                    Created
                  </div>
                  <div className="flex justify-end items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                    <span className="text-sm">{formatDate(ticket.createdAt)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                    Updated
                  </div>
                  <div className="flex justify-end items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                    <span className="text-sm">{formatDate(ticket.updatedAt)}</span>
                  </div>

                  {ticket.resolvedAt && (
                    <>
                      <div className="flex items-center text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Resolved
                      </div>
                      <div className="flex justify-end items-center">
                        <Clock className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-sm text-green-600">{formatDate(ticket.resolvedAt)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-l-4 border-blue-500">
                <h3 className="flex items-center text-blue-700 font-semibold">
                  <Users className="h-4 w-4 mr-2" />
                  People
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="text-gray-600 text-sm w-24 mt-1">Raised by</div>
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-3 shadow-sm">
                        {ticket?.raiser?.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{ticket.raiser.name}</div>
                        <div className="text-xs text-gray-500">{ticket.raiser.email}</div>
                        <div className="text-xs text-gray-400 mt-1">Raised on {formatDate(ticket.createdAt)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-4"></div>

                  <div className="flex items-start">
                    <div className="text-gray-600 text-sm w-24 mt-1">Assigned to</div>
                    {ticket.assignee ? (
                      <div className="flex items-start">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-3 shadow-sm">
                          {ticket.assignee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{ticket.assignee.name}</div>
                          <div className="text-xs text-gray-500">{ticket.assignee.email}</div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <span>Active agent</span>
                            <div className="w-2 h-2 rounded-full bg-green-500 ml-2 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">Not assigned</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {ticket.resolution && (
            <div className="transition-all hover:shadow-md rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-l-4 border-green-500">
                <h3 className="flex items-center text-green-700 font-semibold mb-2">
                  <Flag className="h-4 w-4 mr-2" />
                  Resolution
                </h3>
              </div>
              <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-b-xl">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {ticket.resolution}
                </p>
                {ticket.resolvedAt && (
                  <div className="mt-4 text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Resolved on {formatDate(ticket.resolvedAt)}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsTab;