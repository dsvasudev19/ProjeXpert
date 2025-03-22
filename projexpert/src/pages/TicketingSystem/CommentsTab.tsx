// // components/CommentsTab.tsx
// import  { useState } from 'react';
// import { MessageSquare } from 'lucide-react';
// import { ticketService } from '../../services/ticketingService';
// import { Ticket } from '../../types/TicketData';
// import { formatDate } from '../../data/tickets';

// const CommentsTab = ({ ticket }: { ticket: Ticket }) => {

//   const [newComment, setNewComment] = useState('');

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
    
//     try {
//       await ticketService.addComment(ticket.id, newComment);
//       setNewComment('');
//       // Refresh comments - in a real app, you'd update state in parent
//     } catch (error) {
//       console.error('Failed to add comment:', error);
//     }
//   };

//   return (
//     <div className="space-y-4 mb-12">
//       {ticket?.comments?.length === 0 ? (
//         <div className="text-center text-gray-500 py-8">No comments yet</div>
//       ) : (
//         ticket?.comments?.map(comment => (
//           <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
//             <div className="flex justify-between items-center mb-2">
//               <div className="font-medium text-sm text-gray-800">{comment?.commenter?.name}</div>
//               <div className="text-xs text-gray-500">{formatDate(comment?.createdAt)}</div>
//             </div>
//             <p className="text-sm text-gray-700">{comment?.content}</p>
//           </div>
//         ))
//       )}

//       <div className="mt-4 pt-4 border-t">
//         <h3 className="text-sm font-medium text-gray-700 mb-2">Add Comment</h3>
//         <textarea
//           className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Type your comment here..."
//           rows={3}
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <div className="mt-2 flex justify-end">
//           <button 
//             onClick={handleAddComment}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg transition flex items-center"
//           >
//             <MessageSquare className="h-4 w-4 mr-1.5" />
//             Post Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentsTab;

// components/CommentsTab.tsx
import { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { ticketService } from '../../services/ticketingService';
import { Ticket } from '../../types/TicketData';
import { formatDate } from '../../data/tickets';

const CommentsTab = ({ ticket,updateTicketDetails }: { ticket: Ticket ,updateTicketDetails:any}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await ticketService.addComment(ticket.id, newComment);
      if(res.status===201){
        setNewComment('');
        updateTicketDetails()
      }
      
      // Refresh comments - in a real app, you'd update state in parent
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Discussion
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto bg-gray-50">
        {ticket?.comments?.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500">
            <MessageSquare className="h-12 w-12 mb-3 text-gray-300" />
            <p className="text-sm">No comments yet</p>
            <p className="text-xs mt-1">Be the first to start the conversation</p>
          </div>
        ) : (
          ticket?.comments?.map((comment, index) => (
            <div 
              key={comment.id || index} 
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {comment?.commenter?.avatar ? (
                    <img 
                      src={comment.commenter.avatar} 
                      alt={comment.commenter.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {comment?.commenter?.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment?.createdAt)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                    {comment?.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 bg-white border-t border-gray-100">
        <label htmlFor="comment" className="sr-only">Add comment</label>
        <div className="relative">
          <textarea
            id="comment"
            rows={3}
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleAddComment}
              disabled={isSubmitting || !newComment.trim()}
              className={`px-4 py-2 rounded-lg transition flex items-center text-sm font-medium ${
                isSubmitting || !newComment.trim() 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1.5" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;