import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import BookingModal from "./BookingModal"; // Shared helper

export default function EmployeeLiveMap() {
  const dispatch = useDispatch();
  const [selectedResource, setSelectedResource] = useState(null);
  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);

  useEffect(() => { dispatch(fetchFloors()); }, [dispatch]);

  useEffect(() => {
    if (activeFloor?.id) {
      dispatch(fetchResourcesByFloor(activeFloor.id));
    }
  }, [activeFloor, dispatch]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Workspace Navigator</h2>
          <p className="text-neutral-500 text-sm">Select a green workspace to create a reservation</p>
        </div>
        
        {/* Floor Selection Pills */}
        <div className="flex gap-2 p-1.5 bg-black border border-neutral-900 rounded-2xl">
          {floors.map(f => (
            <button 
              key={f.id}
              onClick={() => dispatch(setActiveFloor(f))}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFloor?.id === f.id 
                ? 'bg-neutral-800 text-white shadow-xl' 
                : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {f.floorName}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="bg-[#080808] border border-neutral-900 rounded-[2.5rem] p-12 flex justify-center items-center overflow-auto min-h-[600px] shadow-2xl relative">
        <div className="relative bg-neutral-900/20 border border-dashed border-neutral-800/50 rounded-2xl" 
             style={{ width: 1000, height: 500 }}>
          
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Scanning Grid...</span>
            </div>
          ) : (
            resources.map(r => {
              const meta = JSON.parse(r.metadataJson || "{}");
              return (
                <div
                  key={r.id}
                  onClick={() => r.isAvailable && setSelectedResource(r)}
                  className={`absolute rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center p-1 group shadow-lg ${
                    r.isAvailable 
                    ? "bg-green-500/5 border-green-500/30 hover:bg-green-500/10 hover:border-green-400 cursor-pointer" 
                    : "bg-red-500/5 border-red-900/10 grayscale opacity-40 cursor-not-allowed"
                  }`}
                  style={{
                    left: r.x, top: r.y, width: r.width, height: r.height,
                    transform: `rotate(${r.rotation}deg)`
                  }}
                >
                  <span className="text-[10px] font-bold text-white/80 group-hover:scale-110 transition-transform">
                    {meta.name}
                  </span>
                  <div className={`mt-1 h-1 w-1/2 rounded-full ${r.isAvailable ? 'bg-green-500' : 'bg-red-950'}`}></div>
                </div>
              );
            })
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 right-8 flex gap-6 bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-neutral-800/50">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-400"></div>
                <span className="text-[10px] text-neutral-400 font-mono uppercase">Available</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-900/50 border border-red-800"></div>
                <span className="text-[10px] text-neutral-400 font-mono uppercase">Occupied</span>
            </div>
        </div>
      </div>

      {selectedResource && (
        <BookingModal 
          resource={selectedResource} 
          onClose={() => setSelectedResource(null)} 
        />
      )}
    </div>
  );
}