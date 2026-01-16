import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/slices/companySlice";
import SubscriptionHistoryModal from "./SubscriptionHistoryModal";
import CompanyOverviewModal from "./CompanyOverviewModal";
import { 
  Building2, MapPin, Calendar, Activity, CheckCircle, 
  XCircle, CreditCard, BarChart2, Search, Loader2, ChevronRight 
} from "lucide-react";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies, loadingCompanies, error } = useSelector(
    (state) => state.company
  );

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [overviewCompany, setOverviewCompany] = useState(null);
  
  // Performance: Local Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // 1. Filter Logic
  const filteredData = companies?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    c.address?.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) || [];

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND GRID PATTERN --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-neutral-800/50 pb-6">
            <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                    <Building2 size={12} /> Enterprise Directory
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    Client Companies
                </h1>
            </div>
            
            {/* Search Input */}
            <div className="relative group w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                    <Search size={14} className="text-gray-500 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-6 pr-0 py-2 bg-transparent border-b border-neutral-800 text-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {loadingCompanies && (
            <div className="py-12 text-center text-cyan-400 font-mono text-sm animate-pulse">
                FETCHING_DATABASE...
            </div>
        )}

        {error && (
            <div className="py-12 text-center text-red-500 font-mono text-sm">
                ERROR: {error}
            </div>
        )}

        {/* --- LIST SECTION --- */}
        {!loadingCompanies && (
            <div>
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 px-2 py-3 border-b border-neutral-800 text-[9px] font-bold text-gray-600 uppercase tracking-widest font-mono">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-4">Company Profile</div>
                    <div className="col-span-3">Contact Info</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-neutral-900">
                    {paginatedData.map((c) => (
                        <div key={c.companyId} className="grid grid-cols-12 items-center px-2 py-4 hover:bg-neutral-900/40 transition-colors group">
                            
                            {/* ID */}
                            <div className="col-span-1 text-gray-600 font-mono text-[10px] hidden md:block">
                                #{c.companyId}
                            </div>

                            {/* Name & Date */}
                            <div className="col-span-5 md:col-span-4 pr-4">
                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                    {c.name}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-mono">
                                    <Calendar size={10} /> 
                                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                            {/* Address (Hidden on Mobile) */}
                            <div className="hidden md:flex col-span-3 items-center gap-2 pr-4">
                                <MapPin size={12} className="text-gray-600 shrink-0" />
                                <span className="text-xs text-gray-400 truncate font-mono" title={c.address}>
                                    {c.address || <span className="text-gray-700 italic">No Address</span>}
                                </span>
                            </div>

                            {/* Status Badge */}
                            <div className="col-span-3 md:col-span-2 flex justify-center">
                                <span className={`
                                    inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide
                                    ${c.isActive ? "text-green-400" : "text-red-400"}
                                `}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                                    {c.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-4 md:col-span-2 flex justify-end gap-3 opacity-60 md:opacity-40 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setSelectedCompany(c)}
                                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                                    title="View Subscription History"
                                >
                                    <CreditCard size={16} />
                                </button>
                                
                                <button
                                    onClick={() => setOverviewCompany(c)}
                                    className="text-gray-500 hover:text-green-400 transition-colors"
                                    title="View Resource Overview"
                                >
                                    <BarChart2 size={16} />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!loadingCompanies && filteredData.length === 0 && (
                    <div className="py-20 text-center text-gray-700 font-mono text-[10px] uppercase tracking-widest">
                        No_Matching_Companies_Found
                    </div>
                )}

                {/* Footer Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center py-4 border-t border-neutral-800 mt-4">
                        <span className="text-[9px] text-gray-600 font-mono">
                            PAGE {page} OF {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button 
                                disabled={page === 1} 
                                onClick={() => setPage(p => p - 1)} 
                                className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-gray-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all"
                            >
                                PREVIOUS
                            </button>
                            <button 
                                disabled={page === totalPages} 
                                onClick={() => setPage(p => p + 1)} 
                                className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-gray-400 hover:text-white hover:border-neutral-600 disabled:opacity-30 transition-all"
                            >
                                NEXT
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}

      </div>

      {/* Modals */}
      {selectedCompany && (
        <SubscriptionHistoryModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      {overviewCompany && (
        <CompanyOverviewModal
          company={overviewCompany}
          onClose={() => setOverviewCompany(null)}
        />
      )}
    </div>
  );
}