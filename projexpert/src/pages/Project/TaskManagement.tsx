import React, { useEffect, useState } from 'react';
import { CalendarIcon,  Edit, Eye, FolderCode, TagIcon, Trash, UserIcon } from 'lucide-react'; // Assuming you use lucide icons
import DynamicTabularComponent from '../../components/shared/DynamicTabularComponent';
import { axiosInstance } from '../../axiosIntance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Define the Task interface
interface Task {
  id: number;
  refId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assigneeId: number;
  projectId: number;
  bugId: number | null;
  parentTaskId: number | null;
  progress: number;
  tags: string[]; // Stored as a comma-separated string
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
  Assignee: {
    id: number;
    name: string;
  };
  Project: {
    id: number;
    name: string;
  };
  ParentTask: Task | null;
  SubTasks: Task[];
}


const TasksOverview: React.FC = () => {
  // State for handling pagination
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus,setSelectedStatus]=useState("")
  const [tasks,setTasks]=useState<any>([])


  const getAllTasks=async()=>{
    try {
      const res=await axiosInstance.get(`/admin/task?status=${selectedStatus}`)
      if(res?.status===200){
        setTasks(res.data.map((task:any)=>{return {...task,tags:task.tags.split(',')}}))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTaskById=async(id:any)=>{
    try {
      const res=await axiosInstance.delete(`/admin/task/${id}`)
      if(res.status===200){
        toast.success("Task Deleted Successfully")
        tasks.filter((task:any)=>task.id!=id)
      }
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  }

  useEffect(()=>{
    getAllTasks()
  },[selectedStatus])
  // Column definitions
  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      render:(row:Task)=>( <a href={`/dashboard/project/tasks/details/${row.id}`}>{row.id}</a>)
    },
    {
      key: 'title',
      header: 'Task Name',
      sortable: true,
      render: (row: Task) => (
        <div className="font-medium" onClick={()=>{navigate(`/dashboard/project/tasks/details/${row.id}`)}}>{row.title}</div>
      ),
    },
    {
      key: 'project',
      header: 'Project',
      sortable: true,
      render: (row: Task) => (
        <div className="flex items-center">
          <FolderCode className="w-4 h-4 mr-1 text-gray-500" />
          <span>{row?.Project?.name}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Task) => {
        const statusClasses = {
          "pending": 'bg-yellow-100 text-yellow-800',
          "in-progress": 'bg-blue-100 text-blue-800',
          "completed": 'bg-green-100 text-green-800',
          "on-hold": 'bg-gray-100 text-gray-800',
        };
        
        const statusLabels = {
          "pending": 'Pending',
          "in-progress": 'InProgress',
          "completed": 'Completed',
          "on-hold": 'On Hold',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[row.status as keyof typeof statusClasses]}`}>
            {statusLabels[row.status as keyof typeof statusLabels]}
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
          high: 'bg-yellow-100 text-yellow-800',
          urgent: 'bg-red-100 text-red-800',
          critical:'bg-orange-100 text-orange-800'
        };
        
        const priorityLabels = {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          urgent: 'Urgent',
          critical:'Critical'
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
          <span>{row?.Assignee?.name}</span>
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
      onClick: (row: Task) => {console.log(row);navigate(`/dashboard/project/tasks/details/${row.id}?e=true`)},
    },
    {
      type: 'view',
      label: 'View',
      icon:<Eye className='w-4 h-4' />,
      onClick: (row: Task) => {console.log(row);navigate(`/dashboard/project/tasks/details/${row.id}`)},
    },
    {
      type: 'delete',
      label: 'Delete',
      icon:<Trash className='w-4 h-4' />,
      onClick: (row: Task) => {
        deleteTaskById(row.id)
      },
    },
  ];
  
  // Filter dropdowns
  const dropdowns = [
    {
      label: 'Project',
      key: 'project',
      options: [
        { value: 'all', label: 'All Projects' },
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on-hold', label: 'On Hold' },
      ],
      action: (value:any) => {
        console.log(`Selected Project: ${value}`);
      },
    },
    {
      label: 'Status',
      key: 'status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'pending', label: 'Pending' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'on-hold', label: 'On Hold' },
      ],
      action: (value:any) => {
        console.log(value)
        setSelectedStatus(value)
      },
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
      action: (value:any) => {
        console.log(`Selected Priority: ${value}`);
      },
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