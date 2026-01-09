import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import gsap from "gsap";

export default function CompanyAdminDashboardLayout() {
  const mainRef = useRef(null);

  // 🟢 Page Entrance Animation
  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, scale: 0.98, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    // 🔥 True fullscreen wrapper with hidden overflow to prevent scrollbar flicker
    <div className="w-screen h-screen flex bg-black text-white overflow-hidden font-sans">
      {/* Sidebar handles its own responsiveness internally */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        ref={mainRef}
        className="flex-1 h-full relative overflow-hidden bg-black"
      >
        {/* Scrollable container for the actual page content */}
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
