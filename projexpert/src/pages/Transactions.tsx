import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosIntance";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
// import ClockLoader from "react-spinners/ClockLoader";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [total, setTotal] = useState<any>();

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/transaction?page=${currentPage}&limit=14`);
      if (res.status === 200) {
        console.log(res.data.data);
        setTransactions(res.data.data);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      const res = await axiosInstance.delete("/transaction/" + id);
      if (res?.status === 200) {
        toast.success("Transaction Deleted Successfully");
        getAllTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [currentPage]);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">
            Transaction Management
          </h1>
        </div>
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar h-[82vh]">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((transaction: any, index: any) => (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        {transaction?.id}
                      </th>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.userId}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.orderId}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.paytment_type}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.status}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.currency}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.paymentId}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.amount}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.typeId}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {transaction?.type}
                      </td>
                      <td className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-end">
                        <a
                          onClick={() => {
                            deleteTransaction(transaction?.id);
                          }}
                          className="cursor-pointer text-green-600 hover:text-blue-800 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center p-2 absolute bottom-0 w-full pl-1 pr-1 pb-1">
                <button
                  onClick={() => setCurrentPage((prev: any) => prev - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 text-xs ${
                    currentPage === 1 ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'
                  } rounded-md text-gray-600 transition-colors`}
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(total / 14) }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => {
                        setCurrentPage(pageNumber);
                      }}
                      className={`px-2 py-1 text-xs rounded-md text-gray-600 hover:bg-gray-300 transition-colors ${
                        currentPage === pageNumber ? 'bg-gray-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((prev: any) => prev + 1)}
                  disabled={currentPage === Math.ceil(total / 14)}
                  className={`px-2 py-1 text-xs ${
                    currentPage === Math.ceil(total / 14) ? 'bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'
                  } rounded-md text-gray-600 transition-colors`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
