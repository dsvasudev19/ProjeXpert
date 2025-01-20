import { useEffect, useState } from 'react';
import { Users, Briefcase, DollarSign, CheckCircle, AlertTriangle, Calendar, TrendingUp, BarChart2, Target, List, LayoutDashboard, FileText, Clock8 } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { axiosInstance } from '../axiosIntance';


const Analytics = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [loading, setLoading] = useState(false)

  const projectStats = {
    totalProjects: 24,
    completedProjects: 18,
    activeProjects: 6,
    totalTasks: 156,
    completedTasks: 89,
    overdueProjects: 3,
    teamMembers: 12,
    budget: '₹450,000',
    timeSpent: '234h',
    resourceUtilization: 78,
    projectROI: 125,
    riskScore: 'Low',
    documentsShared: 45,
    upcomingDeadlines: 5
  };
  const [overview, setOverview] = useState<any>()

  const recentActivities = [
    {
      id: 1,
      type: 'task_completed',
      user: 'Rahul Sharma',
      project: 'Website Redesign',
      time: '2h ago',
      description: 'Completed homepage mockups'
    },
    {
      id: 2,
      type: 'project_milestone',
      user: 'Priya Singh',
      project: 'Mobile App',
      time: '4h ago',
      description: 'Beta testing phase completed'
    },
    {
      id: 3,
      type: 'new_task',
      user: 'Amit Kumar',
      project: 'CRM Integration',
      time: '6h ago',
      description: 'Added API integration tasks'
    }
  ];

  // const upcomingDeadlines = [
  //   {
  //     id: 1,
  //     project: 'E-commerce Platform',
  //     deadline: '2024-02-15',
  //     progress: 65,
  //     priority: 'High'
  //   },
  //   {
  //     id: 2,
  //     project: 'Mobile App Phase 2',
  //     deadline: '2024-02-20',
  //     progress: 40,
  //     priority: 'Medium'  
  //   },
  //   {
  //     id: 3,
  //     project: 'Dashboard Redesign',
  //     deadline: '2024-02-25',
  //     progress: 85,
  //     priority: 'Low'
  //   }
  // ];



  const teamPerformance = [
    {
      id: 1,
      name: 'Design Team',
      tasksCompleted: 45,
      efficiency: 92,
      activeTasks: 8
    },
    {
      id: 2,
      name: 'Development Team',
      tasksCompleted: 78,
      efficiency: 88,
      activeTasks: 12
    },
    {
      id: 3,
      name: 'QA Team',
      tasksCompleted: 34,
      efficiency: 95,
      activeTasks: 5
    }
  ];

  const getDashboardOverview = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get("/admin/dashboard/overview")
      if (res.status === 200) {
        setOverview(res.data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardOverview()

  }, [])

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <>
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Projects</p>
                      <h3 className="text-3xl font-bold mt-1">{overview?.projects?.total}</h3>
                    </div>
                    <Briefcase className="h-12 w-12 opacity-50" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="bg-blue-400/30 px-2 py-1 rounded">
                      {overview?.projects?.active} Active
                    </span>
                    <span className="ml-2 bg-blue-400/30 px-2 py-1 rounded">
                      {overview?.projects?.completed} Completed
                    </span>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Task Completion</p>
                    <h3 className="text-3xl font-bold mt-1">{Math.round((overview?.tasks?.completed / overview?.tasks.total) * 100)}%</h3>
                  </div>
                  <CheckCircle className="h-12 w-12 opacity-50" />
                </div>
                <div className="mt-4 text-sm">
                  <span className="bg-emerald-400/30 px-2 py-1 rounded">
                    {overview?.tasks?.completed}/{overview?.tasks.total} Tasks Done
                  </span>
                </div>
              </div>}

              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Team Members</p>
                    <h3 className="text-3xl font-bold mt-1">{overview?.team?.totalMembers}</h3>
                  </div>
                  <Users className="h-12 w-12 opacity-50" />
                </div>
                <div className="mt-4 text-sm">
                  <span className="bg-purple-400/30 px-2 py-1 rounded">
                    {overview?.team?.activeNow} Active Now
                  </span>
                </div>
              </div>}

              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100">Total Budget</p>
                    <h3 className="text-3xl font-bold mt-1">{overview?.budget?.total}</h3>
                  </div>
                  <DollarSign className="h-12 w-12 opacity-50" />
                </div>
                <div className="mt-4 text-sm">
                  <span className="bg-amber-400/30 px-2 py-1 rounded">
                    {overview?.hours?.total} Total Hours
                  </span>
                </div>
              </div>}
            </div>

            {/* Additional KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Resource Utilization</h3>
                  <BarChart2 className="h-6 w-6 text-blue-500" />
                </div>
                <div className="w-24 h-24 mx-auto">
                  <CircularProgressbar
                    value={projectStats.resourceUtilization}
                    text={`${projectStats.resourceUtilization}%`}
                    styles={buildStyles({
                      pathColor: '#3b82f6',
                      textColor: '#1e40af'
                    })}
                  />
                </div>
              </div>}
              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) :
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Project ROI</h3>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-green-600">{projectStats.projectROI}%</h4>
                    <p className="text-sm text-gray-500 mt-2">Return on Investment</p>
                  </div>
                </div>}

              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-blue-600">{projectStats.riskScore}</h4>
                  <p className="text-sm text-gray-500 mt-2">Overall Risk Score</p>
                </div>
              </div>}
            </div>

            {/* Project Management Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Document Management</h3>
                  <FileText className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-indigo-600">{overview?.documents?.total}</h4>
                  <p className="text-sm text-gray-500 mt-2">Documents Shared This Week</p>
                </div>
              </div>}

              {loading ? (
                <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              ) : <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
                  <Clock8 className="h-6 w-6 text-orange-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-orange-600">{projectStats.upcomingDeadlines}</h4>
                  <p className="text-sm text-gray-500 mt-2">Tasks Due This Week</p>
                </div>
              </div>}
            </div>
          </>
        );

      case 'activity':
        return (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.type === 'task_completed' && <CheckCircle className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'project_milestone' && <Calendar className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'new_task' && <AlertTriangle className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.description} in {activity.project}</p>
                    <span className="text-xs text-gray-400 mt-1">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Team Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamPerformance.map(team => (
                <div key={team.id} className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-lg mb-3">{team.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tasks Completed</span>
                      <span className="font-medium">{team.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Efficiency Rate</span>
                      <span className="font-medium text-green-600">{team.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Tasks</span>
                      <span className="font-medium text-blue-600">{team.activeTasks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 rounded">
      <div className="p-6 pb-24">
        {/* View Selection Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedView('overview')}
            className={`flex items-center px-4 py-2 rounded-lg ${selectedView === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setSelectedView('activity')}
            className={`flex items-center px-4 py-2 rounded-lg ${selectedView === 'activity'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
          >
            <List className="h-5 w-5 mr-2" />
            Activity
          </button>
          <button
            onClick={() => setSelectedView('team')}
            className={`flex items-center px-4 py-2 rounded-lg ${selectedView === 'team'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Users className="h-5 w-5 mr-2" />
            Team
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Analytics;


