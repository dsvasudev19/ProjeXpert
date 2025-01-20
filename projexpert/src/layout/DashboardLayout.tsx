

import { useEffect, useState } from 'react';
import { Home, LogOut, ChevronLeft, ChevronRight, UserCog, BadgeIndianRupee, Search, Settings, HelpCircle, AlertCircle, Clock, CheckCircle2, FolderGit2, CalendarCheck2, FileCog, SquareKanban } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import NotificationPopup from '../modals/NotificationDialog';
import { useAuth } from '../contexts/AuthContext';
import { axiosInstance } from '../axiosIntance';

const DashboardLayout = () => {
    const [metrics,setMetrics]=useState<any>()
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();
    const {user,logout} = useAuth()

    const menuItems = [
        { icon: Home, label: 'Overview', href: '/dashboard/analytics' },
        { icon: FolderGit2, label: 'Projects', href: '/dashboard/project' },
        { icon: CalendarCheck2, label: 'Tasks', href: '/dashboard/task' },
        { icon: FileCog, label: 'Files', href: '/dashboard/files' },
        { icon: SquareKanban, label: 'Kanban', href: '/dashboard/kanban' },
        { icon: BadgeIndianRupee, label: 'Payment', href: '/dashboard/payment' },
        { icon: UserCog, label: 'Team', href: '/dashboard/team' },
        { icon: UserCog, label: 'Client', href: '/dashboard/client' },
    ];

    const getAnalyticsData=async()=>{
        try {
            const res=await axiosInstance.get("/admin/dashboard/side-data")
            if(res.status===200){
                setMetrics(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(location.pathname.split("/"))
        setActiveItem(location.pathname);
    }, [location]);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    useEffect(()=>{
        getAnalyticsData()
    },[])

    return (
        <div className="relative min-h-screen bg-slate-100/50">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-b border-slate-200/70">
                <div className="px-3 h-full flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <span className="relative text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:bg-gradient-to-l">
                                ProjeXpert<span className='text-xl'>.in</span>
                            </span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl px-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search projects, tasks, or team members..."
                                className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Right Navigation Items */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center mr-4 gap-1">
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition-all duration-300">
                                <NotificationPopup />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all duration-300">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600 transition-all duration-300">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <button 
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 text-amber-700 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md" 
                                onClick={() => window.location.href = '/dashboard/todo'}
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Todo</span>
                                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center ml-1">
                                    <span className="text-xs font-bold text-white">3</span>
                                </div>
                            </button>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-3 p-1.5 pl-3 rounded-xl transition-all duration-300 hover:bg-slate-100 group">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{user?.user?.name}</span>
                                    <span className="text-xs text-slate-500">{user?.user?.Roles[0]?.name.toUpperCase()}</span>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-200/50">
                                    <span className="text-sm font-medium text-white">{user?.user?.name?.charAt(0)}</span>
                                </div>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300" onClick={()=>{logout()}}>
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
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
                                {menuItems.map((item, index) => (
                                    <Link
                                        to={item.href}
                                        key={index}
                                        className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 group relative
                                            ${activeItem === item.href
                                                ? 'bg-gradient-to-r from-green-500 to-blue-600 shadow-lg shadow-blue-200/50'
                                                : 'hover:bg-gradient-to-r from-green-50 to-blue-50'
                                            }`}
                                    >
                                        {activeItem === item.href && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-40"></div>
                                        )}
                                        <div className="relative flex items-center w-full">
                                            <item.icon
                                                className={`w-5 h-5 transition-all duration-300 
                                                    ${activeItem === item.href
                                                        ? 'text-white'
                                                        : 'text-slate-500 group-hover:text-slate-800'
                                                    }`}
                                            />
                                            {sidebarOpen && (
                                                <div className="ml-4 flex items-center justify-between flex-1">
                                                    <span className={`text-sm font-medium transition-all duration-300
                                                        ${activeItem === item.href
                                                            ? 'text-white'
                                                            : 'text-slate-600 group-hover:text-slate-900'
                                                        }`}>
                                                        {item.label}
                                                    </span>
                                                    {activeItem === item.href && (
                                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Status Section */}
                            {sidebarOpen && (
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
                                            <div className={`h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-2/3`}></div>
                                        </div>
                                        <div className="mt-3 flex justify-between items-center text-xs text-slate-600">
                                            <span>{metrics?.projectsDueThisWeek} Due This Week</span>
                                            {/* <span>{Math.ceil(((metrics?.totalProjects-metrics?.projectsDueThisWeek) * 100)/metrics?.totalActiveProjects)}% Completed</span> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`pt-12 min-h-screen transition-all duration-500 ease-out ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
                <div className="p-4 h-[calc(100vh-3rem)] max-w-[2020px] mx-auto bg-white rounded-lg shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] hover:shadow-[rgba(0,0,0,0.25)_0px_15px_30px_-15px] transform transition-all duration-300 overflow-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;