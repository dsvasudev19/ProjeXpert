// components/TicketListItem.tsx
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';

import Badge from './../../components/Badge';
import { Ticket } from '../../types/TicketData';

const TicketListItem = ({ ticket, isSelected, onClick }: { ticket: Ticket; isSelected: boolean; onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-lg cursor-pointer transition border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 line-clamp-1">{ticket.title}</h3>
                <Badge text={ticket.status} type="status" category={ticket.status} />
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-600">
                <div className="flex items-center gap-2">
                    <Badge text={ticket.priority} type="priority" category={ticket.priority} />
                    <Badge text={ticket.category} type="category" category={ticket.category} />
                </div>
                <span>#{ticket.id}</span>
            </div>
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-3">
                    <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {ticket?.comments?.length}
                    </span>
                    <span className="flex items-center">
                        <Paperclip className="h-3 w-3 mr-1" />
                        {ticket?.attachments?.length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TicketListItem;