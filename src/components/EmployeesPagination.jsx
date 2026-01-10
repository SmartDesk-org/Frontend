import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Don't render pagination if there is only one page (or no items)
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 bg-[#0A0A0A]/50">
      {/* Left: Range Info */}
      <div className="text-[10px] text-neutral-500 font-mono">
        Showing <span className="text-neutral-300 font-bold">{startItem}-{endItem}</span> of <span className="text-neutral-300 font-bold">{totalItems}</span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md border border-neutral-800 bg-[#111] text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous Page"
        >
          <ChevronLeft size={14} />
        </button>

        <span className="text-[10px] font-medium text-neutral-400 px-2 min-w-[60px] text-center">
          Page <span className="text-white">{currentPage}</span> of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md border border-neutral-800 bg-[#111] text-neutral-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next Page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}