// src/components/Layout/companyAdmin/CompanyAdminDashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function CompanyAdminDashboardLayout() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}
