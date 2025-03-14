import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell,  ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {  ArrowUp, ArrowDown, Bug, CheckCircle, AlertTriangle } from 'lucide-react';

const BugAnalytics = () => {
  // Sample bug data
  const bugStatusData = [
    { name: 'Week 1', resolved: 15, open: 8, critical: 3 },
    { name: 'Week 2', resolved: 20, open: 6, critical: 2 },
    { name: 'Week 3', resolved: 12, open: 10, critical: 5 },
    { name: 'Week 4', resolved: 25, open: 5, critical: 1 },
    { name: 'Week 5', resolved: 18, open: 7, critical: 2 },
    { name: 'Week 6', resolved: 22, open: 4, critical: 1 },
  ];
  
  const bugsBySeverityData = [
    { name: 'Critical', value: 14, color: '#ef4444' },
    { name: 'High', value: 28, color: '#f59e0b' },
    { name: 'Medium', value: 35, color: '#3b82f6' },
    { name: 'Low', value: 23, color: '#10b981' },
  ];
  
  const bugsByComponentData = [
    { name: 'Frontend', value: 32, color: '#8b5cf6' },
    { name: 'Backend', value: 25, color: '#ef4444' },
    { name: 'Database', value: 15, color: '#10b981' },
    { name: 'API', value: 18, color: '#f59e0b' },
  ];
  
  const bugTrendData = [
    { date: 'Mar 1', bugs: 18 },
    { date: 'Mar 5', bugs: 22 },
    { date: 'Mar 10', bugs: 25 },
    { date: 'Mar 15', bugs: 19 },
    { date: 'Mar 20', bugs: 23 },
    { date: 'Mar 25', bugs: 17 },
    { date: 'Mar 30', bugs: 15 },
  ];
  
  const resolutionTimeData = [
    { name: '< 24h', value: 45, color: '#10b981' },
    { name: '1-3 days', value: 35, color: '#3b82f6' },
    { name: '3-7 days', value: 15, color: '#f59e0b' },
    { name: '> 7 days', value: 5, color: '#ef4444' },
  ];
  
  const teamBugHandlingData = [
    { name: 'Team A', resolved: 35, reported: 40 },
    { name: 'Team B', resolved: 42, reported: 45 },
    { name: 'Team C', resolved: 28, reported: 35 },
    { name: 'Team D', resolved: 50, reported: 48 },
  ];
  
  // Summary metrics
  const summaryData = {
    totalBugs: 180,
    resolvedBugs: 135,
    criticalBugs: 14,
    avgResolutionTime: '2.1 days',
    bugTrend: -8.3, // percentage change
  };
  
  const [timeRange, setTimeRange] = useState('1M');

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bug Analytics</h1>
        <p className="text-gray-600">Insights and metrics for bug tracking and resolution</p>
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
            <h3 className="text-gray-500 text-sm">Total Bugs</h3>
            <span className="bg-blue-100 p-2 rounded-full">
              <Bug className="h-5 w-5 text-blue-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{summaryData.totalBugs}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Resolution Rate</h3>
            <span className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{Math.round((summaryData.resolvedBugs / summaryData.totalBugs) * 100)}%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Critical Bugs</h3>
            <span className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{summaryData.criticalBugs}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Bug Trend</h3>
            <span className="bg-purple-100 p-2 rounded-full">
              {summaryData.bugTrend > 0 ? (
                <ArrowUp className="h-5 w-5 text-purple-500" />
              ) : (
                <ArrowDown className="h-5 w-5 text-purple-500" />
              )}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{Math.abs(summaryData.bugTrend)}%</span>
            <span className={`ml-2 text-sm ${summaryData.bugTrend > 0 ? 'text-red-500' : 'text-green-500'} flex items-center`}>
              {summaryData.bugTrend > 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              vs last period
            </span>
          </div>
        </div>
      </div>
      
      {/* Main charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bug status over time */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bug Status Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bugStatusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
              <Bar dataKey="open" fill="#f59e0b" name="Open" />
              <Bar dataKey="critical" fill="#ef4444" name="Critical" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Bugs by Severity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bugs by Severity</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bugsBySeverityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bugsBySeverityData.map((entry, index) => (
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
        {/* Bug Trend Timeline */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bug Creation Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bugTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="bugs" stroke="#8884d8" fillOpacity={1} fill="url(#colorBugs)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Team Bug Handling */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Team Bug Handling</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={teamBugHandlingData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="resolved" name="Bugs Resolved" fill="#3b82f6" />
              <Bar dataKey="reported" name="Bugs Reported" fill="#d1d5db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Third row of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bugs by Component */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Bugs by Component</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bugsByComponentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bugsByComponentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Resolution Time Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Resolution Time Distribution</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resolutionTimeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {resolutionTimeData.map((entry, index) => (
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

export default BugAnalytics;