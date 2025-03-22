
const Badge = ({ text, type, category }: { text: string; type: 'status' | 'priority' | 'category'; category: string }) => {
    const getColorClasses = () => {
        if (type === 'status') {
            const statusColors: Record<string, string> = {
                'Open': 'bg-blue-100 text-blue-800',
                'In Progress': 'bg-yellow-100 text-yellow-800',
                'Resolved': 'bg-green-100 text-green-800',
                'Closed': 'bg-gray-100 text-gray-800',
                'Reopened': 'bg-purple-100 text-purple-800'
            };
            return statusColors[category] || 'bg-gray-100 text-gray-800';
        } else if (type === 'priority') {
            const priorityColors: Record<string, string> = {
                'Low': 'bg-green-100 text-green-800',
                'Medium': 'bg-blue-100 text-blue-800',
                'High': 'bg-orange-100 text-orange-800',
                'Critical': 'bg-red-100 text-red-800'
            };
            return priorityColors[category] || 'bg-gray-100 text-gray-800';
        } else {
            const categoryColors: Record<string, string> = {
                'Technical': 'bg-indigo-100 text-indigo-800',
                'Billing': 'bg-purple-100 text-purple-800',
                'Feature Request': 'bg-cyan-100 text-cyan-800',
                'Bug': 'bg-rose-100 text-rose-800',
                'Other': 'bg-gray-100 text-gray-800'
            };
            return categoryColors[category] || 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`text-xs px-2 py-0.5 rounded-full ${getColorClasses()}`}>
            {text}
        </span>
    );
};

export default Badge;