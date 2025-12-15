// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PurchaseSubscriptionPage from "./pages/PurchaseSubscriptionPage";
import PaymentPage from "./pages/PaymentPage";

// Super Admin
import SuperAdminDashboardLayout from "./components/Layout/superAdmin/SuperAdminDashboardLayout";
import CompaniesPage from "./pages/superAdminDashboardPages/CompaniesPage";
import PlansPage from "./pages/superAdminDashboardPages/PlansPage";
import MessagesPage from "./pages/superAdminDashboardPages/MessagesPage";
import AnnouncementsPage from "./pages/superAdminDashboardPages/AnnouncementsPage";
import SuperAdminsPage from "./pages/superAdminDashboardPages/SuperAdminsPage";

// Company Admin
import CompanyAdminDashboardLayout from "./components/Layout/companyAdmin/CompanyAdminDashboardLayout";
import FloorPlanPage from "./pages/companyAdminDashboardPages/FloorPlanPage";
import EmployeesPage from "./pages/companyAdminDashboardPages/EmployeePage";
import DesksPage from "./pages/companyAdminDashboardPages/DesksPage";
import MeetingRoomsPage from "./pages/companyAdminDashboardPages/MeetingRoomsPage";
import CompanySubPage from "./pages/companyAdminDashboardPages/CompanySubPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/purchase" element={<PurchaseSubscriptionPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>

      {/* ================= SUPER ADMIN ================= */}
      <Route
        path="/super-admin"
        element={<SuperAdminDashboardLayout />}
      >
        <Route index element={<CompaniesPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="superadmins" element={<SuperAdminsPage />} />
      </Route>

      {/* ================= COMPANY ADMIN ================= */}
      <Route
        path="/company-admin"
        element={<CompanyAdminDashboardLayout />}
      >
        <Route index element={<FloorPlanPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="desks" element={<DesksPage />} />
        <Route path="rooms" element={<MeetingRoomsPage />} />
        <Route path="subscription" element={<CompanySubPage />} />
      </Route>
    </Routes>
  );
}

export default App;
