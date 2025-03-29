
import { useState, useEffect, ReactNode } from 'react';

// Define types for column configuration
interface Column<T> {
  key: string;
  header: string;
  title?: string; // For backward compatibility
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

// Define types for action buttons
interface Action<T> {
  type?: 'edit' | 'delete' | 'view' | string;
  label: string;
  icon?: ReactNode;
  onClick?: (row: T) => void;
  handler?: (id: number) => void; // For backward compatibility
}

// Define types for dropdown configuration
interface Dropdown {
  label: string;
  key: string;
  options: { value: string | number; label: string }[];
  color?: string;
  action?: (value: string | number) => void;
}

// Define props interface with generic type parameter for data
interface DynamicTabularComponentProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  title?: string;
  
  // Pagination props
  pagination?: boolean;
  currentPage?: number;
  total?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  
  // Actions
  actions?: Action<T>[];
  onDelete?: (id: number) => void; // For backward compatibility
  
  // UI customization
  dropdowns?: Dropdown[];
  hoverEffect?: boolean;
  striped?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  actionPosition?: 'end' | 'start';
  
  // Events
  onRowClick?: any;
  
  // Sorting
  sortable?: boolean;
  onSort?: (key: string, direction: 'ascending' | 'descending') => void;
  
  // Misc
  emptyMessage?: string;
}

// Define type for sort configuration
interface SortConfig {
  key: string | null;
  direction: 'ascending' | 'descending';
}

// Generic DynamicTabularComponent component
function DynamicTabularComponent<T extends Record<string, any>>({
  columns = [],
  data = [],
  loading = false,
  title = '',
  
  // Pagination
  pagination = false,
  currentPage: initialPage = 1,
  total: totalItems,
  itemsPerPage = 10,
  onPageChange = () => {},
  
  // Actions
  actions = [],
  onDelete=()=>{},
  
  // UI customization
  dropdowns = [],
  hoverEffect = true,
  striped = true,
  bordered = false,
  rounded = true,
  actionPosition = "end",
  
  // Events
  onRowClick = null,
  
  // Sorting
  sortable = false,
  onSort = () => {},
  
  // Misc
  emptyMessage = "No data available",
}: DynamicTabularComponentProps<T>): JSX.Element {
  // Normalize columns to use consistent property names
  const normalizedColumns = columns.map(col => ({
    ...col,
    header: col.header || col.title || '',
  }));
  console.log(onDelete)
  
  // State
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [displayData, setDisplayData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  
  // Normalize actions to handle both APIs
  const normalizedActions = actions.map(action => ({
    ...action,
    onClick: (row: T) => {
      if (action.onClick) {
        action.onClick(row);
      } else if (action.handler && 'id' in row) {
        action.handler(row.id as number);
      }
    }
  }));
  
  // Calculate total for pagination
  const totalCount = totalItems !== undefined ? totalItems : data.length;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  
  // Process data with sorting and pagination
  console.log(data)
  useEffect(() => {
    let processedData = [...data];
    
    // Apply sorting if enabled and a sort config exists
    if (sortable && sortConfig.key) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key as string];
        const bValue = b[sortConfig.key as string];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    // Only apply client-side pagination if total is not provided
    if (pagination && totalItems === undefined) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      processedData = processedData.slice(startIndex, startIndex + itemsPerPage);
    }
    
    setDisplayData(processedData);
  }, [data, currentPage, itemsPerPage, pagination, sortConfig, sortable, totalItems]);
  
  // Handle page change
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    onPageChange(page);
  };
  
  // Handle sorting
  const requestSort = (key: string): void => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    onSort(key, direction);
  };
  
  // Generate pagination UI
  const renderPagination = () => {
    if (!pagination || pageCount <= 0) return null;
    
    const paginationButtons: ReactNode[] = [];
    
    // Previous button
    paginationButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 text-xs rounded-md mx-1 transition-colors ${
          currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
        }`}
      >
        Previous
      </button>
    );
    
    // Page buttons - show up to 5 pages, centered around current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pageCount, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 text-xs rounded-md mx-1 transition-colors ${
            currentPage === i
              ? 'bg-gray-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    paginationButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={`px-2 py-1 text-xs rounded-md mx-1 transition-colors ${
          currentPage === pageCount
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
        }`}
      >
        Next
      </button>
    );
    
    return (
      <div className="flex justify-between items-center p-2 border-t bg-white sticky bottom-0">
        <div className="text-xs text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
        </div>
        <div className="flex gap-1">
          {paginationButtons}
        </div>
      </div>
    );
  };
  
  // Render loading spinner
  const renderLoading = () => {
    if (!loading) return null;
    
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  };
  
  // Render header with title and dropdowns
  const renderHeader = () => {
    if (!title && dropdowns.length === 0) return null;
    
    return (
      <div className="mb-1 flex justify-between items-center -z-50">
        {title && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">
            {title}
          </h1>
        )}
        
        {dropdowns.length > 0 && (
          <div className="flex gap-2">
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="flex flex-col">
                <select
                  id={dropdown.key}
                  className={`px-0.5 py-1 border rounded text-xs ${
                    dropdown.color ? `bg-${dropdown.color}-100` : 'bg-white'
                  }`}
                  onChange={(e) => {
                    // Call the action function if it exists, passing the selected value
                    if (dropdown.action) {
                      dropdown.action(e.target.value);
                    }
                  }}
                >
                  {dropdown.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        {renderHeader()}
        
        {loading ? (
          renderLoading()
        ) : (
          <div className={`bg-white ${rounded ? 'rounded-lg' : ''} ${bordered ? 'border border-gray-200' : 'shadow-md'} overflow-hidden`}>
            <div className="flex flex-col h-full">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className={`${striped ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-100 text-gray-500'} sticky top-0 z-10`}>
                    <tr>
                      {normalizedColumns.map((column, index) => (
                        <th
                          key={index}
                          className="px-3 py-2.5 text-left font-medium uppercase tracking-wider"
                          onClick={() => sortable && column.sortable !== false && requestSort(column.key)}
                          style={{ cursor: sortable && column.sortable !== false ? 'pointer' : 'default' }}
                        >
                          <div className="flex items-center">
                            {column.header}
                            {sortable && column.sortable !== false && (
                              <span className="ml-1">
                                {sortConfig.key === column.key ? (
                                  sortConfig.direction === 'ascending' ? '▲' : '▼'
                                ) : '⇅'}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      {normalizedActions.length > 0 && (
                        <th className={`px-3 py-2.5 ${actionPosition === 'end' ? 'text-right' : 'text-left'} font-medium uppercase tracking-wider`}>
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.length > 0 ? (
                      displayData.map((item, rowIndex) => (
                        <tr 
                          key={rowIndex}
                          className={`
                            ${hoverEffect ? 'hover:bg-gray-50' : ''}
                            ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
                            border-b last:border-b-0
                            ${onRowClick ? 'cursor-pointer' : ''}
                          `}
                          onClick={onRowClick ? () => onRowClick(item) : undefined}
                        >
                          {normalizedColumns.map((column, colIndex) => (
                            <td key={colIndex} className="px-3 py-2 text-left text-gray-700">
                              {column.render
                                ? column.render(item)
                                : item[column.key]}
                            </td>
                          ))}
                          {normalizedActions.length > 0 && (
                            <td className={`px-3 py-2 flex ${actionPosition === 'end' ? 'justify-end' : 'justify-start'} space-x-2 text-gray-700`}>
                              {normalizedActions.map((action, actionIndex) => (
                                <button
                                  key={actionIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(item);
                                  }}
                                  className={`text-xs px-2 py-1 rounded ${
                                    action.type === 'edit'
                                      ? 'bg-green-500 text-white hover:bg-green-600'
                                      : action.type === 'delete'
                                      ? 'bg-red-500 text-white hover:bg-red-600'
                                      : action.type === 'view'
                                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                                      : 'text-green-600 hover:text-blue-800'
                                  } transition-colors`}
                                  title={action.label}
                                >
                                  {action.icon || action.label}
                                  
                                </button>
                              ))}
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={normalizedColumns.length + (normalizedActions.length > 0 ? 1 : 0)}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          {emptyMessage}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicTabularComponent;