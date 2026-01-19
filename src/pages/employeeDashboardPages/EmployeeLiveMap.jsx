import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Monitor, Zap, Wind, Filter } from "lucide-react";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import BookingModal from "./BookingModal";

export default function EmployeeLiveMap() {
  const dispatch = useDispatch();
  const [selectedResource, setSelectedResource] = useState(null);
  
  // Local Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    hasSystem: false,
    hasAC: false,
    chargingSlot: false
  });

  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);

  useEffect(() => { dispatch(fetchFloors()); }, [dispatch]);

  useEffect(() => {
    // Check for .id or .floorId based on your API response
    const currentId = activeFloor?.id || activeFloor?.floorId;
    if (currentId) {
      dispatch(fetchResourcesByFloor(currentId));
    }
  }, [activeFloor, dispatch]);

  // Handle Filtering Logic
  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const meta = JSON.parse(r.metadataJson || "{}");
      const nameMatch = meta.name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const pcMatch = !filters.hasSystem || meta.hasSystem === true;
      const acMatch = !filters.hasAC || meta.hasAC === true;
      const powerMatch = !filters.chargingSlot || meta.chargingSlot === true;

      return nameMatch && pcMatch && acMatch && powerMatch;
    });
  }, [resources, searchQuery, filters]);

  return (
    <div className="p-8">
      {/* Search & Filter Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Workspace Navigator</h2>
          <p className="text-neutral-500 text-sm">Found {filteredResources.length} matching workspaces</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
            <input 
              className="w-full bg-black border border-neutral-900 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:border-blue-500 transition-all outline-none"
              placeholder="Search desk name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Feature Toggles */}
          <div className="flex gap-2 p-1.5 bg-black border border-neutral-900 rounded-2xl">
            <FilterButton active={filters.hasSystem} onClick={() => setFilters({...filters, hasSystem: !filters.hasSystem})} icon={Monitor} label="PC" />
            <FilterButton active={filters.hasAC} onClick={() => setFilters({...filters, hasAC: !filters.hasAC})} icon={Wind} label="AC" />
            <FilterButton active={filters.chargingSlot} onClick={() => setFilters({...filters, chargingSlot: !filters.chargingSlot})} icon={Zap} label="Power" />
          </div>

          {/* Floor Selection */}
          <div className="flex gap-2 p-1.5 bg-neutral-900/30 rounded-2xl border border-neutral-800">
            {floors.map(f => (
              <button 
                key={f.id || f.floorId}
                onClick={() => dispatch(setActiveFloor(f))}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                  (activeFloor?.id === f.id || activeFloor?.floorId === f.floorId) ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {f.floorName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="bg-[#080808] border border-neutral-900 rounded-[2.5rem] p-12 flex justify-center items-center overflow-auto min-h-[600px] shadow-2xl relative">
        <div className="relative bg-neutral-950/50 border border-neutral-900/50 rounded-2xl" style={{ width: 1000, height: 500 }}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-2 border-t-blue-500 rounded-full animate-spin opacity-20"></div></div>
          ) : (
            resources.map(r => {
              const isMatch = filteredResources.some(fr => fr.id === r.id);
              const meta = JSON.parse(r.metadataJson || "{}");
              return (
                <div
                  key={r.id}
                  onClick={() => r.isAvailable && isMatch && setSelectedResource(r)}
                  className={`absolute rounded-xl border-2 transition-all flex flex-col items-center justify-center p-1 group ${
                    !isMatch ? "opacity-10 grayscale pointer-events-none" : 
                    r.isAvailable 
                    ? "bg-green-500/5 border-green-500/30 hover:bg-green-500/20 hover:border-green-400 cursor-pointer" 
                    : "bg-red-500/10 border-red-900/10 opacity-40 cursor-not-allowed"
                  }`}
                  style={{ left: r.x, top: r.y, width: r.width, height: r.height, transform: `rotate(${r.rotation}deg)` }}
                >
                  <span className="text-[9px] font-bold text-white/70">{meta.name}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedResource && <BookingModal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
    </div>
  );
}

function FilterButton({ active, onClick, icon: Icon, label }) {
    return (
        <button onClick={onClick} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all ${active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/50' : 'text-neutral-600 hover:text-neutral-400 border border-transparent'}`}>
            <Icon size={12} /> {label}
        </button>
    );
}