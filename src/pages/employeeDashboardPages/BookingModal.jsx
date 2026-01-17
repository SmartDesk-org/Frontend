import React, { useState } from 'react';
import axiosClient from '../../redux/api/axiosClient';
import { toast } from 'react-hot-toast';
import { X, Clock, Calendar, ShieldCheck, Zap, Monitor, Wind } from 'lucide-react';
import moment from 'moment';

export default function BookingModal({ resource, onClose }) {
  // Parse metadata for display
  const meta = JSON.parse(resource.metadataJson || "{}");
  
  // Set default booking: starts now, ends in 1 hour
  const [times, setTimes] = useState({
    start: moment().format("YYYY-MM-DDTHH:mm"),
    end: moment().add(1, 'hour').format("YYYY-MM-DDTHH:mm")
  });

  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    // Basic validation
    if (moment(times.end).isBefore(moment(times.start))) {
        return toast.error("Checkout time cannot be before Check-in time");
    }

    try {
      setLoading(true);
      await axiosClient.post("/ResourceBooking", {
        resourceId: resource.id,
        resourceTypeId: resource.resourceTypeId,
        startTime: new Date(times.start).toISOString(),
        endTime: new Date(times.end).toISOString()
      });
      
      toast.success("Workspace reserved successfully!");
      onClose();
      // Optional: Logic to refresh map or navigate to schedule
      window.location.reload(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Slot may be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#0A0A0A] border border-neutral-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        {/* Header Area */}
        <div className="p-8 border-b border-neutral-900 bg-gradient-to-br from-blue-600/5 to-transparent flex justify-between items-start">
          <div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-3 w-fit ${
                resource.resourceTypeId === 1 ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
            }`}>
              {resource.resourceTypeId === 1 ? 'Workstation' : 'Conference Room'}
            </div>
            <h4 className="text-2xl font-bold text-white mb-1">Confirm Reservation</h4>
            <p className="text-sm text-neutral-500 font-medium">Resource Identification: <span className="text-neutral-300">#{resource.id} ({meta.name})</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Resource Details Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl flex items-center gap-3">
                <Monitor className="text-blue-500/50" size={18} />
                <div>
                   <p className="text-[10px] text-neutral-600 font-mono uppercase">Setup</p>
                   <p className="text-xs text-neutral-300 font-bold">{meta.hasSystem ? 'Dual Monitor' : 'BYOD'}</p>
                </div>
             </div>
             <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl flex items-center gap-3">
                <Zap className="text-yellow-500/50" size={18} />
                <div>
                   <p className="text-[10px] text-neutral-600 font-mono uppercase">Power</p>
                   <p className="text-xs text-neutral-300 font-bold">{meta.chargingSlot ? 'Available' : 'Standard'}</p>
                </div>
             </div>
          </div>

          {/* Time Selection Form */}
          <div className="space-y-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1">
                        <Clock size={12} /> Check-in Time
                    </label>
                    <input 
                    type="datetime-local" 
                    className="w-full bg-black border border-neutral-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={times.start}
                    onChange={e => setTimes({...times, start: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest ml-1">
                        <Calendar size={12} /> Check-out Time
                    </label>
                    <input 
                    type="datetime-local" 
                    className="w-full bg-black border border-neutral-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={times.end}
                    onChange={e => setTimes({...times, end: e.target.value})}
                    />
                </div>
             </div>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <ShieldCheck className="text-blue-500 shrink-0" size={20} />
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                  By confirming, you agree to release this workspace on time. Repeated failure to release may affect your booking priority limit.
              </p>
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              disabled={loading}
              onClick={onClose} 
              className="flex-1 px-4 py-4 rounded-2xl border border-neutral-800 text-white font-bold hover:bg-neutral-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              disabled={loading}
              onClick={handleBook} 
              className="flex-[2] px-8 py-4 rounded-2xl bg-white text-black font-extrabold hover:bg-neutral-200 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Finalizing...
                </>
              ) : (
                'Secure This Spot'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}