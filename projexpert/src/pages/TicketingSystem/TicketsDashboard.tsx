import { useState, useEffect } from 'react';
import { PieChart, X } from 'lucide-react';
import { Ticket } from '../../types/TicketData';
import { ticketService } from '../../services/ticketingService';
import AnalyticsDashboard from './TicketAnalytics';
import TicketList from './TicketList';
import TicketDetail from './TicketDetails';
import { axiosInstance } from '../../axiosIntance';
import { useNavigate } from 'react-router-dom';

const TicketManagementApp = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
    const [selectedTicketId, setSelectedTicketId] = useState<any>()
    const navigate = useNavigate();
    const fetchTickets = async () => {
        try {


            const response = await ticketService.getAllTickets()

            setTickets(response.data);
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
        }
    };

    const getTicketDetailsById = async () => {
        try {
            const res = await axiosInstance.get(`/admin/ticket/${selectedTicketId}`)
            if (res.status === 200) {
                setSelectedTicket(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTicketDetailsById()
    }, [selectedTicketId])

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="h-full bg-gray-100 p-2 overflow-hidden shadow-md">
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-bold text-gray-800">Ticket Management System</h1>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => navigate('/dashboard/raise-ticket')}
                            className="bg-rose-800 text-lime-100 hover:bg-rose-900 hover:text-lime-200 px-4 py-2 rounded-lg flex items-center transition duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2"
                        >
                            Raise a Ticket
                        </button>
                        <button
                            onClick={() => setShowAnalytics(!showAnalytics)}
                            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center transition"
                        >
                            {showAnalytics ? (
                                <>
                                    <X className="h-4 w-4 mr-2" />
                                    Close Analytics
                                </>
                            ) : (
                                <>
                                    <PieChart className="h-4 w-4 mr-2" />
                                    View Analytics
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {showAnalytics && (
                    <div className="mb-6">
                        <AnalyticsDashboard />
                    </div>
                )}

                {tickets.length > 0 && !showAnalytics && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <TicketList
                                tickets={tickets}
                                selectedTicket={selectedTicket!}
                                onSelectTicket={(id: any) => setSelectedTicketId(id)}
                            />
                        </div>

                        <div className="md:col-span-2">
                            {selectedTicket ? (
                                <TicketDetail ticket={selectedTicket} updateTicket={getTicketDetailsById} />
                            ) : (
                                <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl shadow-lg border border-blue-100 p-8 transition-all duration-300 hover:shadow-xl">
                                    <div className="text-center space-y-4">
                                        {/* Ticket Icon */}
                                        <svg
                                            className="mx-auto h-16 w-16 text-blue-400 animate-float"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 7h18M3 11h18M3 15h18M7 3v18M17 3v18M5 7v10c0 1.1.9 2 2 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                                            />
                                        </svg>

                                        {/* Main Text */}
                                        <h3 className="text-xl font-semibold text-blue-700 tracking-tight">
                                            Select a Ticket to View Details
                                        </h3>

                                        {/* Subtext */}
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                            Choose any ticket from the list to explore its details in this space.
                                        </p>

                                        {/* Decorative Element */}
                                        <div className="mt-2 flex justify-center">
                                            <span className="h-1 w-16 bg-gradient-to-r from-blue-300 to-green-300 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketManagementApp;