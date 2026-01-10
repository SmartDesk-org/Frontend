import React, { useState, useEffect } from "react";
import { ChevronRight, Copy, Loader2 } from "lucide-react";
// 🟢 Import the new API function
import { fetchFloorById } from "../../redux/api/floorApi"; 

export default function EmployeeList({ list }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12; 
  
  // 🟢 State to store fetched floor details (Cache)
  const [floorMap, setFloorMap] = useState({});

  const paginatedData = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(list.length / PAGE_SIZE);

  // 🟢 Effect: Fetch missing floor details when page changes
  useEffect(() => {
    const fetchMissingFloors = async () => {
      // Find IDs that are on screen but not in our map yet
      const idsToFetch = [
        ...new Set(
          paginatedData
            .map((e) => e.defaultFloorId)
            .filter((id) => id && !floorMap[id])
        ),
      ];

      if (idsToFetch.length === 0) return;

      // Fetch them in parallel
      const newFloors = {};
      await Promise.all(
        idsToFetch.map(async (id) => {
          try {
            const res = await fetchFloorById(id);
            if (res.data && res.data.data) {
              newFloors[id] = res.data.data; // Store floor object
            }
          } catch (err) {
            console.error(`Failed to load floor ${id}`, err);
          }
        })
      );

      setFloorMap((prev) => ({ ...prev, ...newFloors }));
    };

    fetchMissingFloors();
  }, [paginatedData, floorMap]);

  return (
    <div className="w-full">
      {/* Dense Header */}
      <div className="grid grid-cols-12 px-4 py-2 border-b border-white/5 text-[9px] font-bold text-neutral-600 uppercase tracking-widest select-none">
        <div className="col-span-5 md:col-span-3">Employee</div>
        <div className="hidden md:block col-span-5 pl-2">Contact Reference</div>
        <div className="col-span-4 md:col-span-2 text-right md:text-left">Department</div>
        <div className="col-span-3 md:col-span-2 text-right">Access Point</div>
      </div>

      <div className="divide-y divide-white/[0.03]">
        {paginatedData.map((e) => {
          // 🟢 Resolve Floor Data
          const floor = floorMap[e.defaultFloorId];
          const isLoadingFloor = e.defaultFloorId && !floor;

          return (
            <div key={e.employeeId} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-white/[0.02] transition-colors group cursor-default content-entry">
              
              {/* Name */}
              <div className="col-span-5 md:col-span-3 flex items-center gap-3">
                <div className="w-5 h-5 rounded-[4px] bg-[#111] border border-white/10 flex items-center justify-center text-[9px] font-bold text-neutral-400 group-hover:text-white group-hover:border-white/30 transition-all">
                   {(e.employeeName || e.userName)?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-200 group-hover:text-white transition-colors truncate">{e.employeeName || e.userName}</span>
                  <span className="md:hidden text-[9px] text-neutral-600 truncate">{e.email}</span>
                </div>
              </div>

              {/* Email (Desktop) */}
              <div className="hidden md:flex col-span-5 pl-2 items-center gap-2 group/email">
                <span className="text-[10px] text-neutral-500 font-mono truncate">{e.email}</span>
                <button className="opacity-0 group-hover/email:opacity-100 text-neutral-600 hover:text-white transition-opacity" onClick={() => navigator.clipboard.writeText(e.email)}>
                   <Copy size={10} />
                </button>
              </div>

              {/* Department */}
              <div className="col-span-4 md:col-span-2 flex justify-end md:justify-start">
                 <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-[9px] text-neutral-400 font-medium">
                   {e.department}
                 </span>
              </div>

              {/* 🟢 Updated Location Column */}
              <div className="col-span-3 md:col-span-2 text-right flex items-center justify-end gap-2">
                {isLoadingFloor ? (
                   <Loader2 size={10} className="animate-spin text-neutral-600" />
                ) : floor ? (
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] text-white font-mono font-bold">Level {floor.floorNumber}</span>
                      <span className="text-[9px] text-neutral-600 truncate max-w-[80px]">{floor.floorName}</span>
                   </div>
                ) : (
                   <span className="text-[10px] text-neutral-700 font-mono">ID: {e.defaultFloorId}</span>
                )}
                <ChevronRight size={10} className="text-neutral-800 group-hover:text-neutral-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-white/5">
          <span className="text-[9px] text-neutral-600 font-mono">PAGE {page} OF {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-[#111] border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all">PREVIOUS</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-[#111] border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all">NEXT</button>
          </div>
        </div>
      )}
    </div>
  );
}