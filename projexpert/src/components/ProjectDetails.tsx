import { AlertCircle, Bug, CheckCircle, ChevronDown, ChevronUp, Clock, FileText, FolderGit2, ListTodo, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosIntance";
import AddTask from "../modals/AddTask";
import ReportBugModal from "../modals/ReportBug";
import toast from "react-hot-toast";

const RenderProjectDetails = ({ projectId }: any) => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [closeBugModalOpen, setCloseBugModalOpen] = useState<any>(false)
    const [showAllTasks, setShowAllTasks] = useState(false)
    const [showAllFiles, setShowAllFiles] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [openReportBugModal, setOpenReportBugModal] = useState(false)
    const [resolution, setResolution] = useState<string>('');
    const [bugId, setBugId] = useState<any>()

    const dummyProjects = [
        {
            id: 1,
            name: 'Project Alpha',
            status: 'active',
            members: [
                { id: 1, name: 'John Doe', role: 'Lead Developer', avatar: 'JD' },
                { id: 2, name: 'Jane Smith', role: 'Designer', avatar: 'JS' },
            ],
            tasks: [
                { id: 1, title: 'Implement Authentication', status: 'in-progress', assignee: 'John Doe' },
                { id: 2, title: 'Design Homepage', status: 'completed', assignee: 'Jane Smith' },
            ],
            files: [
                { id: 1, name: 'Project Specs.pdf', size: '2.5MB', uploadedBy: 'John Doe', uploadedAt: '2 days ago' },
                { id: 2, name: 'Design Assets.zip', size: '15MB', uploadedBy: 'Jane Smith', uploadedAt: '1 day ago' }
            ],
            bugs: [
                { id: 1, title: 'Login button not working', severity: 'high', status: 'open' },
                { id: 2, title: 'CSS layout breaks on mobile', severity: 'medium', status: 'open' },
                { id: 3, title: 'Console errors in dashboard', severity: 'low', status: 'open' },
            ]
        },
        { id: 2, name: 'Project Beta', status: 'on-hold', members: [], tasks: [], files: [], bugs: [] },
        { id: 3, name: 'Project Gamma', status: 'completed', members: [], tasks: [], files: [], bugs: [] },
    ];


    const getBugSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'text-red-500 bg-red-50';
            case 'medium': return 'text-orange-500 bg-orange-50';
            case 'low': return 'text-yellow-500 bg-yellow-50';
            case 'critical': return 'text-orange-500 bg-orange-50';
            default: return 'text-gray-500 bg-gray-50';
        }
    };

    const getBugStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-red-100 text-red-600';
            case 'resolved': return 'bg-green-100 text-green-600';
            case 'in-progress': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getProjectDetailsById = async (projectId: number) => {
        try {
            console.log(loading)
            setLoading(true)
            const res = await axiosInstance.get(`/admin/project/${projectId}`)
            if (res.status === 200) {
                setSelectedProject(res.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Effect to update selected project when projectId changes
    useEffect(() => {
        const project = dummyProjects.find(p => p.id === projectId);
        setSelectedProject(project || null);
        getProjectDetailsById(projectId)
    }, [projectId]);

    // Function to handle bug resolution submission
    const closeBug = async () => {
        try {
            // Make API request to submit the resolution
            const res = await axiosInstance.patch(`/admin/bug/resolve/${bugId}`, { resolution });
            if (res.status === 200) {
                // Optionally, refresh project details or handle success
                getProjectDetailsById(projectId);
                toast.success("Bug Closed Successfully")
            }
        } catch (error) {
            console.error("Error submitting resolution:", error);
        } finally {
            setCloseBugModalOpen(false); // Close the modal after submission
            setResolution(''); // Clear the resolution state
        }
    };

    if (!selectedProject) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                    <FolderGit2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">Select a project to view details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 mb-16">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <FolderGit2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
                        <p className="text-gray-500 mt-1">Last updated 2 days ago</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                        <Users className="w-5 h-5" />
                        <span>Add Member</span>
                    </button>
                    <button onClick={() => { setShowAddTaskModal(true) }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                        <Plus className="w-5 h-5" />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
                <div
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
                    onClick={() => setExpandedSection(expandedSection === 'team' ? null : 'team')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            <span className="text-purple-600 font-medium">Team</span>
                        </div>
                        {expandedSection === 'team' ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-purple-600" />}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selectedProject?.TeamMembers?.length}</p>
                </div>

                <div
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
                    onClick={() => setExpandedSection(expandedSection === 'tasks' ? null : 'tasks')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <ListTodo className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-600 font-medium">Total Tasks</span>
                        </div>
                        {expandedSection === 'tasks' ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selectedProject?.Tasks?.length}</p>
                </div>

                <div
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
                    onClick={() => setExpandedSection(expandedSection === 'files' ? null : 'files')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-600 font-medium">Files</span>
                        </div>
                        {expandedSection === 'files' ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selectedProject?.Files?.length}</p>
                </div>

                <div
                    className="bg-gradient-to-br from-rose-50 to-orange-50 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
                    onClick={() => setExpandedSection(expandedSection === 'bugs' ? null : 'bugs')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <Bug className="w-5 h-5 text-rose-600" />
                            <span className="text-rose-600 font-medium">Active Bugs</span>
                        </div>
                        {expandedSection === 'bugs' ? <ChevronUp className="w-5 h-5 text-rose-600" /> : <ChevronDown className="w-5 h-5 text-rose-600" />}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{selectedProject?.Bugs?.length}</p>
                </div>
            </div>

            {expandedSection && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    {expandedSection === 'team' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Team Members</h3>
                                <button className="text-blue-500 hover:text-blue-600">View All</button>
                            </div>
                            <div className="space-y-3">
                                {selectedProject?.TeamMembers?.map((member: any) => (
                                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                                {member.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-gray-500">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {expandedSection === 'tasks' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Tasks</h3>
                                <button
                                    onClick={() => setShowAllTasks(!showAllTasks)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    {showAllTasks ? 'Show Less' : 'View All'}
                                </button>
                            </div>
                            <div className="space-y-3">
                                {(showAllTasks ? selectedProject?.Tasks : selectedProject?.Tasks?.slice(0, 3))?.map((task: any) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${task.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                                                {task.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-blue-600" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">{task.title}</p>
                                                <p className="text-sm text-gray-500">Assigned to: {task?.Assignee?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {expandedSection === 'files' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Project Files</h3>
                                <button
                                    onClick={() => setShowAllFiles(!showAllFiles)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    {showAllFiles ? 'Show Less' : 'View All'}
                                </button>
                            </div>
                            <div className="space-y-3">
                                {(showAllFiles ? selectedProject?.Files : selectedProject?.Files?.slice(0, 3))?.map((file: any) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-emerald-100">
                                                <FileText className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-sm text-gray-500">Size: {Math.ceil(file.size / 1024)} MB</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {file.uploadedAt}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {expandedSection === 'bugs' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Active Bugs</h3>
                                <button onClick={() => setOpenReportBugModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                    <Plus className="w-4 h-4" />
                                    <span>Report Bug</span>
                                </button>
                                {
                                    openReportBugModal && <ReportBugModal
                                        isOpen={openReportBugModal}
                                        onClose={() => setOpenReportBugModal(false)}
                                        onSubmit={() => { getProjectDetailsById(projectId) }}
                                        proId={selectedProject?.id}
                                    />
                                }
                            </div>
                            <div className="space-y-3">
                                {selectedProject?.Bugs?.map((bug: any) => (
                                    <div key={bug.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${getBugSeverityColor(bug.severity)}`}>
                                                <AlertCircle className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between">
                                                    <p className="font-medium">{bug.title}</p>
                                                    <p className={`text-sm ${getBugSeverityColor(bug?.priority)} rounded p-1`}>Severity: {bug?.priority}</p>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{bug.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBugStatusColor(bug.status)}`}>
                                                {bug?.status}
                                            </span>
                                            <button
                                                onClick={() => { setBugId(bug?.id); setCloseBugModalOpen(true) }}
                                                className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                                title="Mark as Resolved"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Close Bug Modal */}
                            {closeBugModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
                                        <h3 className="text-xl font-semibold mb-4">Close Bug</h3>
                                        <textarea
                                            value={resolution}
                                            onChange={(e) => setResolution(e.target.value)}
                                            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                                            placeholder="Enter closing notes..."
                                        />
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button
                                                onClick={() => setCloseBugModalOpen(false)}
                                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={closeBug}
                                                className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>John added a new task</span>
                            <span className="text-gray-400">2h ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>Bug #123 was resolved</span>
                            <span className="text-gray-400">5h ago</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>65%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Tasks Completed</span>
                                <span>24/40</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showAddTaskModal && <AddTask showAddModal={showAddTaskModal} getTasks={getProjectDetailsById} closeModal={() => { setShowAddTaskModal(false) }} proId={projectId} />
            }
        </div>
    );
};

export default RenderProjectDetails;