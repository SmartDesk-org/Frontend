import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFeedbacks,
  togglePublishFeedback,
  deleteFeedback,
} from "../../redux/slices/feedbackSlice";
import { 
  MessageSquare, Trash2, Eye, EyeOff, Calendar, CheckCircle, 
  Activity, Building2, Loader2, Quote 
} from "lucide-react";

export default function FeedbacksPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.feedback);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  useEffect(() => {
    dispatch(fetchAllFeedbacks());
  }, [dispatch]);

  // Client-side pagination
  const paginatedData = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(list.length / PAGE_SIZE);

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
                    <MessageSquare size={12} /> User Sentiment
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    Client Feedbacks
                </h1>
            </div>
            
            {/* Stats Summary */}
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <span className="block text-xl font-bold text-white leading-none">{list.length}</span>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono mt-1">Total</span>
                </div>
                <div className="w-px h-8 bg-neutral-800"></div>
                <div className="flex flex-col items-center">
                    <span className="block text-xl font-bold text-green-400 leading-none">{list.filter(f => f.isPublished).length}</span>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono mt-1">Live</span>
                </div>
            </div>
        </div>

        {loading && (
            <div className="py-12 text-center text-cyan-400 font-mono text-sm animate-pulse">
                SYNCING_FEED...
            </div>
        )}

        {error && (
            <div className="py-12 text-center text-red-500 font-mono text-sm">
                ERROR: {error}
            </div>
        )}

        {/* --- LIST SECTION --- */}
        {!loading && (
            <div>
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 px-2 py-3 border-b border-neutral-800 text-[9px] font-bold text-gray-600 uppercase tracking-widest font-mono">
                    <div className="col-span-5 md:col-span-4">Feedback Content</div>
                    <div className="hidden md:block col-span-3 pl-2">Company Reference</div>
                    <div className="col-span-3 md:col-span-2 text-center">Date</div>
                    <div className="col-span-2 md:col-span-2 text-center">Status</div>
                    <div className="col-span-2 md:col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-neutral-900">
                    {paginatedData.map((f) => (
                        <div key={f.id} className="grid grid-cols-12 items-center px-2 py-4 hover:bg-neutral-900/40 transition-colors group cursor-default">
                            
                            {/* 1. Content Column */}
                            <div className="col-span-5 md:col-span-4 pr-4">
                                <div className="flex items-start gap-3">
                                    <Quote size={12} className="text-neutral-700 shrink-0 mt-1" />
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                            {f.title}
                                        </h3>
                                        {f.content && (
                                            <p className="text-[10px] text-gray-500 truncate font-mono mt-1">
                                                {f.content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {/* Mobile Company Name (Hidden on Desktop) */}
                                <div className="md:hidden mt-2 ml-6 flex items-center gap-1 text-[9px] text-gray-600">
                                    <Building2 size={8} /> {f.companyName || "Unknown"}
                                </div>
                            </div>

                            {/* 2. Company (Desktop) */}
                            <div className="hidden md:flex col-span-3 pl-2 items-center gap-2">
                                <Building2 size={12} className="text-gray-600" />
                                <span className="text-xs text-gray-400 font-medium truncate">
                                    {f.companyName || <span className="text-gray-700 italic">Unknown Entity</span>}
                                </span>
                            </div>

                            {/* 3. Date */}
                            <div className="col-span-3 md:col-span-2 flex justify-center">
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {new Date(f.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {/* 4. Status Badge */}
                            <div className="col-span-2 md:col-span-2 flex justify-center">
                                <span className={`
                                    inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide
                                    ${f.isPublished ? "text-green-400" : "text-gray-600"}
                                `}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${f.isPublished ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></span>
                                    {f.isPublished ? "Live" : "Hidden"}
                                </span>
                            </div>

                            {/* 5. Actions */}
                            <div className="col-span-2 md:col-span-1 flex justify-end gap-3 opacity-60 md:opacity-40 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => dispatch(togglePublishFeedback(f.id))}
                                    className={`transition-colors ${
                                        f.isPublished ? "text-green-500 hover:text-white" : "text-gray-500 hover:text-green-400"
                                    }`}
                                    title={f.isPublished ? "Unpublish" : "Publish"}
                                >
                                    {f.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                
                                <button
                                    onClick={() => dispatch(deleteFeedback(f.id))}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {list.length === 0 && (
                    <div className="py-20 text-center text-gray-700 font-mono text-[10px] uppercase tracking-widest">
                        No_Feedback_Data_Found
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
    </div>
  );
}