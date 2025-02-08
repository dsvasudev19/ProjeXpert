import { useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';
import { Edit2, Trash2, X, Shield, Eye, Settings2 } from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';
import Select from 'react-select';
import ConfirmationModal from '../../modals/ConfirmationDialog';
interface Permission {
  id?: number;
  name?: string;
  description?: string;
  resource?: string | null;
  action?: string | null;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
}

interface Role {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  Permissions: Permission[];
}

const RolesAndPermissions = () => {
  const [roles, setRoles] = useState<any>([
    ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<any>({
    name: '',
    description: '',
    permissions: [],
    isActive: true,
    color: ''
  });

  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<Role | null>(null);
  const [permissions,setPermissions]=useState<any>([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleAddRole = async (role: any) => {
    if (!role.name) {
      toast.error('Please select a role type');
      return;
    }

    try {
      const res=await axiosInstance.post("/admin/role",role)
      if(res.status===201){
        setRoles([...roles, { id: roles.length + 1, ...role, color: getRandomColor(roles.length) }]);
        toast.success('Role created successfully');
        setNewRole({ name: '', description: '', permissions: [], isActive: true, color: '' });
        setEditingRole(null);
        setShowRoleModal(false);
      }
    } catch (error) {
      toast.error('Failed to save role');
    }
  };

  const handleUpdateRole = async (role: any) => {
    console.log(newRole)
    try {
      setRoles(roles.map((r: any) =>
        r.id === role.id ? { ...r, ...role } : r
      ));
      const res=await axiosInstance.put(`/admin/role/${selectedRole?.id}`,role)
      if(res.status===200){
        toast.success('Role updated successfully');
        setEditingRole(null);
        setShowRoleModal(false);
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteRole = async (id: number | undefined) => {
    try {
      const res=await axiosInstance.delete(`/admin/role/${id}`)
      if(res.status===200){
        setRoles(roles.filter((role:any) => role.id !== id));
        if (selectedRole?.id === id) setSelectedRole(null);
        toast.success('Role deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  const getAllRoles = async () => {
    try {
      const res=await axiosInstance.get("/admin/role")
      if(res.status===200){
        setRoles(res.data)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const getAllPermissions = async () => {
    try {
      const res=await axiosInstance.get("/admin/permission")
      if(res.status===200){
        setPermissions(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRoles();
    getAllPermissions();
  }, [])

  const RoleModal = () => {
    // Local state to manage form inputs
    const [localRole, setLocalRole] = useState({
      name: editingRole?.name || '',
      description: editingRole?.description || '',
      permissions: editingRole ? editingRole.Permissions.map(p => p.id) : [],
      isActive: editingRole?.isActive ?? true
    });

    // Update parent state only when saving
    const handleSave = () => {
      if (editingRole) {
        handleUpdateRole(localRole);
      } else {
        handleAddRole(localRole);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl m-4 p-8 h-[80%] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h3>
            </div>
            <button
              onClick={() => {
                setShowRoleModal(false);
                setEditingRole(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={localRole.name}
                onChange={(e) => setLocalRole(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter role name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={localRole.description}
                onChange={(e) => setLocalRole(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={1}
                placeholder="Enter role description"
              />
            </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions <span className="text-red-500">*</span>
              </label>
              <Select
                isMulti
                options={permissions.map((perm:any) => ({
                  value: perm.id,
                  label: (
                    <div className="flex items-center gap-2">
                      <Shield size={14} />
                      <span>{perm.name}</span>
                    </div>
                  ),
                  description: perm.description
                }))}
                value={permissions
                  .filter((perm:any) => localRole.permissions.includes(perm.id))
                  .map((perm:any) => ({
                    value: perm.id,
                    label: (
                      <div className="flex items-center gap-2">
                        <Shield size={14} />
                        <span>{perm.name}</span>
                      </div>
                    ),
                    description: perm.description
                  }))}
                onChange={(selectedOptions) => {
                  setLocalRole(prev => ({
                    ...prev,
                    permissions: selectedOptions.map(option => option.value)
                  }));
                }}
                className="w-full"
                classNamePrefix="select"
                placeholder="Select permissions"
                noOptionsMessage={() => "No permissions available"}
                formatOptionLabel={({ label}) => (
                  <div className="flex flex-col py-1">
                    <div>{label}</div>
                  </div>
                )}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '50px',
                    borderColor: '#e5e7eb',
                    '&:hover': {
                      borderColor: '#9ca3af'
                    }
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.375rem',
                    padding: '2px'
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    fontSize: '0.875rem',
                    padding: '2px 4px'
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    ':hover': {
                      backgroundColor: '#fee2e2',
                      color: '#dc2626'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: '8px'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
                    borderRadius: '6px',
                    margin: '2px 0',
                    ':active': {
                      backgroundColor: '#e5e7eb'
                    }
                  })
                }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localRole.isActive}
                  onChange={(e) => setLocalRole(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-5 h-5"
                />
                <span className="text-sm text-gray-700">Active Role</span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowRoleModal(false);
                setEditingRole(null);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!localRole.name || !localRole.description || localRole.permissions.length === 0}
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              {editingRole ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Remove the entire roleColors object and replace with a simple array
  const bgColors = [
    'bg-blue-100 border-blue-200 text-blue-800',
    'bg-green-100 border-green-200 text-green-800',
    'bg-purple-100 border-purple-200 text-purple-800',
    'bg-pink-100 border-pink-200 text-pink-800',
    'bg-yellow-100 border-yellow-200 text-yellow-800',
  ];

  const getRandomColor = (index: number) => {
    return bgColors[index % bgColors.length];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Roles & Permissions</h3>
          <p className="text-gray-500 mt-1">Manage user roles and their permissions</p>
        </div>
        <button
          onClick={() => setShowRoleModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Shield size={18} />
          Create New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles?.map((role: any, index: number) => {
          const colorClasses = getRandomColor(index);
          return (
            <div
              key={role.id}
              className={`rounded-xl border transition-all hover:shadow-lg h-[200px] ${colorClasses}`}
            >
              <div className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white bg-opacity-50">
                      <Settings2 className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{role.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {role.description || `${role.name} role permissions`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingRole(role);
                        setShowRoleModal(true);
                        setSelectedRole(role);
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmationModal(true);
                        setSelectedRole(role);
                      }}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {role?.Permissions?.slice(0, 2).map((permission:any) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-white bg-opacity-50 text-xs font-medium truncate max-w-[150px]"
                      >
                        <Shield size={12} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{permission.name}</span>
                      </span>
                    ))}
                    {role?.Permissions?.length > 2 && (
                      <button
                        onClick={() => {
                          setSelectedRolePermissions(role);
                          setShowPermissionsModal(true);
                        }}
                        className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-white bg-opacity-50 text-xs font-medium hover:bg-opacity-75 transition-colors"
                      >
                        <Eye size={12} className="mr-1" />
                        +{role.Permissions.length - 2} more
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRolePermissions(role);
                    setShowPermissionsModal(true);
                  }}
                  className={`w-full py-2 mt-auto rounded-lg ${colorClasses} transition-colors flex items-center justify-center gap-2 text-sm font-medium`}
                >
                  <Eye size={16} />
                  View All Permissions
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPermissionsModal && selectedRolePermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl m-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <Settings2 className="text-gray-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRolePermissions.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedRolePermissions.description || `${selectedRolePermissions.name} role permissions`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {selectedRolePermissions.Permissions.map(permission => (
                  <div
                    key={permission.id}
                    className="inline-flex items-center px-3 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
                    title={permission.description}
                  >
                    <Shield size={14} className="mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium">{permission.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showRoleModal && <RoleModal />}

      {showConfirmationModal && <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Delete Role"
        confirmationText="Are you sure you want to delete this role?"
        action={() => handleDeleteRole(selectedRole?.id)}
        actionText="Delete"
        onClose={() => setShowConfirmationModal(false)}
      />}
    </div>
  );
};

export default RolesAndPermissions;