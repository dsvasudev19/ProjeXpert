import { useState } from 'react';
import { axiosInstance } from '../../axiosIntance';
import toast from 'react-hot-toast';


const ChangePassword = () => {
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      

    const handlePasswordChange = async (e: any) => {
        e.preventDefault();
        try {
            console.log(password)
            const res=await axiosInstance.patch("/admin/client/password",password)
            if(res.status === 200){
                toast.success("Password changed successfully!")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setPassword({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        }
      };
  
    return (
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
    );
  };

  export default ChangePassword;