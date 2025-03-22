// components/AnalyticsDashboard.tsx

import { Activity, AlertCircle, BarChart2, CheckCircle, Clock, FileText, MessageSquare, PieChart, TrendingUp } from 'lucide-react';
import { tickets } from './../../data/tickets';
import { useAuth } from '../../contexts/AuthContext';

const AnalyticsDashboard = () => {
    const { user, loading } = useAuth();
    const openTickets = tickets.filter(t => t.status === 'Open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
    const criticalTickets = tickets.filter(t => t.priority === 'Critical').length;
    // const highPriorityTickets = tickets.filter(t => t.priority === 'High').length;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Analytics Overview</h2>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-800 bg-gray-50 p-2 rounded-lg transition">
                        <PieChart className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-800 bg-gray-50 p-2 rounded-lg transition">
                        <BarChart2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-800 bg-gray-50 p-2 rounded-lg transition">
                        <TrendingUp className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-light opacity-90">Open Tickets</div>
                        <div className="bg-white bg-opacity-20 p-1 rounded">
                            <FileText className="h-3 w-3 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{openTickets}</div>
                    <div className="text-xs mt-2 flex items-center">
                        <div className="flex items-center text-blue-100">
                            <span>50% of total</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-light opacity-90">In Progress</div>
                        <div className="bg-white bg-opacity-20 p-1 rounded">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{inProgressTickets}</div>
                    <div className="text-xs mt-2 flex items-center">
                        <div className="flex items-center text-yellow-100">
                            <span>25% of total</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-light opacity-90">Resolved</div>
                        <div className="bg-white bg-opacity-20 p-1 rounded">
                            <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{resolvedTickets}</div>
                    <div className="text-xs mt-2 flex items-center">
                        <div className="flex items-center text-green-100">
                            <span>25% of total</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-xs font-light opacity-90">Critical Issues</div>
                        <div className="bg-white bg-opacity-20 p-1 rounded">
                            <AlertCircle className="h-3 w-3 text-white" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold">{criticalTickets}</div>
                    <div className="text-xs mt-2 flex items-center">
                        <div className="flex items-center text-red-100">
                            <span>+1 from yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-100 p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Tickets by Priority</h3>
                    <div className="h-48 flex items-end justify-between gap-3">
                        <div className="flex flex-col items-center">
                            <div className="bg-red-500 w-8 rounded-t-lg h-32"></div>
                            <div className="mt-2 text-xs text-gray-600">Critical</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-orange-500 w-8 rounded-t-lg h-24"></div>
                            <div className="mt-2 text-xs text-gray-600">High</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-500 w-8 rounded-t-lg h-16"></div>
                            <div className="mt-2 text-xs text-gray-600">Medium</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-green-500 w-8 rounded-t-lg h-8"></div>
                            <div className="mt-2 text-xs text-gray-600">Low</div>
                        </div>
                    </div>
                </div>

                {
                    !loading && user?.user?.userType === "admin" && (
                        <div className="rounded-xl border border-gray-100 p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="bg-blue-100 p-1.5 rounded-full text-blue-500">
                                        <Clock className="h-3 w-3" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500">Just Now</div>
                                        <div className="text-sm text-gray-800">Ticket #3 priority changed to Critical</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="bg-green-100 p-1.5 rounded-full text-green-500">
                                        <CheckCircle className="h-3 w-3" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500">2 hours ago</div>
                                        <div className="text-sm text-gray-800">Ticket #4 was resolved by Robert Kim</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="bg-purple-100 p-1.5 rounded-full text-purple-500">
                                        <MessageSquare className="h-3 w-3" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500">Yesterday</div>
                                        <div className="text-sm text-gray-800">New comment on Ticket #1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AnalyticsDashboard;