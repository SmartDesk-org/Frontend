// src/components/Layout/companyAdmin/SideBar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar p-3 border-end" style={{ width: 220 }}>
      <h5 className="mb-3">Company Admin</h5>

      <NavLink className="d-block mb-2" to="/company-admin">
        Floor Plan
      </NavLink>

      <NavLink className="d-block mb-2" to="/company-admin/employees">
        Employees
      </NavLink>

      <NavLink className="d-block mb-2" to="/company-admin/desks">
        Desks
      </NavLink>

      <NavLink className="d-block mb-2" to="/company-admin/rooms">
        Meeting Rooms
      </NavLink>

      <NavLink className="d-block mb-2" to="/company-admin/subscription">
        Subscription
      </NavLink>
    </div>
  );
}
