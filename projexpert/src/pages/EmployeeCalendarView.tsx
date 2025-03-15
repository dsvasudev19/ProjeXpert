import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { axiosInstance } from '../axiosIntance';
import CreateMeetingModal from '../modals/CreateMeetingModal';

// Set up localizer for the calendar
const localizer = momentLocalizer(moment);

// Simple icon components
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

const CalendarIcon = ({ className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FilterIcon = ({ className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const EmployeeCalendarView = () => {
  const [viewType, setViewType] = useState('week');
  const [date, setDate] = useState(new Date());
  const [filterType, setFilterType] = useState('all');
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for selected slot date
  const [selectedMeeting, setSelectedMeeting] = useState<any>({})
  // Fetch calendar events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      let startDate = new Date(date);
      let endDate = new Date(date);

      if (viewType === 'day') {
        // Just use the current date
      } else if (viewType === 'week') {
        startDate = moment(date).startOf('week').toDate();
        endDate = moment(date).endOf('week').toDate();
      } else if (viewType === 'month') {
        startDate = moment(date).startOf('month').toDate();
        endDate = moment(date).endOf('month').toDate();
      }

      const formattedStart = startDate.toISOString();
      const formattedEnd = endDate.toISOString();

      const response = await axiosInstance.get('/admin/timeline/calendar-events', {
        params: {
          start: formattedStart,
          end: formattedEnd,
          type: filterType
        }
      });

      if (response.data.success) {
        setEvents(response.data.data.map((event: any) => ({
          ...event,
          start: new Date(event.start), // Ensure dates are Date objects
          end: new Date(event.end),
        })));
      } else {
        setError(response.data.message || 'Failed to fetch events');
      }
    } catch (err: any) {
      setError('Error fetching calendar events: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching calendar events:', err);
    } finally {
      setLoading(false);
    }
  };




  // Fetch events when date, view type, or filter changes
  useEffect(() => {
    fetchEvents();
  }, [date, viewType, filterType]);

  // Event style based on event type
  const eventStyleGetter = (event: any) => {
    const style = {
      borderRadius: '4px',
      border: '0',
      padding: '2px 5px',
      fontSize: '14px'
    };

    switch (event.type) {
      case 'meeting':
        return { style: { ...style, backgroundColor: '#8B5CF6' } }; // Purple
      case 'task':
        return { style: { ...style, backgroundColor: '#10B981' } }; // Green
      case 'bug':
        return { style: { ...style, backgroundColor: '#EF4444' } }; // Red
      default:
        return { style: { ...style, backgroundColor: '#3B82F6' } }; // Blue
    }
  };

  // Custom event component to show priority
  const EventComponent = ({ event }: any) => {
    const priorityColor = event.priority === 'high' || event.priority === 'critical'
      ? 'bg-red-400'
      : event.priority === 'medium'
        ? 'bg-yellow-400'
        : 'bg-blue-400';

    return (
      <div>
        <div className="flex items-center">
          {(event.type === 'task' || event.type === 'bug') && (
            <div className={`w-2 h-2 rounded-full ${priorityColor} mr-1`}></div>
          )}
          <span>{event.title}</span>
        </div>
        {event.progress !== undefined && (
          <div className="w-full bg-gray-200 h-1 mt-1 rounded-full">
            <div
              className="bg-white h-1 rounded-full"
              style={{ width: `${event.progress}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  // Handle meeting creation
  const handleMeetingCreated = (newMeeting: any) => {
    setEvents((prevEvents: any) => [
      ...prevEvents,
      {
        id: newMeeting.id,
        title: newMeeting.title,
        start: new Date(newMeeting.startTime),
        end: new Date(newMeeting.endTime),
        type: 'meeting',
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-auto">
      {/* Header with Legend */}
      <div className="bg-white shadow-sm px-2 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">My Schedule</h1>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-purple-500 rounded-sm mr-1.5"></span>
              <span className="text-gray-600">Meetings</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5"></span>
              <span className="text-gray-600">Tasks</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-sm mr-1.5"></span>
              <span className="text-gray-600">Bugs</span>
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
              <option value="bug">Bugs</option>
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

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 text-sm">
          {error}
          <button
            onClick={fetchEvents}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Calendar */}
      <div className="flex-1 p-0">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onView={(view) => setViewType(view)}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent
          }}
          views={['month', 'week', 'day']}
          className="h-full"
          toolbar={false}
          onSelectEvent={(event) => {
            if (event.type === "meeting") {
              setSelectedMeeting(event?.id?.split("-")[1])
              setIsModalOpen(true)
            }
          }}
          onSelectSlot={(slotInfo) => {
            setSelectedDate(slotInfo.start); // Set the selected slot start date
            setIsModalOpen(true); // Open the modal
          }}
          selectable
        />
      </div>

      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onMeetingCreated={handleMeetingCreated}
        id={selectedMeeting}
      />
    </div>
  );
};

export default EmployeeCalendarView;