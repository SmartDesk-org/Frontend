// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CompaniesPage from './pages/superAdminDashboardPages/CompaniesPage';
import PlansPage from './pages/superAdminDashboardPages/PlansPage';
import MessagesPage from './pages/superAdminDashboardPages/MessagesPage';
import AnnouncementsPage from './pages/superAdminDashboardPages/AnnouncementsPage';
import SuperAdminsPage from './pages/superAdminDashboardPages/SuperAdminsPage';
import SuperAdminDashboardLayout from './components/Layout/SuperAdminDashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="superAdminDashBoard" element={<SuperAdminDashboardLayout />}>
        <Route index element={<CompaniesPage />} /> 
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="superadmins" element={<SuperAdminsPage />} />
      </Route>

    </Routes>
  );
}

export default App;