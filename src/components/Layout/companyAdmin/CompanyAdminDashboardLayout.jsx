import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function CompanyAdminDashboardLayout() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
