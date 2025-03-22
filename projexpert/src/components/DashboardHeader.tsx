import { Settings, HelpCircle, LogOut, CheckCircle2, Timer, Bot } from 'lucide-react';
import NotificationPopup from '../modals/NotificationDialog';
import { useAuth } from '../contexts/AuthContext';
import SearchMenu from './../modals/SearchMenu'; // Import the new component
import ConfirmationModal from '../modals/ConfirmationDialog';
import { useState } from 'react';
import InfoModal from '../modals/ProjectInfo';
import { useConfig } from '../contexts/ConfigurationsContext';
import TimerModal from '../modals/TimerModal';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const [logOutModal, setLogOutModal] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [timerModal, setTimerModal] = useState(false);
    const navigate = useNavigate();
    const { config } = useConfig();

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-b border-slate-200/70">
                <div className="px-3 h-full flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.href = '/dashboard/analytics'}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <span className="relative text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:bg-gradient-to-l">
                                {config.appName}
                            </span>
                        </div>
                    </div>

                    {/* Search Menu - replaced with new component */}
                    {
                        user?.user?.userType === "admin" && <SearchMenu />
                    }

                    {/* Right Navigation Items */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center mr-4 gap-1">
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition-all duration-300">
                                <NotificationPopup />
                            </button>
                            {user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" && <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all duration-300" onClick={() => window.location.href = '/dashboard/settings'}>
                                <Settings className="w-5 h-5" />
                            </button>}
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600 transition-all duration-300" onClick={() => setInfoModal(true)}>
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <button
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 hover:from-teal-200 hover:to-cyan-200 text-teal-700 border border-teal-200 transition-all duration-300 shadow-sm hover:shadow-md"
                                onClick={() => setTimerModal(true)}
                            >
                                <Timer className="w-5 h-5" />
                                <span className="text-sm font-medium">Timer</span>
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
                            <button
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-700 border border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
                                onClick={() => navigate('/dashboard/ai-chat')}
                            >
                                <Bot className="w-5 h-5" />
                                <span className="text-sm font-medium">AI</span>
                            </button>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            
                            <button
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 hover:from-emerald-200 hover:to-blue-200 text-emerald-700 border border-emerald-200 transition-all duration-300 shadow-sm hover:shadow-md"
                                onClick={() => window.location.href = '/dashboard/u/profile'}
                            >
                                <span className="text-sm font-medium">
                                    {user?.user?.name?.split(" ").slice(-1)[0]}
                                </span>

                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center ml-1 shadow-sm">
                                    <span className="text-xs font-bold text-white">
                                        {user?.user?.name?.charAt(0)}
                                    </span>
                                </div>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <button
                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                                onClick={() => setLogOutModal(true)}
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal rendered outside of nav */}
            {logOutModal && (
                <ConfirmationModal
                    action={logout}
                    actionText='Logout'
                    confirmationText='Are you sure you want to logout?'
                    isOpen={logOutModal}
                    onClose={() => setLogOutModal(false)}
                />
            )}
            {infoModal && (
                <InfoModal
                    isOpen={infoModal}
                    onClose={() => setInfoModal(false)}
                />
            )}

            {timerModal && <TimerModal isOpen={timerModal} onClose={() => setTimerModal(false)} />}
        </>
    );
};

export default DashboardHeader;