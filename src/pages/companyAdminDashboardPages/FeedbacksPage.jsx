import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacksByCompany, addFeedback } from "../../redux/slices/feedbackSlice";
import AddFeedbackModal from "../../components/companyAdmin/AddFeedbackModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Filter,
  Loader2
} from "lucide-react";

// 🟢 Helper for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function FeedbacksPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.feedback);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchFeedbacksByCompany());
  }, [dispatch]);

  const handleAdd = async (payload) => {
    await dispatch(addFeedback(payload));
    setShowModal(false);
  };

  // 🟢 Filter Logic
  const filteredList = useMemo(() => {
    if (!list) return [];
    return list.filter(f => 
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [list, searchQuery]);

  // 🟢 Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Title Area */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              User Feedback
            </h1>
            <p className="text-neutral-500 text-sm md:text-base max-w-lg">
              Manage and review feedback submitted by your employees or customers.
            </p>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative group flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:bg-neutral-800 transition-all"
              />
            </div>

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={3} />
              <span>New Feedback</span>
            </motion.button>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-neutral-800 via-neutral-800 to-transparent mt-8" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="max-w-7xl mx-auto">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-neutral-700" />
            <p className="text-sm font-mono uppercase tracking-widest">Syncing Data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 border border-red-900/50 bg-red-900/10 rounded-lg text-red-400 text-sm flex items-center gap-3">
            <XCircle size={18} />
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredList.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-800">
              <Filter className="text-neutral-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No feedback found</h3>
            <p className="text-neutral-500 text-sm">
              Try adjusting your search or add a new entry.
            </p>
          </div>
        )}

        {/* GRID LAYOUT */}
        {!loading && filteredList.length > 0 && (
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredList.map((f) => (
              <FeedbackCard key={f.id} data={f} variants={itemVars} />
            ))}
          </motion.div>
        )}
      </div>

      {/* 3. MODAL WRAPPER */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            {/* NOTE: We wrap your existing modal. 
              Ideally, AddFeedbackModal should handle its own styling internally 
              to match this theme, but this wrapper positions it correctly.
            */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg"
            >
               <AddFeedbackModal
                 onClose={() => setShowModal(false)}
                 onSubmit={handleAdd}
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// 🟢 SUB-COMPONENT: MODERN CARD
function FeedbackCard({ data, variants }) {
  const isPublished = data.isPublished;

  return (
    <motion.div 
      variants={variants}
      className="group relative flex flex-col justify-between p-6 bg-[#0A0A0A] border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors duration-300"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

      <div>
        {/* Header: Status & Date */}
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5",
            isPublished 
              ? "bg-green-900/10 border-green-900/30 text-green-400" 
              : "bg-neutral-800 border-neutral-700 text-neutral-500"
          )}>
            {isPublished ? <CheckCircle2 size={10} /> : <div className="w-2 h-2 rounded-full bg-neutral-600" />}
            {isPublished ? "Published" : "Draft"}
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
            <Calendar size={10} />
            {new Date(data.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6">
          {data.content}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-900 flex items-center gap-2">
         <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-mono border border-neutral-700">
           F
         </div>
         <span className="text-xs text-neutral-500 font-medium">Feedback ID: {data.id.toString().slice(-4)}</span>
      </div>
    </motion.div>
  );
}