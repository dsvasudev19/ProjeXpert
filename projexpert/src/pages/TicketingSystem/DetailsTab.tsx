// // components/DetailsTab.tsx

// import { Users } from 'lucide-react';
// import { Ticket } from '../../types/TicketData';
// import Badge from '../../components/Badge';
// import { formatDate } from '../../data/tickets';

// const DetailsTab = ({ ticket }: { ticket: Ticket }) => {
//     return (
//         <div>
//             <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
//                 <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-line">
//                     {ticket.description}
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-2">Details</h3>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="grid grid-cols-2 gap-y-2 text-sm">
//                             <div className="text-gray-600">Status</div>
//                             <div><Badge text={ticket.status} type="status" category={ticket.status} /></div>

//                             <div className="text-gray-600">Priority</div>
//                             <div><Badge text={ticket.priority} type="priority" category={ticket.priority} /></div>

//                             <div className="text-gray-600">Category</div>
//                             <div><Badge text={ticket.category} type="category" category={ticket.category} /></div>

//                             <div className="text-gray-600">Project</div>
//                             <div className="font-medium">{ticket?.project?.name}</div>

//                             <div className="text-gray-600">Created</div>
//                             <div>{formatDate(ticket.createdAt)}</div>

//                             <div className="text-gray-600">Updated</div>
//                             <div>{formatDate(ticket.updatedAt)}</div>

//                             {ticket.resolvedAt && (
//                                 <>
//                                     <div className="text-gray-600">Resolved</div>
//                                     <div>{formatDate(ticket.resolvedAt)}</div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-2">People</h3>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="space-y-3">
//                             <div className="flex items-center">
//                                 <div className="text-gray-600 text-sm w-24">Raised by</div>
//                                 <div className="flex items-center">
//                                     <div className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2">
//                                         {ticket?.raiser?.name.charAt(0)}
//                                     </div>
//                                     <div>
//                                         <div className="text-sm font-medium">{ticket.raiser.name}</div>
//                                         <div className="text-xs text-gray-500">{ticket.raiser.email}</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex items-center">
//                                 <div className="text-gray-600 text-sm w-24">Assigned to</div>
//                                 {ticket.assignee ? (
//                                     <div className="flex items-center">
//                                         <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2">
//                                             {ticket.assignee.name.charAt(0)}
//                                         </div>
//                                         <div>
//                                             <div className="text-sm font-medium">{ticket.assignee.name}</div>
//                                             <div className="text-xs text-gray-500">{ticket.assignee.email}</div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
//                                         <Users className="h-4 w-4 mr-1" />
//                                         Assign ticket
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {ticket.resolution && (
//                 <div>
//                     <h3 className="text-sm font-medium text-gray-700 mb-2">Resolution</h3>
//                     <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-line">
//                         {ticket.resolution}
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DetailsTab;

// components/DetailsTab.tsx

import { Users, Clock, Calendar, Tag, Flag, MessageCircle } from 'lucide-react';
import { Ticket } from '../../types/TicketData';
import Badge from '../../components/Badge';
import { formatDate } from '../../data/tickets';

const DetailsTab = ({ ticket }: { ticket: Ticket }) => {
    return (
        <div className="animate-fadeIn mb-12">
            {/* Description Section with improved styling */}
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

            {/* Details and People in a visually appealing grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Details Card */}
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

                {/* People Card */}
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
                                    <button className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>Assign ticket</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resolution Section with conditional rendering */}
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
        </div>
    );
};

export default DetailsTab;