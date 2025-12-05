// src/components/Layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: '280px' }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Admin Dashboard</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive ? 'nav-link text-white active' : 'nav-link text-white'
            }
          >
            Client Companies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/plans"
            className={({ isActive }) =>
              isActive ? 'nav-link text-white active' : 'nav-link text-white'
            }
          >
            Manage Plans
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? 'nav-link text-white active' : 'nav-link text-white'
            }
          >
            Contact Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              isActive ? 'nav-link text-white active' : 'nav-link text-white'
            }
          >
            Announcements
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/superadmins"
            className={({ isActive }) =>
              isActive ? 'nav-link text-white active' : 'nav-link text-white'
            }
          >
            Super Admins
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Super Admin</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}