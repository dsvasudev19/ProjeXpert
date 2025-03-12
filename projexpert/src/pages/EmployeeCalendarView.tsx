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
  const [viewType, setViewType] = useState('week');
  const [date, setDate] = useState(new Date());
  const [filterType, setFilterType] = useState('all');

  // Filter events based on logged in user (using first employee as example)
  const currentUser = employees[0]; // This would come from auth context in a real app
  
  // Filter events based on filter type
  const filteredEvents = sampleEvents.filter(event => {
    if (event.employeeId !== currentUser.id) return false;
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
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      {/* Header with Legend */}
      <div className="bg-white shadow-sm px-2 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">My Schedule</h1>
          
          {/* Legend moved to header */}
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-purple-500 rounded-sm mr-1.5"></span>
              <span className="text-gray-600">Meetings</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5"></span>
              <span className="text-gray-600">Tasks</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between px-2 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              const newDate = new Date(date);
              if (viewType === 'day') newDate.setDate(newDate.getDate() - 1);
              else if (viewType === 'week') newDate.setDate(newDate.getDate() - 7);
              else newDate.setMonth(newDate.getMonth() - 1);
              setDate(newDate);
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
            aria-label="Previous"
          >
            <ChevronLeftIcon />
          </button>
          
          <button 
            onClick={() => setDate(new Date())} 
            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium"
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
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
            aria-label="Next"
          >
            <ChevronRightIcon />
          </button>
          
          <h2 className="text-sm font-medium text-gray-800 ml-1">
            {viewType === 'month' 
              ? moment(date).format('MMMM YYYY')
              : viewType === 'week'
                ? `${moment(date).startOf('week').format('MMM D')} - ${moment(date).endOf('week').format('MMM D, YYYY')}`
                : moment(date).format('dddd, MMMM D, YYYY')
            }
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-white rounded border border-gray-200 px-2 py-1">
            <FilterIcon className="h-3 w-3 text-gray-500" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs border-none bg-transparent focus:ring-0 py-0"
            >
              <option value="all">All Events</option>
              <option value="meeting">Meetings</option>
              <option value="task">Tasks</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-1 bg-white rounded border border-gray-200 px-2 py-1">
            <CalendarIcon className="h-3 w-3 text-gray-500" />
            <select 
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="text-xs border-none bg-transparent focus:ring-0 py-0"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="flex-1 p-0">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          view={viewType as any}
          onView={(view) => setViewType(view)}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day']}
          className="h-full"
          toolbar={false}
        />
      </div>
    </div>
  );
};

export default EmployeeCalendarView;