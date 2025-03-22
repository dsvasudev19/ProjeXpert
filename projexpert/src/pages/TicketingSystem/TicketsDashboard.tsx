import  { useState, useEffect } from 'react';
import { PieChart, X } from 'lucide-react';
import { Ticket } from '../../types/TicketData';
import { ticketService } from '../../services/ticketingService';
import AnalyticsDashboard from './TicketAnalytics';
import TicketList from './TicketList';
import TicketDetail from './TicketDetails';
import { axiosInstance } from '../../axiosIntance';

const TicketManagementApp = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [selectedTicketId,setSelectedTicketId]=useState<any>()
  
  const fetchTickets = async () => {
    try {
      

      const response = await ticketService.getAllTickets() 
      
      setTickets(response.data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  const getTicketDetailsById=async()=>{
    try {
        const res=await axiosInstance.get(`/admin/ticket/${selectedTicketId}`)
        if(res.status===200){
            setSelectedTicket(res.data)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getTicketDetailsById()
  },[selectedTicketId])

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="h-full bg-gray-100 p-2 overflow-hidden shadow-md">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-gray-800">Ticket Management System</h1>
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
                onSelectTicket={(id:any)=>setSelectedTicketId(id)}
              />
            </div>
            <div className="md:col-span-2">
              {selectedTicket ? (
                <TicketDetail ticket={selectedTicket} updateTicket={getTicketDetailsById} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select any ticket to view details
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