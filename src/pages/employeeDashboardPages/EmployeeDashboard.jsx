import React from 'react';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUserDetails } from "../../redux/authToken";
import MyBookingsPanel from "./MyBookingPanel";

export default function EmployeeDashboard() {
  const user = getUserDetails();

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Welcome, <span className="text-blue-500">{user?.username || "Workspace User"}</span>
        </h2>
        <p className="text-neutral-500 text-sm mt-1">Here is a summary of your workplace schedule.</p>
      </header>

      {/* Quick Access Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0A0A0A] border border-neutral-900 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
            <MapPin size={80} />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
               <MapPin size={24} />
            </div>
            <div>
               <p className="text-[10px] uppercase text-neutral-500 font-mono tracking-widest">Active Desk</p>
               <p className="text-white font-bold text-lg">Floor 4 • Desk A-12</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-neutral-900 rounded-3xl p-6 flex items-center gap-4 group">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
               <Calendar size={24} />
            </div>
            <div>
               <p className="text-[10px] uppercase text-neutral-500 font-mono tracking-widest">Next Booking</p>
               <p className="text-white font-bold text-lg">Tomorrow, 09:00 AM</p>
            </div>
        </div>

        <Link 
            to="/employee/map" 
            className="bg-blue-600 hover:bg-blue-500 rounded-3xl p-6 flex items-center justify-between group transition-all !no-underline shadow-lg shadow-blue-900/10"
        >
            <span className="text-white font-bold text-lg">Find a Workspace</span>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
            </div>
        </Link>
      </div>

      {/* Active Schedule Section */}
      {/* <section className="bg-black/40 p-1 rounded-3xl">
        <MyBookingsPanel />
      </section> */}
      
    </div>
  );
}