import { useEffect, useState } from 'react';
import { ProjectFormData } from '../types/ProjectData';
import Select from 'react-select';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const MultiStepProjectForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clients,setClients]=useState<any>([])
  const [employees,setEmployees]=useState<any>([])
  const {user,loading}=useAuth();
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    description: '',
    projectType: '',
    clientId: '',
    status: 'Not Started',
    priority: 'Medium',
    
    startDate: '',
    targetEndDate: '',
    estimatedDuration: '',
  
    projectManager: 0,
    teamMembers: '',
    departments: [],
  
    budget: '',
    billingRate: '',
    revenueProjection: '',
  
    projectGoals: '',
    deliverables: '',
    requirements: '',
    constraints: '',
    acceptanceCriteria: '',
  
    createGithubRepo: false,
    repoName: '',
    repoVisibility: 'private',
    addCollaborators: false,
    collaborators: '',
    milestones: [],
  });
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const totalSteps = 6;
  
  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMilestoneChange = (
    index: number, 
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 
    isCheckbox = false
  ) => {
    const { name, value, type } = event.target;
  
    const updatedMilestones = [...formData.milestones];
  
    let newValue: string | number | boolean = value;
  
    // Handle checkbox separately (only for input elements)
    if (isCheckbox && event.target instanceof HTMLInputElement) {
      newValue = event.target.checked;
    }
  
    // Convert numerical fields to numbers
    if (type === "number") {
      newValue = Number(value);
    }
  
    // Update milestone
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [name]: newValue,
    };
  
    setFormData((prevData) => ({
      ...prevData,
      milestones: updatedMilestones,
    }));
  };
  
  
  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        {
          title: '',
          description: '',
          dueDate: '',
          completionDate: '',
          status: 'Pending',
          progress: 0,
          deliverables: '',
          clientApprovalRequired: false,
          clientApproved: false,
          clientApprovalDate: '',
          paymentPercentage: 0,
        },
      ],
    });
  };
  
  const removeMilestone = (index:any) => {
    const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: updatedMilestones });
  };
  
  

  const handleDepartmentChange = (e:any) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        departments: [...formData.departments, value]
      });
    } else {
      setFormData({
        ...formData,
        departments: formData.departments.filter(dept => dept !== value)
      });
    }
  };

  const handleGithubToggle = (e:any) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      createGithubRepo: checked,
      repoName: checked ? formData.projectName.replace(/\s+/g, '-').toLowerCase() : ''
    });
  };

  const getAllClients=async()=>{
    try {
      const res=await axiosInstance.get("/admin/client/users/clients")
      if(res.status===200){
        setClients(res.data.data)
      }
    } catch (error:any) {
      toast.error(error.message)
      console.dir(error)
    }
  }

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


  const handleSubmit = async (e:any) => {
    console.log("submitting")
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      console.log('Project Data:', formData);
      
      const response = await axiosInstance.post('/admin/project',formData);
      
      if(response.status===201){
        toast.success("Project Onboarding Success")
        window.location.href="/dashboard/project/projects/list"
      }
  
      setSubmitSuccess(true);
    } catch (error:any) {
      toast.error(error.message)
      setSubmitError(error.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step:any) => {
    setCurrentStep(step);
  };

  // Step validation before proceeding
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectName.trim() !== '';
      case 2:
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return true;
    }
  };

  // Render the form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderCoreInformation();
      case 2:
        return renderTimelineInformation();
      case 3:
        return renderResourceManagement();
      case 4:
        return renderFinancialInformation();
      case 5:
        return renderScopeInformation();
      case 6:
        return renderGithubSettings();
      default:
        return renderCoreInformation();
    }
  };

  useEffect(()=>{
    getAllClients();
    getAllEmployees()
  },[])

  // Step 1: Core Project Information
  const renderCoreInformation = () => {
    // Sample client list (this could come from an API or state in a real app)
    
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-blue-600">📋</span> Core Project Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              required
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
  
          {/* Project Type */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200"
            >
              <option value="">Select Project Type</option>
              <option value="Internal">Internal</option>
              <option value="Client">Client</option>
              <option value="Research">Research</option>
              <option value="Development">Development</option>
            </select>
          </div>
  
          {/* Client ID Dropdown */}
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              id="clientId"
              name="clientId"
              value={!loading && user?.user?.userType === "client" ? user?.user?.id : formData.clientId || ""}
              disabled={!loading && user?.user?.userType === "client"}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200"
            >
              <option value="">Select Client</option>
              {clients.map((client:any) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Status and Priority */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
  
          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief project overview..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    );
  };

  // Step 2: Timeline Information
  const renderTimelineInformation = () => (
    <div className="bg-green-50 p-6 rounded">
      <h2 className="text-xl font-semibold text-green-800 mb-4">Timeline & Milestones</h2>
      
      {/* Timeline Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div>
          <label htmlFor="targetEndDate" className="block text-sm font-medium text-gray-700 mb-1">
            Target End Date
          </label>
          <input
            type="date"
            id="targetEndDate"
            name="targetEndDate"
            value={formData.targetEndDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div>
          <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Duration (days)
          </label>
          <input
            type="number"
            id="estimatedDuration"
            name="estimatedDuration"
            min="1"
            value={formData.estimatedDuration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
  
      {/* Milestones Section */}
      <h3 className="text-lg font-semibold text-green-800 mt-6">Milestones</h3>
      {formData.milestones.map((milestone, index) => (
        <div key={index} className="mt-4 p-4 bg-white rounded shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={milestone.title}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={milestone.dueDate}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={milestone.completionDate}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={milestone.status}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
              <input
                type="number"
                name="progress"
                min="0"
                max="100"
                value={milestone.progress}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
  
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Deliverables</label>
            <textarea
              name="deliverables"
              value={milestone.deliverables}
              onChange={(e) => handleMilestoneChange(index, e)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Approval Required?</label>
              <input
                type="checkbox"
                name="clientApprovalRequired"
                checked={milestone.clientApprovalRequired}
                onChange={(e) => handleMilestoneChange(index, e, true)}
                className="ml-2"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Approved?</label>
              <input
                type="checkbox"
                name="clientApproved"
                checked={milestone.clientApproved}
                onChange={(e) => handleMilestoneChange(index, e, true)}
                className="ml-2"
              />
            </div>
          </div>
  
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Percentage</label>
            <input
              type="number"
              name="paymentPercentage"
              min="0"
              max="100"
              value={milestone.paymentPercentage}
              onChange={(e) => handleMilestoneChange(index, e)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          {/* Remove Milestone */}
          <button
            type="button"
            onClick={() => removeMilestone(index)}
            className="mt-4 text-red-600 hover:text-red-800"
          >
            Remove Milestone
          </button>
        </div>
      ))}
  
      {/* Add Milestone Button */}
      <button
        type="button"
        onClick={addMilestone}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Milestone
      </button>
    </div>
  );
  
  

  // Step 3: Resource Management
  

  const renderResourceManagement = () => {
    // Transform employees data to match react-select's expected format
    const employeeOptions = employees.map((employee:any) => ({
      value: employee.id,
      label: employee.name
    }));
  
    const handleMultiSelectChange = (selectedOptions:any) => {
      const selectedValues = selectedOptions ? selectedOptions.map((option:any) => option.value) : [];
      handleChange({ target: { name: 'teamMembers', value: selectedValues } });
    };
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-purple-600">👥</span> Resource Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Manager Dropdown */}
          <div>
            <label htmlFor="projectManager" className="block text-sm font-medium text-gray-700 mb-1">
              Project Manager/Lead
            </label>
            <Select
              id="projectManager"
              name="projectManager"
              options={employeeOptions}
              // Find the selected option by value (id)
              value={employeeOptions.find((option:any) => option.value === formData.projectManager)}
              onChange={(selected) => handleChange({ 
                target: { 
                  name: 'projectManager', 
                  value: selected ? selected.value : '' 
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
  
          {/* Team Members Multi-Select Dropdown */}
          <div>
            <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700 mb-1">
              Team Members
            </label>
            <Select
              id="teamMembers"
              name="teamMembers"
              options={employeeOptions}
              // Filter options that match the selected values
              value={employeeOptions.filter((option:any) => formData.teamMembers.includes(option.value))}
              onChange={handleMultiSelectChange}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
  
          {/* Departments Involved */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departments Involved
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Engineering', 'Design', 'Marketing', 'Sales', 'Customer Support', 'Finance', 'HR', 'Operations'].map(
                (dept) => (
                  <div key={dept} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`dept-${dept}`}
                      name="departments"
                      value={dept}
                      checked={formData.departments.includes(dept)}
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-200 rounded transition-colors duration-200"
                    />
                    <label htmlFor={`dept-${dept}`} className="ml-2 text-sm text-gray-700">
                      {dept}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  // Step 4: Financial Information
  const renderFinancialInformation = () => (
    <div className="bg-yellow-50 p-6 rounded">
      <h2 className="text-xl font-semibold text-yellow-800 mb-4">Financial Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget ($)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            min="0"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div>
          <label htmlFor="billingRate" className="block text-sm font-medium text-gray-700 mb-1">
            Billing Rate ($/hour)
          </label>
          <input
            type="number"
            id="billingRate"
            name="billingRate"
            min="0"
            step="0.01"
            value={formData.billingRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div>
          <label htmlFor="revenueProjection" className="block text-sm font-medium text-gray-700 mb-1">
            Revenue Projection ($)
          </label>
          <input
            type="number"
            id="revenueProjection"
            name="revenueProjection"
            min="0"
            step="0.01"
            value={formData.revenueProjection}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
    </div>
  );

  // Step 5: Scope Information
  const renderScopeInformation = () => (
    <div className="bg-red-50 p-6 rounded">
      <h2 className="text-xl font-semibold text-red-800 mb-4">Scope Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="projectGoals" className="block text-sm font-medium text-gray-700 mb-1">
            Project Goals/Objectives
          </label>
          <textarea
            id="projectGoals"
            name="projectGoals"
            rows={2}
            value={formData.projectGoals}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="deliverables" className="block text-sm font-medium text-gray-700 mb-1">
            Deliverables
          </label>
          <textarea
            id="deliverables"
            name="deliverables"
            rows={2}
            value={formData.deliverables}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
            Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={2}
            value={formData.requirements}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">
            Constraints
          </label>
          <textarea
            id="constraints"
            name="constraints"
            rows={2}
            value={formData.constraints}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="acceptanceCriteria" className="block text-sm font-medium text-gray-700 mb-1">
            Acceptance Criteria
          </label>
          <textarea
            id="acceptanceCriteria"
            name="acceptanceCriteria"
            rows={2}
            value={formData.acceptanceCriteria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>
      </div>
    </div>
  );

  // Step 6: GitHub Repository Settings
  const renderGithubSettings = () => (
    <div className="bg-gray-50 p-6 rounded">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">GitHub Repository Settings</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="createGithubRepo"
            name="createGithubRepo"
            disabled={!loading && user?.user?.userType!=="admin"}
            checked={formData.createGithubRepo}
            onChange={handleGithubToggle}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="createGithubRepo" className="ml-2 text-base font-medium text-gray-700">
            Create GitHub Repository for this project
          </label>
        </div>
        
        {formData.createGithubRepo && (
          <div className="pl-7 border-l-2 border-blue-200 ml-2 space-y-4">
            <div>
              <label htmlFor="repoName" className="block text-sm font-medium text-gray-700 mb-1">
                Repository Name
              </label>
              <input
                type="text"
                id="repoName"
                name="repoName"
                value={formData.repoName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Default: auto-generated from project name
              </p>
            </div>
            
            <div>
              <label htmlFor="repoVisibility" className="block text-sm font-medium text-gray-700 mb-1">
                Repository Visibility
              </label>
              <select
                id="repoVisibility"
                name="repoVisibility"
                value={formData.repoVisibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="internal">Internal</option>
              </select>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id="addCollaborators"
                  name="addCollaborators"
                  checked={formData.addCollaborators}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="addCollaborators" className="ml-2 text-sm font-medium text-gray-700">
                  Add Collaborators
                </label>
              </div>
              
              {formData.addCollaborators && (
                <div>
                  <label htmlFor="collaborators" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Usernames (comma separated)
                  </label>
                  <input
                    type="text"
                    id="collaborators"
                    name="collaborators"
                    placeholder="username1, username2"
                    value={formData.collaborators}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Project created successfully!
          {formData.createGithubRepo && (
            <div className="mt-2">
              GitHub repository "{formData.repoName}" has been created.
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Progress bar
  const renderProgressBar = () => {
    const steps = [
      { id: 1, label: 'Core Info', icon: '📋', eta: '2 min' },
      { id: 2, label: 'Timeline', icon: '⏳', eta: '5 min' },
      { id: 3, label: 'Resources', icon: '👥', eta: '3 min' },
      { id: 4, label: 'Financial', icon: '💰', eta: '4 min' },
      { id: 5, label: 'Scope', icon: '🎯', eta: '3 min' },
      { id: 6, label: 'GitHub', icon: '🐙', eta: '2 min' },
    ];
  
    const progressPercentage = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);
    const totalETA = steps.reduce((sum, step) => sum + parseInt(step.eta), 0);
    const remainingETA = steps
      .slice(currentStep - 1)
      .reduce((sum, step) => sum + parseInt(step.eta), 0);
  
    return (
      <div className="mb-3 relative">
        {/* Milestone Track */}
        <div className="flex justify-between items-center relative">
          {steps.map((step, _) => (
            <div key={step.id} className="flex flex-col items-center relative z-10 group">
              <button
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300
                  ${currentStep === step.id
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg scale-110'
                    : step.id < currentStep
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {/* Animated ring for active step */}
                {currentStep === step.id && (
                  <span className="absolute inset-0 rounded-full border-2 border-blue-300 animate-pulse" />
                )}
                {step.icon}
              </button>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-200
                  ${currentStep === step.id ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {step.label}
              </span>
              {/* Tooltip with ETA */}
              <div className="absolute -top-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {step.label} ({step.eta})
              </div>
            </div>
          ))}
  
          {/* Progress Track with Integrated Info */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 ease-in-out relative"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            >
              {/* Progress Marker with Percentage and ETA */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <div className="relative flex flex-col items-center">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium rounded-full px-2 py-1 shadow-md">
                    {progressPercentage}%
                  </span>
                  <span className="w-3 h-3 bg-white border-2 border-blue-600 rounded-full block shadow-md" />
                  <span className="absolute top-4 text-xs text-blue-600 font-medium">
                    {remainingETA} min left
                  </span>
                </div>
              </div>
            </div>
  
            {/* Milestone Completion Tag */}
            {currentStep > 1 && (
              <div
                className="absolute top-6 animate-fade-in"
                style={{
                  left: `${((currentStep - 2) / (steps.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="bg-blue-100 text-blue-600 text-xs font-medium rounded px-2 py-1 shadow-sm">
                  Milestone {currentStep - 1} ✓
                </span>
              </div>
            )}
  
            {/* Start and End Labels */}
            <div className="absolute -top-6 left-0 text-xs text-gray-500 font-medium">
              Start
            </div>
            <div className="absolute -top-6 right-0 text-xs text-gray-500 font-medium">
              Finish ({totalETA} min)
            </div>
          </div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full opacity-20" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-100 rounded-full opacity-20" />
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 p-4 overflow-auto pb-16 mb-2">
      <div className="mx-auto">
        <div className="bg-white rounded shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create New Project</h1>
          {renderProgressBar()}
          
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
                    ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Creating Project...' : 'Create Project'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepProjectForm;