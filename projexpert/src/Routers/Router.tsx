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
import TeamMembersListingPage from "../pages/Project/TeamMembersListing";
import ChatbotInterface from "../pages/AIChatInterface";
import ReportBugPage from "../pages/Project/ReportBug";

import AddTaskPage from "../pages/Project/AddTask";
import ProjectDetails from "../pages/Project/ProjectDetails";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="files" element={<ProjectFileManagement />} />
          <Route path="files/p" element={<Files />} />
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
          <Route path="calendar" element={<EmployeeCalendarView />} />
          <Route path="ai-chat" element={<ChatbotInterface />} />
          <Route path="project/*" element={<ProjectDashboardLayout />}>
            <Route path="analytics" element={<ProjectManagementDashboard />} />
            <Route path="tasks/list" element={<TaskManagement />} />
            <Route path="tasks/add" element={<AddTaskPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="bugs/list" element={<BugsOverview />} />
            <Route path="bugs/report" element={<ReportBugPage />} />
            <Route path="projects/list" element={<ProjectsListingPage />} />
            <Route path="projects/add" element={<MultiStepProjectForm />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            {/* <Route path="team" element={<TeamsListingPage />} /> */}
            <Route path="team" element={<TeamMembersListingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
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
