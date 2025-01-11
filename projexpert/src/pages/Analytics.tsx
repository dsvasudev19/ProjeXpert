import { useState } from 'react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  Area, AreaChart } from 'recharts';
import { Users, CalendarDays, DollarSign, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<any>('7days');
  const [activeMetric, setActiveMetric] = useState<any>(null);
  console.log("its rendering")
  const bookingData = [
    { name: 'Mon', bookings: 24, revenue: 12000, occupancy: 75 },
    { name: 'Tue', bookings: 18, revenue: 9000, occupancy: 65 },
    { name: 'Wed', bookings: 32, revenue: 16000, occupancy: 85 },
    { name: 'Thu', bookings: 28, revenue: 14000, occupancy: 78 },
    { name: 'Fri', bookings: 35, revenue: 17500, occupancy: 90 },
    { name: 'Sat', bookings: 42, revenue: 21000, occupancy: 95 },
    { name: 'Sun', bookings: 38, revenue: 19000, occupancy: 88 },
  ];

  const upcomingBookings = [
    { id: 1, turf: 'Turf A', time: '14:00', customer: 'John Doe', status: 'Confirmed', sport: 'Football', duration: '2 hours' },
    { id: 2, turf: 'Turf B', time: '15:30', customer: 'Jane Smith', status: 'Pending', sport: 'Cricket', duration: '3 hours' },
    { id: 3, turf: 'Turf A', time: '17:00', customer: 'Mike Johnson', status: 'Confirmed', sport: 'Football', duration: '1 hour' },
  ];

  const metrics = [
    {
      title: 'Projects',
      value: '217',
      trend: '+12%',
      icon: CalendarDays,
      color: 'blue',
      detailData: 'bookings'
    },
    {
      title: 'Total Revenue',
      value: '₹21,500',
      trend: '+8%',
      icon: DollarSign,
      color: 'green',
      detailData: 'revenue'
    },
    {
      title: 'Active Clients',
      value: '154',
      trend: '-3%',
      icon: Users,
      color: 'purple',
      detailData: 'customers'
    },
    {
      title: 'Team',
      value: '78%',
      trend: '+5%',
      icon: TrendingUp,
      color: 'orange',
      detailData: 'occupancy'
    }
  ];

  const MetricCard = ({ metric, isActive, onClick }:any) => (
    <div
      onClick={() => onClick(metric)}
      className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-200 cursor-pointer 
        ${isActive ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{metric.title}</p>
          <h3 className="text-2xl font-bold">{metric.value}</h3>
        </div>
        <div className={`bg-${metric.color}-50 p-3 rounded-xl`}>
          <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          {/* <p className="text-gray-500 mt-1">Welcome back, Admin</p> */}
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            metric={metric}
            isActive={activeMetric?.title === metric.title}
            onClick={setActiveMetric}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Performance Overview</h3>
            <div className="flex space-x-2">
              {['Daily', 'Weekly', 'Monthly'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeMetric?.detailData || 'bookings'} 
                  stroke="#3B82F6" 
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Bookings Card */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{booking.customer}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {booking.turf} • {booking.sport} • {booking.duration}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;