interface TabularComponentProps<T> {
  columns: {
    header: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
  }[];
  data: T[];
  loading?: boolean;
  title: string;
  currentPage?: number;
  total?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onDelete?: (id: number) => void;
  dropdowns?: {
    label: string;
    key: string;  // Key for dropdown value and display
    options: { value: string | number; label: string }[]; // Array of option objects
    color?: string;
  }[];  // Array of dropdown configs
  actions?: {
    label: string;
    icon: React.ReactNode;
    handler: (id: number) => void;
  }[];
}

const TabularComponent = <T extends { id: number }>({
  columns,
  data,
  loading,
  title,
  currentPage = 1,
  total = 0,
  itemsPerPage = 14,
  onPageChange,
  actions = [],
  dropdowns = [],
}: TabularComponentProps<T>) => {
  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">
            {title}
          </h1>
          <div className="flex gap-2">
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="flex flex-col">

                <select
                  id={dropdown.key}
                  className={`px-0.5 py-1 border rounded text-xs bg-${dropdown.color}-100`}
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
        </div>

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-[82vh]">
              <div className="overflow-x-auto min-w-[1000px]">
                <table className="w-full text-[10px]">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className="px-3 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.header}
                        </th>
                      ))}
                      {actions && actions.length > 0 && (
                        <th className="px-3 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                        {columns.map((column, colIndex) => (
                          <td key={colIndex} className="px-3 py-2 text-left text-gray-700">
                            {column.render
                              ? column.render(item)
                              : (item[column.key as keyof T] as React.ReactNode)}
                          </td>
                        ))}
                        {actions && actions.length > 0 && (
                          <td className="px-3 py-2 flex space-x-2 text-gray-700 justify-end">
                            {actions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={() => action.handler(item.id)}
                                className="text-green-600 hover:text-blue-800 transition-colors"
                                title={action.label}
                              >
                                {action.icon}
                              </button>
                            ))}
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
                    className={`px-2 py-1 text-[10px] ${currentPage === 1 ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'} rounded-md text-gray-600 transition-colors`}
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`px-2 py-1 text-[10px] rounded-md hover:bg-gray-300 transition-colors ${currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className={`px-2 py-1 text-[10px] ${currentPage === pageCount ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'} rounded-md text-gray-600 transition-colors`}
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

export default TabularComponent;
