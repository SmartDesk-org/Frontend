// src/components/Layout/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function SuperAdminDashboardLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div id="page-content-wrapper" className="flex-grow-1 bg-light">
        <TopNavbar />
        <div className="container-fluid p-4">
          <Outlet /> {/* Renders the child route component */}
        </div>
      </div>
    </div>
  );
}