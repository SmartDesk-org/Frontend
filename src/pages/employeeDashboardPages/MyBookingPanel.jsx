import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, LogOut, Loader2, Info } from "lucide-react";
import axiosClient from "../../redux/api/axiosClient";
import moment from "moment";
import { toast } from "react-hot-toast";

export default function MyBookingPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/ResourceBooking/my-bookings");
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyBookings(); }, []);

  const handleAction = async (id, action) => {
    try {
        const url = action === 'cancel' ? `/ResourceBooking/${id}/cancel` : `/ResourceBooking/${id}/release`;
        const method = action === 'cancel' ? 'put' : 'patch';
        const body = action === 'release' ? { newEndTime: new Date().toISOString() } : {};
        
        await axiosClient[method](url, body);
        toast.success(`Booking ${action}ed successfully`);
        fetchMyBookings();
    } catch (err) {
        toast.error("Failed to update booking status");
    }
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-blue-500" />
        <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest">Fetching your schedule...</span>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Clock className="text-blue-500" size={20} /> Active Schedule
        </h3>
        <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase">
            {bookings.length} Sessions Total
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-800 rounded-[2rem] bg-neutral-900/20">
            <Info className="mx-auto text-neutral-600 mb-4" size={32} />
            <p className="text-neutral-500 font-medium">No active bookings found.</p>
            <p className="text-xs text-neutral-700 mt-1">Visit the Map to find a workspace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div key={b.bookingId} className="bg-[#0A0A0A] border border-neutral-900 rounded-[2rem] p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all shadow-xl">
              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>

              <div className="mb-6">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-1">
                   {b.resourceTypeId === 1 ? '🖥️ WORKSTATION' : '🚪 CONFERENCE ROOM'}
                </span>
                <h5 className="text-white font-bold text-lg">Resource #{b.resourceId}</h5>
              </div>

              <div className="space-y-3 p-4 bg-black/40 rounded-2xl border border-neutral-900/50 mb-6">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-neutral-500 font-mono">FROM</span>
                  <span className="text-neutral-300 font-bold">{moment(b.startTime).format("HH:mm • MMM DD")}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-neutral-500 font-mono">UNTIL</span>
                  <span className="text-neutral-300 font-bold">{moment(b.endTime).format("HH:mm • MMM DD")}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(b.bookingId, 'release')}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-neutral-800"
                >
                  <LogOut size={14} /> Finish early
                </button>
                <button 
                  onClick={() => handleAction(b.bookingId, 'cancel')}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-xl transition-colors border border-red-500/20"
                  title="Cancel Booking"
                >
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}