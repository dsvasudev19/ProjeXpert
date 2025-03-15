import React, { useEffect, useState } from 'react';
import { 
  BugIcon, 
  UserIcon, 
  CalendarIcon, 
  AlertCircleIcon, 
  Send, 
  X, 
  FolderOpen, 
  ListTodo, 
  Tag 
} from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';
import toast from 'react-hot-toast';

const ReportBugPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    assignedTo: '',
    dueDate: '',
    tags: '',
    project: '',
    status: 'open',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);

  const getAllEmployees = async () => {
    try {
      const res = await axiosInstance.get("/admin/client/team/internal-only");
      if (res.status === 200) {
        setEmployees(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProjects = async () => {
    try {
      const res = await axiosInstance.get("/admin/project");
      if (res.status === 200) {
        setProjects(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
    getAllProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.project) newErrors.project = 'Project is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const res=await axiosInstance.post("/admin/bug",formData)
      if(res.status===201){
        toast.success("Bug reported Successfully")
        window.location.href="/dashboard/project/bugs/list"
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false);
      setFormData({
        title: '',
        description: '',
        severity: 'low',
        assignedTo: '',
        dueDate: '',
        tags: '',
        project: '',
        status: 'open',
      });
    }
   
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 p-2">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-8">
            <BugIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Report a New Bug
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Title and Project - Side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bug Title</label>
                  <div className="relative">
                    <BugIcon className="w-4 h-4 text-red-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        errors.title ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter a concise bug title"
                    />
                  </div>
                  {errors.title && (
                    <div className="flex items-center mt-1 text-red-600 text-xs">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.title}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <div className="relative">
                    <FolderOpen className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        errors.project ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a project</option>
                      {projects.map((project: any) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.project && (
                    <div className="flex items-center mt-1 text-red-600 text-xs">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.project}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="relative">
                  <AlertCircleIcon className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      errors.description ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Describe the bug in detail"
                  />
                </div>
                {errors.description && (
                  <div className="flex items-center mt-1 text-red-600 text-xs">
                    <AlertCircleIcon className="w-4 h-4 mr-1" />
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Severity and Assigned To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <div className="relative">
                    <AlertCircleIcon className="w-4 h-4 text-orange-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        errors.assignedTo ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select an assignee</option>
                      {employees.map((member:any) => (
                        <option key={member?.id} value={member?.id}>
                          {member?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.assignedTo && (
                    <div className="flex items-center mt-1 text-red-600 text-xs">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.assignedTo}
                    </div>
                  )}
                </div>
              </div>

              {/* Due Date and Tags */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        errors.dueDate ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.dueDate && (
                    <div className="flex items-center mt-1 text-red-600 text-xs">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.dueDate}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="relative">
                    <Tag className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="e.g., frontend, ui, crash"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                  <ListTodo className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="reopened">Reopened</option>
                  </select>
                </div>
              </div>
              </div>

              {/* Status - Last row */}
              
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center transition-colors"
                onClick={() => setFormData({
                  title: '',
                  description: '',
                  severity: 'low',
                  assignedTo: '',
                  dueDate: '',
                  tags: '',
                  project: '',
                  status: 'open',
                })}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-sm text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 flex items-center transition-all ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Report Bug'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportBugPage;