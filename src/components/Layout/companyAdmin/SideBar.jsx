import React, { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axiosClient from "../../../redux/api/axiosClient";
import { clearAuthToken, getUserDetails } from "../../../redux/authToken";

// Icons
import {
  Layout,
  LayoutDashboard,
  Users,
  Monitor,
  Package,
  DoorClosed,
  CreditCard,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef(null);
  const user = getUserDetails();

  // 🟢 GSAP: Fluid "Water-like" Animation
  useGSAP(() => {
    const tl = gsap.timeline();

    if (collapsed) {
      // Shrink Sequence
      tl.to(sidebarRef.current, { 
        width: "70px", 
        duration: 0.4, 
        ease: "power3.inOut" 
      })
      .to(".sidebar-text", { 
        opacity: 0, 
        x: -10, 
        display: "none", 
        duration: 0.2 
      }, "<") // Run start of previous animation
      .to(".section-label", { 
        height: 0, 
        opacity: 0, 
        marginTop: 0, 
        marginBottom: 0, 
        duration: 0.2 
      }, "<");

    } else {
      // Expand Sequence
      tl.to(sidebarRef.current, { 
        width: "260px", 
        duration: 0.4, 
        ease: "power3.out" // "Water" settle effect
      })
      .to(".sidebar-text", { 
        display: "block", 
        opacity: 1, 
        x: 0, 
        stagger: 0.02, // Ripple effect on text
        duration: 0.3 
      }, "-=0.2")
      .to(".section-label", { 
        height: "auto", 
        opacity: 1, 
        marginTop: "24px", 
        marginBottom: "12px", 
        duration: 0.3 
      }, "-=0.3");
    }
  }, { dependencies: [collapsed], scope: sidebarRef });

  const handleLogout = async () => {
    try {
      await axiosClient.post("/Auth/logout");
    } catch (e) {
      console.error(e);
    } finally {
      clearAuthToken();
      navigate("/");
    }
  };

  // 🟢 NAV ITEM: Explicit colors to override Bootstrap
  const NavItem = ({ to, icon: Icon, label, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center px-4 py-3 my-1 mx-2 rounded-lg transition-all duration-300 group no-underline ${
          isActive
            ? "bg-white/10 !text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]" // Active
            : "bg-transparent !text-neutral-500 hover:!text-white hover:bg-white/5" // Inactive
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator (Glowing Line) */}
          <div className={`absolute left-0 h-full w-[3px] bg-white rounded-r-full shadow-[0_0_10px_white] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="min-w-[20px] flex justify-center z-10">
            <Icon 
              size={18} 
              strokeWidth={1.5} 
              className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} 
            />
          </div>
          
          <span className="sidebar-text whitespace-nowrap ml-3 text-sm font-medium tracking-wide">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    // Outer Container
    <div className="h-screen bg-black flex flex-col border-r border-neutral-900 sticky top-0 left-0 z-50 font-sans">
      
      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className="flex flex-col h-full bg-[#050505] overflow-hidden relative w-[260px]"
      >
        {/* 1. Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-neutral-900/80">
            <Link
              to="/"
              className="flex items-center gap-3 group !no-underline outline-none"
            >
              <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800 transition-all duration-500 group-hover:border-white group-hover:bg-black">
                <Layout size={20} className="!text-white" />
              </div>
              <span className="sidebar-text text-base font-bold tracking-widest uppercase !text-white">
                SmartServe
              </span>
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="!text-neutral-600 hover:!text-white transition-colors p-2 rounded-full hover:bg-neutral-900 outline-none"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
        </div>

        {/* 2. Navigation List */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          
          <div className="section-label px-6 text-[10px] font-mono !text-neutral-600 uppercase tracking-widest overflow-hidden">
            Platform
          </div>
          
          <NavItem to="/company-admin" end icon={LayoutDashboard} label="Overview" />
          <NavItem to="/company-admin/desks" icon={Monitor} label="Live Map" />
          <NavItem to="/company-admin/employees" icon={Users} label="Manage Employees" />

          <div className="section-label px-6 text-[10px] font-mono !text-neutral-600 uppercase tracking-widest overflow-hidden mt-6">
            Assets & Config
          </div>
          
          <NavItem to="/company-admin/resources" icon={Package} label="Resources" />
          <NavItem to="/company-admin/rooms" icon={DoorClosed} label="Meeting Rooms" />
          <NavItem to="/company-admin/subscription" icon={CreditCard} label="Subscriptions" />
          <NavItem to="/company-admin/feedbacks" icon={MessageSquare} label="Feedback" />
        </div>

        {/* 3. Footer User Profile */}
        <div className="border-t border-neutral-900 bg-[#050505] p-4">
            <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} p-3 rounded-xl border border-neutral-900 hover:border-neutral-700 hover:bg-neutral-900 transition-all group outline-none`}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-xs !text-neutral-400 font-mono shrink-0 border border-neutral-800 group-hover:!text-white transition-colors">
                           {user?.username?.[0]?.toUpperCase() || "A"}
                        </div>
                        
                        <div className="sidebar-text text-left">
                           <p className="text-xs font-bold !text-neutral-300 mb-0.5 group-hover:!text-white transition-colors">
                             {user?.username || "Admin"}
                           </p>
                           <p className="text-[10px] !text-neutral-600 font-mono">
                             ID: 04a2
                           </p>
                        </div>
                    </div>
                    {!collapsed && <MoreHorizontal size={16} className="!text-neutral-600 group-hover:!text-white transition-colors sidebar-text" />}
                </button>

                {/* Pop-up Menu */}
                {showMenu && (
                  <div className="absolute bottom-[calc(100%+12px)] left-0 w-full bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden py-1 z-20">
                     <div className="px-4 py-3 border-b border-neutral-900">
                        <p className="text-[10px] !text-neutral-500 font-mono uppercase mb-1">Signed in as</p>
                        <p className="text-xs !text-white truncate">{user?.email || "admin@smartserve.com"}</p>
                     </div>
                     
                     <div className="p-1">
                       <button className="w-full text-left px-3 py-2 text-xs !text-neutral-400 hover:!text-white hover:bg-neutral-900 rounded-lg flex items-center gap-2 transition-colors">
                          <Settings size={14} /> Settings
                       </button>
                       <button 
                         onClick={handleLogout}
                         className="w-full text-left px-3 py-2 text-xs !text-red-400 hover:bg-red-900/10 rounded-lg flex items-center gap-2 transition-colors mt-1"
                       >
                          <LogOut size={14} /> Log Out
                       </button>
                     </div>
                  </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}