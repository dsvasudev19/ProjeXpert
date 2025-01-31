import { Trash2, Filter } from "lucide-react";
import { useState } from "react";

interface AdvancedTabularComponentProps<T> {
  columns: {
    header: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
    filterable?: boolean; // Mark which columns are filterable
  }[];
  data: T[];
  loading?: boolean;
  title: string;
  currentPage?: number;
  total?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onDelete?: (id: number) => void;
}

const AdvancedTabularComponent = <T extends { id: number }>({
  columns,
  data,
  loading,
  title,
  currentPage = 1,
  total = 0,
  itemsPerPage = 14,
  onPageChange,
  onDelete,
}: AdvancedTabularComponentProps<T>) => {
  const [filters, setFilters] = useState({
    project: "",
    status: "",
    priority: "",
    assignee: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = data.filter((item:any) => {
    return (
      (!filters.project || item.project.name.includes(filters.project)) &&
      (!filters.status || item.status === filters.status) &&
      (!filters.priority || item.priority === filters.priority) &&
      (!filters.assignee || item.Assignee.name.includes(filters.assignee))
    );
  });

  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="mb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">
            {title}
          </h1>
        </div>
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-[82vh]">
              <div className="overflow-x-auto min-w-[1000px]">
                <table className="w-full text-[11px]">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className="px-3 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center">
                            {column.header}
                            {column.filterable && (
                              <button
                                onClick={() => {}}
                                className="ml-2 text-gray-600 hover:text-gray-800"
                              >
                                <Filter className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                      {onDelete && (
                        <th className="px-3 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                    {columns.map((column, index) => (
                      <tr key={`filter-${index}`}>
                        {column.filterable && (
                          <td key={`filter-${index}`} className="px-3 py-2 text-left text-gray-700">
                            <input
                              type="text"
                              placeholder={`Filter by ${column.header}`}
                              className="px-2 py-1 text-sm border rounded-md"
                              value={filters[column.key as keyof typeof filters] || ""}
                              onChange={(e) =>
                                handleFilterChange(column.key as string, e.target.value)
                              }
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {filteredData?.map((item, index) => (
                      <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                        {columns.map((column, colIndex) => (
                          <td key={colIndex} className="px-3 py-2 text-left text-gray-700">
                            {column.render
                              ? column.render(item)
                              : (item[column.key as keyof T] as React.ReactNode)}
                          </td>
                        ))}
                        {onDelete && (
                          <td className="px-3 py-2 text-gray-700">
                            <button
                              onClick={() => onDelete(item.id)}
                              className="ml-auto block text-green-600 hover:text-blue-800 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {onPageChange && (
                <div className="flex justify-between items-center p-2 border-t bg-white sticky bottom-0">
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 text-[10px] ${
                      currentPage === 1 ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'
                    } rounded-md text-gray-600 transition-colors`}
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`px-2 py-1 text-[10px] rounded-md hover:bg-gray-300 transition-colors ${
                          currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className={`px-2 py-1 text-[10px] ${
                      currentPage === pageCount ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'
                    } rounded-md text-gray-600 transition-colors`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedTabularComponent;
