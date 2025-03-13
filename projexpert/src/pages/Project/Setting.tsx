import React, { useState } from 'react';
import { Save, FileText, LayoutGrid, Bell } from 'lucide-react';

const ProjectSettingsPage = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [projectSettings, setProjectSettings] = useState({
    taskReminders: true,
    weeklyDigest: true,
    defaultStatus: 'not_started',
    defaultPriority: 'medium',
    widgetLayout: 'grid'
  });

  const handleSettingChange = (setting:any, value:any) => {
    setProjectSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-6">Project Settings</h2>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveSection('projects')}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === 'projects'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="mr-3 h-5 w-5" />
            Project Defaults
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === 'notifications'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="mr-3 h-5 w-5" />
            Project Notifications
          </button>
          <button
            onClick={() => setActiveSection('layouts')}
            className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
              activeSection === 'layouts'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid className="mr-3 h-5 w-5" />
            Dashboard Layout
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Project Default Settings</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Project Preferences</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Project Status</label>
                  <select 
                    value={projectSettings.defaultStatus}
                    onChange={(e) => handleSettingChange('defaultStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Task Priority</label>
                  <select 
                    value={projectSettings.defaultPriority}
                    onChange={(e) => handleSettingChange('defaultPriority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Task Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="7"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Project Notification Settings</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Notification Preferences</h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Task Reminders</h4>
                      <p className="text-sm text-gray-500">Get reminders for upcoming project tasks</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={projectSettings.taskReminders}
                        onChange={() => handleSettingChange('taskReminders', !projectSettings.taskReminders)} 
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </li>
                  <li className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Weekly Project Digest</h4>
                      <p className="text-sm text-gray-500">Receive weekly project summary emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={projectSettings.weeklyDigest}
                        onChange={() => handleSettingChange('weeklyDigest', !projectSettings.weeklyDigest)} 
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </li>
                  <li className="py-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800">Reminder Lead Time</h4>
                      <p className="text-sm text-gray-500">Set when to receive task reminders</p>
                    </div>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="1day">1 Day Before</option>
                      <option value="2days">2 Days Before</option>
                      <option value="1week">1 Week Before</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'layouts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Project Dashboard Layout</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Layout Preferences</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Widget Layout</label>
                  <select 
                    value={projectSettings.widgetLayout}
                    onChange={(e) => handleSettingChange('widgetLayout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                    <option value="compact">Compact View</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Task View</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="list">Task List</option>
                    <option value="kanban">Kanban Board</option>
                    <option value="calendar">Calendar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSettingsPage;