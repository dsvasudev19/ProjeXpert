import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import FloatingChatIcon from '../modals/FloatingChatIcon';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const ai=location.pathname.endsWith('ai-chat')
    console.log(ai)
    return (
        <div className="relative min-h-screen bg-slate-100/50">
            <DashboardHeader />
            <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <main className={`pt-12 min-h-screen transition-all duration-500 ease-out ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
                <div className="p-4 h-[calc(100vh-3rem)] max-w-[2020px] mx-auto bg-white rounded-lg shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] hover:shadow-[rgba(0,0,0,0.25)_0px_15px_30px_-15px] transform transition-all duration-300 overflow-hidden">
                    <Outlet />
                </div>
            </main>
            
            {/* Moved outside the main content to avoid z-index issues */}
            {
                !ai && <FloatingChatIcon />
            }
        </div>
    );
};

export default DashboardLayout;