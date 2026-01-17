import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axiosClient from "../../../redux/api/axiosClient";
import { clearAuthToken, getUserDetails } from "../../../redux/authToken";
import {
  Layout,
  LayoutDashboard,
  Map,
  CalendarDays,
  UserCircle,
  LogOut,
  ChevronLeft,
  MoreHorizontal,
  Menu,
  X,
  Settings,
  HelpCircle
} from "lucide-react";

export default function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const user = getUserDetails();

  useEffect(() => setIsMobileOpen(false), [location]);

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      const tl = gsap.timeline();
      if (collapsed) {
        tl.to(sidebarRef.current, { width: "72px", duration: 0.4, ease: "power3.inOut" })
          .to(".sidebar-text", { opacity: 0, x: -10, display: "none", duration: 0.2 }, "<")
          .to(".section-label", { opacity: 0, height: 0, margin: 0, duration: 0.2 }, "<");
      } else {
        tl.to(sidebarRef.current, { width: "260px", duration: 0.4, ease: "power3.out" })
          .to(".sidebar-text", { display: "block", opacity: 1, x: 0, stagger: 0.02, duration: 0.3 }, "-=0.2")
          .to(".section-label", { height: "auto", opacity: 1, marginTop: "24px", marginBottom: "12px", duration: 0.3 }, "-=0.3");
      }
    }
  }, { dependencies: [collapsed], scope: sidebarRef });

  const handleLogout = async () => {
    try { await axiosClient.post("/Auth/logout"); } 
    catch (e) { console.error(e); } 
    finally { clearAuthToken(); navigate("/"); }
  };

  const NavItem = ({ to, icon: Icon, label, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center px-4 py-3 my-1 mx-2 rounded-lg transition-all duration-200 group !no-underline outline-none ${
          isActive ? "bg-blue-600/10 text-white shadow-inner" : "bg-transparent text-neutral-500 hover:text-white hover:bg-neutral-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`absolute left-0 h-1/2 w-[3px] bg-blue-500 rounded-r-full transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}></div>
          <div className="min-w-[20px] flex justify-center z-10">
            <Icon size={18} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? "scale-110 text-blue-400" : "group-hover:scale-105"}`} />
          </div>
          <span className="sidebar-text whitespace-nowrap ml-3 text-sm font-medium tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <button onClick={() => setIsMobileOpen(true)} className="fixed top-4 left-4 z-50 p-2 bg-black border border-neutral-800 rounded-lg text-white md:hidden shadow-xl"><Menu size={20}/></button>
      {isMobileOpen && <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden" />}

      <div className={`h-screen bg-black flex flex-col border-r border-neutral-900 z-[70] fixed top-0 left-0 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 shrink-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div ref={sidebarRef} className="flex flex-col h-full bg-[#050505] overflow-hidden relative w-[260px]">
          <div className="h-20 flex items-center justify-between px-5 border-b border-neutral-900">
            <Link to="/employee" className="flex items-center gap-3 !no-underline">
              <div className="p-2 bg-blue-600/10 rounded-lg border border-blue-500/20"><Layout size={20} className="text-blue-500" /></div>
              <span className="sidebar-text text-base font-bold tracking-widest uppercase text-white">SmartDesk</span>
            </Link>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block text-neutral-600 hover:text-white p-2">
              <ChevronLeft size={16} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 scrollbar-thin">
            <div className="section-label px-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest select-none">Personal</div>
            <NavItem to="/employee" end icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/employee/map" icon={Map} label="Find a Desk" />
            <NavItem to="/employee/my-bookings" icon={CalendarDays} label="My Schedule" />

            <div className="section-label px-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest mt-6 select-none">Support</div>
            <NavItem to="/employee/help" icon={HelpCircle} label="Help Center" />
          </div>

          <div className="border-t border-neutral-900 bg-[#050505] p-4">
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="w-full flex items-center justify-between p-3 rounded-xl border border-neutral-900 hover:bg-neutral-900 transition-all outline-none group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-xs text-blue-400 font-bold border border-blue-500/20">
                    {user?.username?.[0]?.toUpperCase() || "E"}
                  </div>
                  {!collapsed && (
                    <div className="sidebar-text text-left">
                      <p className="text-xs font-bold text-neutral-300 mb-0.5 truncate">{user?.username || "Employee"}</p>
                      <p className="text-[9px] text-neutral-600 font-mono">Employee Tier</p>
                    </div>
                  )}
                </div>
                {!collapsed && <MoreHorizontal size={14} className="text-neutral-600" />}
              </button>
              {showMenu && (
                <div className="absolute bottom-[calc(100%+12px)] left-0 w-full bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl py-1 z-50">
                  <button className="w-full text-left px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-2"><Settings size={14} /> Profile</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-900/10 flex items-center gap-2"><LogOut size={14} /> Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}