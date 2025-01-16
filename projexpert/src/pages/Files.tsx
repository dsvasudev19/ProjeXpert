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
  const [loadingFiles, setLoadingFiles] = useState(false)

  const getAllFiles = async (id: any) => {
    try {
      setLoadingFiles(true)
      const res = await axiosInstance.get(`/admin/file/project/${id}`);
      if (res.status === 200) {
        setFiles(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFiles(false)
    }
  };

  const handleDownload = async (fileId: number) => {
    try {
      const response = await axiosInstance.get(`/admin/file/${fileId}/download`, {
        responseType: 'blob', // Important for file download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file_${fileId}`); // You can customize the filename here
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
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
        {loadingFiles ? <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div> : files.map((file: any) => (
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
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors" onClick={() => handleDownload(file.id)}>
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
