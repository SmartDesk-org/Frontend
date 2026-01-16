import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/slices/companySlice";
import SubscriptionHistoryModal from "./SubscriptionHistoryModal";
import CompanyOverviewModal from "./CompanyOverviewModal";
import { FiSearch, FiActivity, FiClock, FiEye, FiServer } from "react-icons/fi";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies, loadingCompanies, error } = useSelector(
    (state) => state.company
  );

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [overviewCompany, setOverviewCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const filteredCompanies = companies?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Helper for Status Badge Styles (Simplified)
  const getStatusBadge = (isActive) => {
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-1.5"></span>
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
              <FiServer /> Clients
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Client Companies
            </h1>
          </div>

          {/* Search Bar (Minimal) */}
          <div className="w-full md:w-96 border-b border-neutral-800 focus-within:border-cyan-500 transition-colors">
            <div className="flex items-center py-2">
              <FiSearch className="text-gray-500 mr-3" />
              <input 
                type="text"
                placeholder="Search company name..."
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full font-mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- TABLE SECTION (No Card, No Borders) --- */}
        <div>
          
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-800/50">
             <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-widest">
                <FiActivity />
                <span>Entries: {filteredCompanies?.length || 0}</span>
             </div>
          </div>

          {loadingCompanies && (
            <div className="py-12 text-center text-cyan-400 font-mono animate-pulse text-sm">
              LOADING_DATA...
            </div>
          )}
          
          {error && (
            <div className="py-12 text-center text-red-500 font-mono text-sm">
              ERROR: {error}
            </div>
          )}

          {!loadingCompanies && filteredCompanies?.length === 0 && (
            <div className="py-12 text-center text-gray-600 font-mono text-sm">
              NO_RECORDS_FOUND
            </div>
          )}

          {!loadingCompanies && filteredCompanies?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-600 font-mono">
                    <th className="py-4 pr-6 font-normal">ID</th>
                    <th className="py-4 px-6 font-normal">Company Name</th>
                    <th className="py-4 px-6 font-normal">Address</th>
                    <th className="py-4 px-6 font-normal">Status</th>
                    <th className="py-4 px-6 font-normal">Created</th>
                    <th className="py-4 px-6 font-normal">Modified</th>
                    <th className="py-4 pl-6 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {filteredCompanies.map((c) => (
                    <tr 
                      key={c.companyId} 
                      className="group hover:bg-neutral-900/40 transition-colors duration-200"
                    >
                      {/* ID */}
                      <td className="py-4 pr-6 font-mono text-xs text-cyan-500/70 align-middle">
                        #{c.companyId}
                      </td>
                      
                      {/* Name */}
                      <td className="py-4 px-6 align-middle">
                        <span className="font-bold text-white text-sm block group-hover:text-cyan-400 transition-colors">
                          {c.name}
                        </span>
                      </td>
                      
                      {/* Address */}
                      <td className="py-4 px-6 text-sm text-gray-400 truncate max-w-[200px] align-middle">
                        {c.address}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 align-middle">
                        {getStatusBadge(c.isActive)}
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-6 text-xs font-mono text-gray-600 align-middle">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-4 px-6 text-xs font-mono text-gray-600 align-middle">
                        {c.modifiedAt ? new Date(c.modifiedAt).toLocaleDateString() : "-"}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-6 align-middle">
                        <div className="flex items-center justify-end gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                          {/* View Subscriptions */}
                          <button
                            onClick={() => setSelectedCompany(c)}
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                            title="View History"
                          >
                            <FiClock size={16} />
                          </button>

                          {/* View Overview */}
                          <button
                            onClick={() => setOverviewCompany(c)}
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                            title="View Overview"
                          >
                            <FiEye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- MODALS --- */}
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
    </div>
  );
}