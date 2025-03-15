import { useEffect, useState } from 'react';
import { Search, Users, Grid, List, } from 'lucide-react';
import CreateTeamModal from '../../modals/CreateTeamModal';
import TeamListViewCard from '../../components/Cards/TeamListViewCard';
import TeamGridViewCard from '../../components/Cards/TeamGridViewCard';
import { axiosInstance } from '../../axiosIntance';


const TeamsListingPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [newTeamModalOpen, setNewTeamModalOpen] = useState(false);
  const [teams,setTeams]=useState<any>([])
  // const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Operations', 'Analytics'];
  const [departments,setDepartments]=useState<any>([])

  const filteredTeams = teams.filter((team:any) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.Lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || team.Department.name === filterDepartment;
    return matchesSearch && matchesDepartment;
  });


  const getAllDepartments=async()=>{
    try {
      const res=await axiosInstance.get("/admin/department")
      if(res.status===200){
        setDepartments(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllTeams=async()=>{
    try {
      const res=await axiosInstance.get("/admin/team")
      if(res.status===200){
        setTeams(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllDepartments()
    getAllTeams();
  },[])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 h-full overflow-auto mb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Teams Directory
          </h1>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setNewTeamModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Users className="w-4 h-4" />
              New Team
            </button>
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

        <div className="flex gap-4 mb-6 w-full overflow-auto custom-scrollbar">
          {departments.map((department:any) => (
            <button
              key={department.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${filterDepartment === department
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
              onClick={() => setFilterDepartment(department?.name)}
            >
              {department?.name}
            </button>
          ))}
        </div>

        {filteredTeams.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No teams found matching your criteria.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team:any,index:any) => (
              <TeamGridViewCard {...team} key={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredTeams.map((team:any,index:any) => (
              <TeamListViewCard {...team} key={index} />
            ))}
          </div>
        )}

        <CreateTeamModal
          isOpen={newTeamModalOpen}
          onClose={() => setNewTeamModalOpen(false)}
          onTeamCreated={() => {getAllTeams()}}
        />
      </div>
    </div>
  );
};

export default TeamsListingPage;