import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../LandingPageComponents/Navbar';
import Footer from '../LandingPageComponents/Footer';

export default function MainLayout() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-indigo-500/30 flex flex-col font-sans">
      <Navbar />
      
      {/* The "Outlet" is where the specific page content will be injected */}
      <main className="flex-grow pt-24"> 
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}