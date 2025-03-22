// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import { PlusCircle } from 'lucide-react';

// const STATUS_COLORS: { [key: string]: string } = {
//   BACKLOG: 'bg-gray-200',
//   TO_DO: 'bg-blue-200',
//   IN_PROGRESS: 'bg-yellow-200',
//   REVIEW: 'bg-purple-200',
//   BLOCKED: 'bg-red-200',
//   DONE: 'bg-green-200'
// };

// const STATUS_TITLES: { [key: string]: string } = {
//   BACKLOG: 'Backlog',
//   TO_DO: 'To Do',
//   IN_PROGRESS: 'In Progress',
//   REVIEW: 'Review',
//   BLOCKED: 'Blocked',
//   DONE: 'Done'
// };

// interface Bug {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
// }

// interface Column {
//   title: string;
//   items: Bug[];
// }

// interface Columns {
//   [key: string]: Column;
// }

// const DUMMY_BUGS: Bug[] = [
//   { id: '1', title: 'Fix Navigation Bug', description: 'Users report that the navigation menu disappears on mobile devices when scrolling.', status: 'TO_DO' },
//   { id: '2', title: 'Improve Load Time', description: 'Dashboard takes too long to load. Need to optimize database queries and implement caching.', status: 'TO_DO' },
//   { id: '3', title: 'Update User Authentication', description: 'Implementing OAuth 2.0 for better security and user experience.', status: 'IN_PROGRESS' },
//   { id: '4', title: 'Fix Form Validation', description: 'Form submission fails silently when required fields are empty.', status: 'IN_PROGRESS' },
//   { id: '5', title: 'Add Dark Mode', description: 'Implement system-wide dark mode support with user preference saving.', status: 'DONE' }
// ];

// const KanbanBoard: React.FC = () => {
//   const [columns, setColumns] = useState<Columns>(() => {
//     const initialColumns: Columns = {
//       // BACKLOG: { title: STATUS_TITLES.BACKLOG, items: [] },
//       TO_DO: { title: STATUS_TITLES.TO_DO, items: [] },
//       IN_PROGRESS: { title: STATUS_TITLES.IN_PROGRESS, items: [] },
//       REVIEW: { title: STATUS_TITLES.REVIEW, items: [] },
//       BLOCKED: { title: STATUS_TITLES.BLOCKED, items: [] },
//       DONE: { title: STATUS_TITLES.DONE, items: [] }
//     };

//     DUMMY_BUGS.forEach(bug => {
//       initialColumns[bug.status].items.push(bug);
//     });

//     return initialColumns;
//   });

//   const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     if (source.droppableId === destination.droppableId) {
//       const column = columns[source.droppableId];
//       const items = Array.from(column.items);
//       const [reorderedItem] = items.splice(source.index, 1);
//       items.splice(destination.index, 0, reorderedItem);

//       setColumns({
//         ...columns,
//         [source.droppableId]: { ...column, items }
//       });
//     } else {
//       const sourceColumn = columns[source.droppableId];
//       const destColumn = columns[destination.droppableId];
//       const sourceItems = Array.from(sourceColumn.items);
//       const destItems = Array.from(destColumn.items);
//       const [movedItem] = sourceItems.splice(source.index, 1);

//       movedItem.status = destination.droppableId;
//       destItems.splice(destination.index, 0, movedItem);

//       setColumns({
//         ...columns,
//         [source.droppableId]: { ...sourceColumn, items: sourceItems },
//         [destination.droppableId]: { ...destColumn, items: destItems }
//       });
//     }
//   };

//   const addNewTask = () => {
//     const newTask: Bug = {
//       id: Math.random().toString(),
//       title: 'New Task',
//       description: 'New task description',
//       status: 'TO_DO'
//     };
//     setColumns(prev => ({
//       ...prev,
//       TO_DO: { ...prev.TO_DO, items: [newTask, ...prev.TO_DO.items] }
//     }));
//   };

//   return (
//     <div className="w-full p-3">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex gap-4">
//           {Object.entries(columns).map(([columnId, column]) => (
//             <div key={columnId} className={`flex-1 ${STATUS_COLORS[columnId]} p-2 rounded-lg shadow-lg`}>
//               <div className={`border-b p-[5px] ${columnId === 'TO_DO'? '':''}`}>
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-medium">{column.title}</h3>
//                   <span className="text-sm text-gray-500">{column.items.length}</span>
//                 </div>
//                 {columnId === 'TO_DO' && (
//                   <button className="text-blue-500 mt-2" onClick={addNewTask}>
//                     <PlusCircle className="inline w-5 h-5" />
//                   </button>
//                 )}
//               </div>
//               <div className="p-[5px]">
//                 <Droppable droppableId={columnId}>
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
//                       {column.items.map((bug, index) => (
//                         <Draggable key={bug.id} draggableId={bug.id} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="p-[5px] mb-2 bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
//                               onClick={() => setSelectedBug(bug)}
//                             >
//                               <h4 className="font-light text-sm">{bug.title}</h4>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//       {selectedBug && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
//             <h4 className="font-medium">{selectedBug.title}</h4>
//             <p className="text-sm text-gray-500 mt-1">{selectedBug.description}</p>
//             <button className="mt-4 text-blue-500" onClick={() => setSelectedBug(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KanbanBoard;


import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusCircle, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';


const STATUS_COLORS: { [key: string]: string } = {
  TO_DO: 'bg-blue-200',
  IN_PROGRESS: 'bg-yellow-200',
  REVIEW: 'bg-purple-200',
  BLOCKED: 'bg-red-200',
  DONE: 'bg-green-200'
};

const PRIORITY_COLORS: { [key: string]: string } = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
}

interface KanbanItem {
  id: string;
  refId?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string | null;
  assignee?: User;
  reporter?: User;
  project?: Project;
  type: 'task' | 'bug';
  progress?: number;
  tags: string[];
}

interface Column {
  title: string;
  items: KanbanItem[];
}

interface Columns {
  [key: string]: Column;
}

interface NewTaskForm {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  projectId: number;
  tags: string[];
}

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({
    TO_DO: { title: 'To Do', items: [] },
    IN_PROGRESS: { title: 'In Progress', items: [] },
    REVIEW: { title: 'Review', items: [] },
    BLOCKED: { title: 'Blocked', items: [] },
    DONE: { title: 'Done', items: [] }
  });

  const [selectedItem, setSelectedItem] = useState<KanbanItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemType, setItemType] = useState<'both' | 'tasks' | 'bugs'>('both');
  const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newTask, setNewTask] = useState<NewTaskForm>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    projectId: 0,
    tags: []
  });

  useEffect(() => {
    fetchKanbanItems();
    fetchProjects();
  }, [itemType]);

  const fetchKanbanItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/admin/kanban?itemType=${itemType}`);
      setColumns(response.data);
    } catch (err) {
      console.error('Error fetching kanban items:', err);
      setError('Failed to load kanban items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/admin/projects');
      setProjects(response.data);
      if (response.data.length > 0) {
        setNewTask(prev => ({ ...prev, projectId: response.data[0].id }));
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = columns[source.droppableId];
      const items = Array.from(column.items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items }
      });
    } else {
      // Move to a different column (status change)
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [movedItem] = sourceItems.splice(source.index, 1);

      // Update status in UI immediately for responsiveness
      const updatedItem = { ...movedItem, status: destination.droppableId };
      destItems.splice(destination.index, 0, updatedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems }
      });

      // Send update to server
      try {
        await axiosInstance.put('/admin/kanban/status', {
          itemId: movedItem.id,
          newStatus: destination.droppableId
        });
      } catch (err) {
        console.error('Error updating item status:', err);
        // Revert the UI change if the server update fails
        fetchKanbanItems();
      }
    }
  };


  const handleUpdateItem = async (updatedData: Partial<KanbanItem>) => {
    if (!selectedItem) return;
  
    try {
      const response = await axiosInstance.put(`/admin/kanban/${selectedItem.id}`, updatedData);
  
      // Update the item in the UI with the response data
      setColumns(prevColumns => {
        const newColumns = { ...prevColumns };
  
        Object.keys(newColumns).forEach(columnId => {
          newColumns[columnId].items = newColumns[columnId].items.map(item =>
            item.id === selectedItem.id ? { ...item, ...response.data.task || response.data.bug } : item
          );
        });
  
        return newColumns;
      });
  
      setSelectedItem(prev => prev ? { ...prev, ...response.data.task || response.data.bug } : null);

      if(response.status===200){
        fetchKanbanItems();
      }
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item. Please try again.');
      // Revert to original state or refetch data
      fetchKanbanItems();
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.title || !newTask.projectId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/kanban/task', newTask);

      // Add the new task to the TO_DO column
      setColumns(prev => ({
        ...prev,
        TO_DO: {
          ...prev.TO_DO,
          items: [response.data.task, ...prev.TO_DO.items]
        }
      }));

      // Reset form and close modal
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        projectId: projects.length > 0 ? projects[0].id : 0,
        tags: []
      });
      setShowNewTaskModal(false);
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task. Please try again.');
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate the total count of items
  const getTotalItemCount = () => {
    return Object.values(columns).reduce((total, column) => total + column.items.length, 0);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading kanban board...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertTriangle className="mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="w-full p-3">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">My Tasks & Bugs</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">Filter:</span>
            <select
              className="border rounded p-1"
              value={itemType}
              onChange={(e) => setItemType(e.target.value as 'both' | 'tasks' | 'bugs')}
            >
              <option value="both">All Items</option>
              <option value="tasks">Tasks Only</option>
              <option value="bugs">Bugs Only</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {getTotalItemCount()} items
          </div>
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex-shrink-0 w-64">
              <div className={`${STATUS_COLORS[columnId]} p-2 rounded-t-lg shadow-lg`}>
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="text-sm text-gray-700 bg-white bg-opacity-50 px-2 rounded-full">
                    {column.items.length}
                  </span>
                </div>
              </div>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] max-h-[70vh] overflow-y-auto p-2 bg-gray-50 rounded-b-lg shadow-lg"
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 mb-2 bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                {item.type === 'bug' ? (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2">Bug</span>
                                ) : (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Task</span>
                                )}
                                {item.refId && <span className="text-xs text-gray-500 mr-2">{item.refId}</span>}
                              </div>
                              <span className={`text-xs rounded px-2 py-0.5 ${PRIORITY_COLORS[item.priority] || 'bg-gray-100'}`}>
                                {item.priority}
                              </span>
                            </div>

                            <h4 className="font-medium text-sm mb-2">{item.title}</h4>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.dueDate && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(item.dueDate)}
                                </div>
                              )}

                              {item.tags && item.tags.length > 0 && (
                                <div className="flex items-center text-xs text-gray-500 ml-2">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {item.tags.length} tags
                                </div>
                              )}
                            </div>

                            {item.project && (
                              <div className="mt-2 text-xs text-gray-500">
                                Project: {item.project.name}
                              </div>
                            )}

                            {item.progress !== undefined && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ width: `${item.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {selectedItem.type === 'bug' ? (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full border border-red-200">Bug</span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">Task</span>
                  )}
                  {selectedItem.refId && (
                    <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">{selectedItem.refId}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedItem.title}</h3>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 bg-gray-100 rounded-full"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-3 gap-5">
              {/* Left Column - Description & Progress */}
              <div className="col-span-2">
                {/* Description Section */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                    </svg>
                    Description
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 min-h-[120px]">
                    <p className="text-gray-800 whitespace-pre-line">{selectedItem.description || "No description provided."}</p>
                  </div>
                </div>

                {/* Progress Bar (only for tasks) */}
                {selectedItem.type === 'task' && selectedItem.progress !== undefined && (
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      Progress
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Task Completion</span>
                        <span className="text-xs font-medium text-gray-700">{selectedItem.progress}%</span>
                      </div>
                      <div className="relative h-2 mb-3 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          style={{ width: `${selectedItem.progress}%` }}
                          className={`absolute top-0 left-0 h-full rounded-full ${selectedItem.progress < 30 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                              selectedItem.progress < 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                'bg-gradient-to-r from-green-600 to-green-500'
                            }`}
                        ></div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedItem.progress}
                        onChange={(e) => handleUpdateItem({ progress: parseInt(e.target.value) })}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  </div>
                )}

                {/* People */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {/* Assignee */}
                  {selectedItem.assignee && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Assignee
                      </h4>
                      <div className="flex items-center bg-blue-50 p-2 rounded-md border border-blue-100">
                        {selectedItem.assignee.avatar ? (
                          <img
                            src={selectedItem.assignee.avatar}
                            alt={selectedItem.assignee.name}
                            className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2 shadow-sm">
                            {selectedItem.assignee.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-gray-800">{selectedItem.assignee.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Reporter */}
                  {selectedItem.reporter && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                        </svg>
                        Reported By
                      </h4>
                      <div className="flex items-center bg-green-50 p-2 rounded-md border border-green-100">
                        {selectedItem.reporter.avatar ? (
                          <img
                            src={selectedItem.reporter.avatar}
                            alt={selectedItem.reporter.name}
                            className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center text-xs font-bold mr-2 shadow-sm">
                            {selectedItem.reporter.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-gray-800">{selectedItem.reporter.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details & Actions */}
              <div className="col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border border-blue-100 shadow-sm h-fit">
                  {/* Status */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Status
                    </h4>
                    <select
                      className="border border-gray-300 rounded-md text-sm p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedItem.status}
                      onChange={(e) => handleUpdateItem({ status: e.target.value })}
                    >
                      <option value="TO_DO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="REVIEW">Review</option>
                      <option value="BLOCKED">Blocked</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Priority
                    </h4>
                    <select
                      className="border border-gray-300 rounded-md text-sm p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={selectedItem.priority}
                      onChange={(e) => handleUpdateItem({ priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Due Date
                    </h4>
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md text-sm p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedItem.dueDate ? new Date(selectedItem.dueDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleUpdateItem({ dueDate: e.target.value })}
                    />
                  </div>

                  {/* Project */}
                  {selectedItem.project && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Project
                      </h4>
                      <div className="bg-white p-2 rounded-md border border-gray-300 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-800 font-medium">{selectedItem.project.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition duration-200 border border-gray-300"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 py-2 rounded-md shadow-sm transition duration-200"
                onClick={() => setSelectedItem(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Create New Task</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewTaskModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="border rounded p-2 w-full h-24"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project *
                </label>
                <select
                  value={newTask.projectId}
                  onChange={(e) => setNewTask({ ...newTask, projectId: parseInt(e.target.value) })}
                  className="border rounded p-2 w-full"
                  required
                >
                  {projects.length === 0 ? (
                    <option value="">No projects available</option>
                  ) : (
                    projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTask.tags.join(', ')}
                  onChange={(e) => setNewTask({
                    ...newTask,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                  className="border rounded p-2 w-full"
                  placeholder="feature, ui, critical"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setShowNewTaskModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={!newTask.title || !newTask.projectId}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;