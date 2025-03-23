import { useState } from 'react';
import { UserIcon, Lock, ShieldCheckIcon, FolderIcon, } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileSettings from '../components/Profile/UserInfo';
import ChangePassword from '../components/Profile/CredentialSettings';
import ResourceRequests from '../components/Profile/ResourceRequests';
import PermissionRequests from '../components/Profile/PermissionRequests';
import RaiseTicket from './RaiseTicket';

export default function UserProfilePage() {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  




  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'password', name: 'Change Password', icon: <Lock className="w-5 h-5" /> },
    { id: 'resources', name: 'Resource Requests', icon: <FolderIcon className="w-5 h-5" /> },
    { id: 'permissions', name: 'Permission Requests', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'tickets', name: 'Raise a Ticket', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];


  return (
    <div className="h-full bg-gradient-to-br p-6">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl h-full">
          <div className="flex flex-col md:flex-row h-full">
            {/* Navigation Sidebar - Fixed */}
            <div className="w-full md:w-64 border-r bg-gray-50 rounded-l-2xl p-4 flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
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

            {/* Main Content Area - Scrollable Content */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 p-8 overflow-y-auto">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <ProfileSettings />
                )}

                {/* Change Password */}
                {activeTab === 'password' && (
                 <ChangePassword />
                )}

                {/* Resource Requests */}
                {activeTab === 'resources' && (
                 <ResourceRequests />
                )}

                {/* Permission Requests */}
                {activeTab === 'permissions' && (
                  <PermissionRequests />
                )}

                {
                  activeTab === "tickets" && (
                    <RaiseTicket />
                  )
                }

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}