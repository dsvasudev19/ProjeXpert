import { useState, useEffect, ReactNode } from 'react';

// Define types for column configuration
interface Column<T> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

// Define types for action buttons
interface Action<T> {
  type: 'edit' | 'delete' | 'view' | string;
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
}

// Define props interface with generic type parameter for data
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: any;
  loading?: boolean;
  emptyMessage?: string;
  hoverEffect?: boolean;
  striped?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  actionPosition?: 'end' | 'start';
  sortable?: boolean;
  onSort?: (key: string, direction: 'ascending' | 'descending') => void;
}

// Define type for sort configuration
interface SortConfig {
  key: string | null;
  direction: 'ascending' | 'descending';
}

// Generic Table component
function Table<T extends Record<string, any>>({
  columns = [],
  data = [],
  actions = [],
  pagination = false,
  itemsPerPage = 10,
  onPageChange = () => {},
  onRowClick = null,
  loading = false,
  emptyMessage = "No data available",
  hoverEffect = true,
  striped = true,
  bordered = false,
  rounded = true,
  actionPosition = "end",
  sortable = false,
  onSort = () => {},
}: TableProps<T>): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [displayData, setDisplayData] = useState<T[]>([]);

  // Handle pagination and sorting
  useEffect(() => {
    let sortedData = [...data];
    
    // Apply sorting if enabled and a sort config exists
    if (sortable && sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key as string] < b[sortConfig.key as string]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as string] > b[sortConfig.key as string]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    // Apply pagination if enabled
    if (pagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
      setDisplayData(paginatedData);
    } else {
      setDisplayData(sortedData);
    }
  }, [data, currentPage, itemsPerPage, pagination, sortConfig, sortable]);

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

  // Calculate total pages
  const totalPages = pagination ? Math.ceil(data.length / itemsPerPage) : 0;
  
  // Generate pagination buttons
  const paginationButtons: JSX.Element[] = [];
  if (pagination && totalPages > 0) {
    // Add previous button
    paginationButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
        }`}
      >
        &laquo;
      </button>
    );

    // Add page buttons
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-gradient-to-r from-green-700 to-blue-700 text-white'
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
          }`}
        >
          {i}
        </button>
      );
    }

    // Add next button
    paginationButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
        }`}
      >
        &raquo;
      </button>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-t-green-500 border-r-blue-500 border-b-green-500 border-l-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Table */}
      <div className={`relative overflow-x-auto ${rounded ? 'rounded-lg' : ''} ${bordered ? 'border border-gray-200' : 'shadow-md'}`}>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-6 py-3 font-medium"
                  onClick={() => sortable && column.sortable !== false && requestSort(column.key)}
                  style={{ cursor: sortable && column.sortable !== false ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center">
                    {column.title}
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
              {actions.length > 0 && actionPosition === "end" && (
                <th scope="col" className="px-6 py-3 font-medium text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayData.length > 0 ? (
              displayData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`
                    ${hoverEffect ? 'hover:bg-gray-100' : ''}
                    ${striped && rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    border-b last:border-b-0
                  `}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && actionPosition === "end" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {actions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            className={`px-3 py-1 rounded text-white text-xs ${
                              action.type === 'edit'
                                ? 'bg-green-500 hover:bg-green-600'
                                : action.type === 'delete'
                                ? 'bg-red-500 hover:bg-red-600'
                                : action.type === 'view'
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                            }`}
                            title={action.label}
                          >
                            {action.icon ? action.icon : action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex">{paginationButtons}</div>
        </div>
      )}
    </div>
  );
}

export default Table;