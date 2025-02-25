import { useState } from "react";

type RequestStatus = 'Pending' | 'Approved' | 'Denied';

interface Request {
    id: number;
    title: string;
    status: RequestStatus;
}


const PermissionRequests = () => {
    const [permissionRequests, setPermissionRequests] = useState<Request[]>([
        { id: 1, title: 'Admin Access', status: 'Denied' },
        { id: 2, title: 'Edit Permissions', status: 'Pending' },
    ]);


    const statusStyles: Record<RequestStatus, { bg: string; text: string; border: string; label: string }> = {
        Pending: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-200',
            label: '⏳ Pending'
        },
        Approved: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-200',
            label: '✓ Approved'
        },
        Denied: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-200',
            label: '✕ Denied'
        }
    };







    const handlePermissionRequest = (e: any) => {
        e.preventDefault();
        alert('Permission request submitted!');
    };



    const handleCancelPermissionRequest = (id: number) => {
        setPermissionRequests(prev => prev.filter(request => request.id !== id));
    };


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Permission Requests</h3>
            <form onSubmit={handlePermissionRequest} className="space-y-6">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Title</label>
                    <input
                        type="text"
                        placeholder="e.g., Admin Access"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        rows={4}
                        placeholder="Explain why you need this permission..."
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Submit Request
                </button>
            </form>
            <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Previous Requests</h4>
                <div className="space-y-4">
                    {permissionRequests.map((request) => (
                        <div
                            key={request.id}
                            className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-800">{request.title}</p>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${statusStyles[request.status].bg} 
                        ${statusStyles[request.status].text}`}
                                        >
                                            {statusStyles[request.status].label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">Requested on {new Date().toLocaleDateString()}</p>
                                </div>
                                {request.status === 'Pending' && (
                                    <button
                                        onClick={() => handleCancelPermissionRequest(request.id)}
                                        className="px-3 py-1 rounded-md border border-red-200 text-red-600 
                      hover:bg-red-50 hover:text-red-700 text-sm transition-colors duration-200"
                                    >
                                        Cancel Request
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PermissionRequests;