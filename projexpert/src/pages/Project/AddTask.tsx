// import React, { useState } from 'react';
// import { CheckCircleIcon, UserIcon, CalendarIcon, AlertCircleIcon, Send, X } from 'lucide-react';

// const AddTaskPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'pending',
//     priority: 'medium',
//     assignee: '',
//     dueDate: '',
//     progress: 0,
//     tags: '',
//     project: '',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Sample list of team members (replace with your actual data)
//   const teamMembers = [
//     'John Doe',
//     'Jane Smith',
//     'Mike Johnson',
//     'Sarah Williams',
//     'Alex Brown',
//   ];

//   // Sample list of projects (replace with your actual data)
//   const projects = [
//     'Project Alpha',
//     'Project Beta',
//     'Project Gamma',
//     'Project Delta',
//   ];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'progress' ? parseInt(value) : value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors: Record<string, string> = {};

//     if (!formData.title.trim()) newErrors.title = 'Title is required';
//     if (!formData.description.trim()) newErrors.description = 'Description is required';
//     if (!formData.assignee) newErrors.assignee = 'Assignee is required';
//     if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
//     if (formData.progress < 0 || formData.progress > 100) {
//       newErrors.progress = 'Progress must be between 0 and 100';
//     }
//     if (!formData.project) newErrors.project = 'Project is required';

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setTimeout(() => {
//       console.log('Task added:', {
//         ...formData,
//         tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//       });
//       setIsSubmitting(false);
//       setFormData({
//         title: '',
//         description: '',
//         status: 'pending',
//         priority: 'medium',
//         assignee: '',
//         dueDate: '',
//         progress: 0,
//         tags: '',
//         project: '',
//       });
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2 overflow-auto">
//       <div className="w-full mx-auto mb-32">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center mb-8">
//             <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
//             <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
//               Add New Task
//             </h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                     errors.title ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   placeholder="Enter a concise task title"
//                 />
//                 {errors.title && (
//                   <div className="flex items-center mt-1 text-red-600 text-xs">
//                     <AlertCircleIcon className="w-4 h-4 mr-1" />
//                     {errors.title}
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={4}
//                   className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                     errors.description ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   placeholder="Describe the task in detail"
//                 />
//                 {errors.description && (
//                   <div className="flex items-center mt-1 text-red-600 text-xs">
//                     <AlertCircleIcon className="w-4 h-4 mr-1" />
//                     {errors.description}
//                   </div>
//                 )}
//               </div>

//               {/* Project */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
//                 <select
//                   name="project"
//                   value={formData.project}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                     errors.project ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                 >
//                   <option value="">Select a project</option>
//                   {projects.map((project) => (
//                     <option key={project} value={project}>
//                       {project}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.project && (
//                   <div className="flex items-center mt-1 text-red-600 text-xs">
//                     <AlertCircleIcon className="w-4 h-4 mr-1" />
//                     {errors.project}
//                   </div>
//                 )}
//               </div>

//               {/* Status and Priority */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                   <select
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                     <option value="critical">Critical</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Assignee and Due Date */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
//                   <div className="relative">
//                     <UserIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                     <select
//                       name="assignee"
//                       value={formData.assignee}
//                       onChange={handleChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                         errors.assignee ? 'border-red-300' : 'border-gray-200'
//                       }`}
//                     >
//                       <option value="">Select an assignee</option>
//                       {teamMembers.map((member) => (
//                         <option key={member} value={member}>
//                           {member}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {errors.assignee && (
//                     <div className="flex items-center mt-1 text-red-600 text-xs">
//                       <AlertCircleIcon className="w-4 h-4 mr-1" />
//                       {errors.assignee}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                   <div className="relative">
//                     <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                     <input
//                       type="date"
//                       name="dueDate"
//                       value={formData.dueDate}
//                       onChange={handleChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                         errors.dueDate ? 'border-red-300' : 'border-gray-200'
//                       }`}
//                     />
//                   </div>
//                   {errors.dueDate && (
//                     <div className="flex items-center mt-1 text-red-600 text-xs">
//                       <AlertCircleIcon className="w-4 h-4 mr-1" />
//                       {errors.dueDate}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Progress and Tags */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
//                   <input
//                     type="number"
//                     name="progress"
//                     value={formData.progress}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                     className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                       errors.progress ? 'border-red-300' : 'border-gray-200'
//                     }`}
//                     placeholder="0-100"
//                   />
//                   {errors.progress && (
//                     <div className="flex items-center mt-1 text-red-600 text-xs">
//                       <AlertCircleIcon className="w-4 h-4 mr-1" />
//                       {errors.progress}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//                   <input
//                     type="text"
//                     name="tags"
//                     value={formData.tags}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//                     placeholder="e.g., documentation, api"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
//               <button
//                 type="button"
//                 className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center transition-colors"
//                 onClick={() => setFormData({
//                   title: '',
//                   description: '',
//                   status: 'pending',
//                   priority: 'medium',
//                   assignee: '',
//                   dueDate: '',
//                   progress: 0,
//                   tags: '',
//                   project: '',
//                 })}
//               >
//                 <X className="w-4 h-4 mr-1" />
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`px-6 py-2 text-sm text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 flex items-center transition-all ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <Send className="w-4 h-4 mr-2" />
//                 {isSubmitting ? 'Submitting...' : 'Add Task'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTaskPage;


import React, { useState } from 'react';
import { CheckCircleIcon, UserIcon, CalendarIcon, AlertCircleIcon, Send, X } from 'lucide-react';

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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Alex Brown'];
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Task added:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      });
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
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-2">
      <div className="w-full bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center mb-6">
          <CheckCircleIcon className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Add New Task
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Title - Full width */}
            <div className="col-span-12">
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.title ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter a concise task title"
              />
              {errors.title && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.title}
                </div>
              )}
            </div>

            {/* Description - Full width */}
            <div className="col-span-12">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.description ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Describe the task in detail"
              />
              {errors.description && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.description}
                </div>
              )}
            </div>

            {/* Project and Assignee - 6 columns each */}
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.project ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
              {errors.project && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.project}
                </div>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.assignee ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select an assignee</option>
                  {teamMembers.map((member) => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
              {errors.assignee && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.assignee}
                </div>
              )}
            </div>

            {/* Status, Priority, Due Date - 4 columns each */}
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors.progress ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="0-100"
              />
              {errors.progress && (
                <div className="flex items-center mt-1 text-red-600 text-xs">
                  <AlertCircleIcon className="w-4 h-4 mr-1" /> {errors.progress}
                </div>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g., documentation, api"
              />
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