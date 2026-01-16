import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyOverview, clearOverview } from "../../redux/slices/companySlice";
import { FiX, FiUsers, FiLayers, FiMonitor, FiLayout, FiPieChart, FiAlertCircle } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CompanyOverviewModal({ company, onClose }) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { overview, loadingOverview, error } = useSelector(
    (state) => state.company
  );

  // 1. Fetch Data
  useEffect(() => {
    if (company?.companyId) {
      dispatch(fetchCompanyOverview(company.companyId));
    }
    return () => {
      dispatch(clearOverview());
    };
  }, [company, dispatch]);

  // 2. Modal Entrance Animation
  useGSAP(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <FiPieChart className="text-cyan-500" />
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Resource Usage</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              Company Overview <span className="text-gray-600">/</span> {company.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-neutral-950 relative">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            {loadingOverview && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-mono text-sm animate-pulse">Calculating Metrics...</p>
                </div>
            )}

            {error && (
                <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 rounded-lg flex items-center gap-3">
                    <FiAlertCircle />
                    <span>{error}</span>
                </div>
            )}

            {overview && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    <OverviewItem
                        label="Employees"
                        icon={<FiUsers />}
                        used={overview.employeesCount}
                        limit={overview.employeesLimit}
                        delay={0.1}
                    />
                    <OverviewItem
                        label="Floors"
                        icon={<FiLayers />}
                        used={overview.floorsCount}
                        limit={overview.floorsLimi} // Check API spelling
                        delay={0.2}
                    />
                    <OverviewItem
                        label="Desks"
                        icon={<FiMonitor />}
                        used={overview.desksCount}
                        limit={overview.desksLimit}
                        delay={0.3}
                    />
                    <OverviewItem
                        label="Meeting Rooms"
                        icon={<FiLayout />}
                        used={overview.meetingRoomsCount}
                        limit={overview.meetingRoomsLimi} // Check API spelling
                        delay={0.4}
                    />
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white border border-transparent hover:border-neutral-700 rounded transition-all"
            >
                Close View
            </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- Reusable Item Component ---------- */

function OverviewItem({ label, icon, used, limit, delay }) {
  // Safe calculation to avoid NaN
  const safeLimit = limit || 1; 
  const percent = limit > 0 ? Math.round((used / limit) * 100) : 0;
  
  // Dynamic Colors based on percentage
  let colorClass = "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"; // Default Cyan
  let textColor = "text-cyan-400";
  
  if (percent > 70 && percent < 90) {
     colorClass = "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]";
     textColor = "text-yellow-400";
  } else if (percent >= 90) {
     colorClass = "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
     textColor = "text-red-500";
  }

  // Animate the bar width
  useGSAP(() => {
    gsap.fromTo(`.progress-${label.replace(/\s/g, '')}`, 
        { width: "0%" },
        { width: `${percent}%`, duration: 1, ease: "power2.out", delay: delay }
    );
  }, [percent]);

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-neutral-700 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-neutral-800 ${textColor} bg-opacity-20`}>
                {icon}
            </div>
            <div>
                <span className="block text-xs text-gray-500 font-mono uppercase tracking-wide">{label}</span>
                <span className="block text-white font-bold text-lg">{used} <span className="text-gray-600 text-sm font-normal">/ {limit}</span></span>
            </div>
        </div>
        <span className={`font-mono text-xl font-bold ${textColor}`}>
            {percent}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden relative">
         {/* The Animated Bar */}
         <div 
            className={`progress-${label.replace(/\s/g, '')} h-full rounded-full absolute top-0 left-0 ${colorClass}`}
            style={{ width: `${percent}%` }} 
         ></div>
      </div>

      {/* Warning Text if full */}
      {percent >= 100 && (
          <p className="text-[10px] text-red-400 mt-2 font-mono uppercase tracking-wide flex items-center gap-1">
              <FiAlertCircle /> Limit Reached
          </p>
      )}
    </div>
  );
}