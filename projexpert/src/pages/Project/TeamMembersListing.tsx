import { useState } from 'react';
import { Search, Mail, Phone,  Briefcase, MapPin,  ArrowLeft, Filter, User, Clock, ChevronDown } from 'lucide-react';

// Sample team members data (unchanged from your input)
const sampleMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    position: "Frontend Developer",
    department: "Engineering",
    email: "alex.morgan@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2023-03-15",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    projects: 8,
    avatar: "/api/placeholder/150/150",
    status: "Active",
    experience: "4 years"
  },
  {
    id: 2,
    name: "Jamie Chen",
    position: "UX Designer",
    department: "Design",
    email: "jamie.chen@company.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "2023-05-20",
    skills: ["Figma", "User Research", "Prototyping"],
    projects: 12,
    avatar: "/api/placeholder/150/150",
    status: "Active",
    experience: "6 years"
  },
  {
    id: 3,
    name: "Taylor Reeves",
    position: "DevOps Engineer",
    department: "Engineering",
    email: "taylor.reeves@company.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinDate: "2023-02-10",
    skills: ["AWS", "Docker", "CI/CD"],
    projects: 5,
    avatar: "/api/placeholder/150/150",
    status: "On Leave",
    experience: "3 years"
  },
  {
    id: 4,
    name: "Jordan Smith",
    position: "Marketing Manager",
    department: "Marketing",
    email: "jordan.smith@company.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    joinDate: "2022-11-05",
    skills: ["SEO", "Content Strategy", "Analytics"],
    projects: 10,
    avatar: "/api/placeholder/150/150",
    status: "Active",
    experience: "7 years"
  },
  {
    id: 5,
    name: "Casey Wong",
    position: "Data Analyst",
    department: "Analytics",
    email: "casey.wong@company.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    joinDate: "2023-06-15",
    skills: ["SQL", "Python", "Data Visualization"],
    projects: 6,
    avatar: "/api/placeholder/150/150",
    status: "Active",
    experience: "2 years"
  },
  {
    id: 6,
    name: "Riley Johnson",
    position: "Support Specialist",
    department: "Operations",
    email: "riley.johnson@company.com",
    phone: "+1 (555) 678-9012",
    location: "Denver, CO",
    joinDate: "2023-01-20",
    skills: ["Customer Service", "Technical Support", "CRM"],
    projects: 4,
    avatar: "/api/placeholder/150/150",
    status: "Active",
    experience: "5 years"
  }
];

const TeamMembersListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Operations', 'Analytics'];
  const statuses = ['All', 'Active', 'On Leave', 'Remote'];
  
  const filteredMembers = sampleMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  const getStatusColor = (status:any) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'On Leave': return 'bg-amber-100 text-amber-700';
      case 'Remote': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button className="flex items-center mr-4 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Teams</span>
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Team Members
          </h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name, position, or department..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="h-1 w-1 bg-current rounded-sm"></div>
                    <div className="h-1 w-1 bg-current rounded-sm"></div>
                    <div className="h-1 w-1 bg-current rounded-sm"></div>
                    <div className="h-1 w-1 bg-current rounded-sm"></div>
                  </div>
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="h-0.5 w-4 bg-current rounded-sm"></div>
                    <div className="h-0.5 w-4 bg-current rounded-sm"></div>
                    <div className="h-0.5 w-4 bg-current rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="flex flex-wrap gap-2">
                  {departments.map(department => (
                    <button
                      key={department}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filterDepartment === department
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setFilterDepartment(department)}
                    >
                      {department}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filterStatus === status
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No team members found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h2>
                      <p className="text-sm text-gray-600">{member.position}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{member.department}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{member.experience}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{member.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{member.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{member.location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 font-semibold text-sm">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Position</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Contact</div>
              <div className="col-span-1">Experience</div>
              <div className="col-span-2">Skills</div>
            </div>
            {filteredMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={`grid grid-cols-12 gap-4 p-6 hover:bg-blue-50 transition-colors ${
                  index !== filteredMembers.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="col-span-3 flex items-center">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 mr-3"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-gray-800">{member.name}</h2>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {member.position}
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                  {member.department}
                </div>
                <div className="col-span-2 flex flex-col text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    {member.phone}
                  </div>
                </div>
                <div className="col-span-1 flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  {member.experience}
                </div>
                <div className="col-span-2 flex flex-wrap items-center gap-2">
                  {member.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )})
      </div>
    </div>
  );
};

export default TeamMembersListingPage;