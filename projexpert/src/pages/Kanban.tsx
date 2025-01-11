import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusCircle } from 'lucide-react';

const STATUS_COLORS: { [key: string]: string } = {
  BACKLOG: 'bg-gray-200',
  TO_DO: 'bg-blue-200',
  IN_PROGRESS: 'bg-yellow-200',
  REVIEW: 'bg-purple-200',
  BLOCKED: 'bg-red-200',
  DONE: 'bg-green-200'
};

const STATUS_TITLES: { [key: string]: string } = {
  BACKLOG: 'Backlog',
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  BLOCKED: 'Blocked',
  DONE: 'Done'
};

interface Bug {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface Column {
  title: string;
  items: Bug[];
}

interface Columns {
  [key: string]: Column;
}

const DUMMY_BUGS: Bug[] = [
  { id: '1', title: 'Fix Navigation Bug', description: 'Users report that the navigation menu disappears on mobile devices when scrolling.', status: 'TO_DO' },
  { id: '2', title: 'Improve Load Time', description: 'Dashboard takes too long to load. Need to optimize database queries and implement caching.', status: 'TO_DO' },
  { id: '3', title: 'Update User Authentication', description: 'Implementing OAuth 2.0 for better security and user experience.', status: 'IN_PROGRESS' },
  { id: '4', title: 'Fix Form Validation', description: 'Form submission fails silently when required fields are empty.', status: 'IN_PROGRESS' },
  { id: '5', title: 'Add Dark Mode', description: 'Implement system-wide dark mode support with user preference saving.', status: 'DONE' }
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(() => {
    const initialColumns: Columns = {
      // BACKLOG: { title: STATUS_TITLES.BACKLOG, items: [] },
      TO_DO: { title: STATUS_TITLES.TO_DO, items: [] },
      IN_PROGRESS: { title: STATUS_TITLES.IN_PROGRESS, items: [] },
      REVIEW: { title: STATUS_TITLES.REVIEW, items: [] },
      BLOCKED: { title: STATUS_TITLES.BLOCKED, items: [] },
      DONE: { title: STATUS_TITLES.DONE, items: [] }
    };

    DUMMY_BUGS.forEach(bug => {
      initialColumns[bug.status].items.push(bug);
    });

    return initialColumns;
  });

  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const items = Array.from(column.items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items }
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [movedItem] = sourceItems.splice(source.index, 1);

      movedItem.status = destination.droppableId;
      destItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems }
      });
    }
  };

  const addNewTask = () => {
    const newTask: Bug = {
      id: Math.random().toString(),
      title: 'New Task',
      description: 'New task description',
      status: 'TO_DO'
    };
    setColumns(prev => ({
      ...prev,
      TO_DO: { ...prev.TO_DO, items: [newTask, ...prev.TO_DO.items] }
    }));
  };

  return (
    <div className="w-full p-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className={`flex-1 ${STATUS_COLORS[columnId]} p-2 rounded-lg shadow-lg`}>
              <div className={`border-b p-[5px] ${columnId === 'TO_DO'? '':''}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="text-sm text-gray-500">{column.items.length}</span>
                </div>
                {columnId === 'TO_DO' && (
                  <button className="text-blue-500 mt-2" onClick={addNewTask}>
                    <PlusCircle className="inline w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="p-[5px]">
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                      {column.items.map((bug, index) => (
                        <Draggable key={bug.id} draggableId={bug.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-[5px] mb-2 bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
                              onClick={() => setSelectedBug(bug)}
                            >
                              <h4 className="font-light text-sm">{bug.title}</h4>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      {selectedBug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <h4 className="font-medium">{selectedBug.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{selectedBug.description}</p>
            <button className="mt-4 text-blue-500" onClick={() => setSelectedBug(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
