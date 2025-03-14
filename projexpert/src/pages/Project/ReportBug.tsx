import React, { useState } from 'react';
import { BugIcon, UserIcon, CalendarIcon, AlertCircleIcon, Send, X } from 'lucide-react';

const ReportBugPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    assignedTo: '',
    dueDate: '',
    tags: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample list of team members (replace with your actual data)
  const teamMembers = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'Alex Brown',
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Bug reported:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      });
      setIsSubmitting(false);
      setFormData({
        title: '',
        description: '',
        severity: 'low',
        assignedTo: '',
        dueDate: '',
        tags: '',
      });
    }, 1000);
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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bug Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.title ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter a concise bug title"
                />
                {errors.title && (
                  <div className="flex items-center mt-1 text-red-600 text-xs">
                    <AlertCircleIcon className="w-4 h-4 mr-1" />
                    {errors.title}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    errors.description ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Describe the bug in detail"
                />
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
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        errors.assignedTo ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select an assignee</option>
                      {teamMembers.map((member) => (
                        <option key={member} value={member}>
                          {member}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g., frontend, ui, crash"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
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