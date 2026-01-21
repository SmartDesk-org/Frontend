import React, { useState, useEffect } from "react";
import { Clock, XCircle, LogOut, Loader2, Info, AlertTriangle } from "lucide-react";
import axiosClient from "../../redux/api/axiosClient";
import moment from "moment";
import { toast } from "react-hot-toast";

export default function MyBookingPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/ResourceBooking/my-bookings");
      setBookings(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyBookings(); }, []);

  const handleAction = async (id, action) => {
    try {
      setActionLoading(true);
      const url = action === 'cancel'
        ? `/ResourceBooking/${id}/cancel`
        : `/ResourceBooking/${id}/release`;

      const method = action === 'cancel' ? 'put' : 'patch';
      const body = action === 'release'
        ? { newEndTime: new Date().toISOString() }
        : {};

      await axiosClient[method](url, body);
      toast.success(`Booking ${action === 'cancel' ? 'cancelled' : 'released'} successfully`);
      setCancelTarget(null);
      fetchMyBookings();
    } catch {
      toast.error("Failed to update booking");
    } finally {
      setActionLoading(false);
    }
  };

  const activeBookings = bookings.filter(b => b.status === "2" || b.status === 3);
  const inactiveBookings = bookings.filter(b => ["4", "5", "6"].includes(b.status));

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-blue-500" />
        <span className="text-xs font-mono text-neutral-600 uppercase">Fetching your schedule...</span>
      </div>
    );
  }

  const renderCard = (b, isActive) => (
    <div
      key={b.bookingId}
      className="bg-[#0A0A0A] border border-neutral-900 rounded-[2rem] p-6 shadow-xl"
    >
      <div className="mb-4">
        <span className="text-[10px] font-mono text-neutral-600 uppercase">
          {b.resourceTypeId === 1 ? '🖥️ WORKSTATION' : '🚪 CONFERENCE ROOM'}
        </span>
        <h5 className="text-white font-bold text-lg">Resource #{b.resourceId}</h5>
      </div>

      <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-neutral-900/50 mb-4">
        <div className="flex justify-between text-[11px]">
          <span className="text-neutral-500">FROM</span>
          <span>{moment(b.startTime).format("HH:mm • MMM DD")}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-neutral-500">UNTIL</span>
          <span>{moment(b.endTime).format("HH:mm • MMM DD")}</span>
        </div>
      </div>

      {isActive && (
        <div className="flex gap-2">
          <button
            onClick={() => handleAction(b.bookingId, 'release')}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold py-3 rounded-xl border border-neutral-800"
          >
            <LogOut size={14} /> Finish early
          </button>
          <button
            onClick={() => setCancelTarget(b)}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-xl border border-red-500/20"
          >
            <XCircle size={16} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">

      {/* ---- ACTIVE BOOKINGS ---- */}
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Clock className="text-blue-500" size={20} /> Active Schedule
      </h3>

      {activeBookings.length === 0 ? (
        <div className="text-neutral-500 mb-10">No active bookings</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {activeBookings.map(b => renderCard(b, true))}
        </div>
      )}

      {/* ---- INACTIVE BOOKINGS ---- */}
      <h3 className="text-lg font-bold text-neutral-400 mb-4">Past / Inactive Bookings</h3>

      {inactiveBookings.length === 0 ? (
        <div className="text-neutral-600">No past bookings</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-70">
          {inactiveBookings.map(b => renderCard(b, false))}
        </div>
      )}

      {/* ---- CANCEL MODAL ---- */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-neutral-800 w-full max-w-md text-center">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={32} />
            <h4 className="text-white font-bold mb-2">Cancel Booking?</h4>
            <p className="text-neutral-500 mb-6">
              Cancel booking for Resource #{cancelTarget.resourceId}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 border border-neutral-700 py-2 rounded-xl"
              >
                No
              </button>
              <button
                onClick={() => handleAction(cancelTarget.bookingId, 'cancel')}
                disabled={actionLoading}
                className="flex-1 bg-red-600 py-2 rounded-xl text-white"
              >
                {actionLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
