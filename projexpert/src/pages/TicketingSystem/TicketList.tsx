// components/TicketList.tsx
import { Filter } from 'lucide-react';
import TicketListItem from './TicketListItem';
import { Ticket } from '../../types/TicketData';

const TicketList = ({ tickets, selectedTicket, onSelectTicket }: {
    tickets: Ticket[];
    selectedTicket: Ticket;
    onSelectTicket: any
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 h-[82vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800">Tickets</h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-8 pr-4 py-1.5 text-sm rounded-lg border border-gray-200 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute left-2.5 top-2 text-gray-400">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm bg-blue-50 px-3 py-1.5 rounded-lg">
                        <Filter className="h-3 w-3 mr-1.5" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {tickets.map(ticket => (
                    <TicketListItem
                        key={ticket.id}
                        ticket={ticket}
                        isSelected={selectedTicket?.id === ticket?.id}
                        onClick={() => onSelectTicket(ticket?.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TicketList;