import React, { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Plus, Search, ChevronDown, ChevronUp, FileText, ChartBar } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';
import AddTask from '../modals/AddTask';

const Tasks = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const searchTimeoutRef = useRef<any>(null);

  const getAllTasks = async () => {
    setLoadingTasks(true); // Set loading to true before fetching
    try {
      const res = await axiosInstance.get("/admin/task");
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Pending': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-amber-500 bg-amber-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const response = await axiosInstance.patch(`/admin/task/trigger-status/${taskId}`, {
        status: newStatus
      });

      if (response.status === 200) {
        toast.success("Updated successfully");
        setTasks(tasks.map((task: any) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleProgressChange = async (taskId: number, newProgress: number) => {
    try {
      const response = await axiosInstance.patch(`/admin/task/trigger-status/${taskId}`, {
        progress: newProgress
      });

      if (response.status === 200) {
        toast.success("Updated successfully");
        setTasks(tasks.map((task: any) =>
          task.id === taskId ? { ...task, progress: newProgress } : task
        ));
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const toggleTaskExpanded = (taskId: number) => {
    setTasks(tasks.map((task: any) =>
      task.id === taskId ? { ...task, expanded: !task.expanded } : task
    ));
  };

  const completeTask = async (id: any) => {
    try {
      const res = await axiosInstance.patch(`/admin/task/${id}/status`, { status: "Completed" });
      if (res.status === 200) {
        toast.success("Task Status Changed Successfully");
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout
    searchTimeoutRef.current = setTimeout(() => {
      getFilteredTasks(value);
      console.log('Search triggered with:', value);
    }, 2000);
  };

  const getFilteredTasks = async (value: string) => {
    try {
      const res = await axiosInstance.get(`/admin/task/search/by-query?searchText=${value}`);
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="h-full flex flex-col text-xs">
      <div className="p-5 flex-none">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                onChange={(e: any) => handleSearchChange(e.target.value)}
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 pt-0 min-h-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Ref</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Task</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Project</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Priority</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Due Date</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Assignee</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Progress</th>
                  <th className="text-left p-2 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingTasks ? (
                  <tr>
                    <td colSpan={9}>
                      <div className="min-h-[50vh] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : tasks.map((task: any) => (
                  <React.Fragment key={task.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-2">
                        <span className="font-medium text-gray-800">{task?.refId}</span>
                      </td>
                      <td className="p-2">
                        <span className="font-medium text-gray-800">{task?.title}</span>
                      </td>
                      <td className="p-2 text-gray-600">{task.Project?.name}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="text-gray-600">{task.status}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className={`p-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-2 text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-blue-100 flex items-center justify-center p-1">
                            <span className="text-blue-600">{task?.Assignee?.name.split(" ")[0]}</span>
                          </div>
                          <span className="text-gray-600">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{task.progress}%</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => { completeTask(task?.id) }}
                          className="p-2 text-green-400 hover:bg-green-500 rounded-lg transition-colors"
                          title="Show Details"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleTaskExpanded(task.id)}
                          className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Show Details"
                        >
                          {task.expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </td>
                    </tr>
                    {task.expanded && (
                      <tr className="bg-gradient-to-br from-slate-50 to-white">
                        <td colSpan={8} className="p-2">
                          <div className="space-y-4">
                            {/* Description Section */}
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                              <h4 className="text-slate-800 mb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Description
                              </h4>
                              <p className="text-slate-600 leading-relaxed">{task.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Status Update Section */}
                              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                <h4 className=" text-slate-800 mb-2 flex items-center gap-2">
                                  <Clock className="w-5 h-5 text-amber-500" />
                                  Update Status
                                </h4>
                                <select
                                  value={task.status}
                                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-600 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </div>

                              {/* Progress Update Section */}
                              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                <h4 className=" text-slate-800 mb-2 flex items-center gap-2">
                                  <ChartBar className="w-5 h-5 text-green-500" />
                                  Update Progress
                                </h4>
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 h-2 bg-slate-200 rounded-lg relative">
                                    <div
                                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
                                      style={{ width: `${task.progress}%` }}
                                    />
                                    <input
                                      type="range"
                                      value={task.progress}
                                      onChange={(e) => handleProgressChange(task.id, parseInt(e.target.value))}
                                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                  </div>
                                  <span className=" text-blue-500 w-16 text-center">{task.progress}%</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <button onClick={() => { completeTask(task?.id) }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">Complete Task</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        showAddModal && <AddTask showAddModal={showAddModal} closeModal={() => { setShowAddModal(false) }} getTasks={getAllTasks} />
      }
    </div>
  );
};

export default Tasks;
