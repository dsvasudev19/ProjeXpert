import { Users, CheckSquare, Bug, FileText, } from 'lucide-react';

const ProjectManagementDashboard = () => {

    // Sample data for analytics    
    console.log('hello')
    const projectData = {
        completedTasks: 287,
        pendingTasks: 124,
        totalProjects: 8,
        activeProjects: 5,
        bugsCritical: 7,
        bugsHigh: 18,
        bugsMedium: 35,
        bugsLow: 22,
        teamMembers: 12,
        taskCompletionRate: 78,
        upcomingDeadlines: 5
    };

    // Sample project progress data
    const projectProgress = [
        { name: 'Website Redesign', progress: 75, status: 'On Track' },
        { name: 'Mobile App Development', progress: 45, status: 'At Risk' },
        { name: 'API Integration', progress: 90, status: 'On Track' },
        { name: 'Documentation', progress: 30, status: 'Delayed' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-auto mb-16">

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Project Analytics</h2>
                        <div className="flex space-x-3">
                            <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>All time</option>
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
                            <p className="mt-2 text-sm text-gray-500">2 projects completed this month</p>
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
                            <p className="mt-2 text-sm text-gray-500">3 members joined this month</p>
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
                                    {projectProgress.map((project, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-800">{project.name}</span>
                                                </div>
                                                <div>
                                                    <span
                                                        className={`text-xs font-medium px-2 py-1 rounded-full ${project.status === 'On Track'
                                                                ? 'bg-green-100 text-green-800'
                                                                : project.status === 'At Risk'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${project.status === 'On Track'
                                                            ? 'bg-green-500'
                                                            : project.status === 'At Risk'
                                                                ? 'bg-yellow-500'
                                                                : 'bg-red-500'
                                                        }`}
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
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                        <span className="text-sm font-bold text-red-600">15</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Website Redesign - Phase 2</h4>
                                        <p className="text-xs text-gray-500 mt-1">Due: Mar 15, 2025</p>
                                    </div>
                                </div>
                                <span className="text-xs text-red-600 font-medium">2 days left</span>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                                        <span className="text-sm font-bold text-yellow-600">22</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Mobile App Beta Release</h4>
                                        <p className="text-xs text-gray-500 mt-1">Due: Mar 22, 2025</p>
                                    </div>
                                </div>
                                <span className="text-xs text-yellow-600 font-medium">9 days left</span>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <span className="text-sm font-bold text-blue-600">28</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800">Monthly Progress Report</h4>
                                        <p className="text-xs text-gray-500 mt-1">Due: Mar 28, 2025</p>
                                    </div>
                                </div>
                                <span className="text-xs text-blue-600 font-medium">15 days left</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ProjectManagementDashboard;