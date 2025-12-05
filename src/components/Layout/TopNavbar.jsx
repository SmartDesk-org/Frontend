// src/components/Layout/TopNavbar.jsx
import React from 'react';

export default function TopNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        {/* Offcanvas toggle for small screens */}
        <button
          className="btn btn-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h5 className="mb-0 ms-auto me-2">Welcome, Super Admin!</h5>
        <button className="btn btn-outline-danger">Logout</button>
      </div>
    </nav>
  );
}