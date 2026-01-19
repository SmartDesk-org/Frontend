import React, { useState } from 'react';
import axiosClient from '../../redux/api/axiosClient';
import { toast } from 'react-hot-toast';
import { X, Clock, Calendar, ShieldCheck, Zap, Monitor } from 'lucide-react';
import moment from 'moment';

export default function BookingModal({ resource, onClose }) {
  const meta = JSON.parse(resource.metadataJson || "{}");

  const [times, setTimes] = useState({
    start: moment().format("YYYY-MM-DDTHH:mm"),
    end: moment().add(1, 'hour').format("YYYY-MM-DDTHH:mm")
  });

  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (moment(times.end).isBefore(moment(times.start))) {
      return toast.error("Checkout time cannot be before Check-in time");
    }

    try {
      setLoading(true);
      await axiosClient.post(`/ResourceBooking/${resource.id}`, {
        // resourceId: resource.id,
        resourceTypeId: resource.resourceTypeId,
        startTime: new Date(times.start).toISOString(),
        endTime: new Date(times.end).toISOString()
      });

      toast.success("Workspace reserved successfully!");
      onClose();
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Slot may be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4">
      <div className="bg-[#0A0A0A] border border-neutral-800 w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl relative">

        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-neutral-900 bg-gradient-to-br from-blue-600/5 to-transparent flex justify-between gap-4">
          <div>
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-2 w-fit ${
                resource.resourceTypeId === 1
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'bg-purple-500/10 text-purple-400'
              }`}
            >
              {resource.resourceTypeId === 1 ? 'Workstation' : 'Conference Room'}
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Confirm Reservation
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Resource ID: <span className="text-neutral-300">#{resource.id} ({meta.name})</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">

          {/* Resource Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl flex items-center gap-3">
              <Monitor className="text-blue-500/50" size={18} />
              <div>
                <p className="text-[10px] text-neutral-600 font-mono uppercase">Setup</p>
                <p className="text-xs text-neutral-300 font-bold">
                  {meta.hasSystem ? 'Dual Monitor' : 'BYOD'}
                </p>
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-2xl flex items-center gap-3">
              <Zap className="text-yellow-500/50" size={18} />
              <div>
                <p className="text-[10px] text-neutral-600 font-mono uppercase">Power</p>
                <p className="text-xs text-neutral-300 font-bold">
                  {meta.chargingSlot ? 'Available' : 'Standard'}
                </p>
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
                <Clock size={12} /> Check-in
              </label>
              <input
                type="datetime-local"
                className="w-full bg-black border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                value={times.start}
                onChange={e => setTimes({ ...times, start: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
                <Calendar size={12} /> Check-out
              </label>
              <input
                type="datetime-local"
                className="w-full bg-black border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                value={times.end}
                onChange={e => setTimes({ ...times, end: e.target.value })}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <ShieldCheck className="text-blue-500 shrink-0" size={18} />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              By confirming, you agree to release this workspace on time. Repeated failure may affect booking priority.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              disabled={loading}
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-3 rounded-2xl border border-neutral-800 text-white font-bold hover:bg-neutral-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleBook}
              className="w-full sm:flex-[2] px-6 py-3 rounded-2xl bg-white text-black font-extrabold hover:bg-neutral-200 shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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
