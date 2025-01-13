import React, { useEffect, useState } from 'react';
import { FileText, CloudDownload, Eye, Plus, ArrowLeft } from 'lucide-react'; // Importing the back icon
import FileUploadModal from '../modals/FileUploadModal';
import { axiosInstance } from '../axiosIntance';
import { useNavigate } from 'react-router-dom'; // Importing useHistory for navigation

const FileManagementFolder: React.FC = () => {
  const [files, setFiles] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState<any>(false)
  const [projectId, setProjectId] = useState<any>()
  const history = useNavigate(); // Using useHistory to navigate

  const getAllFiles = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/admin/file/project/${id}`);
      if (res.status === 200) {
        setFiles(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const foundId = queryParams.get('projectId');
    if (foundId) {
      setProjectId(foundId)
      getAllFiles(foundId)
    }
  }, [])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => history(-1)} // Navigate back on click
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Project Files</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-300 to-blue-300 text-gray-800 rounded-lg hover:shadow-lg transition-all duration-300" onClick={() => { setIsModalOpen(true) }}>
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add File</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {files.map((file: any) => (
          <div
            key={file.id}
            className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-slate-900 truncate">{file.name}</h2>
                <p className="text-xs text-slate-500">{file.type}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-green-600 transition-colors">
                  <CloudDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Created: {new Date(file.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      {
        isModalOpen && <FileUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          getFiles={() => { getAllFiles(projectId) }}
        />
      }
    </div>
  );
};

export default FileManagementFolder;
