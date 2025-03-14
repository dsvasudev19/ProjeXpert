import { BarChart, Users, CheckSquare, Bug, FileText, Settings, PlusCircle, List, PieChart } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const ProjectDashboardLayout = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Function to determine if a tab should be active based on the current route
  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };

  // Function to determine if a parent tab should be active based on its children routes
  const isParentActive = (path: string) => {
    return location.pathname.includes(path);
  };

  // Toggle submenu visibility
  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <nav className="px-6">
          <ul className="flex space-x-8 border-b border-gray-200">
            <li>
              <Link
                to="/dashboard/project/analytics"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/analytics')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => toggleSubmenu('projects')}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isParentActive('/projects')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="mr-2 h-4 w-4" />
                Projects
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === 'projects' ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openSubmenu === 'projects' && (
                <div className="absolute left-0 z-10 w-48 py-1 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                  <Link
                    to="/dashboard/project/projects/add"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/projects/add') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Project
                  </Link>
                  <Link
                    to="/dashboard/project/projects/list"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/projects/list') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <List className="mr-2 h-4 w-4" />
                    Project List
                  </Link>
                  <Link
                    to="/dashboard/project/projects/analytics"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/projects/analytics') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    Project Analytics
                  </Link>
                </div>
              )}
            </li>
            <li className="relative">
              <button
                onClick={() => toggleSubmenu('tasks')}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isParentActive('/tasks')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === 'tasks' ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openSubmenu === 'tasks' && (
                <div className="absolute left-0 z-10 w-48 py-1 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                  <Link
                    to="/dashboard/project/tasks/add"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/tasks/add') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Task
                  </Link>
                  <Link
                    to="/dashboard/project/tasks/list"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/tasks/list') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <List className="mr-2 h-4 w-4" />
                    Task Listing
                  </Link>
                  <Link
                    to="/dashboard/project/tasks/analytics"
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive('/tasks/analytics') ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    Task Analytics
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/dashboard/project/bugs"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/bugs')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bug className="mr-2 h-4 w-4" />
                Bugs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/project/team"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/team')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="mr-2 h-4 w-4" />
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/project/settings"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/settings')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default ProjectDashboardLayout;