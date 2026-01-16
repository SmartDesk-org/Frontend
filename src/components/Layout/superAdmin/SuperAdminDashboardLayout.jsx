// src/components/Layout/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function SuperAdminDashboardLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-neutral-950 text-white overflow-hidden font-sans">
      
      {/* Sidebar (Handles its own mobile header & toggle logic) */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-neutral-950">
        
        {/* --- BACKGROUND GRID PATTERN --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Top Navbar Wrapper */}
        {/* Added 'relative z-10' so it sits ABOVE the grid */}
        <div className="flex-shrink-0 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm relative z-10">
           <TopNavbar />
        </div>

        {/* 3. Scrollable Page Content */}
        {/* Added 'relative z-10' so content sits ABOVE the grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10">
          <Outlet /> 
        </div>
      </div>

    </div>
  );
}