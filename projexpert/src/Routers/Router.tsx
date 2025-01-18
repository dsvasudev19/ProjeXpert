import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./../pages/NotFound";
import DashboardLayout from "./../layout/DashboardLayout";
import Analytics from "./../pages/Analytics";
import SignInPage from "./../pages/auth/SignInPage";
import SignUpPage from "./../pages/auth/SignUpPage";
import ProjectFileManagement from "./../pages/ProjectFileManagement";
import Team from "./../pages/Team";
import Projects from "./../pages/Projects";
import Kanban from "./../pages/Kanban";
import Transactions from "./../pages/Transactions";
import Tasks from "./../pages/Tasks";
import ForgotPassword from "./../pages/auth/ForgotPassword";
import ResetPassword from "./../pages/auth/ResetPassword";
import Files from "./../pages/Files";
import Todo from "./../pages/Todo";
import Settings from "./../pages/Settings";
import UnauthorizedAccess from "./../components/UnauthorizedAccess";
import ClientOrDeveloper from "../pages/ClientOrDeveloper";
import RolesAndPermissions from "../pages/RolesAndPermissions";
import EmailTemplateShowcase from "../components/EmailTemplates";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="files" element={<ProjectFileManagement />} />
            <Route path="projects/files" element={<Files />} />
            <Route path="team" element={<Team />} />
            <Route path="project" element={<Projects />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="payment" element={<Transactions />} />
            <Route path="task" element={<Tasks />} />
            <Route path="todo" element={<Todo />} />
            <Route path="settings" element={<Settings />} />
            <Route path="client" element={<ClientOrDeveloper />} />
            <Route path="roles-and-permissions" element={<RolesAndPermissions />} />
            
          </Route>
        <Route path="/auth/*">
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="401" element={<UnauthorizedAccess />} />
        <Route path="email-templates" element={<EmailTemplateShowcase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
