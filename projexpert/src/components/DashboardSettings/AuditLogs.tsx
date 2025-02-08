

const AuditLogs = () => {
    return (

        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Audit Logs</h3>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search logs..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                />
                <select className="border border-gray-300 rounded-lg px-4 py-2">
                    <option>All Actions</option>
                    <option>Login</option>
                    <option>Settings Change</option>
                    <option>Project Creation</option>
                </select>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* Sample log entries */}
                        <tr>
                            <td className="px-6 py-4 text-sm text-gray-500">2024-02-20 10:30:15</td>
                            <td className="px-6 py-4 text-sm text-gray-900">john.doe@example.com</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Settings Update</td>
                            <td className="px-6 py-4 text-sm text-gray-500">Modified email configuration</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>

            {/* Export Button */}
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Export Audit Logs
            </button>
        </div>

    )
}

export default AuditLogs;