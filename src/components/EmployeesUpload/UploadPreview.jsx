import React, { useState } from "react";
import {
  Check,
  X,
  FileSpreadsheet,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function UploadPreview({
  data,
  onCancel,
  onConfirm,
  uploading,
  progress,
}) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <div className="bg-[#0A0A0A] border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-neutral-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0d0d0d]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500">
            <FileSpreadsheet size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Review Import
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] text-neutral-400 font-mono">
                {data.length} records ready
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none px-5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/50 rounded-xl transition-all"
          >
            Discard
          </button>
          <button
            onClick={onConfirm}
            disabled={uploading}
            className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {uploading ? "Importing..." : "Confirm Import"}
          </button>
        </div>
      </div>

      {/* Table Container - Critical for Mobile Responsiveness */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800 pb-2">
        {uploading && (
          <div className="px-6 pb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-neutral-400 font-mono">
                Uploading employees…
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {progress}%
              </span>
            </div>

            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <table className="w-full text-left border-collapse min-w-[600px]">
          {/* min-w enforces scroll on mobile */}
          <thead className="bg-[#111] text-[10px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-900">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="text-sm text-white font-medium group-hover:text-emerald-400 transition-colors">
                    {row.EmployeeName || (
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertTriangle size={10} /> Missing
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-neutral-400 font-mono">
                  {row.Email || "-"}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-md text-[10px] font-bold uppercase">
                    {row.Department}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-neutral-500">
                  Floor {row.DefaultFloorId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-neutral-900 flex justify-between items-center bg-[#0d0d0d]">
        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 bg-[#151515] border border-neutral-800 rounded-lg text-xs text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 bg-[#151515] border border-neutral-800 rounded-lg text-xs text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
