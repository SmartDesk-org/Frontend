import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../../../redux/api/axiosClient";
import { clearAuthToken } from "../../../redux/authToken";

export default function Sidebar() {
  const navigate = useNavigate();

  const getNavLinkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 mb-1 p-3 rounded-3 transition-all ${
      isActive
        ? "bg-primary text-white shadow-sm fw-medium" 
        : "text-dark hover-bg-light text-opacity-75" 
    }`;

  const handleLogout = async (e) => {
    e.preventDefault(); 

    try {
      await axiosClient.post("/Auth/logout");
    } catch (error) {
      console.error("Logout server call failed:", error);
      
    } finally {
    
      clearAuthToken();
      navigate("/login");
    }
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-white border-end h-100"
      style={{ width: "260px", minHeight: "100vh", position: "sticky", top: 0 }}
    >
      {/* 1. Header / Branding */}
      <div className="d-flex align-items-center mb-4 mb-md-0 me-md-auto text-decoration-none pt-2 px-2">
        <div
          className="bg-primary text-white rounded p-1 me-2 d-flex justify-content-center align-items-center"
          style={{ width: 32, height: 32 }}
        >
          <i className="bi bi-buildings-fill"></i>
        </div>
        <span className="fs-5 fw-bold text-dark">Company Admin</span>
      </div>

      <hr className="text-secondary opacity-25 my-3" />

      {/* 2. Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/company-admin" end className={getNavLinkClass}>
            <i className="bi bi-grid-1x2-fill"></i>
            Floor Plan
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/company-admin/employees" className={getNavLinkClass}>
            <i className="bi bi-people-fill"></i>
            Employees
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/company-admin/desks" className={getNavLinkClass}>
            <i className="bi bi-display"></i>
            Desks
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/company-admin/rooms" className={getNavLinkClass}>
            <i className="bi bi-door-closed-fill"></i>
            Meeting Rooms
          </NavLink>
        </li>

        <li className="nav-item mt-3">
          <small
            className="text-uppercase text-muted fw-bold ms-3"
            style={{ fontSize: "0.75rem" }}
          >
            Settings
          </small>
        </li>

        <li className="nav-item mt-1">
          <NavLink to="/company-admin/subscription" className={getNavLinkClass}>
            <i className="bi bi-credit-card-2-front-fill"></i>
            Subscription
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/company-admin/feedbacks" className={getNavLinkClass}>
            <i className="bi bi-chat-quote-fill"></i>
            Feedbacks
          </NavLink>
        </li>
      </ul>

      <hr className="text-secondary opacity-25 mt-3" />

      {/* 3. User / Logout Section */}
      <div className="dropdown px-2">
        <a
          href="#"
          className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div
            className="rounded-circle bg-light border d-flex justify-content-center align-items-center me-2"
            style={{ width: 32, height: 32 }}
          >
            <i className="bi bi-person-fill text-secondary"></i>
          </div>
          <strong>Admin User</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item text-danger"
              href="#"
              onClick={handleLogout}
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
