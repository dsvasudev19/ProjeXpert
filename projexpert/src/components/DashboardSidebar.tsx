// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, ChevronLeft, ChevronRight, UserCog, FolderGit2, CalendarCheck2, FileCog, SquareKanban, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { axiosInstance } from '../axiosIntance';

// interface SidebarProps {
//     sidebarOpen: boolean;
//     setSidebarOpen: (open: boolean) => void;
// }

// const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
//     const [metrics, setMetrics] = useState<any>();
//     const [activeItem, setActiveItem] = useState("");
//     const location = useLocation();
//     const { user } = useAuth();

//     const menuItems = [
//         { icon: Home, label: 'Overview', href: '/dashboard/analytics' },
//         { icon: FolderGit2, label: 'Projects', href: '/dashboard/project/analytics' },
//         { icon: CalendarCheck2, label: 'Tasks', href: '/dashboard/task' },
//         { icon: FileCog, label: 'Files', href: '/dashboard/files' },
//         { icon: SquareKanban, label: 'Kanban', href: '/dashboard/kanban' },
//         { icon: UserCog, label: 'Team', href: '/dashboard/team' },
//         { icon: UserCog, label: 'Client', href: '/dashboard/client' },
//     ];

//     const clientMenuItems = [
//         { icon: Home, label: 'Overview', href: '/dashboard/analytics' },
//         { icon: FolderGit2, label: 'Projects', href: '/dashboard/project' },
//         { icon: CalendarCheck2, label: 'Tasks', href: '/dashboard/task' },
//         { icon: FileCog, label: 'Files', href: '/dashboard/files' },
//     ];

//     const getAnalyticsData = async () => {
//         try {
//             const res = await axiosInstance.get("/admin/dashboard/side-data");
//             if (res.status === 200) {
//                 setMetrics(res.data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         setActiveItem(location.pathname);
//     }, [location]);

//     useEffect(() => {
//         localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
//     }, [sidebarOpen]);

//     useEffect(() => {
//         getAnalyticsData();
//     }, []);

//     return (
//         <aside className={`fixed top-14 left-0 bottom-0 z-40 transition-all duration-500 ease-out 
//             ${sidebarOpen ? 'w-72' : 'w-20'}`}>
//             <div className="h-full bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-r border-slate-200/70">
//                 <div className="relative h-full flex flex-col">
//                     <button
//                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                         className="absolute -right-3 top-2 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl 
//                         transition-all duration-300 hover:scale-110 border border-slate-200 hover:border-green-300 group"
//                     >
//                         {sidebarOpen ? 
//                             <ChevronLeft className="h-4 w-4 text-slate-600 group-hover:text-green-600" /> : 
//                             <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-green-600" />
//                         }
//                     </button>

//                     <div className="flex-1 p-3 overflow-y-auto">
//                         <div className="space-y-2 mt-2">
//                             {(user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" ? menuItems : clientMenuItems).map((item, index) => (
//                                 <Link
//                                     to={item.href}
//                                     key={index}
//                                     className={`flex items-center px-3 py-2.5 rounded transition-all duration-300 group relative
//                                         ${activeItem === item.href
//                                             ? 'bg-gradient-to-r from-green-500 to-blue-600 shadow-lg shadow-blue-200/50'
//                                             : 'hover:bg-gradient-to-r from-green-50 to-blue-50'
//                                         }`}
//                                 >
//                                     {activeItem === item.href && (
//                                         <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-40"></div>
//                                     )}
//                                     <div className="relative flex items-center w-full">
//                                         <item.icon
//                                             className={`w-5 h-5 transition-all duration-300 
//                                                 ${activeItem === item.href
//                                                     ? 'text-white'
//                                                     : 'text-slate-500 group-hover:text-slate-800'
//                                                 }`}
//                                         />
//                                         {sidebarOpen && (
//                                             <div className="ml-4 flex items-center justify-between flex-1">
//                                                 <span className={`text-sm font-medium transition-all duration-300
//                                                     ${activeItem === item.href
//                                                         ? 'text-white'
//                                                         : 'text-slate-600 group-hover:text-slate-900'
//                                                     }`}>
//                                                     {item.label}
//                                                 </span>
//                                                 {activeItem === item.href && (
//                                                     <div className="h-2 w-2 rounded-full bg-white"></div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>

//                         {/* Status Section */}
//                         {sidebarOpen && user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" && (
//                             <div className="mt-4 space-y-3">
//                                 {/* Weekly Progress Card */}
//                                 <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <span className="text-sm font-semibold text-slate-800">Weekly Progress</span>
//                                         <span className="text-xs font-medium text-green-600">+12.5%</span>
//                                     </div>
//                                     <div className="space-y-2">
//                                         <div className="flex items-center text-xs text-slate-600">
//                                             <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
//                                             <span>Completed Tasks: {metrics?.tasksCompletedThisWeek}</span>
//                                         </div>
//                                         <div className="flex items-center text-xs text-slate-600">
//                                             <Clock className="w-4 h-4 mr-2 text-blue-500" />
//                                             <span>In Progress: {metrics?.tasksInProgressDueThisWeek}</span>
//                                         </div>
//                                         <div className="flex items-center text-xs text-slate-600">
//                                             <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
//                                             <span>Due Soon: {metrics?.tasksDueThisWeekPending}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Active Projects Summary */}
//                                 <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <span className="text-sm font-semibold text-slate-800">Active Projects</span>
//                                         <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">{metrics?.totalActiveProjects} Running</span>
//                                     </div>
//                                     <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
//                                         <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-2/3"></div>
//                                     </div>
//                                     <div className="mt-3 flex justify-between items-center text-xs text-slate-600">
//                                         <span>{metrics?.projectsDueThisWeek} Due This Week</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default DashboardSidebar;


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronLeft, ChevronRight, UserCog, FolderGit2, FileCog, SquareKanban, CheckCircle2, Clock, AlertCircle, CalendarClock, MessageSquareLock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { axiosInstance } from '../axiosIntance';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [metrics, setMetrics] = useState<any>();
    // const [activeItem, setActiveItem] = useState("");
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { icon: Home, label: 'Overview', href: '/dashboard/analytics' },
        { icon: FolderGit2, label: 'Projects', href: '/dashboard/project/analytics' }, // Adjusted to match partial paths
        { icon: MessageSquareLock, label: 'Communications', href: '/dashboard/chat' },
        { icon: CalendarClock, label: 'Timeline', href: '/dashboard/calendar' },
        { icon: FileCog, label: 'Files', href: '/dashboard/files' },
        { icon: SquareKanban, label: 'Kanban', href: '/dashboard/kanban' },
        { icon: UserCog, label: 'Team', href: '/dashboard/team' },
        { icon: UserCog, label: 'Client', href: '/dashboard/client' },
    ];

    const clientMenuItems = [
        { icon: Home, label: 'Overview', href: '/dashboard/analytics' },
        { icon: FolderGit2, label: 'Projects', href: '/dashboard/project/analytics' },
        { icon: MessageSquareLock, label: 'Communications', href: '/dashboard/chat' },
        { icon: CalendarClock, label: 'Timeline', href: '/dashboard/calendar' },
        { icon: FileCog, label: 'Files', href: '/dashboard/files' },
        { icon: SquareKanban, label: 'Kanban', href: '/dashboard/kanban' },
    ];

    const getAnalyticsData = async () => {
        try {
            const res = await axiosInstance.get("/admin/dashboard/side-data");
            if (res.status === 200) {
                setMetrics(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     setActiveItem(location.pathname);
    // }, [location]);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    useEffect(() => {
        getAnalyticsData();
    }, []);

    // Helper function to determine if an item is active based on partial match
    const isItemActive = (href: string) => {
        return location.pathname.includes(href);
    };

    return (
        <aside className={`fixed top-14 left-0 bottom-0 z-40 transition-all duration-500 ease-out 
            ${sidebarOpen ? 'w-72' : 'w-20'}`}>
            <div className="h-full bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-r border-slate-200/70">
                <div className="relative h-full flex flex-col">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="absolute -right-3 top-2 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl 
                        transition-all duration-300 hover:scale-110 border border-slate-200 hover:border-green-300 group"
                    >
                        {sidebarOpen ? 
                            <ChevronLeft className="h-4 w-4 text-slate-600 group-hover:text-green-600" /> : 
                            <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-green-600" />
                        }
                    </button>

                    <div className="flex-1 p-3 overflow-y-auto">
                        <div className="space-y-2 mt-2">
                            {(user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" ? menuItems : clientMenuItems).map((item, index) => (
                                <Link
                                    to={item.href}
                                    key={index}
                                    className={`flex items-center px-3 py-2.5 rounded transition-all duration-300 group relative
                                        ${isItemActive(item.href)
                                            ? 'bg-gradient-to-r from-green-500 to-blue-600 shadow-lg shadow-blue-200/50'
                                            : 'hover:bg-gradient-to-r from-green-50 to-blue-50'
                                        }`}
                                >
                                    {isItemActive(item.href) && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-40"></div>
                                    )}
                                    <div className="relative flex items-center w-full">
                                        <item.icon
                                            className={`w-5 h-5 transition-all duration-300 
                                                ${isItemActive(item.href)
                                                    ? 'text-white'
                                                    : 'text-slate-500 group-hover:text-slate-800'
                                                }`}
                                        />
                                        {sidebarOpen && (
                                            <div className="ml-4 flex items-center justify-between flex-1">
                                                <span className={`text-sm font-medium transition-all duration-300
                                                    ${isItemActive(item.href)
                                                        ? 'text-white'
                                                        : 'text-slate-600 group-hover:text-slate-900'
                                                    }`}>
                                                    {item.label}
                                                </span>
                                                {isItemActive(item.href) && (
                                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Status Section */}
                        {sidebarOpen && user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" && (
                            <div className="mt-4 space-y-3">
                                {/* Weekly Progress Card */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-slate-800">Weekly Progress</span>
                                        <span className="text-xs font-medium text-green-600">+12.5%</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-xs text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                                            <span>Completed Tasks: {metrics?.tasksCompletedThisWeek}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-600">
                                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>In Progress: {metrics?.tasksInProgressDueThisWeek}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-600">
                                            <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                                            <span>Due Soon: {metrics?.tasksDueThisWeekPending}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Projects Summary */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-slate-800">Active Projects</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">{metrics?.totalActiveProjects} Running</span>
                                    </div>
                                    <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-2/3"></div>
                                    </div>
                                    <div className="mt-3 flex justify-between items-center text-xs text-slate-600">
                                        <span>{metrics?.projectsDueThisWeek} Due This Week</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;