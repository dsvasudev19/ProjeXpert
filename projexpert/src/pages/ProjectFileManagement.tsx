import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { id: '1', name: 'Project Alpha', lastModified: '2025-01-10', files: 12, members: 5 },
  { id: '2', name: 'Project Beta', lastModified: '2025-01-09', files: 8, members: 3 },
  // Add more projects
];

const FileManagementMain: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-gray-700">
          Projects
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-300 to-blue-300 text-gray-700 rounded-lg hover:shadow-md transition-all duration-300">
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
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
                <h2 className="text-base font-medium text-gray-700">{project.name}</h2>
                <p className="text-xs text-gray-400">Last Modified: {project.lastModified}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
              <div className="text-xs text-gray-500">
                <span className="font-normal">{project.files}</span> files
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-normal">{project.members}</span> members
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FileManagementMain;
