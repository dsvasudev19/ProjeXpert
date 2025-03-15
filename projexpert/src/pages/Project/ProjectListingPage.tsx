import { useEffect, useState } from 'react';
import { Search, Calendar, Users, Star, Grid, List, DollarSign, Clock, Goal, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '../../axiosIntance';


const ProjectsListingPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [projects,setProjects]=useState<any>([])
  const [filteredProjects,setFilteredProjects]=useState<any>([])
  const [loading, setLoading] = useState(true);
  const projectTypes = ['All', 'Client', 'Internal'];
  
  const handleProjectClick = (projectId: number) => {
    navigate(`/dashboard/project/projects/${projectId}`);
  };
  
  useEffect(() => {
    const filtered = projects.filter((project: any) => {
      const matchesSearch = project?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project?.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || project?.projectType === filterType;
      return matchesSearch && matchesType;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, filterType, projects]);

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/project");
      if (res.status === 200) {
        setProjects(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const LoaderComponent = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <Loader className="h-12 w-12 text-blue-600 animate-spin mb-4" />
      <p className="text-lg text-gray-600 font-medium">Loading projects...</p>
      <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your projects</p>
    </div>
  );
  
  const getPriorityClass = (priority:any) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusClass = (status:any) => {
    switch(status) {
      case 'Complete': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-purple-100 text-purple-700';
      case 'Planning': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Calculate project progress based on dates
  const calculateProgress = (startDate:any, endDate:any) => {
    const start = new Date(startDate).getTime();  // Convert to timestamp
    const end = new Date(endDate).getTime();      // Convert to timestamp
    const today = new Date().getTime();           // Convert to timestamp
    
    // If project hasn't started yet
    if (today < start) return 0;
    
    // If project is completed or past due date
    if (today > end) return 100;
    
    // Calculate progress percentage
    const totalDuration = end - start;
    const elapsedDuration = today - start;
    return Math.round((elapsedDuration / totalDuration) * 100);
  };

  // Format currency
  const formatCurrency = (amount:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 h-full overflow-auto mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Projects Hub
          </h1>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <List size={18} />
            </button>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {projectTypes.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterType === type
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        
        {loading ? (
          <LoaderComponent />
        ) : (
          <>
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-600">No projects found matching your criteria.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project:any) => {
                  const progress = calculateProgress(project?.startDate, project?.endDate);
                  
                  return (
                    <div 
                      key={project?.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <div className="h-3 bg-gradient-to-r from-blue-500 to-green-500"></div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{project?.name}</h2>
                          <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{project?.description}</p>
                        
                        {project?.Client && (
                          <div className="mb-4 text-sm">
                            <span className="font-medium text-gray-700">Client:</span>
                            <span className="ml-2 text-gray-600">{project?.Client.name}</span>
                          </div>
                        )}
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(project?.priority)}`}>
                            {project?.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(project?.status)}`}>
                            {project?.status}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {project?.projectType}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-gray-500 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(project?.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{project?.teamLength}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-gray-500 text-sm mt-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{formatCurrency(project?.budget)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{project?.estimatedDuration} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredProjects.map((project:any, index:any) => {
                  const progress = calculateProgress(project?.startDate, project?.endDate);
                  
                  return (
                    <div 
                      key={project?.id}
                      onClick={() => handleProjectClick(project.id)}
                      className="cursor-pointer"
                    >
                      <div className="p-6 hover:bg-blue-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-800 mb-2">{project?.name}</h2>
                          <p className="text-gray-600 mb-3">{project?.description}</p>
                          
                          {project?.Client && (
                            <div className="mb-3 text-sm">
                              <span className="font-medium text-gray-700">Client:</span>
                              <span className="ml-2 text-gray-600">{project?.Client.name} ({project?.Client.email})</span>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(project?.priority)}`}>
                              {project?.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(project?.status)}`}>
                              {project?.status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {project?.projectType}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                              <span>Budget: {formatCurrency(project?.budget)}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                              <span>Revenue: {formatCurrency(project?.revenueProjection)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-4">
                        <div className="flex items-center gap-6">
                            <div className="w-32">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{new Date(project?.endDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{project?.teamLength}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{project?.estimatedDuration}d</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Goal className="h-4 w-4 mr-1" />
                              <span>{project?.projectGoals}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < filteredProjects.length - 1 && (
                        <div className="border-t border-gray-200"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsListingPage;