import { BarChart, Users, CheckSquare, Bug, FileText, Settings } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const ProjectDashboardLayout = () => {
  const location = useLocation(); // Get the current route

  // Function to determine if a tab should be active based on the current route
  const isActive = (path:any) => {
    return location.pathname.endsWith(path)
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
            <li>
              <Link
                to="/dashboard/project/projects"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/projects')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/project/tasks"
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isActive('/tasks')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks
              </Link>
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