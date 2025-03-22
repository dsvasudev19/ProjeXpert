import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BugIcon,
  CalendarIcon,
  ChevronLeft,
  CheckCircle,
  Clock,
  Tag,
  UserIcon,
  FolderCode,
  BarChart2,
  AlertCircle,
  Save,
  Edit,
  FileText,
  ChevronRight,
  Link as LinkIcon,
} from 'lucide-react';
import { axiosInstance } from '../../axiosIntance';
import Forbidden from '../../components/UnauthorizedAccess'; // Adjust the path based on your project structure
import toast from 'react-hot-toast';

interface Bug {
  id?: number;
  refId?:string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  tags: string[];
  project: string;
  reporter?: string;
  reportedDate?: string;
  resolutionTime?: string;
  Project?: { id: number; name: string };
  Assignee?: { id: number; name: string };
  Reporter?: { id: number; name: string };
}

const BugDetailsPage: React.FC = () => {
  const { bugId } = useParams<{ bugId: string }>();
  const navigate = useNavigate();
  const [bug, setBug] = useState<Bug | null>(null);
  const [isEditing, setIsEditing] = useState<any>(false);
  const [editedBug, setEditedBug] = useState<Partial<Bug>>({});
  const [loading, setLoading] = useState(true);
  const [isForbidden, setIsForbidden] = useState(false); // New state for 403 handling

  useEffect(() => {
    
    fetchBug();
  }, [bugId]);

  const fetchBug = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/bug/${bugId}`);
      if (res?.status === 200) {
        const bugData = {
          ...res.data,
          tags: res.data.tags.split(','),
        };
        setBug(bugData);
        setEditedBug(bugData);
        setIsForbidden(false); // Reset forbidden state on success
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setIsForbidden(true); // Set forbidden state on 403
      } else {
        console.log('Error fetching bug:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleEditChange = (field: keyof Bug, value: any) => {
    setEditedBug((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/admin/bug/${bugId}`, {
        ...editedBug,
        tags: editedBug.tags?.join(','),
      });
      console.log(res)
      if (res?.status == 200) {
        toast.success("Bug Details Updated Successfully")
        setIsEditing(false);
        // setBug({ ...res.data, tags: res.data.tags.split(',') });
        fetchBug();  
      }
    } catch (error) {
      console.log('Error updating bug:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editable = urlParams.get('e');
    if (editable) {
      setIsEditing(editable);
    }
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return {
          color: '#EF4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'Open',
        };
      case 'in_progress':
        return {
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          icon: <BarChart2 className="w-3 h-3" />,
          label: 'In Progress',
        };
      case 'resolved':
        return {
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Resolved',
        };
      case 'closed':
        return {
          color: '#6B7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          icon: <Clock className="w-3 h-3" />,
          label: 'Closed',
        };
      case 'reopened':
        return {
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'Reopened',
        };
      default:
        return {
          color: '#6B7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          icon: <Clock className="w-3 h-3" />,
          label: 'Unknown',
        };
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'low':
        return {
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          label: 'Low',
        };
      case 'medium':
        return {
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
          label: 'Medium',
        };
      case 'high':
        return {
          color: '#F59E0B',
          bgColor: 'rgba(245, 158, 11, 0.1)',
          label: 'High',
        };
      case 'critical':
        return {
          color: '#EF4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          label: 'Critical',
        };
      default:
        return {
          color: '#FBBF24',
          bgColor: 'rgba(251, 191, 36, 0.1)',
          label: 'Medium',
        };
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString || typeof dateString !== "string") {
        console.error("Invalid date string:", dateString);
        return "Invalid date";
    }

    console.log("Received dateString:", dateString);

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.error("Invalid Date object:", dateString);
        return "Invalid date";
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
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

  if (isForbidden) {
    return <Forbidden />;
  }

  if (loading && !bug) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-green-500 border-b-blue-500 border-l-green-500 animate-spin mb-4"></div>
          <p className="text-gray-600">Loading bug details...</p>
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
            <span>Bugs</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="font-medium text-blue-600">{bug?.refId || 'Bug Details'}</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 truncate max-w-2xl">
            {isEditing ? (
              <input
                type="text"
                value={editedBug.title || ''}
                onChange={(e) => handleEditChange('title', e.target.value)}
                className="w-full text-xl border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                placeholder="Bug title"
              />
            ) : (
              bug?.title
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
              <Edit className="w-4 h-4 mr-2" />
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
                  {bug?.status && (
                    <div
                      className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                      style={{
                        color: getStatusInfo(bug.status).color,
                        backgroundColor: getStatusInfo(bug.status).bgColor,
                      }}
                    >
                      {getStatusInfo(bug.status).icon}
                      <span className="ml-1.5">{getStatusInfo(bug.status).label}</span>
                    </div>
                  )}
                  {bug?.priority && (
                    <div
                      className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                      style={{
                        color: getPriorityInfo(bug.priority).color,
                        backgroundColor: getPriorityInfo(bug.priority).bgColor,
                      }}
                    >
                      <span>{getPriorityInfo(bug.priority).label} Priority</span>
                    </div>
                  )}
                </div>
              </div>

              {bug?.dueDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Due Date</div>
                    <div className="font-medium">{formatDate(bug.dueDate)}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Work Item</div>
                  <div className="font-mono text-sm font-medium flex items-center">
                    <span>{bug?.refId}</span>
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
                    value={editedBug.description || ''}
                    onChange={(e) => handleEditChange('description', e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-3 min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    rows={6}
                    placeholder="Describe the bug..."
                  />
                ) : (
                  <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                    {bug?.description || (
                      <span className="text-gray-400 italic">No description provided</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Assignee, Project, Reporter & Due Date */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-5 space-y-4">
                {/* Assignee */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Assignee</div>
                    <div className="font-medium text-gray-900">
                      {bug?.Assignee?.name || 'Unassigned'}
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-md bg-green-50 text-green-600">
                    <FolderCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Project</div>
                    <div className="font-medium text-gray-900">
                      {bug?.Project?.name || 'Unassigned'}
                    </div>
                  </div>
                </div>

                {/* Reporter */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Reported By</div>
                    <div className="font-medium text-gray-900">
                      {bug?.Reporter?.name || 'Unknown'}
                    </div>
                  </div>
                </div>

                {/* Due Date Info */}
                {bug?.dueDate && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-yellow-50 text-yellow-600">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">Due Date</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(bug.dueDate)}
                        {isEditing ? (
                          <div className="mt-2">
                            <input
                              type="date"
                              value={editedBug.dueDate?.split('T')[0] || ''}
                              onChange={(e) => handleEditChange('dueDate', e.target.value)}
                              className="w-full border rounded p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div
                            className="text-sm mt-1"
                            style={{ color: getTimeRemaining(bug.dueDate).color }}
                          >
                            {getTimeRemaining(bug.dueDate).text}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={editedBug.status}
                        onChange={(e) =>
                          handleEditChange('status', e.target.value as Bug['status'])
                        }
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                        <option value="reopened">Reopened</option>
                      </select>
                    </div>

                    {/* Priority Selector */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={editedBug.priority}
                        onChange={(e) =>
                          handleEditChange('priority', e.target.value as Bug['priority'])
                        }
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
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
                      value={editedBug.tags?.join(', ') || ''}
                      onChange={(e) => handleEditChange('tags', e.target.value.split(', '))}
                      className="w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                      placeholder="Enter tags separated by commas"
                    />
                    <div className="text-xs text-gray-500">Separate tags with commas</div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {bug?.tags && bug.tags.length > 0 ? (
                      bug.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                        >
                          <BugIcon className="w-3 h-3 mr-1" />
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

            {/* Activity Timeline */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-medium text-gray-900">Activity</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Bug reported</p>
                      <span className="text-xs text-gray-500">
                        {formatDate(bug?.reportedDate || '')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Reported by {bug?.Reporter?.name || 'User'}
                    </p>
                  </div>

                  {bug?.resolutionTime && (
                    <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
                      <div className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Bug resolved</p>
                        <span className="text-xs text-gray-500">
                          {formatDate(bug.resolutionTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Resolved by System</p>
                    </div>
                  )}

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

export default BugDetailsPage;