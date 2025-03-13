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
import UnauthorizedAccess from "./../components/UnauthorizedAccess";
import ClientOrDeveloper from "../pages/ClientOrDeveloper";
import RolesAndPermissions from "../pages/RolesAndPermissions";
import EmailTemplateShowcase from "../components/EmailTemplates";
import BugsPage from "../pages/Bugs";
import EmployeeOnboarding from "../pages/EmployeeOnboarding";
import SettingsDashboard from "../pages/SettingsDashboard";
import UserProfilePage from "../pages/UserProfile";
import ChatPage from "../pages/ChatPage";
import TestPage from "../pages/TestPage";
import MultiStepProjectForm from "../pages/AddProject";
import EmployeeCalendarView from "../pages/EmployeeCalendarView";
import ProjectManagementDashboard from "../pages/Project/ProjectManagementDashboard";
import ProjectDashboardLayout from "../layout/ProjectDashboardLayout";
import TaskManagement from "../pages/Project/TaskManagement";
import SettingsPage from "../pages/Project/Setting";
import BugsOverview from "../pages/Project/BugsOverview";
import ProjectsListingPage from "../pages/Project/ProjectListingPage";
import TeamsListingPage from "../pages/Project/Team";
import TeamMembersListingPage from "../pages/Project/TeamMembersListing";



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
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="client" element={<ClientOrDeveloper />} />
          <Route path="roles-and-permissions" element={<RolesAndPermissions />} />
          <Route path="bugs" element={<BugsPage />} />
          <Route path="settings" element={<SettingsDashboard />} />
          <Route path="u/profile" element={<UserProfilePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="new-project" element={<MultiStepProjectForm />} />
          <Route path="cal" element={<EmployeeCalendarView />} />
          <Route path="*" element={<NotFound />} />
          <Route path="project/*" element={<ProjectDashboardLayout />}>
            <Route path="analytics" element={<ProjectManagementDashboard />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bugs" element={<BugsOverview />} />
            <Route path="projects" element={<ProjectsListingPage />} />
            {/* <Route path="team" element={<TeamsListingPage />} /> */}
            <Route path="team" element={<TeamMembersListingPage />} />
          </Route>

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
        <Route path="employee-onboarding" element={<EmployeeOnboarding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
