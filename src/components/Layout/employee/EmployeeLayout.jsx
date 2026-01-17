import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import Background from '../../../components/UI/Background'; // Your Three.js particles

export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-blue-500/30">
      <Background /> {/* Subtle particle background */}
      
      <EmployeeSidebar />
      
      <main className="flex-1 relative z-10 flex flex-col min-w-0">
        <header className="h-20 border-b border-neutral-900/50 flex items-center px-8 justify-between backdrop-blur-md sticky top-0 z-40 bg-black/20">
            <span className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase">
                Employee Access Mode
            </span>
            <div className="text-xs text-neutral-500">
                Building A • Floor 4
            </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet /> {/* This is where Dashboard, Map, etc. will render */}
        </div>
      </main>
    </div>
  );
}