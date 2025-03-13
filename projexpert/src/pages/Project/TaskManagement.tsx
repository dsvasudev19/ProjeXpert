// import React, { useState } from 'react';
// import { Pencil, Trash2, Eye } from 'lucide-react';
// import Table from '../../components/shared/Table';

// // Define Task interface
// interface Task {
//     id: number;
//     title: string;
//     status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
//     priority: 'Low' | 'Medium' | 'High' | 'Critical';
//     assignee: string;
//     dueDate: string;
//     completionPercentage: number;
// }

// const TaskManagement = () => {
//     // Sample tasks data
//     const [tasks, setTasks] = useState<Task[]>([
//         {
//             id: 1,
//             title: "Implement user authentication",
//             status: "In Progress",
//             priority: "High",
//             assignee: "John Doe",
//             dueDate: "2025-03-20",
//             completionPercentage: 65
//         },
//         {
//             id: 2,
//             title: "Design landing page",
//             status: "Completed",
//             priority: "Medium",
//             assignee: "Jane Smith",
//             dueDate: "2025-03-10",
//             completionPercentage: 100
//         },
//         {
//             id: 3,
//             title: "Fix navigation bug",
//             status: "Pending",
//             priority: "Critical",
//             assignee: "Alex Johnson",
//             dueDate: "2025-03-15",
//             completionPercentage: 0
//         },
//         {
//             id: 4,
//             title: "Database optimization",
//             status: "On Hold",
//             priority: "Medium",
//             assignee: "Sarah Williams",
//             dueDate: "2025-03-25",
//             completionPercentage: 30
//         },
//         {
//             id: 5,
//             title: "Update documentation",
//             status: "Pending",
//             priority: "Low",
//             assignee: "Mike Brown",
//             dueDate: "2025-03-30",
//             completionPercentage: 10
//         },
//         {
//             id: 6,
//             title: "Implement dark mode",
//             status: "In Progress",
//             priority: "Medium",
//             assignee: "Emily Davis",
//             dueDate: "2025-03-22",
//             completionPercentage: 45
//         },
//         {
//             id: 7,
//             title: "Add payment integration",
//             status: "Pending",
//             priority: "High",
//             assignee: "John Doe",
//             dueDate: "2025-04-05",
//             completionPercentage: 0
//         },
//         {
//             id: 8,
//             title: "Create email templates",
//             status: "Completed",
//             priority: "Low",
//             assignee: "Jane Smith",
//             dueDate: "2025-03-08",
//             completionPercentage: 100
//         },
//         {
//             id: 9,
//             title: "Performance testing",
//             status: "In Progress",
//             priority: "High",
//             assignee: "Alex Johnson",
//             dueDate: "2025-03-18",
//             completionPercentage: 75
//         },
//         {
//             id: 10,
//             title: "Mobile responsiveness",
//             status: "Completed",
//             priority: "Medium",
//             assignee: "Sarah Williams",
//             dueDate: "2025-03-05",
//             completionPercentage: 100
//         },
//         {
//             id: 11,
//             title: "Set up CI/CD pipeline",
//             status: "On Hold",
//             priority: "Critical",
//             assignee: "Mike Brown",
//             dueDate: "2025-04-10",
//             completionPercentage: 20
//         },
//         {
//             id: 12,
//             title: "Create user onboarding flow",
//             status: "In Progress",
//             priority: "High",
//             assignee: "Emily Davis",
//             dueDate: "2025-03-28",
//             completionPercentage: 50
//         }
//     ]);

//     // Sample action handlers
//     const handleView = (task: Task) => {
//         alert(`Viewing task: ${task.title}`);
//     };

//     const handleEdit = (task: Task) => {
//         alert(`Editing task: ${task.title}`);
//     };

//     const handleDelete = (task: Task) => {
//         if (confirm(`Are you sure you want to delete task: ${task.title}?`)) {
//             setTasks(tasks.filter(t => t.id !== task.id));
//         }
//     };

//     // Define table columns
//     const columns = [
//         { key: 'id', title: 'ID', sortable: true },
//         { key: 'title', title: 'Task Title', sortable: true },
//         {
//             key: 'status',
//             title: 'Status',
//             sortable: true,
//             render: (row: Task) => {
//                 const statusColors = {
//                     'Pending': 'bg-yellow-200 text-yellow-800',
//                     'In Progress': 'bg-blue-200 text-blue-800',
//                     'Completed': 'bg-green-200 text-green-800',
//                     'On Hold': 'bg-gray-200 text-gray-800'
//                 };
//                 return (
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
//                         {row.status}
//                     </span>
//                 );
//             }
//         },
//         {
//             key: 'priority',
//             title: 'Priority',
//             sortable: true,
//             render: (row: Task) => {
//                 const priorityColors = {
//                     'Low': 'bg-green-100 text-green-800',
//                     'Medium': 'bg-blue-100 text-blue-800',
//                     'High': 'bg-orange-100 text-orange-800',
//                     'Critical': 'bg-red-100 text-red-800'
//                 };
//                 return (
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}>
//                         {row.priority}
//                     </span>
//                 );
//             }
//         },
//         { key: 'assignee', title: 'Assignee', sortable: true },
//         { key: 'dueDate', title: 'Due Date', sortable: true },
//         {
//             key: 'completionPercentage',
//             title: 'Progress',
//             sortable: true,
//             render: (row: Task) => {
//                 // Determine color based on completion percentage
//                 let progressColor = 'bg-blue-500';
//                 if (row.completionPercentage === 100) {
//                     progressColor = 'bg-green-500';
//                 } else if (row.completionPercentage < 25) {
//                     progressColor = 'bg-red-500';
//                 } else if (row.completionPercentage < 75) {
//                     progressColor = 'bg-yellow-500';
//                 }

//                 return (
//                     <div className="flex items-center">
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div
//                                 className={`h-2.5 rounded-full ${progressColor}`}
//                                 style={{ width: `${row.completionPercentage}%` }}
//                             ></div>
//                         </div>
//                         <span className="ml-2 text-xs font-medium">{row.completionPercentage}%</span>
//                     </div>
//                 );
//             }
//         },
//     ];

//     // Define action buttons
//     const actions = [
//         {
//             type: 'view',
//             label: 'View',
//             icon: <Eye size={16} />,
//             onClick: handleView
//         },
//         {
//             type: 'edit',
//             label: 'Edit',
//             icon: <Pencil size={16} />,
//             onClick: handleEdit
//         },
//         {
//             type: 'delete',
//             label: 'Delete',
//             icon: <Trash2 size={16} />,
//             onClick: handleDelete
//         }
//     ];

//     // Handle sorting
//     const handleSort = (key: string, direction: 'ascending' | 'descending') => {
//         console.log(`Sorting by ${key} in ${direction} order`);
//     };

//     // Handle row click
//     const handleRowClick = (task: Task) => {
//         console.log('Row clicked:', task);
//     };

//     return (
//         <div className="mb-6 p-6 bg-white rounded-lg">


//             <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">Tasks Overview</h2>
//             <Table
//                 columns={columns}
//                 data={tasks}
//                 actions={actions}
//                 pagination={true}
//                 itemsPerPage={5}
//                 sortable={true}
//                 onSort={handleSort}
//                 onRowClick={handleRowClick}
//                 striped={true}
//                 hoverEffect={true}
//                 rounded={true}
//                 bordered={false}
//                 emptyMessage="No tasks found"
//             />
//         </div>

//     );
// };

// export default TaskManagement;



import React, { useState } from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, Edit, Eye, TagIcon, Trash, UserIcon } from 'lucide-react'; // Assuming you use lucide icons
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