import { useEffect, useState } from 'react';
import { Clock, DollarSign, BarChart2, CheckSquare, Loader, AlertCircle, CheckCircle2, ListChecks, Package, Target, FolderKanban, Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../axiosIntance';
import {symbols} from '../../constants/symbols.js'

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectData, setProjectData] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const truncatedDescription = projectData?.description?.length > 150 
    ? `${projectData?.description.slice(0, 150)}...` 
    : projectData?.description;

  const getProjectById = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/admin/project/${id}`);
      if (res.status === 200) {
        setProjectData(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      getProjectById(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Loader component
  const LoaderComponent = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
      <Loader className="h-16 w-16 text-blue-600 animate-spin mb-6" />
      <p className="text-xl font-semibold text-gray-700 mb-2">Loading Project Details</p>
      <p className="text-gray-500 max-w-md text-center">
        Please wait while we fetch the project information and prepare your dashboard.
      </p>
    </div>
  );

  // Format date for display
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate overall project progress
  const calculateOverallProgress = () => {
    if (!projectData?.Milestones || projectData?.Milestones.length === 0) return 0;

    const totalWeightedProgress = projectData?.Milestones.reduce((sum: any, milestone: any) => {
      const weight = parseFloat(milestone.paymentPercentage) / 100;
      return sum + (milestone.progress * weight);
    }, 0);

    return Math.round(totalWeightedProgress);
  };

  // Get status badge color
  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Render loader if loading is true
  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-auto pb-32">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-auto pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-xl p-5 mb-6 text-white relative overflow-hidden">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Project Info */}
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl font-bold tracking-tight drop-shadow-md">
              {projectData?.name}
            </h1>
            <div>
              <p className="text-green-100 text-sm leading-relaxed">
                {isExpanded ? projectData?.description : truncatedDescription}
              </p>
              {projectData?.description?.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 flex items-center text-green-200 text-xs font-medium hover:text-white transition-colors"
                >
                  {isExpanded ? (
                    <>
                      See Less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      See More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Status and Priority Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`${getStatusColor(
                projectData?.status
              )} px-3 py-1 rounded-full text-xs font-medium bg-opacity-90 backdrop-blur-sm shadow-md transition-all hover:scale-105`}
            >
              {projectData?.status}
            </span>
            <span
              className={`${getPriorityColor(
                projectData?.priority
              )} px-3 py-1 rounded-full text-xs font-medium bg-opacity-90 backdrop-blur-sm shadow-md transition-all hover:scale-105`}
            >
              {projectData?.priority}
            </span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-medium text-green-100 mb-1">
            <span>{calculateOverallProgress()}% Complete</span>
            <span>
              {formatDate(projectData?.startDate)} - {formatDate(projectData?.endDate)}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${calculateOverallProgress()}%` }}
            />
          </div>
        </div>
      </div>
    </div>
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'milestones' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'financial' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('financial')}
          >
            Financial
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Project Header - Modern with Glassmorphism */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-1 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Start Date</p>
                        <p className="text-gray-900 font-medium">{formatDate(projectData?.startDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">End Date</p>
                        <p className="text-gray-900 font-medium">{formatDate(projectData?.endDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Duration</p>
                        <p className="text-gray-900 font-medium">{projectData?.estimatedDuration} days</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <FolderKanban className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Type</p>
                        <p className="text-gray-900 font-medium">{projectData?.projectType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 bg-gradient-to-br from-green-50 to-blue-50 p-6 flex flex-col justify-center">
                  <h3 className="text-xs uppercase tracking-wide text-gray-600 font-medium mb-4">Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-lg">
                        PM
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{projectData?.ProjectManager?.name}</p>
                        <p className="text-xs text-gray-600">Project Manager</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center text-white font-medium shadow-lg">
                        CL
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{projectData?.Client?.name}</p>
                        <p className="text-xs text-gray-600">Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details - Modern Card Layout with Hover Effects */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="h-12 w-1 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm uppercase tracking-wide text-green-600 font-medium mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" /> Project Goals
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{projectData?.projectGoals}</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm uppercase tracking-wide text-blue-600 font-medium mb-3 flex items-center">
                    <Package className="h-4 w-4 mr-2" /> Deliverables
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{projectData?.deliverables}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm uppercase tracking-wide text-green-600 font-medium mb-3 flex items-center">
                    <ListChecks className="h-4 w-4 mr-2" /> Requirements
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{projectData?.requirements}</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm uppercase tracking-wide text-blue-600 font-medium mb-3 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" /> Constraints
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{projectData?.constraints}</p>
                  </div>
                </div>

                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm uppercase tracking-wide text-green-600 font-medium mb-3 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Acceptance Criteria
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{projectData?.acceptanceCriteria}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Project Milestones</h2>
            </div>

            <div className="p-6">
              <div className="space-y-8">
                {projectData?.Milestones.map((milestone: any, index: any) => (
                  <div key={milestone.id} className="relative pb-8">
                    {index < projectData?.Milestones.length - 1 && (
                      <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    )}

                    <div className="relative flex items-start">
                      <div className={`${getStatusColor(milestone.status)} h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white`}>
                        <CheckSquare className="h-5 w-5 text-white" />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800">{milestone.title}</h3>
                          <span className={`${getStatusColor(milestone.status)} px-2 py-1 rounded-full text-xs font-medium text-white`}>
                            {milestone.status}
                          </span>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between mb-2">
                            <span>Due: {formatDate(milestone.dueDate)}</span>
                            <span>Target completion: {formatDate(milestone.completionDate)}</span>
                          </div>

                          <div className="mt-2">
                            <p className="mb-1">Deliverables: {milestone.deliverables}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex-1">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${milestone.progress}%` }}></div>
                                </div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-gray-600">{milestone.progress}%</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center">
                            <div className="flex items-center bg-green-100 rounded-lg px-3 py-1">
                              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                              <span className="text-xs font-medium text-green-800">{milestone.paymentPercentage}% of total payment</span>
                            </div>

                            {milestone.clientApprovalRequired && (
                              <div className="ml-4 flex items-center bg-yellow-100 rounded-lg px-3 py-1">
                                <CheckSquare className="h-4 w-4 text-yellow-600 mr-1" />
                                <span className="text-xs font-medium text-yellow-800">
                                  {milestone.clientApproved ? 'Client Approved' : 'Pending Client Approval'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">Budget</h2>
                  <p className="text-3xl font-bold text-green-600">{symbols.RUPEE}{parseFloat(projectData?.budget).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Budget</span>
                    <span className="font-medium">{symbols.RUPEE}{parseFloat(projectData?.budget).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Project Duration</span>
                    <span className="font-medium">{projectData?.estimatedDuration} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Rate Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">Billing Rate</h2>
                  <p className="text-3xl font-bold text-blue-600">{symbols.RUPEE}{parseFloat(projectData?.billingRate).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Hourly Rate</span>
                    <span className="font-medium">{symbols.RUPEE}{parseFloat(projectData?.billingRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Estimated Revenue</span>
                    <span className="font-medium">{symbols.RUPEE}{parseFloat(projectData?.revenueProjection).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Projection Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">Revenue Projection</h2>
                  <p className="text-3xl font-bold text-gradient-to-r from-green-600 to-blue-600">{symbols.RUPEE}{parseFloat(projectData?.revenueProjection).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Revenue</span>
                    <span className="font-medium">{symbols.RUPEE}{parseFloat(projectData?.revenueProjection).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Profit Margin</span>
                    <span className="font-medium">
                      {Math.round((parseFloat(projectData?.revenueProjection) - parseFloat(projectData?.budget)) / parseFloat(projectData?.revenueProjection) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-3">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Schedule</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Approval</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projectData?.PaymentSchedules.map((schedule: any) => (
                      <tr key={schedule.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.milestoneTitle}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`${getStatusColor(schedule.status)} px-2 py-1 rounded-full text-xs font-medium text-white`}>
                            {schedule.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(schedule.dueDate)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.percentage}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                         {`${symbols.RUPEE} ${schedule.amount}`}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.clientApproval ==="Approved" ? (
                            <span className="text-green-600 font-medium">Approved</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;