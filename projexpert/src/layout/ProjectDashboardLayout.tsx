// import { BarChart, Users, CheckSquare, Bug, FileText, Settings, PlusCircle, List, PieChart, BugIcon, BugPlay } from 'lucide-react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';

// const ProjectDashboardLayout = () => {
//   const location = useLocation();
//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
//   const [selectedMenu, setSelectedMenu] = useState({
//     projects: 'Projects',
//     tasks: 'Tasks',
//     bugs:'Bugs'
//   });
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const isActive = (path: string) => {
//     return location.pathname.endsWith(path);
//   };

//   const isParentActive = (path: string) => {
//     return location.pathname.includes(path);
//   };

//   const toggleSubmenu = (menu: string) => {
//     setOpenSubmenu(openSubmenu === menu ? null : menu);
//   };

//   const handleSubmenuSelect = (menu: string, submenuLabel: string, path: string) => {
//     setSelectedMenu(prev => ({
//       ...prev,
//       [menu]: submenuLabel
//     }));
//     setOpenSubmenu(null);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setOpenSubmenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const projectSubmenuItems = [
//     { path: '/projects/add', label: 'Add Project', icon: PlusCircle },
//     { path: '/projects/list', label: 'Project List', icon: List },
//     // { path: '/projects/analytics', label: 'Project Analytics', icon: PieChart }
//   ];

//   const bugsSubmenuItems=[
//     { path: '/bugs/report', label: 'Report Bug', icon: BugIcon },
//     { path: '/bugs/list', label: 'Bugs Listing', icon: BugPlay}
//   ]

//   const taskSubmenuItems = [
//     { path: '/tasks/add', label: 'Add Task', icon: PlusCircle },
//     { path: '/tasks/list', label: 'Task Listing', icon: List },
//     // { path: '/tasks/analytics', label: 'Task Analytics', icon: PieChart }
//   ];

//   const renderSubmenu = (menu: string, items: any[]) => {
//     return (
//       openSubmenu === menu && (
//         <div className="absolute left-0 w-48 py-1 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-[1000]">
//           {items.map((item) => (
//             <Link
//               key={item.path}
//               to={`/dashboard/project${item.path}`}
//               onClick={() => handleSubmenuSelect(menu, item.label, item.path)}
//               className={`flex items-center px-4 py-2 text-sm ${
//                 isActive(item.path)
//                   ? 'bg-blue-50 text-blue-600 font-semibold'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <item.icon className="mr-2 h-4 w-4" />
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )
//     );
//   };

//   return (
//     <div ref={wrapperRef} className="flex flex-col h-screen bg-gray-50">
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <nav className="px-6">
//           <ul className="flex space-x-8 border-b border-gray-200">
//             <li>
//               <Link
//                 to="/dashboard/project/analytics"
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isActive('/analytics')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <BarChart className="mr-2 h-4 w-4" />
//                 Analytics
//               </Link>
//             </li>
//             <li className="relative">
//               <button
//                 onClick={() => toggleSubmenu('projects')}
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isParentActive('/projects')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <FileText className="mr-2 h-4 w-4" />
//                 {selectedMenu.projects}
//                 <svg
//                   className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === 'projects' ? 'transform rotate-180' : ''}`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//               {renderSubmenu('projects', projectSubmenuItems)}
//             </li>
//             <li className="relative">
//               <button
//                 onClick={() => toggleSubmenu('tasks')}
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isParentActive('/tasks')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <CheckSquare className="mr-2 h-4 w-4" />
//                 {selectedMenu.tasks}
//                 <svg
//                   className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === 'tasks' ? 'transform rotate-180' : ''}`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//               {renderSubmenu('tasks', taskSubmenuItems)}
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/project/bugs"
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isActive('/bugs')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Bug className="mr-2 h-4 w-4" />
//                 Bugs
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/project/team"
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isActive('/team')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Users className="mr-2 h-4 w-4" />
//                 Team
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/project/settings"
//                 className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
//                   isActive('/settings')
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Settings className="mr-2 h-4 w-4" />
//                 Settings
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>
//       <Outlet />
//     </div>
//   );
// };

// export default ProjectDashboardLayout;

import { BarChart, Users, CheckSquare, Bug, FileText, PlusCircle, List, BugIcon, BugPlay } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const ProjectDashboardLayout = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState({
    projects: 'Projects',
    tasks: 'Tasks',
    bugs: 'Bugs'
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };

  const isParentActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleSubmenuSelect = (menu: string, submenuLabel: string, path: string) => {
    console.log(path)
    setSelectedMenu(prev => ({
      ...prev,
      [menu]: submenuLabel
    }));
    setOpenSubmenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const projectSubmenuItems = [
    { path: '/projects/add', label: 'Add Project', icon: PlusCircle },
    { path: '/projects/list', label: 'Project List', icon: List },
  ];

  const taskSubmenuItems = [
    { path: '/tasks/add', label: 'Add Task', icon: PlusCircle },
    { path: '/tasks/list', label: 'Task Listing', icon: List },
  ];

  const bugsSubmenuItems = [
    { path: '/bugs/report', label: 'Report Bug', icon: BugPlay },
    { path: '/bugs/list', label: 'Bugs Listing', icon: BugIcon }
  ];

  const renderSubmenu = (menu: string, items: any[]) => {
    return (
      openSubmenu === menu && (
        <div className="absolute left-0 w-48 py-1 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-[1000]">
          {items.map((item) => (
            <Link
              key={item.path}
              to={`/dashboard/project${item.path}`}
              onClick={() => handleSubmenuSelect(menu, item.label, item.path)}
              className={`flex items-center px-4 py-2 text-sm ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )
    );
  };

  return (
    <div ref={wrapperRef} className="flex flex-col h-screen bg-gray-50">
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
                {selectedMenu.projects}
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
              {renderSubmenu('projects', projectSubmenuItems)}
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
                {selectedMenu.tasks}
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
              {renderSubmenu('tasks', taskSubmenuItems)}
            </li>
            <li className="relative">
              <button
                onClick={() => toggleSubmenu('bugs')}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  isParentActive('/bugs')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bug className="mr-2 h-4 w-4" />
                {selectedMenu.bugs}
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${openSubmenu === 'bugs' ? 'transform rotate-180' : ''}`}
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
              {renderSubmenu('bugs', bugsSubmenuItems)}
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
            
          </ul>
        </nav>
      </header>
      <Outlet />
      
    </div>
  );
};

export default ProjectDashboardLayout;