import React, { useEffect, useState } from 'react';
import { BugIcon, CalendarIcon, CheckIcon, UserIcon,  Edit, Eye, Trash2,FolderCode } from 'lucide-react'; // Assuming Lucide icons
import DynamicTabularComponent from '../../components/shared/DynamicTabularComponent';
import { axiosInstance } from '../../axiosIntance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Define the Bug interface
interface Bug {
  id?: number; // Assuming id is auto-generated and may not always be present
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string; // Matches "assignedTo" from the object
  dueDate: string;
  tags: string[]; // Kept as a comma-separated string
  project: string; // Matches "project" from the object
  reporter?: string; // Optional since it's missing from the provided object
  reportedDate?: string; // Optional if it's not explicitly provided
  resolutionTime?: string; // Optional, only for resolved/closed bugs,
  Project?:any;
  Assignee?:any;
  Reporter?:any;
}


const BugsOverview: React.FC = () => {
  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [bugs,setBugs]=useState<any>([])

  const navigate=useNavigate();

  const getAllBugs=async()=>{
    try {
      const res = await axiosInstance.get("/admin/bug")
      if(res.status===200){
        setBugs(res.data.map((bug:any)=>{return {...bug,tags:bug.tags.split(",")}}))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllBugs()
  },[])


  const deleteBugById=async(id:any)=>{
    try {
      const res=await axiosInstance.delete(`/admin/bug/${id}`)
      if (res.status === 200) {
        toast.success("Bug Deleted Successfully");
        setBugs((prev: any) => {
            return prev.filter((bug: any) => bug.id !== id);
        });
    }
    
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  }

  // Column definitions
  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      render:(row:Bug)=>(<a href={`/dashboard/project/bugs/details/${row.id}`}>{row.id}</a>)
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
      key: 'project',
      header: 'Project',
      sortable: true,
      render: (row: Bug) => (
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
      render: (row: Bug) => {
        const statusClasses = {
          open: 'bg-red-100 text-red-800',
          "in-progress": 'bg-blue-100 text-blue-800',
          resolved: 'bg-green-100 text-green-800',
          closed: 'bg-gray-100 text-gray-800',
          reopened:'bg-yellow-100 text-yellow-800'
        };
        
        
        const statusLabels = {
          open: 'Open',
          "in-progress": 'Progress',
          resolved: 'Resolved',
          closed: 'Closed',
          reopened:'Reopened'
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
      header: 'Severity',
      sortable: true,
      render: (row: Bug) => {
        const severityClasses:any = {
          low: 'bg-green-100 text-green-800',
          medium: 'bg-yellow-100 text-yellow-800',
          high: 'bg-orange-100 text-orange-800',
          critical: 'bg-red-100 text-red-800',
        };
        
        const severityLabels:any = {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          critical: 'Critical',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${severityClasses[row.priority]}`}>
            {severityLabels[row?.priority]}
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
          <span>{row?.Reporter?.name}</span>
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
          <span>{row?.Assignee?.name || 'Unassigned'}</span>
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
        navigate(`/dashboard/project/bugs/details/${row?.id}?e=true`)
      },
    },
    {
      type: 'view',
      label: 'View',
      icon:<Eye className='w-4 h-4' />,
      onClick: (row: Bug) => {
        navigate(`/dashboard/project/bugs/details/${row?.id}`)
      },
    },
    {
      type: 'delete',
      label: 'Delete',
      icon:<Trash2 className='w-4 h-4' />,
      onClick: (row: Bug) => {
        deleteBugById(row?.id)
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