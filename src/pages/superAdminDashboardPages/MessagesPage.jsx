import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  toggleRead,
  toggleImportant,
  removeMessage,
} from "../../redux/slices/clientMessagesSlice";
import { 
  Mail, Star, Trash2, CheckCircle, Clock, 
  Phone, AlertCircle, ChevronDown, ChevronUp, Loader2, Inbox, MessageSquare 
} from "lucide-react";

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((s) => s.clientMessages);

  // Expanded Message State
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // Sorting logic
  const sortedMessages = [...messages].sort((a, b) => {
    if (a.isImportant !== b.isImportant) return b.isImportant - a.isImportant;
    if (a.isRead !== b.isRead) return a.isRead - b.isRead;
    return b.id - a.id;
  });

  const unreadMessages = sortedMessages.filter((m) => !m.isRead);
  const readMessages = sortedMessages.filter((m) => m.isRead);

  // --- Reusable Row Component ---
  const MessageRow = ({ m }) => {
    const isExpanded = expandedId === m.id;

    return (
      <div className={`transition-colors border-b border-neutral-800/50 ${!m.isRead ? "bg-cyan-900/10" : "hover:bg-neutral-900/40"}`}>
        <div 
            onClick={() => setExpandedId(isExpanded ? null : m.id)}
            className="grid grid-cols-12 gap-4 px-2 py-4 items-center cursor-pointer group"
        >
          {/* 1. Status Indicator */}
          <div className="col-span-1 flex justify-center">
             {m.isImportant ? (
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
             ) : (
                <div className={`w-1.5 h-1.5 rounded-full ${!m.isRead ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-neutral-700'}`}></div>
             )}
          </div>

          {/* 2. Sender Info */}
          <div className="col-span-11 md:col-span-4">
             <div className="flex items-center gap-2">
                <span className={`text-sm font-bold truncate ${!m.isRead ? 'text-white' : 'text-neutral-400'}`}>
                    {m.email}
                </span>
             </div>
             <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 font-mono">
                <Phone size={10} /> {m.phoneNo}
             </div>
          </div>

          {/* 3. Message Preview */}
          <div className="hidden md:block col-span-5 pr-4">
             <p className={`text-xs truncate font-mono ${!m.isRead ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {m.comment}
             </p>
          </div>

          {/* 4. Actions */}
          <div className="col-span-12 md:col-span-2 flex justify-end gap-3 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
             {!m.isRead && (
                 <button 
                    onClick={() => dispatch(toggleRead(m.id))}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                    title="Mark Read"
                 >
                    <CheckCircle size={16} />
                 </button>
             )}
             <button 
                onClick={() => dispatch(toggleImportant(m.id))}
                className={`transition-colors ${m.isImportant ? 'text-yellow-500' : 'text-neutral-500 hover:text-yellow-500'}`}
                title="Toggle Important"
             >
                <Star size={16} className={m.isImportant ? "fill-yellow-500" : ""} />
             </button>
             <button 
                onClick={() => dispatch(removeMessage(m.id))}
                className="text-neutral-500 hover:text-red-500 transition-colors"
                title="Delete"
             >
                <Trash2 size={16} />
             </button>
             
             {/* Mobile Expand Toggle */}
             <div className="md:hidden text-neutral-500">
                 {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
             </div>
          </div>
        </div>

        {/* Expanded Content View */}
        {isExpanded && (
            <div className="px-4 md:px-14 py-4 bg-neutral-950/30 border-t border-dashed border-neutral-800 text-xs text-neutral-400 font-mono leading-relaxed whitespace-pre-wrap">
                <div className="max-w-3xl">
                    <span className="block text-[9px] uppercase tracking-widest text-neutral-600 mb-2">Full Message</span>
                    {m.comment}
                </div>
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-neutral-800/50 pb-6">
            <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                    <Mail size={14} /> Communication Hub
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    Contact Messages
                </h1>
            </div>

            {loading && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono animate-pulse">
                    <Loader2 size={12} className="animate-spin" />
                    SYNCING...
                </div>
            )}
        </div>

        {error && (
            <div className="py-8 text-center text-red-500 font-mono text-xs border-b border-red-500/10 mb-8">
                ERROR: {error}
            </div>
        )}

        {/* --- INBOX SECTION --- */}
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-white uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                Inbox <span className="text-neutral-600 font-mono">({unreadMessages.length})</span>
            </div>

            {/* List Header */}
            <div className="hidden md:grid grid-cols-12 px-2 py-2 border-b border-neutral-800 text-[9px] font-bold text-neutral-600 uppercase tracking-widest font-mono">
                <div className="col-span-1 text-center">!</div>
                <div className="col-span-4">Sender</div>
                <div className="col-span-5">Message Preview</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            {unreadMessages.length > 0 ? (
                <div className="divide-y divide-neutral-900">
                    {unreadMessages.map((m) => <MessageRow key={m.id} m={m} />)}
                </div>
            ) : (
                <div className="py-12 text-center text-neutral-700 font-mono text-[10px] uppercase tracking-widest border-b border-neutral-800/30">
                    All_Caught_Up
                </div>
            )}
        </div>

        {/* --- ARCHIVE SECTION --- */}
        <div className="opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <Clock size={12} />
                Archive <span className="text-neutral-700 font-mono">({readMessages.length})</span>
            </div>

            {readMessages.length > 0 ? (
                <div className="border-t border-neutral-800/50">
                    {readMessages.map((m) => <MessageRow key={m.id} m={m} />)}
                </div>
            ) : (
                <div className="py-8 text-center text-neutral-800 font-mono text-[10px] uppercase tracking-widest">
                    No_Archived_Messages
                </div>
            )}
        </div>

      </div>
    </div>
  );
}