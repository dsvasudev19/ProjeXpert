import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layout/DashboardLayout";
import Analytics from "./pages/Analytics";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import Users from "./pages/ProjectFileManagement";
import Vendors from "./pages/Team";
import Turfs from "./pages/Projects";
import Reviews from "./pages/Kanban";
import Transactions from "./pages/Transactions";
import Bookings from "./pages/Tasks";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Files from "./pages/Files";


const AppRoutes = () => {
  return (
    <BrowserRouter>
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
        </Route>
        <Route path="/auth/*">
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<Navigate to="/auth/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
