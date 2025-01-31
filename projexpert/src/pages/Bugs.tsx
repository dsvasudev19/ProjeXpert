import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosIntance";
import TabularComponent from "./../components/TabularComponent";
import toast from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  let color = "bg-gray-500";
  if (status === "open") color = "bg-red-500";
  if (status === "In-Progress") color = "bg-yellow-500";
  if (status === "resolved") color = "bg-green-500";
  return (
    <span className={`px-1.5 py-0.5 text-[10px] text-white rounded-full ${color}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  let color = "bg-gray-500";
  if (priority === "low") color = "bg-blue-500";
  if (priority === "medium") color = "bg-yellow-500";
  if (priority === "high") color = "bg-orange-500";
  if (priority === "critical") color = "bg-red-500";
  return (
    <span className={`px-1.5 py-0.5 text-[10px] text-white rounded-full ${color}`}>
      {priority}
    </span>
  );
};

const BugsPage = () => {
  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);


  const handleDelete = (id: number) => {
    toast.success(`Bug ${id} deleted`);
  };

  const handleEdit = (id: number) => {
    toast.success(`Editing bug ${id}`);
  };

  const actions = [
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      handler: handleEdit,
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      handler: handleDelete,
    },
  ];

  const columns = [
    { header: "Title", key: "title" },
    { header: "Description", key: "description" },
    {
      header: "Status",
      key: "status",
      render: (bug: any) => <StatusBadge status={bug?.status} />
    },
    {
      header: "Priority",
      key: "priority",
      render: (bug: any) => <PriorityBadge priority={bug?.priority} />
    },
    { header: "Due Date", key: "dueDate" },
    { header: "Project", key: "project", render: (bug: any) => bug?.Project?.name },
    { header: "Reporter", key: "Reporter", render: (bug: any) => bug?.Reporter?.name },
    { header: "Assignee", key: "Assignee", render: (bug: any) => bug?.Assignee?.name },
  ];

  const dummyBugs = [
    { id: 1, title: "Login Button Not Working", description: "Users are unable to log in", status: "Open", priority: "High", dueDate: "2025-02-10", project: { name: "Authentication" }, Reporter: { name: "Alice" }, Assignee: { name: "John" } },
    { id: 2, title: "Profile Image Upload Fails", description: "Error on uploading profile images", status: "In Progress", priority: "Medium", dueDate: "2025-02-15", project: { name: "User Profile" }, Reporter: { name: "Bob" }, Assignee: { name: "Sarah" } },
    { id: 3, title: "Page Load Time Too Slow", description: "Pages are loading slowly", status: "Resolved", priority: "Critical", dueDate: "2025-01-25", project: { name: "Performance" }, Reporter: { name: "Charlie" }, Assignee: { name: "James" } },
    { id: 4, title: "404 Error on Product Page", description: "Product page returns 404 error", status: "Open", priority: "High", dueDate: "2025-02-01", project: { name: "E-Commerce" }, Reporter: { name: "David" }, Assignee: { name: "Eve" } },
    { id: 5, title: "Cart Button Not Responsive", description: "Cart button is not responding to clicks", status: "In Progress", priority: "Medium", dueDate: "2025-02-05", project: { name: "Shopping Cart" }, Reporter: { name: "Grace" }, Assignee: { name: "Tom" } },
    { id: 6, title: "Missing Terms and Conditions Link", description: "Terms and conditions link is missing in the footer", status: "Open", priority: "Low", dueDate: "2025-02-20", project: { name: "Website Footer" }, Reporter: { name: "Hank" }, Assignee: { name: "Linda" } },
    { id: 7, title: "Payment Gateway Error", description: "Error on payment gateway integration", status: "Resolved", priority: "High", dueDate: "2025-01-30", project: { name: "Payment" }, Reporter: { name: "Ivy" }, Assignee: { name: "Nathan" } },
    { id: 8, title: "Database Connection Timeout", description: "Connection to the database is timing out", status: "Open", priority: "Critical", dueDate: "2025-02-02", project: { name: "Backend" }, Reporter: { name: "Jack" }, Assignee: { name: "Olivia" } },
    { id: 9, title: "Navigation Bar Overlapping", description: "Navigation bar is overlapping on smaller screens", status: "In Progress", priority: "Low", dueDate: "2025-02-08", project: { name: "Frontend" }, Reporter: { name: "Kevin" }, Assignee: { name: "Paul" } },
    { id: 10, title: "Search Feature Not Returning Results", description: "Search feature is not returning any results", status: "Resolved", priority: "Medium", dueDate: "2025-01-28", project: { name: "Search" }, Reporter: { name: "Liam" }, Assignee: { name: "Qasim" } },
    { id: 11, title: "Session Expiry Issue", description: "User session expires too early", status: "Open", priority: "High", dueDate: "2025-02-12", project: { name: "Security" }, Reporter: { name: "Mia" }, Assignee: { name: "Riley" } },
    { id: 12, title: "Broken Link in Footer", description: "Broken link in footer", status: "In Progress", priority: "Low", dueDate: "2025-02-18", project: { name: "Website Footer" }, Reporter: { name: "Nina" }, Assignee: { name: "Sebastian" } },
    { id: 13, title: "Image Slider Not Working", description: "Image slider on homepage not functioning", status: "Resolved", priority: "Medium", dueDate: "2025-01-27", project: { name: "Frontend" }, Reporter: { name: "Oscar" }, Assignee: { name: "Tyler" } },
    { id: 14, title: "Error on Checkout Page", description: "Error occurs during checkout", status: "Open", priority: "Critical", dueDate: "2025-02-14", project: { name: "Checkout" }, Reporter: { name: "Penny" }, Assignee: { name: "Uma" } },
    { id: 15, title: "Unable to Reset Password", description: "Password reset functionality not working", status: "In Progress", priority: "High", dueDate: "2025-02-10", project: { name: "Authentication" }, Reporter: { name: "Vera" }, Assignee: { name: "Walter" } },
    { id: 16, title: "API Response Delay", description: "API response is delayed", status: "Resolved", priority: "Medium", dueDate: "2025-01-15", project: { name: "API" }, Reporter: { name: "Xander" }, Assignee: { name: "Yara" } },
    { id: 17, title: "CSS Styles Missing", description: "CSS styles are not loading properly on the website", status: "Open", priority: "Low", dueDate: "2025-02-25", project: { name: "Frontend" }, Reporter: { name: "Zane" }, Assignee: { name: "Abby" } },
    { id: 18, title: "Multiple Login Attempts Blocked", description: "System blocks multiple login attempts", status: "In Progress", priority: "Medium", dueDate: "2025-02-28", project: { name: "Security" }, Reporter: { name: "Ben" }, Assignee: { name: "Chris" } },
    { id: 19, title: "Missing Feature on Admin Panel", description: "Admin panel is missing a feature", status: "Resolved", priority: "High", dueDate: "2025-01-10", project: { name: "Admin" }, Reporter: { name: "Diana" }, Assignee: { name: "Ethan" } },
    { id: 20, title: "Responsive Design Issues", description: "Responsive design not working properly", status: "Open", priority: "Low", dueDate: "2025-02-05", project: { name: "Frontend" }, Reporter: { name: "Frank" }, Assignee: { name: "Grace" } },
    { id: 21, title: "Unresponsive API Endpoint", description: "API endpoint is not responding", status: "In Progress", priority: "Critical", dueDate: "2025-01-22", project: { name: "Backend" }, Reporter: { name: "Holly" }, Assignee: { name: "Irene" } },
    { id: 22, title: "User Authentication Error", description: "User authentication fails intermittently", status: "Resolved", priority: "High", dueDate: "2025-01-18", project: { name: "Authentication" }, Reporter: { name: "Jack" }, Assignee: { name: "Kara" } },
    { id: 23, title: "Form Validation Not Working", description: "Form validation is not firing on submit", status: "Open", priority: "Medium", dueDate: "2025-02-20", project: { name: "Frontend" }, Reporter: { name: "Lila" }, Assignee: { name: "Mark" } },
    { id: 24, title: "Slow API Response", description: "API response is slow during peak times", status: "In Progress", priority: "Medium", dueDate: "2025-02-13", project: { name: "Backend" }, Reporter: { name: "Nancy" }, Assignee: { name: "Oscar" } },
    { id: 25, title: "Payment Confirmation Email Not Sent", description: "Payment confirmation email not being sent after checkout", status: "Resolved", priority: "Low", dueDate: "2025-01-05", project: { name: "Email" }, Reporter: { name: "Paul" }, Assignee: { name: "Quincy" } },
    { id: 26, title: "404 on Contact Page", description: "Contact page returns 404 error", status: "Open", priority: "Low", dueDate: "2025-02-17", project: { name: "Website" }, Reporter: { name: "Rachel" }, Assignee: { name: "Steve" } },
    { id: 27, title: "Security Vulnerability in Code", description: "Potential security vulnerability found in the code", status: "Resolved", priority: "Critical", dueDate: "2025-01-12", project: { name: "Security" }, Reporter: { name: "Tim" }, Assignee: { name: "Ursula" } },
    { id: 28, title: "API Documentation Missing", description: "API documentation is missing for new endpoints", status: "Open", priority: "Low", dueDate: "2025-02-22", project: { name: "API" }, Reporter: { name: "Victor" }, Assignee: { name: "Wendy" } },
    { id: 29, title: "Error in Checkout Flow", description: "Checkout process causes an error after selecting payment method", status: "In Progress", priority: "High", dueDate: "2025-02-03", project: { name: "E-Commerce" }, Reporter: { name: "Xena" }, Assignee: { name: "Yasmine" } },
    { id: 30, title: "Unnecessary API Calls", description: "Redundant API calls are being made", status: "Resolved", priority: "Medium", dueDate: "2025-01-19", project: { name: "Optimization" }, Reporter: { name: "Zach" }, Assignee: { name: "Alice" } }
  ];


  const fetchBugs = async () => {
    try {
      setBugs(dummyBugs);
      setTotal(dummyBugs.length);
      setLoading(true);
      const res = await axiosInstance.get(`/admin/bug?page=${currentPage}&limit=14`);
      if (res.status === 200) {
        console.log(res.data)
        setBugs(res.data);
        setTotal(res.data.length);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBug = async (id: number) => {
    try {
      await axiosInstance.delete(`/bugs/${id}`);
      toast.success("Bug deleted successfully");
      fetchBugs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [currentPage]);



  const dropdowns = [
    {
      label: "Status",
      key: "status",
      options: [
        { value: "", label: "All Statuses" },
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
        { value: "in-progress", label: "In Progress" },
      ],
      color: "red",
    },
    {
      label: "Priority",
      key: "priority",
      options: [
        { value: '', label: "All Priorities" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
      color: 'yellow'
    },
    {
      label: "Due Date",
      key: "duedate",
      options: [
        { value: "", label: "Date Filter" },
        { value: "2025-02-01", label: "2025-02-01" },
        { value: "2025-02-15", label: "2025-02-15" },
      ],
      color: 'green'
    },
    {
      label: "Project",
      key: "project",
      options: [
        { value: '', label: "All Projects" },
        { value: "project-a", label: "Project A" },
        { value: "project-b", label: "Project B" },
      ],
      color: 'blue'
    },
  ];




  return (
    <TabularComponent
      columns={columns}
      data={bugs}
      loading={loading}
      title="Bug Tracking"
      currentPage={currentPage}
      total={total}
      onPageChange={setCurrentPage}
      onDelete={deleteBug}
      dropdowns={dropdowns}
      actions={actions}
    />

  );
};

export default BugsPage;