// src/components/Layout/TopNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../redux/api/axiosClient";
import { clearAuthToken } from "../../redux/authToken";

export default function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/Auth/logout");

      // Clear access token from memory
      clearAuthToken();

      // Redirect to login
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);

      // Even if backend fails, force logout
      clearAuthToken();
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <button
          className="btn btn-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <h5 className="mb-0 ms-auto me-3">Welcome, Super Admin!</h5>

        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
