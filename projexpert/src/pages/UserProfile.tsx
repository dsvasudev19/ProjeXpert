import { useState } from 'react';
import { UserIcon, Lock, ShieldCheckIcon, FolderIcon, X, Edit2, Camera, Save } from 'lucide-react';

type RequestStatus = 'Pending' | 'Approved' | 'Denied';

interface Request {
  id: number;
  title: string;
  status: RequestStatus;
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Senior Project Manager at Acme Corp.',
    avatar: '/profile.png',
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resourceRequests, setResourceRequests] = useState<Request[]>([
    { id: 1, title: 'Additional Storage', status: 'Pending' },
    { id: 2, title: 'New Software License', status: 'Approved' },
  ]);
  const [permissionRequests, setPermissionRequests] = useState<Request[]>([
    { id: 1, title: 'Admin Access', status: 'Denied' },
    { id: 2, title: 'Edit Permissions', status: 'Pending' },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'password', name: 'Change Password', icon: <Lock className="w-5 h-5" /> },
    { id: 'resources', name: 'Resource Requests', icon: <FolderIcon className="w-5 h-5" /> },
    { id: 'permissions', name: 'Permission Requests', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const statusStyles: Record<RequestStatus, { bg: string; text: string; border: string; label: string }> = {
    Pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      label: '⏳ Pending'
    },
    Approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      label: '✓ Approved'
    },
    Denied: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      label: '✕ Denied'
    }
  };

  const handleProfileUpdate = (e:any) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e:any) => {
    e.preventDefault();
    alert('Password changed successfully!');
  };

  const handleResourceRequest = (e:any) => {
    e.preventDefault();
    alert('Resource request submitted!');
  };

  const handlePermissionRequest = (e:any) => {
    e.preventDefault();
    alert('Permission request submitted!');
  };

  const handleCancelRequest = (id: number) => {
    setResourceRequests(prev => prev.filter(request => request.id !== id));
  };

  const handleCancelPermissionRequest = (id: number) => {
    setPermissionRequests(prev => prev.filter(request => request.id !== id));
  };

  return (
    <div className="h-full bg-gradient-to-br p-6">
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
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
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
                        ${isEditing 
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4" />
                          Cancel Editing
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="relative group">
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                      />
                      {isEditing && (
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 p-2 rounded-full bg-green-500 text-white 
                            shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {isEditing && (
                      <div>
                        <button
                          type="button"
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          Change Avatar
                        </button>
                        <p className="text-sm text-gray-500 mt-2">Recommended size: 150x150px</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">
                            <p className="text-gray-800 font-medium">{profile.name}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">
                            <p className="text-gray-800 font-medium">{profile.email}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        {isEditing ? (
                          <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            rows={4}
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-800 whitespace-pre-wrap">{profile.bio}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Change Password */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={password.currentPassword}
                          onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          value={password.newPassword}
                          onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={password.confirmPassword}
                          onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Resource Requests */}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Resource Requests</h3>
                  <form onSubmit={handleResourceRequest} className="space-y-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Request Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Additional Storage"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        rows={4}
                        placeholder="Explain why you need this resource..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Submit Request
                    </button>
                  </form>
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Previous Requests</h4>
                    <div className="space-y-4">
                      {resourceRequests.map((request) => (
                        <div 
                          key={request.id} 
                          className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-800">{request.title}</p>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                                  ${statusStyles[request.status].bg} 
                                  ${statusStyles[request.status].text}`}
                                >
                                  {statusStyles[request.status].label}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Requested on {new Date().toLocaleDateString()}</p>
                            </div>
                            {request.status === 'Pending' && (
                              <button 
                                onClick={() => handleCancelRequest(request.id)}
                                className="px-3 py-1 rounded-md border border-red-200 text-red-600 
                                hover:bg-red-50 hover:text-red-700 text-sm transition-colors duration-200"
                              >
                                Cancel Request
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Permission Requests */}
              {activeTab === 'permissions' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Permission Requests</h3>
                  <form onSubmit={handlePermissionRequest} className="space-y-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Request Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Admin Access"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        rows={4}
                        placeholder="Explain why you need this permission..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Submit Request
                    </button>
                  </form>
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Previous Requests</h4>
                    <div className="space-y-4">
                      {permissionRequests.map((request) => (
                        <div 
                          key={request.id} 
                          className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-800">{request.title}</p>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                                  ${statusStyles[request.status].bg} 
                                  ${statusStyles[request.status].text}`}
                                >
                                  {statusStyles[request.status].label}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Requested on {new Date().toLocaleDateString()}</p>
                            </div>
                            {request.status === 'Pending' && (
                              <button 
                                onClick={() => handleCancelPermissionRequest(request.id)}
                                className="px-3 py-1 rounded-md border border-red-200 text-red-600 
                                hover:bg-red-50 hover:text-red-700 text-sm transition-colors duration-200"
                              >
                                Cancel Request
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}