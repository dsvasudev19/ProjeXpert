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


                {tickets.length === 0 && !showAnalytics && (
                    <div className="h-full flex items-center justify-center">
                        <div className="w-full max-w-lg p-8 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 border border-indigo-100/50 shadow-xl shadow-blue-100/20">
                            <div className="text-center space-y-6">
                                {/* Modern Empty State Illustration */}
                                <div className="relative mx-auto w-28 h-28">
                                    <div className="absolute inset-0 bg-blue-100/50 rounded-full animate-pulse"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg className="h-16 w-16 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 7L12 3L4 7V17L12 21L20 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title with modern typography */}
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                                    No Tickets Found
                                </h2>

                                {/* Description with clean typography */}
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Your support queue is currently empty. When customers submit requests, they'll appear here.
                                </p>

                                {/* Action buttons with modern design */}
                                <div className="flex gap-3 justify-center pt-2">
                                    <button onClick={() => navigate('/dashboard/raise-ticket')} className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200">
                                        Create Ticket
                                    </button>
                                    <button onClick={() => setShowAnalytics(!showAnalytics)} className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-200">
                                        View Analytics
                                    </button>
                                </div>

                                {/* Modern decorative elements */}
                                <div className="pt-4 flex justify-center gap-1.5">
                                    <span className="block h-1.5 w-1.5 rounded-full bg-indigo-300"></span>
                                    <span className="block h-1.5 w-3 rounded-full bg-indigo-400"></span>
                                    <span className="block h-1.5 w-6 rounded-full bg-indigo-500"></span>
                                    <span className="block h-1.5 w-3 rounded-full bg-indigo-400"></span>
                                    <span className="block h-1.5 w-1.5 rounded-full bg-indigo-300"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketManagementApp;
