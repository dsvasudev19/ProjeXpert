import React, { useState } from 'react';
import { CalendarIcon,  Edit, Eye, TagIcon, Trash, UserIcon } from 'lucide-react'; // Assuming you use lucide icons
import DynamicTabularComponent from '../../components/shared/DynamicTabularComponent';

// Define the Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  createdAt: string;
  progress: number;
  tags: string[];
}

const TasksOverview: React.FC = () => {
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
      header: 'Task Name',
      sortable: true,
      render: (row: Task) => (
        <div className="font-medium">{row.title}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Task) => {
        const statusClasses = {
          pending: 'bg-yellow-100 text-yellow-800',
          in_progress: 'bg-blue-100 text-blue-800',
          completed: 'bg-green-100 text-green-800',
          on_hold: 'bg-gray-100 text-gray-800',
        };
        
        const statusLabels = {
          pending: 'Pending',
          in_progress: 'In Progress',
          completed: 'Completed',
          on_hold: 'On Hold',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[row.status]}`}>
            {statusLabels[row.status]}
          </span>
        );
      },
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (row: Task) => {
        const priorityClasses = {
          low: 'bg-green-100 text-green-800',
          medium: 'bg-blue-100 text-blue-800',
          high: 'bg-orange-100 text-orange-800',
          urgent: 'bg-red-100 text-red-800',
        };
        
        const priorityLabels = {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          urgent: 'Urgent',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses[row.priority]}`}>
            {priorityLabels[row.priority]}
          </span>
        );
      },
    },
    {
      key: 'assignee',
      header: 'Assignee',
      sortable: true,
      render: (row: Task) => (
        <div className="flex items-center">
          <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
          <span>{row.assignee}</span>
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (row: Task) => (
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
          <span>{new Date(row.dueDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (row: Task) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${row.progress}%` }}
          ></div>
        </div>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (row: Task) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center">
              <TagIcon className="w-3 h-3 mr-1" />
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
      onClick: (row: Task) => {
        console.log('Edit task', row.id);
        // Implement your edit functionality here
      },
    },
    {
      type: 'view',
      label: 'View',
      icon:<Eye className='w-4 h-4' />,
      onClick: (row: Task) => {
        console.log('View task', row.id);
        // Implement your view functionality here
      },
    },
    {
      type: 'delete',
      label: 'Delete',
      icon:<Trash className='w-4 h-4' />,
      onClick: (row: Task) => {
        console.log('Delete task', row.id);
        // Implement your delete functionality here
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
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
      ],
    },
    {
      label: 'Priority',
      key: 'priority',
      options: [
        { value: 'all', label: 'All Priorities' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' },
      ],
    },
  ];
  
  // Sample data
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Set up OAuth and JWT for user authentication system',
      status: 'completed',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: '2025-03-10',
      createdAt: '2025-02-28',
      progress: 100,
      tags: ['backend', 'security'],
    },
    {
      id: 2,
      title: 'Design landing page mockup',
      description: 'Create Figma design for main landing page',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Mike Chen',
      dueDate: '2025-03-20',
      createdAt: '2025-03-02',
      progress: 60,
      tags: ['design', 'ui/ux'],
    },
    {
      id: 3,
      title: 'Setup CI/CD pipeline',
      description: 'Configure GitHub Actions for automatic deployment',
      status: 'pending',
      priority: 'high',
      assignee: 'Alex Wong',
      dueDate: '2025-03-25',
      createdAt: '2025-03-05',
      progress: 0,
      tags: ['devops', 'infrastructure'],
    },
    {
      id: 4,
      title: 'Fix payment processing bug',
      description: 'Resolve issue with Stripe integration',
      status: 'in_progress',
      priority: 'urgent',
      assignee: 'Lisa Park',
      dueDate: '2025-03-15',
      createdAt: '2025-03-10',
      progress: 30,
      tags: ['backend', 'bugfix'],
    },
    {
      id: 5,
      title: 'Update privacy policy',
      description: 'Update policy to comply with new regulations',
      status: 'on_hold',
      priority: 'low',
      assignee: 'John Smith',
      dueDate: '2025-04-01',
      createdAt: '2025-03-08',
      progress: 10,
      tags: ['legal', 'documentation'],
    },
    {
      id: 6,
      title: 'Optimize database queries',
      description: 'Improve performance of slow SQL queries',
      status: 'pending',
      priority: 'medium',
      assignee: 'Emily Davis',
      dueDate: '2025-03-28',
      createdAt: '2025-03-12',
      progress: 0,
      tags: ['backend', 'performance'],
    },
    {
      id: 7,
      title: 'Implement dark mode',
      description: 'Add dark mode theme to the application',
      status: 'in_progress',
      priority: 'low',
      assignee: 'Ryan Lee',
      dueDate: '2025-04-05',
      createdAt: '2025-03-11',
      progress: 45,
      tags: ['frontend', 'ui/ux'],
    },
    {
      id: 8,
      title: 'Write API documentation',
      description: 'Create comprehensive documentation for the REST API',
      status: 'pending',
      priority: 'medium',
      assignee: 'Sarah Johnson',
      dueDate: '2025-04-10',
      createdAt: '2025-03-13',
      progress: 0,
      tags: ['documentation'],
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
        data={tasks}
        title="Project Tasks"
        actions={actions}
        dropdowns={dropdowns}
        pagination={true}
        currentPage={currentPage}
        total={tasks.length}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
        sortable={true}
        onSort={handleSort}
        hoverEffect={true}
        striped={true}
        bordered={false}
        rounded={true}
        emptyMessage="No tasks available"
        onRowClick={(task: Task) => {
          console.log('Row clicked:', task);
          // Implement your row click handling here
        }}
      />
    </div>
  );
};

export default TasksOverview;