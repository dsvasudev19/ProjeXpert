import { useState } from 'react';
import {
  CogIcon, PaletteIcon, BellIcon, UsersIcon, ShieldIcon, Mail, KeyIcon,
  Github, ActivityIcon, ShieldCheckIcon, DatabaseIcon
} from 'lucide-react';
import GeneralSettings from '../components/DashboardSettings/GeneralSettings';
import ThemeCustomization from '../components/DashboardSettings/ThemeCustomization';
import Notifications from '../components/DashboardSettings/Notifications';
import TeamManagement from '../components/DashboardSettings/TeamManagement';
import EmailSettings from '../components/DashboardSettings/EmailSettings';
import DataExport from '../components/DashboardSettings/DataExport';
import RolesAndPermissions from '../components/DashboardSettings/RolesAndPermissions';
import Security from '../components/DashboardSettings/Security';
import AuditLogs from '../components/DashboardSettings/AuditLogs';
import DatabaseSettings from '../components/DashboardSettings/DatabaseSettings';
import UnderMaintenance from '../components/UnderMaintenance';



export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('settingsDashboardTab') || 'general';
  });

  const tabs = [
    { id: 'general', name: 'General Settings', icon: <CogIcon className="w-5 h-5" /> },
    { id: 'theme', name: 'Theme Customization', icon: <PaletteIcon className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'members', name: 'Team Management', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'email', name: 'Email Settings', icon: <Mail className="w-5 h-5" /> },
    { id: 'advanced', name: 'Advanced', icon: <ShieldIcon className="w-5 h-5" /> },
    { id: 'roles', name: 'Roles & Permissions', icon: <KeyIcon className="w-5 h-5" /> },
    { id: 'security', name: 'Security', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'integrations', name: 'Integrations', icon: <Github className="w-5 h-5" /> },
    { id: 'audit', name: 'Audit Logs', icon: <ActivityIcon className="w-5 h-5" /> },
    { id: 'database', name: 'Database Settings', icon: <DatabaseIcon className="w-5 h-5" /> },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    sessionStorage.setItem('settingsDashboardTab', tabId);
  };

  return (
    // Main container - allow full height scrolling
    <div className="min-h-screen bg-gradient-to-br p-2 overflow-auto">
      {/* Card container - maintain max width and allow content to scroll */}
      <div className="mx-auto bg-white rounded-2xl shadow-xl">
        {/* Flex container for sidebar and content */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)]">
          {/* Sidebar - fixed height with overflow */}
          <div className="w-full md:w-64 bg-gray-50 rounded-l-2xl overflow-y-auto">
            <div className="p-4 sticky top-0 bg-gray-50 z-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Settings</h2>
            </div>
            <nav className="space-y-2 p-4 pt-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-all ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main content area - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {/* General Settings */}
              {activeTab === 'general' && (
                <GeneralSettings />
              )}

              {/* Theme Customization */}
              {activeTab === 'theme' && (
                <ThemeCustomization />
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <Notifications />
              )}

              {/* Team Management */}
              {activeTab === 'members' && (
                <TeamManagement />
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <EmailSettings />
              )}

              {/* Advanced Settings */}
              {activeTab === 'advanced' && (
                <DataExport />
              )}

              {/* New Roles & Permissions Tab */}
              {activeTab === 'roles' && (
                <RolesAndPermissions />
              )}

              {/* Security Settings Tab */}
              {activeTab === 'security' && (
                <Security />
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                // <Integrations />
                 <UnderMaintenance />
                
              )}

              {/* Audit Logs Tab */}
              {activeTab === 'audit' && (
                <AuditLogs />
              )}

              {/* New Database Settings Tab */}
              {activeTab === 'database' && (
                <DatabaseSettings />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}