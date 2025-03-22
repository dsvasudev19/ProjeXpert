import { axiosInstance } from "../axiosIntance";

export const ticketService = {
    // Get all tickets (admin)
    getAllTickets: () => axiosInstance.get('/admin/ticket'),
    
    // Get user's tickets
    getMyTickets: () => axiosInstance.get('/admin/ticket'),
    
    // Create ticket
    createTicket: (ticketData: any) => axiosInstance.post('/admin/ticket', ticketData),
    
    // Update ticket
    updateTicket: (ticketId: number, ticketData: any) => 
        axiosInstance.put(`/admin/ticket/${ticketId}`, ticketData),
    
    // Add comment
    addComment: (ticketId: number, content: string) => 
        axiosInstance.post(`/admin/ticket/${ticketId}/comments`, { content }),
    
    // Add attachment
    addAttachment: (ticketId: number, file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosInstance.post(`/admin/ticket/${ticketId}/attachments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  };