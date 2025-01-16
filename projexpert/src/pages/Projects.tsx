import { useEffect, useState } from 'react';
import { CheckCircle, PauseCircle, Clock, Plus } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';
import AddProject from '../modals/AddProject';
import RenderProjectDetails from '../components/ProjectDetails';


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectsLoading, setProjectsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<any>([])

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }


  const getAllProjects = async () => {
    try {
      setProjectsLoading(true)
      const res = await axiosInstance.get("/admin/project")
      if (res.status === 200) {
        setProjects(res.data)
      }
      // setProjects(dummyProjects)
    } catch (error) {
      console.log(error)
    } finally {
      setProjectsLoading(false)
    }
  }




  useEffect(() => {
    getAllProjects()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-5 h-5 text-emerald-500" />;
      case 'on-hold': return <PauseCircle className="w-5 h-5 text-amber-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };


  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="space-y-2">
          {projectsLoading ? <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div> : projects.map((project: any) => (
            <div
              key={project.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedProject === project.id
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm'
                : 'hover:bg-gray-50'
                }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(project.status)}
                <span className="font-medium text-gray-700">{project.name}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {selectedProject && <RenderProjectDetails projectId={selectedProject} />}
      </main>

      {isModalOpen && <AddProject isModalOpen={isModalOpen} getProjects={getAllProjects} closeModal={closeProjectModal} />}
    </div>
  );
}

export default Projects;
