import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Monitor, Users, Grid, Search, Filter, 
  ZoomIn, ZoomOut, ChevronDown, User, Clock, MapPin, X, Info
} from "lucide-react";

// 🟢 1. READ-ONLY RESOURCE COMPONENT
const MapResource = ({ resource, onClick, scale }) => {
  const meta = JSON.parse(resource.metadataJson || "{}");
  const isDesk = resource.resourceTypeId === 1;

  // 🎨 Status Logic
  // You can map this to your real backend data later
  const status = resource.status || "Available"; 
  const isBooked = status === "Reserved" || status === "Booked";
  const isMaintenance = status === "Maintenance";

  // Dynamic Styles
  let bgClass = "bg-[#1A1A1A] border-neutral-700 hover:border-neutral-500"; // Available (Dark)
  let iconColor = "text-neutral-500";
  let statusIndicator = "bg-emerald-500"; // Green Dot

  if (isBooked) {
    bgClass = "bg-red-900/20 border-red-800 hover:border-red-600";
    iconColor = "text-red-500";
    statusIndicator = "bg-red-500";
  } else if (isMaintenance) {
    bgClass = "bg-neutral-800 border-neutral-700 opacity-60 cursor-not-allowed";
    iconColor = "text-neutral-600";
    statusIndicator = "bg-neutral-500";
  }

  // Dimensions
  const width = isDesk ? "w-16" : "w-32";
  const height = isDesk ? "h-12" : "h-32";

  return (
    <div
      onClick={() => onClick(resource)}
      style={{ 
        left: `${resource.x}px`, 
        top: `${resource.y}px`,
        position: "absolute",
        zIndex: 10
      }}
      className={`
        absolute flex flex-col items-center justify-center border rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:scale-105
        ${width} ${height} ${bgClass}
      `}
    >
      {/* Icon */}
      {isDesk ? <Monitor size={14} className={`mb-1 ${iconColor}`} /> : <Users size={20} className={`mb-1 ${iconColor}`} />}
      
      {/* Name */}
      <span className="text-[9px] font-mono text-white font-bold truncate max-w-full px-1">
        {meta.name || `ID-${resource.id}`}
      </span>

      {/* Status Dot */}
      <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${statusIndicator} shadow-[0_0_5px_currentColor]`}></div>
    </div>
  );
};

// 🟢 2. DETAIL POPUP (Shows Booking Info)
const ResourceDetailModal = ({ resource, onClose }) => {
    const modalRef = useRef(null);
    const meta = JSON.parse(resource.metadataJson || "{}");
    const status = resource.status || "Available";

    // 🎭 Mock Booking Data (Replace with real data later)
    const bookingInfo = status === "Reserved" ? {
        user: "John Doe",
        email: "john@company.com",
        time: "09:00 AM - 05:00 PM",
        department: "Engineering"
    } : null;

    useGSAP(() => {
        gsap.fromTo(modalRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
            <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-[#090909] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden relative">
                
                {/* Header Image / Color Bar */}
                <div className={`h-24 w-full flex items-center justify-center ${status === 'Reserved' ? 'bg-red-900/20' : 'bg-emerald-900/20'}`}>
                    <div className={`p-4 rounded-full ${status === 'Reserved' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {resource.resourceTypeId === 1 ? <Monitor size={32}/> : <Users size={32}/>}
                    </div>
                </div>
                
                <button onClick={onClose} className="absolute top-3 right-3 p-1 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors">
                    <X size={14}/>
                </button>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">{meta.name || "Unknown Asset"}</h3>
                            <p className="text-xs text-neutral-500 font-mono">ID: {resource.id}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            status === 'Reserved' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                            {status}
                        </span>
                    </div>

                    {/* Booking Details Section */}
                    {status === "Reserved" ? (
                        <div className="space-y-4">
                            <div className="p-3 bg-[#111] rounded-lg border border-neutral-800 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{bookingInfo.user}</p>
                                        <p className="text-[10px] text-neutral-500">{bookingInfo.email}</p>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-neutral-800 w-full"></div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="flex items-center gap-2 text-neutral-400">
                                        <Clock size={12}/> {bookingInfo.time}
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-400">
                                        <Info size={12}/> {bookingInfo.department}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-red-900/20 text-red-500 border border-red-900/50 rounded-lg text-xs font-bold uppercase hover:bg-red-900/40 transition-colors">
                                Cancel Booking
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                This seat is currently available for booking. Select a time slot to reserve it for your team.
                            </p>
                            <button className="w-full py-2.5 bg-white text-black rounded-lg text-xs font-bold uppercase hover:bg-neutral-200 transition-colors">
                                Book This Seat
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 🟢 3. MAIN PAGE
export default function DesksPage() {
  const dispatch = useDispatch();
  
  // Redux
  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);
  
  // Local State
  const [selectedRes, setSelectedRes] = useState(null);
  const [zoom, setZoom] = useState(window.innerWidth < 768 ? 0.6 : 1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { dispatch(fetchFloors()); }, [dispatch]);

  // Load resources when floor changes
  useEffect(() => {
    if (activeFloor?.floorId) {
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  // Filter Logic (Search by name)
  const filteredResources = resources.filter(r => {
      const meta = JSON.parse(r.metadataJson || "{}");
      return (meta.name || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen w-full bg-[#050505] relative overflow-hidden font-sans">
      
      {/* ================= HEADER ================= */}
      <div className="h-auto min-h-[60px] bg-black/80 backdrop-blur-md border-b border-neutral-900 flex flex-wrap items-center justify-between px-6 py-3 z-40 gap-4">
        
        {/* Left: Title & Search */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-500">
                <MapPin size={18} />
             </div>
             <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">Live Floor Map</h2>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono mt-0.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   Real-time Updates
                </div>
             </div>
          </div>
          
          {/* Quick Search */}
          <div className="hidden md:flex relative group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" />
              <input 
                  type="text" 
                  placeholder="Find a desk..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.trim())}
                  className="bg-[#111] border border-neutral-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:border-neutral-600 outline-none w-48 transition-all focus:w-64"
              />
          </div>
        </div>
        
        {/* Middle: Floor Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
           {floors.map(f => (
             <button key={f.floorId} onClick={() => dispatch(setActiveFloor(f))}
               className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all whitespace-nowrap
               ${activeFloor?.floorId === f.floorId 
                 ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                 : "bg-[#111] text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-white"}`}
             >
               {f.floorName}
             </button>
           ))}
        </div>

        {/* Right: Legend & Zoom */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Legend */}
            <div className="hidden lg:flex items-center gap-3 text-[10px] font-medium text-neutral-500 bg-[#111] px-3 py-1.5 rounded-full border border-neutral-800">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Booked</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-500"></span> Maint.</div>
            </div>

            {/* Zoom */}
            <div className="flex bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.2))} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 border-r border-neutral-800"><ZoomOut size={14}/></button>
                <span className="text-[10px] text-neutral-300 w-10 flex items-center justify-center font-mono bg-[#151515]">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(z + 0.1, 2.0))} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800"><ZoomIn size={14}/></button>
            </div>
        </div>
      </div>

      {/* ================= MAP CANVAS ================= */}
      <div className="flex-1 w-full h-full bg-[#080808] overflow-auto relative cursor-grab active:cursor-grabbing scrollbar-hide">
        
        {/* Hide Scrollbars CSS */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Scalable Container */}
        <div 
            className="relative transform-origin-top-left transition-transform duration-300 ease-out"
            style={{ 
                width: '2500px', 
                height: '2500px', 
                transform: `scale(${zoom})`,
                transformOrigin: '0 0'
            }}
        >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
            />

            {/* Resources */}
            {filteredResources.map(res => (
                <MapResource 
                    key={res.id} 
                    resource={res} 
                    onClick={(r) => setSelectedRes(r)} 
                    scale={zoom}
                />
            ))}

            {/* Empty State */}
            {filteredResources.length === 0 && !loading && (
                <div className="absolute top-1/4 left-1/4 text-neutral-800 pointer-events-none">
                    <p className="text-4xl font-black uppercase tracking-widest opacity-10">
                        {activeFloor ? "No Desks Found" : "Select a Floor"}
                    </p>
                </div>
            )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedRes && (
          <ResourceDetailModal 
              resource={selectedRes} 
              onClose={() => setSelectedRes(null)} 
          />
      )}

    </div>
  );
}