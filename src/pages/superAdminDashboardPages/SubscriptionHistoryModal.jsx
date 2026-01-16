import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistories, clearHistories } from "../../redux/slices/companySlice";
import { X, Calendar, Activity, AlertCircle, CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SubscriptionHistoryModal({ company, onClose }) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  const { histories, loadingHistories, error } = useSelector(
    (state) => state.company
  );

  // 1. Fetch Data
  useEffect(() => {
    if (company?.companyId) {
      dispatch(fetchHistories(company.companyId));
    }
    return () => {
      dispatch(clearHistories());
    };
  }, [dispatch, company]);

  // 2. GSAP Animations
  useGSAP(() => {
    // Animate Modal Pop-in
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  // Animate Grid Items whenever 'histories' data loads
  useGSAP(() => {
    if (histories.length > 0) {
      gsap.fromTo(".history-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [histories]);

  // Helper: Status Styling
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": 
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wide">
            <CheckCircle size={10} /> Paid
          </span>
        );
      case "pending": 
        return (
           <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wide">
            <Clock size={10} /> Pending
          </span>
        );
      case "failed": 
        return (
           <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-red-500/20 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wide">
            <XCircle size={10} /> Failed
          </span>
        );
      default: 
        return (
           <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-neutral-700 bg-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-wide">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <Activity size={12} className="text-cyan-500" />
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Transaction Logs</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight truncate max-w-[200px] sm:max-w-none">
              History <span className="text-neutral-600">/</span> {company.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-neutral-950 relative">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>

          {loadingHistories && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">Fetching_Records...</p>
            </div>
          )}

          {error && (
            <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 rounded-lg flex items-center gap-3 text-xs font-mono">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {!loadingHistories && histories.length === 0 && (
            <div className="text-center py-20 text-neutral-600">
              <p className="font-mono text-[10px] uppercase tracking-widest">NO_HISTORY_FOUND</p>
            </div>
          )}

          {/* --- THE RESPONSIVE GRID LAYOUT --- */}
          {!loadingHistories && histories.length > 0 && (
            <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
              {histories.map((h, index) => (
                <div 
                  key={index}
                  className="history-card group p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
                >
                  
                  {/* Card Header: Plan Name & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="min-w-0 pr-2">
                        <span className="text-[9px] text-neutral-500 font-mono block mb-1">#{index + 1} LOG ID</span>
                        <h3 className="font-bold text-white text-sm leading-tight truncate" title={h.subscriptionName}>
                            {h.subscriptionName}
                        </h3>
                    </div>
                    <div className="shrink-0">
                        {getStatusBadge(h.status)}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                     <span className="text-2xl font-mono text-cyan-400 tracking-tighter">₹{h.amountPaid}</span>
                  </div>

                  {/* Dates Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-neutral-800 pt-3 mb-3 mt-auto">
                    <div>
                        <span className="text-neutral-500 block mb-1 uppercase tracking-wider text-[9px]">Start</span>
                        <div className="flex items-center gap-1.5 text-neutral-300 font-mono">
                            <Calendar size={10} className="text-cyan-500/50" />
                            {h.startDate ? new Date(h.startDate).toLocaleDateString() : "-"}
                        </div>
                    </div>
                    <div>
                        <span className="text-neutral-500 block mb-1 uppercase tracking-wider text-[9px]">End</span>
                        <div className="flex items-center gap-1.5 text-neutral-300 font-mono">
                            <Calendar size={10} className="text-cyan-500/50" />
                            {h.endDate ? new Date(h.endDate).toLocaleDateString() : "-"}
                        </div>
                    </div>
                  </div>

                  {/* Footer / Reason */}
                  {h.reason && (
                    <div className="bg-neutral-950/50 p-2 rounded text-[10px] text-neutral-400 font-mono border border-neutral-800/50 flex gap-2 items-start">
                        <FileText size={10} className="mt-0.5 shrink-0 text-neutral-600" />
                        <span className="break-words leading-relaxed">{h.reason}</span>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex justify-end shrink-0">
             <button 
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:bg-neutral-800 rounded transition-all"
             >
                Close View
             </button>
        </div>

      </div>
    </div>
  );
}