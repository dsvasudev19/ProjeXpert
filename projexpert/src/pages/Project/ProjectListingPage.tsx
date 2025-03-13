import React, { useState } from 'react';
import { Search, Calendar, Users, BarChart2, Clock, Star, Grid, List } from 'lucide-react';

// Sample project data
const sampleProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX principles",
    progress: 75,
    dueDate: "2025-04-15",
    team: 6,
    priority: "High",
    status: "In Progress",
    category: "Development"
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Development and launch of the company's first mobile application",
    progress: 40,
    dueDate: "2025-06-30",
    team: 8,
    priority: "Critical",
    status: "In Progress",
    category: "Product"
  },
  {
    id: 3,
    name: "Data Migration",
    description: "Transferring all data from legacy systems to new cloud infrastructure",
    progress: 90,
    dueDate: "2025-03-25",
    team: 4,
    priority: "Medium",
    status: "Review",
    category: "Infrastructure"
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    description: "Building comprehensive analytics dashboard for executive team",
    progress: 60,
    dueDate: "2025-05-10",
    team: 3,
    priority: "High",
    status: "In Progress",
    category: "Analytics"
  },
  {
    id: 5,
    name: "Marketing Campaign",
    description: "Q2 digital marketing campaign across multiple platforms",
    progress: 25,
    dueDate: "2025-07-01",
    team: 5,
    priority: "Medium",
    status: "Planning",
    category: "Marketing"
  },
  {
    id: 6,
    name: "Security Audit",
    description: "Comprehensive security review and implementation of recommendations",
    progress: 10,
    dueDate: "2025-08-15",
    team: 2,
    priority: "High",
    status: "Planning",
    category: "Security"
  }
];

const ProjectsListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const categories = ['All', 'Development', 'Product', 'Infrastructure', 'Analytics', 'Marketing', 'Security'];
  
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  
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
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No projects found matching your criteria.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-3 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{project.name}</h2>
                    <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(project.priority)}`}>
                      {project.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{project.team}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredProjects.map((project, index) => (
              <div key={project.id}>
                <div className="p-6 hover:bg-blue-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h2>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(project.priority)}`}>
                        {project.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-4">
                    <div className="flex items-center gap-6 text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{project.team} members</span>
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < filteredProjects.length - 1 && <div className="border-b border-gray-100"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsListingPage;