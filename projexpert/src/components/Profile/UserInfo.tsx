import { Camera, Edit2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../axiosIntance";
import toast from "react-hot-toast";

// Profile Settings Component
const ProfileSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        avatar: '/profile.png',
    });
    const handleProfileUpdate = async (e:any) => {
        e.preventDefault()
       try {
         const res=await axiosInstance.patch("/admin/client/bio",profile)
         if(res.status === 200){
            toast.success("Profile updated successfully")
         }
       } catch (error) {
        console.log(error)
       }finally{
        setIsEditing(false)
       }
    };

    useEffect(() => {
        if (!loading && user) {
            setProfile({
                name: user?.user?.name || '',
                email: user?.user?.email || '',
                bio: user?.user?.bio || 'No bio available',
                avatar: user?.user?.avatar || '/profile.png',
            });
        }
    }, [user, loading]);
    return (
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
                                <p className="text-gray-800 font-medium">{profile.name || 'No name set'}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />
                        ) : (
                            <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                <p className="text-gray-800 font-medium">{profile.email || 'No email set'}</p>
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
    );
};

export default ProfileSettings;