import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axiosClient from "../../../redux/api/axiosClient";
import { clearAuthToken, getUserDetails } from "../../../redux/authToken";
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
  MoreHorizontal,
  Menu,
  X,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const user = getUserDetails();

  // Close mobile menu on route change
  useEffect(() => setIsMobileOpen(false), [location]);

  // 🟢 GSAP: Fluid Width Animation (Desktop Only)
  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (window.innerWidth >= 768) {
        if (collapsed) {
          tl.to(sidebarRef.current, {
            width: "72px",
            duration: 0.4,
            ease: "power3.inOut",
          })
            .to(".sidebar-text", { opacity: 0, x: -10, display: "none", duration: 0.2 }, "<")
            .to(".section-label", { opacity: 0, height: 0, margin: 0, duration: 0.2 }, "<");
        } else {
          tl.to(sidebarRef.current, {
            width: "260px",
            duration: 0.4,
            ease: "power3.out",
          })
            .to(".sidebar-text", { display: "block", opacity: 1, x: 0, stagger: 0.02, duration: 0.3 }, "-=0.2")
            .to(".section-label", { height: "auto", opacity: 1, marginTop: "24px", marginBottom: "12px", duration: 0.3 }, "-=0.3");
        }
      }
    },
    { dependencies: [collapsed], scope: sidebarRef }
  );

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

  // Custom Navigation Item
  const NavItem = ({ to, icon: Icon, label, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center px-4 py-3 my-1 mx-2 rounded-lg transition-all duration-200 group !no-underline outline-none ${
          isActive
            ? "bg-neutral-800 text-white shadow-inner"
            : "bg-transparent text-neutral-500 hover:text-white hover:bg-neutral-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Bar */}
          <div
            className={`absolute left-0 h-1/2 w-[3px] bg-white rounded-r-full transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          
          <div className="min-w-[20px] flex justify-center z-10">
            <Icon
              size={18}
              strokeWidth={1.5}
              className={`transition-transform duration-300 ${
                isActive ? "scale-110 text-white" : "group-hover:scale-105"
              }`}
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
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-black border border-neutral-800 rounded-lg text-white md:hidden hover:bg-neutral-900 transition-colors shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      {/* Added shrink-0 to prevent flex compression on large screens */}
      <div
        className={`h-screen bg-black flex flex-col border-r border-neutral-900 font-sans z-[70] fixed top-0 left-0 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={sidebarRef}
          className="flex flex-col h-full bg-[#050505] overflow-hidden relative w-[260px]"
        >
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-5 border-b border-neutral-900 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 group !no-underline outline-none"
            >
              <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800 group-hover:border-white transition-colors">
                <Layout size={20} className="text-white" />
              </div>
              <span className="sidebar-text text-base font-bold tracking-widest uppercase text-white group-hover:text-neutral-300 transition-colors">
                SmartServe
              </span>
            </Link>
            
            <div className="flex items-center">
              {/* Mobile Close */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden text-neutral-500 hover:text-white p-2 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Desktop Collapse */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:block text-neutral-600 hover:text-white p-2 transition-colors outline-none"
              >
                <ChevronLeft
                  size={16}
                  className={`transition-transform duration-300 ${
                    collapsed ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation - Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto py-6 
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-800 hover:scrollbar-thumb-neutral-700">
            
            <div className="section-label px-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest select-none">
              Platform
            </div>
            <NavItem to="/company-admin" end icon={LayoutDashboard} label="Overview" />
            <NavItem to="/company-admin/desks" icon={Monitor} label="Live Map" />
            <NavItem to="/company-admin/employees" icon={Users} label="Manage Employees" />

            <div className="section-label px-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest mt-6 select-none">
              Assets
            </div>
            <NavItem to="/company-admin/resources" icon={Package} label="Inventory" />
            <NavItem to="/company-admin/subscription" icon={CreditCard} label="Subscription" />
            <NavItem to="/company-admin/feedbacks" icon={MessageSquare} label="Feedback" />
          </div>

          {/* Footer User Profile (FIXED: Valid HTML Structure) */}
          <div className="border-t border-neutral-900 bg-[#050505] p-4 shrink-0">
            <div className="relative">
              {/* Trigger Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } p-3 rounded-xl border border-neutral-900 hover:border-neutral-700 hover:bg-neutral-900 transition-all outline-none group`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-xs text-neutral-400 font-mono shrink-0 border border-neutral-800 group-hover:text-white transition-colors">
                    {user?.username?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="sidebar-text text-left">
                    <p className="text-xs font-bold text-neutral-300 mb-0.5 truncate group-hover:text-white transition-colors">
                      {user?.username || "Admin"}
                    </p>
                    <p className="text-[10px] text-neutral-600 font-mono">
                      ID: 04a2
                    </p>
                  </div>
                </div>
                {!collapsed && (
                  <MoreHorizontal
                    size={16}
                    className="text-neutral-600 sidebar-text group-hover:text-white"
                  />
                )}
              </button>
              
              {/* Dropdown Menu (Sibling to Trigger, NOT child) */}
              {showMenu && (
                <div className="absolute bottom-[calc(100%+12px)] left-0 w-full bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
                  <button className="w-full text-left px-4 py-2.5 text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 flex items-center gap-2 transition-colors !no-underline">
                     <Settings size={14} /> Settings
                  </button>
                  <div className="h-[1px] bg-neutral-900 my-1 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-900/10 flex items-center gap-2 transition-colors !no-underline"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thumb-neutral-800::-webkit-scrollbar-thumb { background-color: #262626; border-radius: 20px; }
        .hover\:scrollbar-thumb-neutral-700:hover::-webkit-scrollbar-thumb { background-color: #404040; }
      `}</style>
    </>
  );
}