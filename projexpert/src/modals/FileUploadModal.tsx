import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';

const FileUploadModal = ({ isOpen, onClose, getFiles }: any) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [projectId, setProjectId] = useState<any>()
    const [isSubmitting, setIsSubmitting] = useState(false)


    if (!isOpen) return null;

    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileChange = (e: any) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true)
        if (selectedFile) {
            try {

                const formData = new FormData();
                formData.append("file", selectedFile)
                const res = await axiosInstance.post(`/admin/file/upload/${projectId}`, formData)
                if (res.status === 201) {
                    toast.success("File Uploaded Successfully")
                    onClose()
                    setSelectedFile(null)
                    
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsSubmitting(false)
                getFiles()
            }
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const projectId = queryParams.get('projectId');
        setProjectId(projectId)
    }, [])

    return (
        <>
            {
                isOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={onClose}
                    />

                    <div className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Upload File</h2>

                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`
                  relative border-2 border-dashed rounded-lg p-8
                  flex flex-col items-center justify-center
                  ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                  ${selectedFile ? 'bg-green-50' : 'hover:bg-gray-50'}
                  transition-colors duration-200
                `}
                        >
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            <Upload className={`w-10 h-10 mb-3 ${selectedFile ? 'text-green-500' : 'text-blue-500'}`} />

                            {selectedFile ? (
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-700">
                                        Drag and drop your file here or click to browse
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Supports any file format
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !selectedFile}
                                className={`
                    px-4 py-2 text-sm font-medium rounded-lg
                    ${selectedFile
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                    transition-colors
                  `}
                            >
                                {isSubmitting ? "Uploading....." : " Upload File"}
                            </button>
                        </div>
                    </div>
                </div>)
            }</>
    );
};

export default FileUploadModal;