// src/pages/UnauthorizedPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white py-5 fade-in">
      
      {/* Icon Container with Badge */}
      <div className="position-relative mb-4">
        {/* Main Icon Box */}
        <div 
          className="bg-white rounded-5 shadow-lg border d-flex align-items-center justify-content-center" 
          style={{ width: "120px", height: "120px" }}
        >
          <i className="bi bi-person-lock text-primary" style={{ fontSize: "4rem" }}></i>
        </div>

        {/* Warning Badge */}
        <div 
          className="position-absolute top-0 start-100 translate-middle bg-danger border border-4 border-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="bi bi-exclamation text-white fs-5 fw-bold"></i>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center px-3" style={{ maxWidth: "500px" }}>
        <h2 className="display-6 fw-bold text-dark mb-3">
          Access Restricted
        </h2>
        
        <p className="text-muted fs-5 mb-4 lh-base">
          You don't have the necessary permissions to access this module. 
          This area is usually reserved for <strong className="text-dark">Company Admins</strong> or <strong className="text-dark">Super Admins</strong>.
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button 
            onClick={() => navigate(-1)} // Go back one step in history
            className="btn btn-outline-secondary btn-lg px-4 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Go Back
          </button>

          <button 
            onClick={() => alert('Access request sent to administrator.')}
            className="btn btn-primary btn-lg px-4 d-flex align-items-center justify-content-center gap-2 shadow-sm"
          >
            <i className="bi bi-key-fill"></i>
            Request Access
          </button>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="mt-5 p-3 bg-light rounded-3 border d-flex align-items-start gap-3" style={{ maxWidth: "420px" }}>
        <i className="bi bi-info-circle-fill text-secondary mt-1 fs-5"></i>
        <p className="mb-0 small text-muted text-start">
          If you believe this is a mistake, please verify your account status with the <span className="text-primary fw-medium">SmartDesk Admin Panel</span> or contact support.
        </p>
      </div>

    </div>
  );
};

export default UnauthorizedPage;