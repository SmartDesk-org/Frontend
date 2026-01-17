// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Server, Share2, Shield, Book, Terminal, Github } from "lucide-react";

// // --- LAYOUTS ---
// import SuperAdminDashboardLayout from "./components/Layout/superAdmin/SuperAdminDashboardLayout";
// import CompanyAdminDashboardLayout from "./components/Layout/companyAdmin/CompanyAdminDashboardLayout";

// // --- PUBLIC PAGES (MARKETING) ---
// import LandingPage from "./pages/LandingPage";
// import ProductTemplate from "./pages/FooterComponents/ProductTemplate";
// import LegalTemplate from "./pages/FooterComponents/LegalTemplate";
// import StatusPage from "./pages/FooterComponents/StatusPage";
// import ChangelogPage from "./pages/FooterComponents/ChangelogPage";

// // --- AUTH & SUBSCRIPTION ---
// import LoginPage from "./pages/loginPage";
// import PurchaseSubscriptionPage from "./pages/PurchaseSubscriptionPage";
// import PaymentPage from "./pages/PaymentPage";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";

// // --- SUPER ADMIN PAGES ---
// import CompaniesPage from "./pages/superAdminDashboardPages/CompaniesPage";
// import PlansPage from "./pages/superAdminDashboardPages/PlansPage";
// import MessagesPage from "./pages/superAdminDashboardPages/MessagesPage";
// import AnnouncementsPage from "./pages/superAdminDashboardPages/AnnouncementsPage";
// import SuperAdminsPage from "./pages/superAdminDashboardPages/SuperAdminsPage";
// import SuperFeedbacksPage from "./pages/superAdminDashboardPages/FeedbacksPage";

// // --- COMPANY ADMIN PAGES ---
// import EmployeesPage from "./pages/companyAdminDashboardPages/EmployeePage";
// import DesksPage from "./pages/companyAdminDashboardPages/DesksPage";
// import CompanySubPage from "./pages/companyAdminDashboardPages/CompanySubPage";
// import CompanyFeedbackpage from "./pages/companyAdminDashboardPages/FeedbacksPage";
// import FloorLayoutPage from "./pages/companyAdminDashboardPages/FloorLayoutPage";
// import ResourceRegistrationPage from "./pages/companyAdminDashboardPages/ResourceRegistrationPage";
// import MainLayout from "./components/Layout/MainLayout";
// import NotFoundPage from "./pages/404";
// import RenewelPaymentPage from "./pages/RenewelPaymentPage";
// import { Toaster } from "./components/UI/Toast";

// // --- UTILITY: SCROLL TO TOP ---
// // Ensures that when you click a footer link, the new page starts at the top
// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// function App() {
//   return (
//     <>
//       <Toaster />
//       <ScrollToTop />
//       <Routes>
//         {/* ================= PUBLIC WEBSITE (Wrapped in MainLayout) ================= */}
//         {/* These pages automatically get the Floating Navbar & New Footer */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<LandingPage />} />

//           {/* --- PRODUCT ROUTES --- */}
//           <Route
//             path="/infrastructure"
//             element={
//               <ProductTemplate
//                 icon={Server}
//                 title="Global Infrastructure"
//                 subtitle="Deploy to 35+ regions instantly. Our multi-tenant architecture ensures 99.99% uptime."
//                 features={[
//                   {
//                     title: "Edge Caching",
//                     desc: "Content delivered from the node closest to your office.",
//                   },
//                   {
//                     title: "Auto-Scaling",
//                     desc: "Resources scale up/down based on real-time booking demand.",
//                   },
//                   {
//                     title: "Disaster Recovery",
//                     desc: "Automated failover to secondary regions in under 30 seconds.",
//                   },
//                 ]}
//               />
//             }
//           />

//           <Route
//             path="/integrations"
//             element={
//               <ProductTemplate
//                 icon={Share2}
//                 title="Seamless Integrations"
//                 subtitle="Connect SmartDesk to the tools your team already uses."
//                 features={[
//                   {
//                     title: "Slack & Teams",
//                     desc: "Book desks directly from your chat apps.",
//                   },
//                   {
//                     title: "HRIS Sync",
//                     desc: "Sync employee data from Workday, BambooHR, and Rippling.",
//                   },
//                   {
//                     title: "Calendar",
//                     desc: "Two-way sync with Google Calendar and Outlook.",
//                   },
//                 ]}
//               />
//             }
//           />

//           <Route
//             path="/enterprise"
//             element={
//               <ProductTemplate
//                 icon={Shield}
//                 title="Enterprise Scale"
//                 subtitle="Governance, compliance, and control for organizations with 10,000+ employees."
//                 features={[
//                   {
//                     title: "SAML/SSO",
//                     desc: "Enforce security policies with Okta, Azure AD, or OneLogin.",
//                   },
//                   {
//                     title: "Audit Logs",
//                     desc: "Track every booking, cancellation, and admin action.",
//                   },
//                   {
//                     title: "Dedicated Support",
//                     desc: "24/7 priority support with a dedicated Success Manager.",
//                   },
//                 ]}
//               />
//             }
//           />

//           <Route path="/changelog" element={<ChangelogPage />} />

//           {/* --- DEVELOPER ROUTES --- */}
//           <Route
//             path="/docs"
//             element={
//               <ProductTemplate
//                 icon={Book}
//                 title="Documentation"
//                 subtitle="Comprehensive guides for administrators and developers."
//                 features={[
//                   {
//                     title: "Quick Start",
//                     desc: "Get up and running in 5 minutes.",
//                   },
//                   {
//                     title: "SDKs",
//                     desc: "Libraries for Node.js, Python, and Go.",
//                   },
//                   { title: "Webhooks", desc: "Real-time event subscriptions." },
//                 ]}
//               />
//             }
//           />

//           <Route
//             path="/api"
//             element={
//               <ProductTemplate
//                 icon={Terminal}
//                 title="API Reference"
//                 subtitle="Restful API endpoints for custom integrations."
//                 features={[
//                   {
//                     title: "Authentication",
//                     desc: "Bearer Token authentication.",
//                   },
//                   {
//                     title: "Rate Limits",
//                     desc: "1000 req/min for Enterprise.",
//                   },
//                   {
//                     title: "Interactive Console",
//                     desc: "Test endpoints directly in browser.",
//                   },
//                 ]}
//               />
//             }
//           />

//           <Route
//             path="/opensource"
//             element={
//               <ProductTemplate
//                 icon={Github}
//                 title="Open Source"
//                 subtitle="We contribute back to the community."
//                 features={[
//                   {
//                     title: "React Components",
//                     desc: "Our UI library is public.",
//                   },
//                   { title: "Go SDK", desc: "Our backend SDK is MIT licensed." },
//                   { title: "Docs", desc: "Help us improve our documentation." },
//                 ]}
//               />
//             }
//           />

//           <Route path="/status" element={<StatusPage />} />

//           {/* --- LEGAL ROUTES --- */}
//           <Route
//             path="/privacy"
//             element={
//               <LegalTemplate title="Privacy Policy" lastUpdated="Jan 2026" />
//             }
//           />
//           <Route
//             path="/dpa"
//             element={
//               <LegalTemplate
//                 title="Data Processing Addendum"
//                 lastUpdated="Dec 2025"
//               />
//             }
//           />
//           <Route
//             path="/subprocessors"
//             element={
//               <LegalTemplate
//                 title="List of Subprocessors"
//                 lastUpdated="Jan 2026"
//               />
//             }
//           />
//           <Route
//             path="/security"
//             element={
//               <LegalTemplate title="Security Measures" lastUpdated="Jan 2026" />
//             }
//           />
//         </Route>

//         {/* ================= AUTH & STANDALONE PAGES ================= */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/purchase" element={<PurchaseSubscriptionPage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/renewelPayment" element={<RenewelPaymentPage/>}/>
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* ================= SUPER ADMIN DASHBOARD ================= */}
//         <Route path="/super-admin" element={<SuperAdminDashboardLayout />}>
//           <Route index element={<CompaniesPage />} />
//           <Route path="companies" element={<CompaniesPage />} />
//           <Route path="plans" element={<PlansPage />} />
//           <Route path="messages" element={<MessagesPage />} />
//           <Route path="announcements" element={<AnnouncementsPage />} />
//           <Route path="superadmins" element={<SuperAdminsPage />} />
//           <Route path="feedbacks" element={<SuperFeedbacksPage />} />
//         </Route>

//         {/* ================= COMPANY ADMIN DASHBOARD ================= */}
//         <Route path="/company-admin" element={<CompanyAdminDashboardLayout />}>
//           <Route index element={<FloorLayoutPage />} />
//           <Route path="employees" element={<EmployeesPage />} />
//           <Route path="desks" element={<DesksPage />} />
//           <Route path="resources" element={<ResourceRegistrationPage />} />
//           <Route path="subscription" element={<CompanySubPage />} />
//           <Route path="feedbacks" element={<CompanyFeedbackpage />} />
//         </Route>

//         {/* 404 Route */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Server, Share2, Shield, Book, Terminal, Github } from "lucide-react";
import { jwtDecode } from "jwt-decode"; // Ensure you installed this: npm install jwt-decode

// --- LAYOUTS ---
import SuperAdminDashboardLayout from "./components/Layout/superAdmin/SuperAdminDashboardLayout";
import CompanyAdminDashboardLayout from "./components/Layout/companyAdmin/CompanyAdminDashboardLayout";
import MainLayout from "./components/Layout/MainLayout";


// --- NEW EMPLOYEE IMPORTS ---
import EmployeeLayout from "./components/Layout/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employeeDashboardPages/EmployeeDashboard";
import EmployeeLiveMap from "./pages/employeeDashboardPages/EmployeeLiveMap";
import MyBookingsPanel from "./pages/employeeDashboardPages/MyBookingPanel";


// --- PUBLIC PAGES ---
import LandingPage from "./pages/LandingPage";
import ProductTemplate from "./pages/FooterComponents/ProductTemplate";
import LegalTemplate from "./pages/FooterComponents/LegalTemplate";
import StatusPage from "./pages/FooterComponents/StatusPage";
import ChangelogPage from "./pages/FooterComponents/ChangelogPage";
import NotFoundPage from "./pages/404";

// --- AUTH & SUBSCRIPTION ---
import LoginPage from "./pages/loginPage";
import PurchaseSubscriptionPage from "./pages/PurchaseSubscriptionPage";
import PaymentPage from "./pages/PaymentPage";
import RenewelPaymentPage from "./pages/RenewelPaymentPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// --- DASHBOARD PAGES ---
import CompaniesPage from "./pages/superAdminDashboardPages/CompaniesPage";
import PlansPage from "./pages/superAdminDashboardPages/PlansPage";
import MessagesPage from "./pages/superAdminDashboardPages/MessagesPage";
import SuperAdminsPage from "./pages/superAdminDashboardPages/SuperAdminsPage";
import SuperFeedbacksPage from "./pages/superAdminDashboardPages/FeedbacksPage";

import EmployeesPage from "./pages/companyAdminDashboardPages/EmployeePage";
import DesksPage from "./pages/companyAdminDashboardPages/DesksPage";
import CompanySubPage from "./pages/companyAdminDashboardPages/CompanySubPage";
import CompanyFeedbackpage from "./pages/companyAdminDashboardPages/FeedbacksPage";
import FloorLayoutPage from "./pages/companyAdminDashboardPages/FloorLayoutPage";
import ResourceRegistrationPage from "./pages/companyAdminDashboardPages/ResourceRegistrationPage";

import { Toaster } from "./components/UI/Toast";

// =========================================================================
// 1. AUTH & ROLE CONFIGURATION
// =========================================================================

// Matches ResourceFlow.Domain.Enums
const ROLES = {
  SuperAdmin: 1,
  CompanyAdmin: 2,
  Employee: 3,
};

// Helper: Decodes token and extracts 'roleId'
const useAuth = () => {
  const token = localStorage.getItem("token");

  // 1. No token found
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // 2. Token expired?
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return null;
    }

    // 3. Extract roleId ("2" -> 2)
    const roleId = decoded.roleId ? parseInt(decoded.roleId, 10) : null;

    return {
      token,
      role: roleId,
      email: decoded.UserEmail,
    };
  } catch (error) {
    // Token is invalid/corrupt
    localStorage.removeItem("token");
    return null;
  }
};

// =========================================================================
// 2. ROUTE GUARDS
// =========================================================================

/**
 * PROTECTS DASHBOARDS:
 * - If not logged in -> Redirect to /login
 * - If wrong role -> Redirect to /unauthorized
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

/**
 * PROTECTS LOGIN PAGE:
 * - If user IS logged in -> Redirect them to their dashboard immediately.
 * - They will never see the login page if they have a valid token.
 */
const PublicRoute = () => {
  const user = useAuth();

  if (user) {
    if (user.role === ROLES.SuperAdmin)
      return <Navigate to="/super-admin" replace />;
    if (user.role === ROLES.CompanyAdmin)
      return <Navigate to="/company-admin" replace />;

    if (user.role === ROLES.Employee) return <Navigate to="/employee" replace />;
    // Default fallback
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// =========================================================================
// 3. MAIN APP
// =========================================================================

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Routes>
        {/* ----------------------------------------------------------------- */}
        {/* PUBLIC WEBSITE (Accessible to everyone)                           */}
        {/* ----------------------------------------------------------------- */}
        <Route element={<MainLayout />}>
          {/* Product Pages */}
          <Route
            path="/infrastructure"
            element={
              <ProductTemplate
                icon={Server}
                title="Infrastructure"
                subtitle="Global Scale"
                features={[]}
              />
            }
          />
          <Route
            path="/integrations"
            element={
              <ProductTemplate
                icon={Share2}
                title="Integrations"
                subtitle="Connect Tools"
                features={[]}
              />
            }
          />
          <Route
            path="/enterprise"
            element={
              <ProductTemplate
                icon={Shield}
                title="Enterprise"
                subtitle="Security First"
                features={[]}
              />
            }
          />

          {/* Dev & Status */}
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route
            path="/docs"
            element={
              <ProductTemplate
                icon={Book}
                title="Docs"
                subtitle="Guides"
                features={[]}
              />
            }
          />
          <Route
            path="/api"
            element={
              <ProductTemplate
                icon={Terminal}
                title="API"
                subtitle="Reference"
                features={[]}
              />
            }
          />
          <Route
            path="/opensource"
            element={
              <ProductTemplate
                icon={Github}
                title="Open Source"
                subtitle="Community"
                features={[]}
              />
            }
          />
          <Route path="/status" element={<StatusPage />} />

          {/* Legal */}
          <Route
            path="/privacy"
            element={
              <LegalTemplate title="Privacy Policy" lastUpdated="Jan 2026" />
            }
          />
          <Route
            path="/dpa"
            element={<LegalTemplate title="DPA" lastUpdated="Dec 2025" />}
          />
          <Route
            path="/subprocessors"
            element={
              <LegalTemplate title="Subprocessors" lastUpdated="Jan 2026" />
            }
          />
          <Route
            path="/security"
            element={<LegalTemplate title="Security" lastUpdated="Jan 2026" />}
          />
        </Route>

        {/* ----------------------------------------------------------------- */}
        {/* LOGIN / AUTH PAGES (Restricted: Logged-in users bounce off)       */}
        {/* ----------------------------------------------------------------- */}
        <Route element={<PublicRoute />}>
        <Route path="/payment" element={<PaymentPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/purchase" element={<PurchaseSubscriptionPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ----------------------------------------------------------------- */}
        {/* SUPER ADMIN DASHBOARD (Role: 1)                                   */}
        {/* ----------------------------------------------------------------- */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.SuperAdmin]} />}>
          <Route path="/super-admin" element={<SuperAdminDashboardLayout />}>
            <Route index element={<CompaniesPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="superadmins" element={<SuperAdminsPage />} />
            <Route path="feedbacks" element={<SuperFeedbacksPage />} />
          </Route>
        </Route>

        {/* ----------------------------------------------------------------- */}
        {/* COMPANY ADMIN DASHBOARD (Role: 2)                                 */}
        {/* ----------------------------------------------------------------- */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.CompanyAdmin]} />}>
          <Route
            path="/company-admin"
            element={<CompanyAdminDashboardLayout />}
          >
            <Route index element={<FloorLayoutPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="desks" element={<DesksPage />} />
            <Route path="resources" element={<ResourceRegistrationPage />} />
            <Route path="subscription" element={<CompanySubPage />} />
            <Route path="feedbacks" element={<CompanyFeedbackpage />} />
          </Route>
        </Route>


          {/* ----------------------------------------------------------------- */}
          {/* EMPLOYEE DASHBOARD (Role: 3)                                     */}
          {/* ----------------------------------------------------------------- */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.Employee]} />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboard />} />
              <Route path="map" element={<EmployeeLiveMap />} />
              <Route path="my-bookings" element={<MyBookingsPanel />} />
              {/* Add future employee-specific pages here */}
            </Route>
          </Route>
        {/* ----------------------------------------------------------------- */}
        {/* SHARED PROTECTED ROUTES                                           */}
        {/* ----------------------------------------------------------------- */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.SuperAdmin, ROLES.CompanyAdmin]}
            />
          }
        >
          <Route path="/renewelPayment" element={<RenewelPaymentPage />} />
        </Route>

        {/* 404 & Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex h-screen items-center justify-center text-xl font-bold text-red-600">
              403 - Unauthorized Access
            </div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
