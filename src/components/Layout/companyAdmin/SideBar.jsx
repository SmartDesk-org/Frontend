import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-white border-end p-3"
      style={{ width: 220, minHeight: "100vh" }}
    >
      <h6 className="fw-bold mb-3 text-uppercase text-muted">
        Company Admin
      </h6>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin">
        Floor Plan
      </NavLink>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin/employees">
        Employees
      </NavLink>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin/desks">
        Desks
      </NavLink>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin/resources">
        Manage Resources
      </NavLink>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin/subscription">
        Subscription
      </NavLink>

      <NavLink className="d-block mb-2 nav-link" to="/company-admin/feedbacks">
        Feedbacks
      </NavLink>
    </div>
  );
}
