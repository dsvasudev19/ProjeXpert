import { useState } from 'react';
import { CalendarDays, Clock, DollarSign, BarChart2, CheckSquare, AlertTriangle } from 'lucide-react';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample project data from the provided JSON
  const project = {
    "id": 4,
    "name": "ElevateHub",
    "description": "E-University",
    "projectType": "Internal",
    "status": "In Progress",
    "priority": "Critical",
    "startDate": "2025-03-05",
    "endDate": "2025-04-20",
    "estimatedDuration": "45",
    "budget": "200000.00",
    "billingRate": "2000.00",
    "revenueProjection": "180000.00",
    "projectGoals": "No Project Goals",
    "deliverables": "Full Project",
    "requirements": "No requirements",
    "constraints": "Just time constraints",
    "acceptanceCriteria": "Without Bugs",
    "clientId": 3,
    "projectManager": 7,
    "createdAt": "2025-03-14T17:46:49.000Z",
    "updatedAt": "2025-03-14T17:46:49.000Z",
    "Client": {
        "id": 3,
        "name": "Vasudev Darse Shikari"
    },
    "ProjectManager": {
        "id": 7,
        "name": "Project manager testing"
    },
    "Milestones": [
        {
            "id": 5,
            "title": "First Phase",
            "description": "",
            "projectId": 4,
            "dueDate": "2025-03-05",
            "completionDate": "2025-03-15",
            "status": "In Progress",
            "progress": 30,
            "deliverables": "Basic Frontend and backend with few structured code",
            "clientApprovalRequired": true,
            "clientApproved": false,
            "clientApprovalDate": null,
            "paymentPercentage": "50.00",
            "createdAt": "2025-03-14T17:46:49.000Z",
            "updatedAt": "2025-03-14T17:46:49.000Z"
        },
        {
            "id": 6,
            "title": "Exams Phase",
            "description": "",
            "projectId": 4,
            "dueDate": "2025-03-15",
            "completionDate": "2025-03-30",
            "status": "Pending",
            "progress": 0,
            "deliverables": "Exam Conducting should be working properly",
            "clientApprovalRequired": true,
            "clientApproved": false,
            "clientApprovalDate": null,
            "paymentPercentage": "30.00",
            "createdAt": "2025-03-14T17:46:49.000Z",
            "updatedAt": "2025-03-14T17:46:49.000Z"
        },
        {
            "id": 7,
            "title": "Final Phase ",
            "description": "",
            "projectId": 4,
            "dueDate": "2025-04-01",
            "completionDate": "2025-04-05",
            "status": "Pending",
            "progress": 30,
            "deliverables": "Full Project",
            "clientApprovalRequired": true,
            "clientApproved": false,
            "clientApprovalDate": null,
            "paymentPercentage": "20.00",
            "createdAt": "2025-03-14T17:46:49.000Z",
            "updatedAt": "2025-03-14T17:46:49.000Z"
        }
    ],
    "Bugs": [],
    "Tasks": []
  };

  // Format date for display
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate overall project progress
  const calculateOverallProgress = () => {
    if (!project.Milestones || project.Milestones.length === 0) return 0;
    
    const totalWeightedProgress = project.Milestones.reduce((sum, milestone) => {
      const weight = parseFloat(milestone.paymentPercentage) / 100;
      return sum + (milestone.progress * weight);
    }, 0);
    
    return Math.round(totalWeightedProgress);
  };

  // Get status badge color
  const getStatusColor = (status:any) => {
    switch(status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority:any) => {
    switch(priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-auto pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-green-100">{project.description}</p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
              <span className={`${getStatusColor(project.status)} px-3 py-1 rounded-full text-sm font-medium`}>
                {project.status}
              </span>
              <span className={`${getPriorityColor(project.priority)} px-3 py-1 rounded-full text-sm font-medium`}>
                {project.priority}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
              <div 
                className="bg-white rounded-full h-4" 
                style={{ width: `${calculateOverallProgress()}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span>{calculateOverallProgress()}% Complete</span>
              <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Project Information</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="text-gray-800">{formatDate(project.startDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">End Date</p>
                    <p className="text-gray-800">{formatDate(project.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="text-gray-800">{project.estimatedDuration} days</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-gray-800">{project.projectType}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Team</h3>
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    PM
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{project.ProjectManager.name}</p>
                    <p className="text-xs text-gray-500">Project Manager</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                    CL
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{project.Client.name}</p>
                    <p className="text-xs text-gray-500">Client</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Details Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Project Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project Goals</h3>
                  <p className="text-gray-800 mt-1">{project.projectGoals}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Deliverables</h3>
                  <p className="text-gray-800 mt-1">{project.deliverables}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Requirements</h3>
                  <p className="text-gray-800 mt-1">{project.requirements}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Constraints</h3>
                  <p className="text-gray-800 mt-1">{project.constraints}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Acceptance Criteria</h3>
                  <p className="text-gray-800 mt-1">{project.acceptanceCriteria}</p>
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
                {project.Milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative pb-8">
                    {index < project.Milestones.length - 1 && (
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
                  <p className="text-3xl font-bold text-green-600">${parseFloat(project.budget).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Budget</span>
                    <span className="font-medium">${parseFloat(project.budget).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Project Duration</span>
                    <span className="font-medium">{project.estimatedDuration} days</span>
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
                  <p className="text-3xl font-bold text-blue-600">${parseFloat(project.billingRate).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Hourly Rate</span>
                    <span className="font-medium">${parseFloat(project.billingRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Estimated Revenue</span>
                    <span className="font-medium">${parseFloat(project.revenueProjection).toLocaleString()}</span>
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
                  <p className="text-3xl font-bold text-gradient-to-r from-green-600 to-blue-600">${parseFloat(project.revenueProjection).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Revenue</span>
                    <span className="font-medium">${parseFloat(project.revenueProjection).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Profit Margin</span>
                    <span className="font-medium">
                      {Math.round((parseFloat(project.revenueProjection) - parseFloat(project.budget)) / parseFloat(project.revenueProjection) * 100)}%
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
                    {project.Milestones.map((milestone) => (
                      <tr key={milestone.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{milestone.title}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`${getStatusColor(milestone.status)} px-2 py-1 rounded-full text-xs font-medium text-white`}>
                            {milestone.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(milestone.dueDate)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{milestone.paymentPercentage}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(parseFloat(project.budget) * parseFloat(milestone.paymentPercentage) / 100).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {milestone.clientApproved ? (
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