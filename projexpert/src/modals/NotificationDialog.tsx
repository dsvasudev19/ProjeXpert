import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle2, AlertCircle, Clock, MessageSquare, Users } from 'lucide-react';

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const popupRef = useRef<any>(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'task',
      title: 'Task Deadline Approaching',
      message: 'UI Design Review meeting is due in 2 hours',
      time: '2 hours ago',
      priority: 'high',
      icon: Clock,
      read: false
    },
    {
      id: 2,
      type: 'mention',
      title: 'New Mention',
      message: '@Sarah mentioned you in Frontend Development project',
      time: '3 hours ago',
      priority: 'medium',
      icon: MessageSquare,
      read: false
    },
    {
      id: 3,
      type: 'update',
      title: 'Project Update',
      message: 'Backend API Documentation has been updated',
      time: '5 hours ago',
      priority: 'low',
      icon: CheckCircle2,
      read: true
    },
    {
      id: 4,
      type: 'team',
      title: 'New Team Member',
      message: 'John Doe has joined the Development Team',
      time: '1 day ago',
      priority: 'medium',
      icon: Users,
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Server Status Alert',
      message: 'High CPU usage detected on production server',
      time: '1 day ago',
      priority: 'high',
      icon: AlertCircle,
      read: true
    }
  ];

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPriorityColor = (priority:any) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-amber-100 text-amber-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition-all duration-300"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {isOpen && (
        <div 
          ref={popupRef}
          className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-all duration-300 ${
                  !notification.read ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                    <notification.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-slate-800">{notification.title}</h3>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <button className="w-full py-2 px-4 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-all duration-300">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;