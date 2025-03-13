import React, { useState } from 'react';
import { Search, Users, BarChart2, Calendar, ChevronRight, Grid, List, Star, Award, Briefcase } from 'lucide-react';

// Sample teams data
const sampleTeams = [
  {
    id: 1,
    name: "Product Development",
    description: "Frontend and backend development team responsible for core product features",
    members: 12,
    activeProjects: 4,
    completedProjects: 16,
    lead: "Alex Morgan",
    performance: 92,
    department: "Engineering",
    createdAt: "2023-05-12"
  },
  {
    id: 2,
    name: "UX Design",
    description: "User experience and interface design team focused on product usability",
    members: 7,
    activeProjects: 3,
    completedProjects: 24,
    lead: "Jamie Chen",
    performance: 88,
    department: "Design",
    createdAt: "2023-06-24"
  },
  {
    id: 3,
    name: "Marketing",
    description: "Team responsible for digital marketing campaigns and user acquisition",
    members: 9,
    activeProjects: 5,
    completedProjects: 31,
    lead: "Jordan Smith",
    performance: 95,
    department: "Marketing",
    createdAt: "2023-04-18"
  },
  {
    id: 4,
    name: "DevOps",
    description: "Infrastructure and deployment team managing cloud resources and CI/CD pipelines",
    members: 6,
    activeProjects: 2,
    completedProjects: 18,
    lead: "Taylor Reeves",
    performance: 90,
    department: "Engineering",
    createdAt: "2023-07-30"
  },
  {
    id: 5,
    name: "Data Analytics",
    description: "Team focused on business intelligence, data visualization, and insights",
    members: 8,
    activeProjects: 3,
    completedProjects: 12,
    lead: "Casey Wong",
    performance: 87,
    department: "Analytics",
    createdAt: "2023-09-15"
  },
  {
    id: 6,
    name: "Customer Support",
    description: "Team handling user inquiries, technical support, and customer success",
    members: 14,
    activeProjects: 1,
    completedProjects: 8,
    lead: "Riley Johnson",
    performance: 93,
    department: "Operations",
    createdAt: "2023-08-05"
  }
];

const TeamsListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  
  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Operations', 'Analytics'];
  
  const filteredTeams = sampleTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.lead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || team.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });
  
  const getPerformanceColor = (score:any) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 80) return 'from-blue-500 to-blue-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-orange-500 to-orange-600';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 h-full overflow-auto mb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Teams Directory
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
                placeholder="Search teams..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {departments.map(department => (
            <button
              key={department}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterDepartment === department
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterDepartment(department)}
            >
              {department}
            </button>
          ))}
        </div>
        
        {filteredTeams.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No teams found matching your criteria.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map(team => (
              <div 
                key={team.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{team.name}</h2>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {team.department}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{team.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Performance</span>
                      <span>{team.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getPerformanceColor(team.performance)} h-2 rounded-full`}
                        style={{ width: `${team.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Members</p>
                        <p className="font-semibold">{team.members}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100 mr-3">
                        <BarChart2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Projects</p>
                        <p className="font-semibold">{team.activeProjects + team.completedProjects}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Lead: {team.lead}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                      View Team
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredTeams.map((team, index) => (
              <div key={team.id}>
                <div className="p-6 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold text-gray-800 mr-3">{team.name}</h2>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {team.department}
                          </span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Lead: {team.lead}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{team.description}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-blue-100 mr-3">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Members</p>
                            <p className="font-semibold">{team.members}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-green-100 mr-3">
                            <BarChart2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Active Projects</p>
                            <p className="font-semibold">{team.activeProjects}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-purple-100 mr-3">
                            <Calendar className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Completed</p>
                            <p className="font-semibold">{team.completedProjects}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-amber-100 mr-3">
                            <Briefcase className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Created</p>
                            <p className="font-semibold">{new Date(team.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:w-48">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Performance</span>
                        <span>{team.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className={`bg-gradient-to-r ${getPerformanceColor(team.performance)} h-2 rounded-full`}
                          style={{ width: `${team.performance}%` }}
                        ></div>
                      </div>
                      
                      <button className="text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 py-2 px-4 rounded-md flex items-center justify-center transition-all">
                        View Team
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                {index < filteredTeams.length - 1 && <div className="border-b border-gray-100"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsListingPage;