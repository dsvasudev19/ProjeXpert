import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ChevronLeft,
  CheckCircle,
  Clock,
  Tag,
  Users,
  Briefcase,
  BarChart2,
  AlertCircle,
  Save,
  Edit2,
  FileText,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon
} from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';

interface Task {
  id: number;
  refId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assigneeId: number;
  projectId: number;
  bugId: number | null;
  parentTaskId: number | null;
  progress: number;
  tags: string[];
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  Assignee: { id: number; name: string };
  Project: { id: number; name: string };
  ParentTask: Task | null;
  SubTasks: Task[];
}

const TaskDetailsPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [loading, setLoading] = useState(true);
  const [subtasksExpanded, setSubtasksExpanded] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/admin/task/${taskId}`);
        if (res?.status === 200) {
          const taskData = {
            ...res.data,
            tags: res.data.tags.split(','),
          };
          setTask(taskData);
          setEditedTask(taskData);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error fetching task:', error);
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleEditChange = (field: keyof Task, value: any) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/admin/task/${taskId}`, {
        ...editedTask,
        tags: editedTask.tags?.join(','),
      });
      if (res?.status === 200) {
        setTask({ ...res.data, tags: res.data.tags.split(',') });
        setIsEditing(false);
      }
    } catch (error) {
      console.log('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    let urlParams=new URLSearchParams(window.location.search)
    const editable=urlParams.get("e")
    if(editable){
      setIsEditing(editable)
    }
  },[])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
          icon: <Clock className="w-3 h-3" />,
          label: 'Pending'
        };
      case 'in_progress':
        return { 
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          icon: <BarChart2 className="w-3 h-3" />,
          label: 'In Progress'
        };
      case 'completed':
        return { 
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Completed'
        };
      case 'on_hold':
        return { 
          color: '#6B7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'On Hold'
        };
      default:
        return { 
          color: '#6B7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          icon: <Clock className="w-3 h-3" />,
          label: 'Unknown'
        };
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'low':
        return { 
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          label: 'Low'
        };
      case 'medium':
        return { 
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          label: 'Medium'
        };
      case 'high':
        return { 
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
          label: 'High'
        };
      case 'urgent':
        return { 
          color: '#EF4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          label: 'Urgent'
        };
      default:
        return { 
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          label: 'Medium'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: '#EF4444' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: '#FBBF24' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: '#FBBF24' };
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays} days`, color: '#FBBF24' };
    } else {
      return { text: `Due in ${diffDays} days`, color: '#10B981' };
    }
  };

  if (loading && !task) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-green-500 border-b-blue-500 border-l-green-500 animate-spin mb-4"></div>
          <p className="text-gray-600">Loading task details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-full overflow-auto mb-16">
      {/* Navigation Bar */}
      <div className="h-16 bg-white shadow-sm flex items-center px-6 sticky top-0 z-10 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="text-sm text-gray-500 flex items-center">
            <span>Tasks</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="font-medium text-blue-600">{task?.refId || 'Task Details'}</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 truncate max-w-2xl">
            {isEditing ? (
              <input
                type="text"
                value={editedTask.title || ''}
                onChange={(e) => handleEditChange('title', e.target.value)}
                className="w-full text-xl border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                placeholder="Task title"
              />
            ) : (
              task?.title
            )}
          </h1>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`
            flex items-center px-4 py-2 rounded-md text-white font-medium transition-colors
            ${isEditing 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }
          `}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Status Bar */}
            <div className="bg-white rounded-lg shadow-sm p-5 flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-max">
                <div className="flex space-x-3">
                  {task?.status && (
                    <div 
                      className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                      style={{ 
                        color: getStatusInfo(task.status).color,
                        backgroundColor: getStatusInfo(task.status).bgColor
                      }}
                    >
                      {getStatusInfo(task.status).icon}
                      <span className="ml-1.5">{getStatusInfo(task.status).label}</span>
                    </div>
                  )}
                  
                  {task?.priority && (
                    <div 
                      className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                      style={{ 
                        color: getPriorityInfo(task.priority).color,
                        backgroundColor: getPriorityInfo(task.priority).bgColor
                      }}
                    >
                      <span>{getPriorityInfo(task.priority).label} Priority</span>
                    </div>
                  )}
                </div>
              </div>

              {task?.dueDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Due Date</div>
                    <div className="font-medium">
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Reference ID</div>
                  <div className="font-mono text-sm font-medium flex items-center">
                    <span>{task?.refId}</span>
                    <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <h2 className="font-medium text-gray-900">Description</h2>
                </div>
              </div>
              <div className="p-5">
                {isEditing ? (
                  <textarea
                    value={editedTask.description || ''}
                    onChange={(e) => handleEditChange('description', e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-3 min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    rows={6}
                    placeholder="Describe the task..."
                  />
                ) : (
                  <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                    {task?.description || 
                      <span className="text-gray-400 italic">No description provided</span>
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-medium text-gray-900">Progress</h2>
              </div>
              <div className="p-5">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        value={editedTask.progress || 0}
                        onChange={(e) => handleEditChange('progress', Number(e.target.value))}
                        min="0"
                        max="100"
                        className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      />
                      <div className="w-16 flex items-center space-x-1">
                        <input
                          type="number"
                          value={editedTask.progress || 0}
                          onChange={(e) => handleEditChange('progress', Number(e.target.value))}
                          min="0"
                          max="100"
                          className="border rounded p-1 w-12 text-center"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Update the progress slider to reflect the current completion status
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="font-medium">{task?.progress || 0}% completed</span>
                      <span className="text-gray-500">
                        {task?.progress === 100 ? 'Complete' : 'In progress'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${task?.progress || 0}%` }}
                      ></div>
                    </div>
                    {task?.progress !== undefined && task.progress < 100 && (
                      <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
                        <span>Start</span>
                        <span>In Progress</span>
                        <span>Testing</span>
                        <span>Complete</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Subtasks */}
            {task?.SubTasks && task.SubTasks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm">
                <div 
                  className="px-5 py-4 border-b border-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => setSubtasksExpanded(!subtasksExpanded)}
                >
                  <div className="flex items-center">
                    <h2 className="font-medium text-gray-900">Subtasks ({task.SubTasks.length})</h2>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    {subtasksExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {subtasksExpanded && (
                  <div className="p-5 space-y-3">
                    {task.SubTasks.map((subTask) => (
                      <div
                        key={subTask.id}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                        onClick={() => navigate(`/tasks/${subTask.id}`)}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getStatusInfo(subTask.status).bgColor }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusInfo(subTask.status).color }}
                            ></div>
                          </div>
                          <span className="font-medium text-gray-900">{subTask.title}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div 
                            className="px-2.5 py-0.5 rounded text-xs font-medium"
                            style={{ 
                              color: getStatusInfo(subTask.status).color,
                              backgroundColor: getStatusInfo(subTask.status).bgColor
                            }}
                          >
                            {getStatusInfo(subTask.status).label}
                          </div>
                          <div className="w-16 flex items-center justify-end">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center relative">
                              <div 
                                className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center"
                              >
                                <span className="text-xs font-medium">{subTask.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors text-sm font-medium pt-2">
                      <PlusCircle className="w-4 h-4 mr-1.5" />
                      Add subtask
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Assignee & Project */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-5 space-y-4">
                {/* Assignee */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Assignee</div>
                    <div className="font-medium text-gray-900">
                      {task?.Assignee?.name || 'Unassigned'}
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-md bg-green-50 text-green-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Project</div>
                    <div className="font-medium text-gray-900">
                      {task?.Project?.name || 'Unassigned'}
                    </div>
                  </div>
                </div>

                {/* Due Date Info */}
                {task?.dueDate && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-yellow-50 text-yellow-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">Due Date</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(task.dueDate)}
                        {isEditing ? (
                          <div className="mt-2">
                            <input
                              type="date"
                              value={editedTask.dueDate?.split('T')[0] || ''}
                              onChange={(e) => handleEditChange('dueDate', e.target.value)}
                              className="w-full border rounded p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div 
                            className="text-sm mt-1"
                            style={{ color: getTimeRemaining(task.dueDate).color }}
                          >
                            {getTimeRemaining(task.dueDate).text}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Status & Priority - Only in Edit Mode */}
                {isEditing && (
                  <>
                    {/* Status Selector */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editedTask.status}
                        onChange={(e) => handleEditChange('status', e.target.value as Task['status'])}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                    </div>

                    {/* Priority Selector */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={editedTask.priority}
                        onChange={(e) => handleEditChange('priority', e.target.value as Task['priority'])}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 text-gray-400 mr-2" />
                  <h2 className="font-medium text-gray-900">Tags</h2>
                </div>
              </div>
              <div className="p-5">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedTask.tags?.join(', ') || ''}
                      onChange={(e) => handleEditChange('tags', e.target.value.split(', '))}
                      className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                      placeholder="Enter tags separated by commas"
                    />
                    <div className="text-xs text-gray-500">
                      Separate tags with commas
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {task?.tags && task.tags.length > 0 ? (
                      task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No tags added</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Activity Timeline - Placeholder */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-medium text-gray-900">Activity</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Task created</p>
                      <span className="text-xs text-gray-500">{formatDate(task?.createdAt || '')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Task was created by {task?.createdBy || 'User'}</p>
                  </div>
                  
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Task updated</p>
                      <span className="text-xs text-gray-500">{formatDate(task?.updatedAt || '')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Last modified by System</p>
                  </div>
                  
                  <div className="text-center">
                    <button className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
                      Show all activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;