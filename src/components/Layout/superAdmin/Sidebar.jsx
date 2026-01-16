// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Menu, X, Briefcase, Layers, 
  MessageSquare, ThumbsUp, Shield, User, LayoutGrid 
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Client Companies", path: "companies", icon: <Briefcase size={18} /> },
    { name: "Manage Plans", path: "plans", icon: <Layers size={18} /> },
    { name: "Contact Messages", path: "messages", icon: <MessageSquare size={18} /> },
    { name: "Client Feedbacks", path: "feedbacks", icon: <ThumbsUp size={18} /> },
    { name: "Super Admins", path: "superadmins", icon: <Shield size={18} /> },
  ];

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-neutral-950 border-b border-neutral-800 p-4 flex justify-between items-center text-white sticky top-0 z-50">
        <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <LayoutGrid size={16} className="text-cyan-500" />
            Admin Panel
        </span>
        <button onClick={toggleSidebar} className="text-cyan-500 focus:outline-none hover:text-cyan-400 transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR CONTAINER --- */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-neutral-950 border-r border-neutral-800 text-white flex flex-col
          md:translate-x-0 md:static md:h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-800/50">
            <h1 className="text-lg font-black uppercase tracking-widest text-white flex items-center gap-2">
               <LayoutGrid className="text-cyan-500" size={20} />
               <span>Admin<span className="text-cyan-500">.</span></span>
            </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                    ${isActive 
                      ? "bg-cyan-500/10 text-cyan-400" 
                      : "text-neutral-500 hover:text-white hover:bg-neutral-900/50"
                    }
                  `}
                >
                  {/* ✅ FIX: Use a function child to access 'isActive' inside the content */}
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-cyan-400" : "text-neutral-600"}>
                        {item.icon}
                      </span>
                      {item.name}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#111] border border-neutral-800 flex items-center justify-center text-cyan-500">
              <User size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none uppercase tracking-wide">Super Admin</p>
              <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- OVERLAY --- */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}