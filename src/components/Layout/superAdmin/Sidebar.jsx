import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "280px" }}
    >
      <span className="fs-4 mb-3">Admin Dashboard</span>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="companies"
            className={({ isActive }) =>
              isActive ? "nav-link active text-white" : "nav-link text-white"
            }
          >
            Client Companies
          </NavLink>
        </li>

        <li>
          <NavLink
            to="plans"
            className={({ isActive }) =>
              isActive ? "nav-link active text-white" : "nav-link text-white"
            }
          >
            Manage Plans
          </NavLink>
        </li>

        <li>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              isActive ? "nav-link active text-white" : "nav-link text-white"
            }
          >
            Contact Messages
          </NavLink>
        </li>

        <li>
          <NavLink
            to="announcements"
            className={({ isActive }) =>
              isActive ? "nav-link active text-white" : "nav-link text-white"
            }
          >
            Announcements
          </NavLink>
        </li>

        <li>
          <NavLink
            to="superadmins"
            className={({ isActive }) =>
              isActive ? "nav-link active text-white" : "nav-link text-white"
            }
          >
            Super Admins
          </NavLink>
        </li>
      </ul>

      <hr />

      <div className="text-white">
        <strong>Super Admin</strong>
      </div>
    </div>
  );
}
