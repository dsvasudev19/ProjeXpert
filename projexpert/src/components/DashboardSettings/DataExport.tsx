import toast from "react-hot-toast"
import { axiosInstance } from "../../axiosIntance"
import { useEffect, useState } from "react";

const DataExport = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [exportType, setExportType] = useState('all');

  
    const exportData = async () => {

        try {
            setLoading(true);
            setError(null);

            // Make API request to the export endpoint
            const response = await axiosInstance.get(`/admin/export/${exportType}`, {
                responseType: 'blob', // Important: tells axios to expect a binary response
            });

            if(response.status===200){
                toast.success("Data exported Successfully");
            }
            // Create a blob from the response data
            const blob = new Blob([response.data]);

            // Get filename from Content-Disposition header if available
            const contentDisposition = response.headers['content-disposition'];
            let filename = `${exportType}_export_${Date.now()}.csv`; // Default filename

            if (exportType === 'all') {
                filename = `all_data_export_${Date.now()}.zip`;
            }

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (err: any) {
            setError('Failed to export data: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        setExportType("all");
    },[])

    return (
        <div>
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Advanced Configuration</h3>
                <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-red-50">
                        <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-700">Permanently delete all project data</p>
                                <p className="text-xs text-red-600">This action cannot be undone</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                Delete All Data
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Export</label>
                        <button disabled={loading} className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition" onClick={exportData}>
                            Export All Data (.csv)
                        </button>
                        <p className="text-red-700">{error}</p>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reset Defaults</label>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                            Restore Factory Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataExport;