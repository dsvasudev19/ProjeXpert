
import { useEffect, useState } from "react";
import { Plus, Mail, Phone, X, FolderGit2, ListTodo, Bug, Clock, Users, Edit, Trash2 } from "lucide-react";
import { axiosInstance } from "../axiosIntance";
import AddTeam from "../modals/AddTeam";
import AllocateMemberToTeam from "../modals/AllocateMemberToTeam";

const Team = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'dev'>('team');
  const [teams, setTeams] = useState<any>();
  const [developers, setDevelopers] = useState<any[]>([]);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [devLoading, setDevLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTeam = (teamId: number) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  const getAllTeams = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/team");
      if (res.status === 200) {
        setTeams(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllDevelopers = async () => {
    try {
      setDevLoading(true);
      const res = await axiosInstance.get("/admin/client/team/internal-only");
      if (res.status === 200) {
        setDevelopers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDevLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'team') {
      getAllTeams();
    } else {
      getAllDevelopers();
    }
  }, [activeTab]);

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {activeTab === 'team' ? 'Teams Overview' : 'Employees Overview'}
        </h1>
        <div className="flex gap-3">
          {activeTab === 'team' && (
            <>
              <button
                onClick={() => setShowAddTeamModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Users className="w-4 h-4" />
                New Team
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'team' 
            ? 'text-blue-500 border-b-2 border-blue-500' 
            : 'text-gray-500 hover:text-gray-700'}`}
        >
          Team Overview
        </button>
        <button
          onClick={() => setActiveTab('dev')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'dev' 
            ? 'text-blue-500 border-b-2 border-blue-500' 
            : 'text-gray-500 hover:text-gray-700'}`}
        >
          Dev Overview
        </button>
      </div>

      {activeTab === 'team' ? (
        <>
        {!expandedTeamId ? (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div 
                key={index}
                className="bg-white p-2 rounded-lg border border-gray-50 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-50">
                  <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams?.map((team: any) => (
              <div
                key={team?.id}
                onClick={() => toggleTeam(team?.id)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-blue-100 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-green-500 via-blue-500 to-blue-500"></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {team?.name}
                    </h2>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600 font-medium">{team?.TeamMembers?.length}</span>
                    </div>
                  </div>

                  <p className="text-gray-600">{team?.description}</p>

                  <div className="pt-4 border-t border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-500">Team Lead:</div>
                      <div className="text-sm font-medium text-blue-600">{team?.Lead?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          {teams?.filter((team: any) => team?.id === expandedTeamId)?.map((team: any) => (
            <div key={team.id}>
              <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {team?.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{team?.description}</p>
                  </div>
                  <button
                    onClick={() => setExpandedTeamId(null)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-blue-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {team?.TeamMembers?.map((member: any) => (
                    <div
                      key={member?.id}
                      className="bg-white p-6 rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => setSelectedMember(member)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-blue-500 flex items-center justify-center text-white text-lg font-medium shadow-md">
                          {member?.User?.name.split(" ")[0].charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{member?.User?.name}</h3>
                          <p className="text-blue-600">{member?.position}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-green-500" />
                          {member?.User?.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-blue-100">
            <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-blue-500 flex items-center justify-center text-white text-xl font-medium shadow-lg">
                    {selectedMember?.User?.name.split(" ")[0].charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {selectedMember?.User?.name}
                    </h2>
                    <p className="text-blue-600">{selectedMember?.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMember?.projects?.map((project: any) => (
                      <div
                        key={project?.id}
                        className={`p-4 rounded-lg border ${project?.status === "in-progress"
                            ? "bg-green-50 border-green-100"
                            : "bg-blue-50 border-blue-100"
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <FolderGit2 className={`w-5 h-5 ${project?.status === "in-progress" ? "text-green-500" : "text-blue-500"
                            }`} />
                          <h4 className="font-medium text-gray-800">{project?.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <ListTodo className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{project?.tasks} Tasks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{project?.bugs} Bugs</span>
                          </div>
                          <div className="text-green-600 font-medium">{project?.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-gray-800">Email</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMember?.User?.email}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-800">Phone</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMember?.User?.phone}</p>
                  </div>
                  {/* <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-800">Department</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMember?.department}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
        </>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Joining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : developers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No developers found
                    </td>
                  </tr>
                ) : (
                  developers?.map((developer:any) => (
                    <tr key={developer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-200 via-green-300 to-blue-500 rounded-full flex items-center justify-center text-white">
                            {developer.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{developer.name}</div>
                            <div className="text-xs text-gray-500">{developer.role?.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{developer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{developer.userType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(developer.doj).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals (keep existing modal code) */}
      {showAddTeamModal && (
        <AddTeam
          isOpen={showAddTeamModal}
          onClose={() => setShowAddTeamModal(false)}
          getTeams={getAllTeams}
        />
      )}
      {isModalOpen && (
        <AllocateMemberToTeam
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshData={getAllTeams}
        />
      )}
      {/* Member Profile Modal (keep existing code) */}
    </div>
  );
};

export default Team;