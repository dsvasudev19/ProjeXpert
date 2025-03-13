import React, { useState } from 'react';
import { BugIcon, CalendarIcon, CheckIcon, UserIcon, AlertCircleIcon, Edit, Eye, Trash2 } from 'lucide-react'; // Assuming Lucide icons
import DynamicTabularComponent from '../../components/shared/DynamicTabularComponent';

// Define the Bug interface
interface Bug {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reporter: string;
  assignee: string;
  reportedDate: string;
  dueDate: string;
  resolutionTime?: string; // Optional, only for resolved/closed bugs
  tags: string[];
}

const BugsOverview: React.FC = () => {
  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Column definitions
  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      key: 'title',
      header: 'Bug Title',
      sortable: true,
      render: (row: Bug) => (
        <div className="font-medium">{row.title}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Bug) => {
        const statusClasses = {
          open: 'bg-red-100 text-red-800',
          in_progress: 'bg-blue-100 text-blue-800',
          resolved: 'bg-green-100 text-green-800',
          closed: 'bg-gray-100 text-gray-800',
        };
        
        const statusLabels = {
          open: 'Open',
          in_progress: 'In Progress',
          resolved: 'Resolved',
          closed: 'Closed',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[row.status]}`}>
            {statusLabels[row.status]}
          </span>
        );
      },
    },
    {
      key: 'severity',
      header: 'Severity',
      sortable: true,
      render: (row: Bug) => {
        const severityClasses = {
          low: 'bg-green-100 text-green-800',
          medium: 'bg-yellow-100 text-yellow-800',
          high: 'bg-orange-100 text-orange-800',
          critical: 'bg-red-100 text-red-800',
        };
        
        const severityLabels = {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          critical: 'Critical',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${severityClasses[row.severity]}`}>
            {severityLabels[row.severity]}
          </span>
        );
      },
    },
    {
      key: 'reporter',
      header: 'Reported By',
      sortable: true,
      render: (row: Bug) => (
        <div className="flex items-center">
          <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
          <span>{row.reporter}</span>
        </div>
      ),
    },
    {
      key: 'assignee',
      header: 'Assignee',
      sortable: true,
      render: (row: Bug) => (
        <div className="flex items-center">
          <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
          <span>{row.assignee || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (row: Bug) => (
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
          <span>{new Date(row.dueDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'resolutionTime',
      header: 'Resolution Time',
      sortable: true,
      render: (row: Bug) => (
        <div className="flex items-center">
          {row.resolutionTime ? (
            <>
              <CheckIcon className="w-4 h-4 mr-1 text-green-500" />
              <span>{new Date(row.resolutionTime).toLocaleDateString()}</span>
            </>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (row: Bug) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center">
              <BugIcon className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      ),
    },
  ];

  // Action buttons
  const actions = [
    {
      type: 'edit',
      label: 'Edit',
      icon:<Edit className='w-4 h-4' />,
      onClick: (row: Bug) => {
        console.log('Edit bug', row.id);
        // Implement edit functionality here
      },
    },
    {
      type: 'view',
      label: 'View',
      icon:<Eye className='w-4 h-4' />,
      onClick: (row: Bug) => {
        console.log('View bug', row.id);
        // Implement view functionality here
      },
    },
    {
      type: 'delete',
      label: 'Delete',
      icon:<Trash2 className='w-4 h-4' />,
      onClick: (row: Bug) => {
        console.log('Delete bug', row.id);
        // Implement delete functionality here
      },
    },
  ];

  // Filter dropdowns
  const dropdowns = [
    {
      label: 'Status',
      key: 'status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' },
      ],
    },
    {
      label: 'Severity',
      key: 'severity',
      options: [
        { value: 'all', label: 'All Severities' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' },
      ],
    },
  ];

  // Sample data
  const bugs: Bug[] = [
    {
      id: 1,
      title: 'Login page crash on invalid input',
      description: 'App crashes when user enters invalid email format',
      status: 'resolved',
      severity: 'high',
      reporter: 'John Doe',
      assignee: 'Sarah Johnson',
      reportedDate: '2025-03-01',
      dueDate: '2025-03-10',
      resolutionTime: '2025-03-08',
      tags: ['frontend', 'crash'],
    },
    {
      id: 2,
      title: 'API returns 500 on large payload',
      description: 'Server error when submitting large data sets',
      status: 'in_progress',
      severity: 'critical',
      reporter: 'Mike Chen',
      assignee: 'Alex Wong',
      reportedDate: '2025-03-05',
      dueDate: '2025-03-15',
      tags: ['backend', 'api'],
    },
    {
      id: 3,
      title: 'UI misalignment in dark mode',
      description: 'Buttons misaligned in dark theme on mobile',
      status: 'open',
      severity: 'medium',
      reporter: 'Lisa Park',
      assignee: 'Ryan Lee',
      reportedDate: '2025-03-07',
      dueDate: '2025-03-20',
      tags: ['frontend', 'ui/ux'],
    },
    {
      id: 4,
      title: 'Database query timeout',
      description: 'Slow query causes timeout on reports page',
      status: 'in_progress',
      severity: 'high',
      reporter: 'Emily Davis',
      assignee: 'Alex Wong',
      reportedDate: '2025-03-09',
      dueDate: '2025-03-18',
      tags: ['backend', 'performance'],
    },
    {
      id: 5,
      title: 'Broken link in footer',
      description: 'Privacy policy link returns 404',
      status: 'closed',
      severity: 'low',
      reporter: 'John Smith',
      assignee: 'Mike Chen',
      reportedDate: '2025-03-10',
      dueDate: '2025-03-12',
      resolutionTime: '2025-03-11',
      tags: ['frontend', 'bugfix'],
    },
    {
      id: 6,
      title: 'Payment gateway timeout',
      description: 'Stripe payments fail intermittently',
      status: 'open',
      severity: 'critical',
      reporter: 'Sarah Johnson',
      assignee: '',
      reportedDate: '2025-03-12',
      dueDate: '2025-03-17',
      tags: ['backend', 'payment'],
    },
  ];

  // Handle sorting
  const handleSort = (key: string, direction: 'ascending' | 'descending') => {
    console.log(`Sorting by ${key} in ${direction} order`);
    // Implement server-side sorting here if needed
  };

  return (
    <div className="p-4 h-full">
      <DynamicTabularComponent
        columns={columns}
        data={bugs}
        title="Project Bugs"
        actions={actions}
        dropdowns={dropdowns}
        pagination={true}
        currentPage={currentPage}
        total={bugs.length}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
        sortable={true}
        onSort={handleSort}
        hoverEffect={true}
        striped={true}
        bordered={false}
        rounded={true}
        emptyMessage="No bugs reported"
        onRowClick={(bug: Bug) => {
          console.log('Row clicked:', bug);
          // Implement row click handling here
        }}
      />
    </div>
  );
};

export default BugsOverview;