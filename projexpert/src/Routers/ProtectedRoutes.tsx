import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Analytics from "../pages/Analytics";
import Users from "../pages/ProjectFileManagement";
import Vendors from "../pages/Team";
import Turfs from "../pages/Projects";
import Reviews from "../pages/Kanban";
import Transactions from "../pages/Transactions";
import Bookings from "../pages/Tasks";
import Files from "../pages/Files";
import Todo from "../pages/Todo";
import Settings from "../pages/Settings";

const ProtectedRoutes = () => {
  return (
    // <WithAuth>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="files" element={<Users />} />
          <Route path="projects/files" element={<Files />} />
          <Route path="team" element={<Vendors />} />
          <Route path="project" element={<Turfs />} />
          <Route path="kanban" element={<Reviews />} />
          <Route path="payment" element={<Transactions />} />
          <Route path="task" element={<Bookings />} />
          <Route path="todo" element={<Todo />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    // </WithAuth>
  );
};

export default ProtectedRoutes;
