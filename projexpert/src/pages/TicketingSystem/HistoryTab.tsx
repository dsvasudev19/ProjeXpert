

// components/HistoryTab.tsx

// components/HistoryTab.tsx

import { Clock, UserCircle, History, AlertCircle, CheckCircle } from 'lucide-react';
import { Ticket } from '../../types/TicketData';
import { formatDate } from '../../data/tickets';

const HistoryTab = ({ ticket }: { ticket: Ticket }) => {
    // Get action-specific icons and colors
    const getActionDetails = (fieldChanged: string) => {
        switch (fieldChanged.toLowerCase()) {
            case 'status':
                return { icon: <CheckCircle className="h-3 w-3" />, color: 'bg-purple-500' };
            case 'priority':
                return { icon: <AlertCircle className="h-3 w-3" />, color: 'bg-amber-500' };
            case 'assignee':
                return { icon: <UserCircle className="h-3 w-3" />, color: 'bg-blue-500' };
            default:
                return { icon: <History className="h-3 w-3" />, color: 'bg-emerald-500' };
        }
    };

    return (
        <div className="relative mb-12">
            <div className="flex items-center mb-3">
                <div className="bg-indigo-100 p-1.5 rounded-full mr-2">
                    <History className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-700">Activity Timeline</h3>
                <div className="ml-auto text-xs text-gray-500">
                    {ticket?.history?.length || 0} events
                </div>
            </div>

            {ticket?.history?.length === 0 ? (
                <div className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                    No history available
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gradient-to-b from-blue-300 to-indigo-200 rounded"></div>
                    
                    <div className="space-y-3">
                        {ticket?.history?.map((item) => {
                            const { icon, color } = getActionDetails(item?.fieldChanged);
                            return (
                                <div key={item?.id} className="relative pl-8 group">
                                    {/* Timeline dot with icon - smaller version */}
                                    <div className={`absolute left-0 w-6 h-6 ${color} rounded-full flex items-center justify-center shadow-sm text-white transform transition-transform group-hover:scale-110`}>
                                        {icon}
                                    </div>
                                    
                                    {/* Content - more compact */}
                                    <div className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center bg-gray-50 rounded-full px-2 py-0.5">
                                                <Clock className="h-2.5 w-2.5 text-gray-400 mr-1" />
                                                <div className="text-xs text-gray-500">{formatDate(item?.createdAt)}</div>
                                            </div>
                                            
                                            <div className="bg-indigo-50 text-indigo-700 rounded-full px-2 py-0.5 text-xs font-medium">
                                                {item?.fieldChanged}
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-gray-700">
                                            <span className="font-medium">{item?.actor?.name}</span> changed from 
                                            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded mx-1 inline-block">{item?.oldValue || 'none'}</span> to
                                            <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded ml-1 inline-block">{item?.newValue}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryTab;
