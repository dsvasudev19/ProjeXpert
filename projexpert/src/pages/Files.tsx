import React from 'react';
import { FileText, CloudDownload, Eye, Plus } from 'lucide-react';

const files = [
  { id: '1', name: 'Document.docx', type: 'Word Document', createdAt: '2025-01-01' },
  { id: '2', name: 'Presentation.pptx', type: 'PowerPoint Presentation', createdAt: '2025-01-02' },
];

const FileManagementFolder: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Alpha</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-300 to-blue-300 text-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Add File</span>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {files.map((file) => (
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
              Created: {file.createdAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManagementFolder;
