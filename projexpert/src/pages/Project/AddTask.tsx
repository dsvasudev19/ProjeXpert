import React, { useEffect, useState } from 'react';
import { 
  CheckCircleIcon, 
  UserIcon, 
  CalendarIcon, 
  AlertCircleIcon, 
  Send, 
  X, 
  Bug, 
  FileText, 
  Tag, 
  BarChart, 
  ListTodo, 
  FolderOpen, 
  GitBranch,
  AlertTriangle
} from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';
import toast from 'react-hot-toast';

const AddTaskPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    progress: 0,
    tags: '',
    project: '',
    parentTask: '',
    bugId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [projects,setProjects]=useState<any>([])
  const [employees,setEmployees]=useState<any>([])
  const [tasks, setTasks] = useState<any>([]);
  const [bugs, setBugs] = useState<any>([]);

  const getAllEmployees=async()=>{
    try {
      const res=await axiosInstance.get("/admin/client/team/internal-only")
      if(res.status===200){
        setEmployees(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const getAllProjects=async()=>{
    try {
      const res=await axiosInstance.get("/admin/project")
      if(res.status===200){
        setProjects(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllTasks = async () => {
    try {
      const res = await axiosInstance.get("/admin/task");
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBugs = async (projectId: string) => {
    if (!projectId) {
      setBugs([]);
      return;
    }
    
    try {
      const res = await axiosInstance.get(`/admin/bug/project/${projectId}`);
      if (res.status === 200) {
        setBugs(res.data);
      }
    } catch (error) {
      console.log(error);
      setBugs([]);
    }
  };

  useEffect(()=>{
    getAllProjects()
    getAllEmployees()
    getAllTasks()
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
    
    // When project changes, fetch related bugs
    if (name === 'project' && value) {
      getAllBugs(value);
      // Reset bug selection when project changes
      setFormData(prev => ({
        ...prev,
        bugId: ''
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.assignee) newErrors.assignee = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.progress < 0 || formData.progress > 100) newErrors.progress = 'Progress must be between 0 and 100';
    if (!formData.project) newErrors.project = 'Project is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    try {
      setIsSubmitting(true);
      const res=await axiosInstance.post("/admin/task",formData)
      if(res.status===201){
        toast.success("WorkItem Created Successfully")
        window.location.href="/dashboard/project/tasks/list"
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false);
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        progress: 0,
        tags: '',
        project: '',
        parentTask: '',
        bugId: '',
      });
    }
   
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-blue-50 to-green-50 p-1">
      <div className="w-full bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center mb-6">
          <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Add New Task
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-12 gap-4">
            {/* First Row: Title and Parent Task */}
            <div className="col-span-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.title ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter a concise task title"
                />
              </div>
              {errors.title && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.title}
                </div>
              )}
            </div>

            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Task (Optional)</label>
              <div className="relative">
                <GitBranch className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="parentTask"
                  value={formData.parentTask}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">No Parent Task</option>
                  {tasks.map((task: any) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>
              {/* <p className="text-xs text-gray-500 mt-1">Select if this is a subtask</p> */}
            </div>

            {/* Second Row: Description - Full width */}
            <div className="col-span-12">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.description ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Describe the task in detail"
                />
              </div>
              {errors.description && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.description}
                </div>
              )}
            </div>

            {/* Third Row: Project, Related Bugs, Assignee - 4 columns each */}
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <div className="relative">
                <FolderOpen className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.project ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select a project</option>
                  {projects.map((project:any) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                {errors.project && (
                  <div className="flex items-center mt-1 text-red-600 text-xs">
                    <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.project}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Bug (Optional)</label>
              <div className="relative">
                <Bug className="w-4 h-4 text-red-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="bugId"
                  value={formData.bugId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={!formData.project}
                >
                  <option value="">No Related Bug</option>
                  {bugs.map((bug: any) => (
                    <option key={bug.id} value={bug.id}>
                      {bug.title || `Bug #${bug.id}`}
                    </option>
                  ))}
                </select>
                {/* <p className="text-xs text-gray-500 mt-1">
                  {!formData.project 
                    ? "Select a project first" 
                    : "Select if this task resolves a bug"}
                </p> */}
              </div>
            </div>

            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.assignee ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select an assignee</option>
                  {employees.map((member:any) => (
                    <option key={member?.id} value={member?.id}>{member?.name}</option>
                  ))}
                </select>
                {errors.assignee && (
                  <div className="flex items-center mt-1 text-red-600 text-xs">
                    <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.assignee}
                  </div>
                )}
              </div>
            </div>

            {/* Status, Priority, Due Date - 4 columns each */}
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <ListTodo className="w-4 h-4 text-indigo-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <div className="relative">
                <AlertTriangle className="w-4 h-4 text-orange-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.dueDate ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.dueDate && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.dueDate}
                </div>
              )}
            </div>

            {/* Progress and Tags - 6 columns each */}
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
              <div className="relative">
                <BarChart className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.progress ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="0-100"
                />
              </div>
              {errors.progress && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.progress}
                </div>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="relative">
                <Tag className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g., documentation, api"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-sm text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 flex items-center transition-all ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <Send className="w-4 h-4 mr-2" /> {isSubmitting ? 'Submitting...' : 'Add Task'}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center transition-colors"
              onClick={() => setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                assignee: '',
                dueDate: '',
                progress: 0,
                tags: '',
                project: '',
                parentTask: '',
                bugId: '',
              })}
            >
              <X className="w-4 h-4 mr-1" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;