import React, { useEffect, useState } from 'react';
import { FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axiosIntance';

const FileManagementMain: React.FC = () => {
  const [projects, setProjects] = useState<any>([]);

  const getAllProjects = async () => {
    try {
      const res = await axiosInstance.get("/admin/project?include=false&files=true");
      if (res.status === 200) {
        setProjects(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-gray-700">
          Projects
        </h1>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
          <FolderOpen className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">No projects available. Create a new project to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <Link
              key={project.id}
              to={`/dashboard/projects/files?projectId=${project.id}`}
              className="group bg-white p-2 rounded-lg border border-gray-50 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                  <FolderOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-gray-700">{project?.name}</h2>
                  <p className="text-xs text-gray-400">Last Modified: {new Date(project?.updatedAt).toDateString()}</p>
                </div>
              </div>

              <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-50">
                <div className="text-xs text-gray-500">
                  <span className="font-normal">{project?.Files?.length}</span> files
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileManagementMain;