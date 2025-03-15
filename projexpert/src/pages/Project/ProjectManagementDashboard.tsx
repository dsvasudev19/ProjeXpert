import { useState, useEffect } from 'react';
import { Users, CheckSquare, Bug, FileText } from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';

const ProjectManagementDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        projectData: {
            completedTasks: 0,
            pendingTasks: 0,
            totalProjects: 0,
            activeProjects: 0,
            bugsCritical: 0,
            bugsHigh: 0,
            bugsMedium: 0,
            bugsLow: 0,
            teamMembers: 0,
            taskCompletionRate: 0,
            upcomingDeadlines: 0,
            projectsCompletedThisMonth: 0,
            newTeamMembers: 0
        },
        projectProgress: [],
        upcomingDeadlines: []
    });
    
    const [timeRange, setTimeRange] = useState('last7days');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get('/admin/project-dashboard/dashboard', {
                    params: { timeRange }
                });
                
                if (response.data.success) {
                    setDashboardData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Handle error state here
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchDashboardData();
    }, [timeRange]);
    
    // Format date for display
    // const formatDate = (dateString:any) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // };
    
    // Get status color class
    const getStatusColorClass = (status:any) => {
        switch (status) {
            case 'On Track':
                return 'bg-green-100 text-green-800';
            case 'At Risk':
                return 'bg-yellow-100 text-yellow-800';
            case 'Delayed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    
    // Get progress bar color class
    const getProgressBarColorClass = (status:any) => {
        switch (status) {
            case 'On Track':
                return 'bg-green-500';
            case 'At Risk':
                return 'bg-yellow-500';
            case 'Delayed':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };
    
    const handleTimeRangeChange = (e:any) => {
        setTimeRange(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const { projectData, projectProgress, upcomingDeadlines } = dashboardData;

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-auto mb-16">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Project Analytics</h2>
                        <div className="flex space-x-3">
                            <select 
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                                value={timeRange}
                                onChange={handleTimeRangeChange}
                            >
                                <option value="last7days">Last 7 days</option>
                                <option value="last30days">Last 30 days</option>
                                <option value="last90days">Last 90 days</option>
                                <option value="alltime">All time</option>
                            </select>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Task Completion</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{projectData.taskCompletionRate}%</h3>
                                </div>
                                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <CheckSquare className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${projectData.taskCompletionRate}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Active Projects</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{projectData.activeProjects}/{projectData.totalProjects}</h3>
                                </div>
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{projectData.projectsCompletedThisMonth} projects completed this month</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Open Bugs</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{projectData.bugsCritical + projectData.bugsHigh + projectData.bugsMedium + projectData.bugsLow}</h3>
                                </div>
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <Bug className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{projectData.bugsCritical} critical issues require attention</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Team Members</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{projectData.teamMembers}</h3>
                                </div>
                                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{projectData.newTeamMembers} members joined this month</p>
                        </div>
                    </div>

                    {/* Project Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Project Progress</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {projectProgress.map((project:any, index:any) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-800">{project?.name}</span>
                                                </div>
                                                <div>
                                                    <span
                                                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColorClass(project.status)}`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${getProgressBarColorClass(project.status)}`}
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-xs text-gray-500">Progress</span>
                                                <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Bug Distribution</h3>
                            </div>
                            <div className="p-6 flex flex-col items-center">
                                <div className="relative h-40 w-40 mb-4">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-24 w-24 rounded-full bg-white"></div>
                                    </div>
                                    <svg viewBox="0 0 36 36" className="h-40 w-40 -rotate-90">
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="#EEEEEE" strokeWidth="4"></circle>
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray={`${projectData.bugsCritical} 100`}></circle>
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray={`${projectData.bugsHigh} 100`} strokeDashoffset={`-${projectData.bugsCritical}`}></circle>
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="#3B82F6" strokeWidth="4" strokeDasharray={`${projectData.bugsMedium} 100`} strokeDashoffset={`-${projectData.bugsCritical + projectData.bugsHigh}`}></circle>
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray={`${projectData.bugsLow} 100`} strokeDashoffset={`-${projectData.bugsCritical + projectData.bugsHigh + projectData.bugsMedium}`}></circle>
                                    </svg>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-500">Critical ({projectData.bugsCritical})</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-500">High ({projectData.bugsHigh})</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-500">Medium ({projectData.bugsMedium})</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-500">Low ({projectData.bugsLow})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">Upcoming Deadlines</h3>
                            <span className="text-sm font-medium text-blue-600 cursor-pointer">View All</span>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {upcomingDeadlines.slice(0, 3).map((deadline:any, index:any) => (
                                <div key={index} className="p-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
                                            ${deadline.status === 'critical' ? 'bg-red-100' : 
                                              deadline.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                            <span className={`text-sm font-bold 
                                                ${deadline.status === 'critical' ? 'text-red-600' : 
                                                  deadline.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                                                {deadline.day}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800">{deadline.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Due: {deadline.dueDate}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-medium 
                                        ${deadline.status === 'critical' ? 'text-red-600' : 
                                          deadline.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                                        {deadline.daysLeft} days left
                                    </span>
                                </div>
                            ))}
                            {upcomingDeadlines.length === 0 && (
                                <div className="p-6 text-center text-gray-500">
                                    No upcoming deadlines in the next two weeks
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectManagementDashboard;