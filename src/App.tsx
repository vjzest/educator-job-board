
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./store/store";
import i18n from "./i18n/config";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import CompanyReviews from "./pages/CompanyReviews";
import SalaryGuide from "./pages/SalaryGuide";
import CareerGuide from "./pages/CareerGuide";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import MyJobs from "./pages/MyJobs";
import MyProfile from "./pages/MyProfile";
import MyReviews from "./pages/MyReviews";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import JobDetailPage from "./pages/Jobfulldetailspage";
import Help from "./pages/Help";
import SalaryDetailsPage from "./pages/SalaryDetailsPage";

// Dashboard layouts
import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";

// Dashboard pages
import EmployeeProfile from "./pages/dashboard/employee/EmployeeProfile";
import EmployeeSkills from "./pages/dashboard/employee/EmployeeSkills";
import BrowseJobs from "./pages/dashboard/employee/BrowseJobs";
import MyApplications from "./pages/dashboard/employee/MyApplications";
import EmployeeSettings from "./pages/dashboard/employee/EmployeeSettings";

import AdminJobs from "./pages/dashboard/admin/AdminJobs";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminWorkflows from "./pages/dashboard/admin/AdminWorkflows";
import AdminControlPanel from "./pages/dashboard/admin/AdminControlPanel";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/company-reviews" element={<CompanyReviews />} />
              <Route path="/salary-guide" element={<SalaryGuide />} />
              <Route path="/career-guide" element={<CareerGuide />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/my-jobs" element={<MyJobs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/job/:id" element={<JobDetailPage />} />
              <Route path="/help" element={<Help />} />
              <Route
                path="/career/:careerPath/salaries"
                element={<SalaryDetailsPage />}
              />

              {/* Employee Dashboard Routes */}
              <Route path="/dashboard/employee" element={<EmployeeDashboard />}>
                <Route index element={<EmployeeProfile />} />
                <Route path="profile" element={<EmployeeProfile />} />
                <Route path="skills" element={<EmployeeSkills />} />
                <Route path="browse-jobs" element={<BrowseJobs />} />
                <Route path="applications" element={<MyApplications />} />
                <Route path="settings" element={<EmployeeSettings />} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/dashboard/admin" element={<AdminDashboard />}>
                <Route index element={<AdminJobs />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="workflows" element={<AdminWorkflows />} />
                <Route path="control-panel" element={<AdminControlPanel />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
