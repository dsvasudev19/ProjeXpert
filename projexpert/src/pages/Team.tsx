import { useState } from "react";
import { Plus, Mail, Phone, Building2, X, FolderGit2, ListTodo, Bug, Clock, CheckCircle } from "lucide-react";

const Team = () => {
  const [teamMembers] = useState<any>([
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer", 
      email: "john@example.com",
      phone: "+1 234-567-8901",
      department: "Engineering",
      avatar: "JD",
      projects: {
        current: [
          {id: 1, name: "Project Alpha", role: "Lead Developer", tasks: 5, bugs: 2},
          {id: 2, name: "Project Beta", role: "Developer", tasks: 3, bugs: 1}
        ],
        completed: [
          {id: 3, name: "Project Gamma", role: "Developer", tasks: 8, bugs: 3}
        ]
      }
    },
    {
      id: 2,
      name: "Jane Smith", 
      role: "UI/UX Designer",
      email: "jane@example.com",
      phone: "+1 234-567-8902",
      department: "Design",
      avatar: "JS",
      projects: {
        current: [
          {id: 1, name: "Project Alpha", role: "Lead Designer", tasks: 4, bugs: 0}
        ],
        completed: [
          {id: 4, name: "Project Delta", role: "Designer", tasks: 6, bugs: 1}
        ]
      }
    },
    {
      id: 3,
      name: "Mike Wilson",
      role: "Backend Developer",
      email: "mike@example.com", 
      phone: "+1 234-567-8903",
      department: "Engineering",
      avatar: "MW",
      projects: {
        current: [
          {id: 2, name: "Project Beta", role: "Lead Developer", tasks: 6, bugs: 3}
        ],
        completed: [
          {id: 5, name: "Project Epsilon", role: "Developer", tasks: 7, bugs: 2}
        ]
      }
    },
    {
      id: 4,
      name: "Sarah Brown",
      role: "Project Manager",
      email: "sarah@example.com",
      phone: "+1 234-567-8904",
      department: "Management",
      avatar: "SB",
      projects: {
        current: [
          {id: 1, name: "Project Alpha", role: "Project Manager", tasks: 12, bugs: 4},
          {id: 2, name: "Project Beta", role: "Project Manager", tasks: 8, bugs: 3}
        ],
        completed: [
          {id: 3, name: "Project Gamma", role: "Project Manager", tasks: 15, bugs: 5}
        ]
      }
    }
  ]);

  const [selectedMember, setSelectedMember] = useState<any>(null);

  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Our Team
        </h1>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {teamMembers.map((member:any) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium">
                  {member.avatar}
                </div>
                <div className="text-white">
                  <h3 className="text-sm font-medium leading-tight">{member.name}</h3>
                  <p className="text-xs text-white/80">{member.role}</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 space-y-2 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-gray-600 truncate">{member.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs text-gray-600">{member.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-gray-600">{member.department}</span>
              </div>
            </div>

            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => setSelectedMember(member)}
                className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-xl font-medium">
                    {selectedMember.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMember.name}</h2>
                    <p className="text-gray-500">{selectedMember.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Current Projects
                  </h3>
                  <div className="space-y-3">
                    {selectedMember.projects.current.map((project:any) => (
                      <div key={project.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                          <FolderGit2 className="w-5 h-5 text-blue-500" />
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <ListTodo className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{project.tasks} Tasks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-red-500" />
                            <span className="text-gray-600">{project.bugs} Bugs</span>
                          </div>
                          <div className="text-blue-600">{project.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Completed Projects
                  </h3>
                  <div className="space-y-3">
                    {selectedMember.projects.completed.map((project:any) => (
                      <div key={project.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                          <FolderGit2 className="w-5 h-5 text-green-500" />
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <ListTodo className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{project.tasks} Tasks</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4 text-red-500" />
                            <span className="text-gray-600">{project.bugs} Bugs</span>
                          </div>
                          <div className="text-blue-600">{project.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-800">Email</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedMember.email}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-800">Phone</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedMember.phone}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-800">Department</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedMember.department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
