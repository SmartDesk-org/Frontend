// src/components/Layout/TopNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import axiosClient from "../../../redux/api/axiosClient";
import { clearAuthToken } from "../../../redux/authToken";

export default function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/Auth/logout");
      clearAuthToken();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
      clearAuthToken();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="w-full h-16 flex items-center justify-end px-6 bg-transparent border-b border-neutral-800/50">
      
      {/* Container for Right-Aligned Items */}
      <div className="flex items-center gap-5">
        
        {/* User Profile Info */}
        <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-white uppercase tracking-widest">
                Super Admin
            </span>
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-1 mt-0.5">
                <ShieldCheck size={10} /> Verified_Session
            </span>
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-6 w-px bg-neutral-800"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block group-hover:text-red-400 transition-colors">
            Exit
          </span>
          <div className="p-1.5 rounded-md border border-neutral-800 bg-neutral-900 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-all">
             <LogOut size={14} />
          </div>
        </button>
      </div>
    </nav>
  );
}