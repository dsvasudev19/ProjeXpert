const DataExport = () => {
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
                        <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition">
                            Export All Data (.csv)
                        </button>
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