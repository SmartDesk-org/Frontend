import React, { useState, useRef, useEffect } from "react";
import { X, Loader2, User, Mail, Briefcase, MapPin, Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// 🟢 Import your floor API function (Adjust path if needed)
import { fetchCompanyFloors } from "../../redux/api/floorApi"; 

export default function AddEmployeeModal({ onClose, onSubmit, isLoading }) {
  const [form, setForm] = useState({ 
    employeeName: "", 
    email: "", 
    department: "", 
    defaultFloorId: "" 
  });

  const [floors, setFloors] = useState([]);
  const [loadingFloors, setLoadingFloors] = useState(true);
  
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // 🟢 1. Fetch Floors on Mount
  useEffect(() => {
    const loadFloors = async () => {
      try {
        const response = await fetchCompanyFloors();
        // Based on your JSON structure: { statusCode: 200, data: [...] }
        if (response.data && response.data.data) {
          setFloors(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load floors", error);
      } finally {
        setLoadingFloors(false);
      }
    };
    loadFloors();
  }, []);

  // Animation Entry
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.out" 
    })
    .from(modalRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      y: 15, 
      duration: 0.4, 
      ease: "back.out(1.7)" 
    }, "-=0.2");
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, defaultFloorId: Number(form.defaultFloorId) || 0 });
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        ref={modalRef}
        className="relative w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#0F0F0F]">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">New Team Member</h3>
            <p className="text-[10px] text-neutral-500 mt-0.5">Enter details to update directory</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 bg-white/5 rounded-md text-neutral-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={14} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative group">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
              <input 
                required 
                name="employeeName" 
                placeholder="e.g. John Doe" 
                value={form.employeeName} 
                onChange={handleChange} 
                className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-white/30 focus:bg-[#161616] outline-none transition-all placeholder-neutral-700" 
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
              <input 
                required 
                type="email" 
                name="email" 
                placeholder="john@company.com" 
                value={form.email} 
                onChange={handleChange} 
                className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-white/30 focus:bg-[#161616] outline-none transition-all placeholder-neutral-700" 
              />
            </div>
          </div>

          {/* Split Row */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Department</label>
              <div className="relative group">
                <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
                <select 
                  name="department" 
                  value={form.department} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-white/30 focus:bg-[#161616] outline-none appearance-none text-neutral-300"
                >
                  <option value="" className="text-neutral-500">Select...</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>

            {/* 🟢 Floor Selection (Dynamic Dropdown) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Floor</label>
              <div className="relative group">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
                
                <select 
                  name="defaultFloorId" 
                  value={form.defaultFloorId} 
                  onChange={handleChange} 
                  required 
                  disabled={loadingFloors}
                  className="w-full bg-[#111] border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-white/30 focus:bg-[#161616] outline-none appearance-none text-neutral-300 disabled:opacity-50"
                >
                  <option value="" className="text-neutral-500">
                    {loadingFloors ? "Loading..." : "Select Floor"}
                  </option>
                  
                  {/* Map over fetched floors */}
                  {!loadingFloors && floors.map((floor) => (
                    <option key={floor.floorId} value={floor.floorId}>
                      {floor.floorName} (Lvl {floor.floorNumber})
                    </option>
                  ))}
                </select>
                
                {/* Spinner inside input if loading */}
                {loadingFloors && (
                   <Loader2 size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 animate-spin" />
                )}
              </div>
            </div>

          </div>
          
          {/* Action Button */}
          <button 
            type="submit" 
            disabled={isLoading || loadingFloors} 
            className="w-full mt-4 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-wide rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin"/> 
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Check size={14} strokeWidth={3} />
                <span>Confirm Entry</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}