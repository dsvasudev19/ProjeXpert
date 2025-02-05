import { Settings, HelpCircle, Search, LogOut, CheckCircle2 } from 'lucide-react';
import NotificationPopup from '../modals/NotificationDialog';
import { useAuth } from '../contexts/AuthContext';

import ConfirmationModal from '../modals/ConfirmationDialog';
import { useState } from 'react';
import InfoModal from '../modals/ProjectInfo';

const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const [logOutModal, setLogOutModal] = useState(false);
    const [infoModal, setInfoModal] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-b border-slate-200/70">
                <div className="px-3 h-full flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-4 cur">
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
                            {user?.user?.Roles[0]?.name.toUpperCase() === "ADMIN" && <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-all duration-300" onClick={() => window.location.href = '/dashboard/settings'}>
                                <Settings className="w-5 h-5" />
                            </button>}
                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-purple-600 transition-all duration-300" onClick={() => setInfoModal(true)}>
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
                            <button className="flex items-center gap-3 p-1.5 pl-3 rounded-xl transition-all duration-300 hover:bg-slate-100 group" onClick={() => window.location.href = '/dashboard/u/profile'}>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{user?.user?.name}</span>
                                    <span className="text-xs text-slate-500">{user?.user?.Roles[0]?.name.toUpperCase()}</span>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-200/50">
                                    <span className="text-sm font-medium text-white">{user?.user?.name?.charAt(0)}</span>
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
        </>
    );
};

export default DashboardHeader;
