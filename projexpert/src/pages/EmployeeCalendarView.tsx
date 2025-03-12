import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Set up localizer for the calendar
const localizer = momentLocalizer(moment);

// Sample employee data
const employees = [
  { id: 1, name: 'Alex Johnson', department: 'Engineering' },
  { id: 2, name: 'Maria Garcia', department: 'Design' },
  { id: 3, name: 'David Kim', department: 'Marketing' },
];

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Project Alpha Kickoff',
    start: new Date(2025, 2, 10, 10, 0),
    end: new Date(2025, 2, 10, 11, 30),
    employeeId: 1,
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Design UI Components',
    start: new Date(2025, 2, 11, 9, 0),
    end: new Date(2025, 2, 11, 17, 0),
    employeeId: 2,
    type: 'task'
  },
  {
    id: 3,
    title: 'Code Review',
    start: new Date(2025, 2, 12, 14, 0),
    end: new Date(2025, 2, 12, 15, 0),
    employeeId: 1,
    type: 'meeting'
  },
  {
    id: 4,
    title: 'Marketing Campaign Planning',
    start: new Date(2025, 2, 13, 10, 0),
    end: new Date(2025, 2, 13, 12, 0),
    employeeId: 3,
    type: 'task'
  }
];

// Simple icon components to replace lucide-react
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const UserIcon = ({ className }:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = ({ className }:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FilterIcon = ({ className }:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const EmployeeCalendarView = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(employees[0]);
  const [viewType, setViewType] = useState('week');
  const [date, setDate] = useState(new Date());
  const [filterType, setFilterType] = useState('all');

  // Filter events based on selected employee and filter type
  const filteredEvents = sampleEvents.filter(event => {
    if (event.employeeId !== selectedEmployee.id) return false;
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  // Event style based on event type
  const eventStyleGetter = (event:any) => {
    const style = {
      borderRadius: '4px',
      border: '0',
      padding: '2px 5px',
      fontSize: '14px'
    };
    
    if (event.type === 'meeting') {
      return {
        style: {
          ...style,
          backgroundColor: '#8B5CF6',
        }
      };
    } else {
      return {
        style: {
          ...style,
          backgroundColor: '#10B981',
        }
      };
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Employee Schedule</h1>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium">{selectedEmployee.name}</span>
            <span className="text-sm text-gray-500">({selectedEmployee.department})</span>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                const newDate = new Date(date);
                if (viewType === 'day') newDate.setDate(newDate.getDate() - 1);
                else if (viewType === 'week') newDate.setDate(newDate.getDate() - 7);
                else newDate.setMonth(newDate.getMonth() - 1);
                setDate(newDate);
              }}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ChevronLeftIcon />
            </button>
            
            <button 
              onClick={() => setDate(new Date())} 
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              Today
            </button>
            
            <button 
              onClick={() => {
                const newDate = new Date(date);
                if (viewType === 'day') newDate.setDate(newDate.getDate() + 1);
                else if (viewType === 'week') newDate.setDate(newDate.getDate() + 7);
                else newDate.setMonth(newDate.getMonth() + 1);
                setDate(newDate);
              }}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ChevronRightIcon />
            </button>
            
            <h2 className="text-lg font-medium text-gray-800">
              {viewType === 'month' 
                ? moment(date).format('MMMM YYYY')
                : viewType === 'week'
                  ? `${moment(date).startOf('week').format('MMM D')} - ${moment(date).endOf('week').format('MMM D, YYYY')}`
                  : moment(date).format('dddd, MMMM D, YYYY')
              }
            </h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedEmployee.id}
              onChange={(e) => setSelectedEmployee(employees.find((emp:any) => emp.id === parseInt(e.target.value)))}
              className="border rounded px-2 py-1 text-sm"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-4 w-4 text-gray-500" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="all">All Events</option>
              <option value="meeting">Meetings Only</option>
              <option value="task">Tasks Only</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <select 
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="h-full bg-white rounded-lg shadow">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            onView={setViewType}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            className="h-full"
          />
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end px-6 py-3 bg-white border-t">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-purple-500 rounded-sm mr-2"></span>
            <span>Meetings</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-sm mr-2"></span>
            <span>Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCalendarView;