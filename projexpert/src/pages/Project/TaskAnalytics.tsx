import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell,  ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {  ArrowUp, CheckCircle, AlertTriangle } from 'lucide-react';

const TaskAnalytics = () => {
  // Sample data - in a real app, this would come from an API
  const taskCompletionData = [
    { name: 'Week 1', completed: 23, pending: 12, overdue: 4 },
    { name: 'Week 2', completed: 28, pending: 10, overdue: 2 },
    { name: 'Week 3', completed: 19, pending: 15, overdue: 8 },
    { name: 'Week 4', completed: 32, pending: 8, overdue: 3 },
    { name: 'Week 5', completed: 27, pending: 11, overdue: 1 },
    { name: 'Week 6', completed: 34, pending: 9, overdue: 2 },
  ];
  
  const tasksByPriorityData = [
    { name: 'High', value: 18, color: '#ef4444' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Low', value: 27, color: '#3b82f6' },
  ];
  
  const tasksByTypeData = [
    { name: 'Feature', value: 42, color: '#8b5cf6' },
    { name: 'Bug Fix', value: 23, color: '#ef4444' },
    { name: 'Documentation', value: 15, color: '#10b981' },
    { name: 'Testing', value: 10, color: '#f59e0b' },
  ];
  
  const timelineData = [
    { date: 'Mar 1', tasks: 28 },
    { date: 'Mar 5', tasks: 35 },
    { date: 'Mar 10', tasks: 32 },
    { date: 'Mar 15', tasks: 42 },
    { date: 'Mar 20', tasks: 38 },
    { date: 'Mar 25', tasks: 47 },
    { date: 'Mar 30', tasks: 51 },
  ];
  
  const teamPerformanceData = [
    { name: 'Team A', completed: 45, target: 50 },
    { name: 'Team B', completed: 52, target: 50 },
    { name: 'Team C', completed: 38, target: 50 },
    { name: 'Team D', completed: 61, target: 50 },
  ];
  
  const taskTimeEstimationData = [
    { name: 'Under Estimated', value: 32, color: '#ef4444' },
    { name: 'Accurately Estimated', value: 54, color: '#10b981' },
    { name: 'Over Estimated', value: 14, color: '#3b82f6' },
  ];
  
  // Summary metrics
  const summaryData = {
    totalTasks: 240,
    completedTasks: 185,
    overdueRate: 8.3,
    avgCompletionTime: '2.4 days',
    tasksTrend: 12.5, // percentage increase
  };
  
  const [timeRange, setTimeRange] = useState('1M'); // 1W, 1M, 3M, 6M, 1Y

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Analytics</h1>
        <p className="text-gray-600">Insights and performance metrics for all tasks</p>
      </div>
      
      {/* Time range selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['1W', '1M', '3M', '6M', '1Y'].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === range 
                  ? 'text-white bg-blue-600 hover:bg-blue-700' 
                  : 'text-gray-700 bg-white hover:bg-gray-100'
              } border border-gray-200 ${
                range === '1W' ? 'rounded-l-lg' : ''
              } ${
                range === '1Y' ? 'rounded-r-lg' : ''
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Total Tasks</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{summaryData.totalTasks}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Completion Rate</h3>
            <span className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{Math.round((summaryData.completedTasks / summaryData.totalTasks) * 100)}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Overdue Rate</h3>
            <span className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{summaryData.overdueRate}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Task Growth</h3>
            <span className="bg-purple-100 p-2 rounded-full">
              <ArrowUp className="h-5 w-5 text-purple-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{summaryData.tasksTrend}%</span>
            <span className="ml-2 text-sm text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> vs last period
            </span>
          </div>
        </div>
      </div>
      
      {/* Main charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Task completion over time */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Task Completion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Tasks by Priority */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tasks by Priority</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByPriorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Second row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Timeline Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Task Creation Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="tasks" stroke="#8884d8" fillOpacity={1} fill="url(#colorTasks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Team Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={teamPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Tasks Completed" fill="#3b82f6" />
              <Bar dataKey="target" name="Target" fill="#d1d5db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Third row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Type */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tasks by Type</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Time Estimation Accuracy */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Time Estimation Accuracy</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskTimeEstimationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {taskTimeEstimationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics;