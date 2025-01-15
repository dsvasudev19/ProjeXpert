import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ArrowLeft } from 'lucide-react';
import Select from 'react-select';

interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    isActive: boolean;
    color: string;
}

interface Permission {
    name: string;
    description: string;
    category?: string;
}

const RolesAndPermissions: React.FC = () => {
    const roleColors = {
        admin: 'bg-purple-100 border-purple-200',
        ProjectManager: 'bg-blue-100 border-blue-200',
        TeamLead: 'bg-green-100 border-green-200',
        client: 'bg-yellow-100 border-yellow-200',
        freelancer: 'bg-orange-100 border-orange-200',
        TeamMember: 'bg-pink-100 border-pink-200'
    };

    const [roles, setRoles] = useState<Role[]>([
        { id: 1, name: 'admin', description: 'Full system access', permissions: ['create_users', 'delete_users'], isActive: true, color: roleColors.admin },
        { id: 2, name: 'ProjectManager', description: 'Project management access', permissions: ['create_projects', 'update_projects'], isActive: true, color: roleColors.ProjectManager },
        { id: 3, name: 'TeamLead', description: 'Team management access', permissions: ['create_teams', 'update_teams','create_users','create_projects','assign_project_teams'], isActive: true, color: roleColors.TeamLead },
    ]);

    const permissions: Permission[] = [
        // User Management
        { name: 'create_users', description: 'Create new users', category: 'User Management' },
        { name: 'update_users', description: 'Update user information', category: 'User Management' },
        { name: 'delete_users', description: 'Delete users from the system', category: 'User Management' },
        { name: 'view_users', description: 'View user profiles and details', category: 'User Management' },
        
        // Project Management
        { name: 'create_projects', description: 'Create new projects', category: 'Project Management' },
        { name: 'update_projects', description: 'Update project details', category: 'Project Management' },
        { name: 'delete_projects', description: 'Delete projects', category: 'Project Management' },
        { name: 'view_projects', description: 'View project details', category: 'Project Management' },
        { name: 'assign_project_teams', description: 'Assign teams to projects', category: 'Project Management' },
        
        // Team Management
        { name: 'create_teams', description: 'Create new teams', category: 'Team Management' },
        { name: 'update_teams', description: 'Update team details', category: 'Team Management' },
        { name: 'delete_teams', description: 'Delete teams', category: 'Team Management' },
        { name: 'view_teams', description: 'View team details', category: 'Team Management' },
        { name: 'add_team_members', description: 'Add members to teams', category: 'Team Management' },
        { name: 'remove_team_members', description: 'Remove members from teams', category: 'Team Management' },
        
        // Task Management
        { name: 'create_tasks', description: 'Create new tasks', category: 'Task Management' },
        { name: 'update_tasks', description: 'Update task details', category: 'Task Management' },
        { name: 'delete_tasks', description: 'Delete tasks', category: 'Task Management' },
        { name: 'view_tasks', description: 'View task details', category: 'Task Management' },
        { name: 'assign_tasks', description: 'Assign tasks to users', category: 'Task Management' },
        { name: 'update_task_status', description: 'Update task status', category: 'Task Management' },
        
        // Bug Management
        { name: 'create_bugs', description: 'Create new bugs', category: 'Bug Management' },
        { name: 'update_bugs', description: 'Update bug details', category: 'Bug Management' },
        { name: 'delete_bugs', description: 'Delete bugs', category: 'Bug Management' },
        { name: 'view_bugs', description: 'View bug details', category: 'Bug Management' },
        { name: 'approve_fixes', description: 'Approve bug fixes', category: 'Bug Management' },
        
        // File Management
        { name: 'upload_files', description: 'Upload new files', category: 'File Management' },
        { name: 'update_files', description: 'Update file details', category: 'File Management' },
        { name: 'delete_files', description: 'Delete files', category: 'File Management' },
        { name: 'view_files', description: 'View and download files', category: 'File Management' },
        
        // Payment Management
        { name: 'create_payments', description: 'Create payment transactions', category: 'Payment Management' },
        { name: 'update_payments', description: 'Update payment details', category: 'Payment Management' },
        { name: 'delete_payments', description: 'Delete payments', category: 'Payment Management' },
        { name: 'view_payments', description: 'View payment details', category: 'Payment Management' }
    ];

    const availableRoles = [
        { name: 'admin' },
        { name: 'ProjectManager' },
        { name: 'TeamLead' },
        { name: 'client' },
        { name: 'freelancer' },
        { name: 'TeamMember' }
    ];

    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
    const [showPermissionModal, setShowPermissionModal] = useState<boolean>(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({ 
        name: '', 
        description: '', 
        permissions: [], 
        isActive: true,
        color: ''
    });

    const handleAddRole = () => {
        if (!newRole.name) return;
        
        if (editingRole) {
            setRoles(roles.map(role => 
                role.id === editingRole.id ? { ...role, ...newRole } : role
            ));
        } else {
            const roleColor = roleColors[newRole.name as keyof typeof roleColors] || 'bg-gray-100 border-gray-200';
            setRoles([...roles, { id: roles.length + 1, ...newRole, color: roleColor }]);
        }
        setNewRole({ name: '', description: '', permissions: [], isActive: true, color: '' });
        setEditingRole(null);
        setShowRoleModal(false);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        setNewRole({ ...role });
        setShowRoleModal(true);
    };

    const handleDeleteRole = (id: number) => {
        setRoles(roles.filter(role => role.id !== id));
        if (selectedRole?.id === id) setSelectedRole(null);
    };

    const getPermissionsByCategory = () => {
        const grouped = permissions.reduce((acc: {[key: string]: Permission[]}, curr) => {
            const category = curr.category || 'Other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(curr);
            return acc;
        }, {});

        return Object.entries(grouped).map(([category, perms]) => ({
            label: category,
            options: perms.map(p => ({
                value: p.name,
                label: p.name,
                description: p.description
            }))
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8" style={{minHeight: '100vh'}}>
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {selectedRole && (
                            <button 
                                onClick={() => setSelectedRole(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft size={24} />
                            </button>
                        )}
                        <h1 className="text-3xl font-bold text-gray-800">
                            {selectedRole ? selectedRole.name : 'Roles & Permissions'}
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setShowPermissionModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                        >
                            <Plus size={20} />
                            Add Permission
                        </button>
                        <button 
                            onClick={() => setShowRoleModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                            <Plus size={20} />
                            Add Role
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {!selectedRole ? (
                    // Roles Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roles.map(role => (
                            <div 
                                key={role.id} 
                                className={`rounded-xl shadow-sm border ${role.color} hover:shadow-md transition-all`}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{role.name}</h3>
                                            <p className="text-sm text-gray-600">{role.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleEditRole(role)}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteRole(role.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-600">
                                            {role.permissions.length} Permission{role.permissions.length !== 1 ? 's' : ''}
                                        </div>
                                        <button 
                                            onClick={() => setSelectedRole(role)}
                                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Role Details with Permissions
                    <div className={`rounded-xl shadow-lg border ${selectedRole.color} p-6`}>
                        <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedRole.name}</h2>
                            <p className="text-sm text-gray-600 mb-3">{selectedRole.description}</p>
                            <div className="inline-flex items-center gap-2 text-xs">
                                <span className="text-gray-500">Total Permissions:</span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{selectedRole.permissions.length}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(permissions.reduce((acc: {[key: string]: Permission[]}, curr) => {
                                if (selectedRole.permissions.includes(curr.name)) {
                                    const category = curr.category || 'Other';
                                    if (!acc[category]) {
                                        acc[category] = [];
                                    }
                                    acc[category].push(curr);
                                }
                                return acc;
                            }, {})).map(([category, perms]) => {
                                const categoryStyles: {[key: string]: {bg: string, text: string}} = {
                                    'User Management': {bg: 'bg-purple-100', text: 'text-purple-700'},
                                    'Project Management': {bg: 'bg-blue-100', text: 'text-blue-700'},
                                    'Team Management': {bg: 'bg-green-100', text: 'text-green-700'},
                                    'Task Management': {bg: 'bg-amber-100', text: 'text-amber-700'},
                                    'Bug Management': {bg: 'bg-red-100', text: 'text-red-700'},
                                    'File Management': {bg: 'bg-indigo-100', text: 'text-indigo-700'},
                                    'Payment Management': {bg: 'bg-pink-100', text: 'text-pink-700'}
                                };
                                
                                const style = categoryStyles[category] || {bg: 'bg-gray-100', text: 'text-gray-700'};
                                
                                return (
                                    <div key={category}>
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">{category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {perms.map((permission) => (
                                                <span
                                                    key={permission.name}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} cursor-default hover:shadow-sm transition-shadow duration-200`}
                                                    title={permission.description}
                                                >
                                                    {permission.name.split('_').join(' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Role Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {editingRole ? 'Edit Role' : 'Create New Role'}
                            </h3>
                            <button 
                                onClick={() => {
                                    setShowRoleModal(false);
                                    setEditingRole(null);
                                    setNewRole({ name: '', description: '', permissions: [], isActive: true, color: '' });
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role Type</label>
                                <select
                                    value={newRole.name}
                                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select a role</option>
                                    {availableRoles.map((role) => (
                                        <option key={role.name} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={newRole.description}
                                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter role description"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                                <Select
                                    isMulti
                                    options={getPermissionsByCategory()}
                                    value={newRole.permissions.map(p => ({
                                        value: p,
                                        label: p
                                    }))}
                                    onChange={(selected) => {
                                        setNewRole({
                                            ...newRole,
                                            permissions: selected ? selected.map(option => option.value) : []
                                        });
                                    }}
                                    className="w-full"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowRoleModal(false);
                                    setEditingRole(null);
                                    setNewRole({ name: '', description: '', permissions: [], isActive: true, color: '' });
                                }}
                                className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddRole}
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                {editingRole ? 'Save Changes' : 'Create Role'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPermissionModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Add New Permission
                            </h3>
                            <button 
                                onClick={() => setShowPermissionModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Permission Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter permission name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter permission description"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select a category</option>
                                    <option value="User Management">User Management</option>
                                    <option value="Project Management">Project Management</option>
                                    <option value="Team Management">Team Management</option>
                                    <option value="Task Management">Task Management</option>
                                    <option value="Bug Management">Bug Management</option>
                                    <option value="File Management">File Management</option>
                                    <option value="Payment Management">Payment Management</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowPermissionModal(false)}
                                className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            >
                                Add Permission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesAndPermissions;