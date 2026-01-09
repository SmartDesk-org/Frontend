import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeedback,
  clearFeedbackError,
} from "../../redux/slices/feedbackSlice";
import { X, MessageSquarePlus, Loader2, Save } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AddFeedbackModal({ onClose }) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { loading, error } = useSelector((s) => s.feedback);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [localError, setLocalError] = useState("");

  // 🟢 GSAP Entrance Animation
  useGSAP(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0.95, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  }, []);

  // Clear backend error when modal opens/closes
  useEffect(() => {
    dispatch(clearFeedbackError());
    return () => dispatch(clearFeedbackError());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setLocalError("Please fill in all fields.");
      return;
    }

    setLocalError("");

    const res = await dispatch(addFeedback({ title, content }));

    // ✅ Close modal only on success
    if (addFeedback.fulfilled.match(res)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-[#111]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <MessageSquarePlus size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Submit Feedback
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono">
                We value your input
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-neutral-500 hover:text-white transition-colors p-1 rounded-md hover:bg-neutral-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          {/* Error Messages */}
          {(localError || error) && (
            <div className="p-3 bg-red-900/10 border border-red-900/20 rounded-lg flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              <p className="text-xs text-red-400 leading-relaxed">
                {localError || error}
              </p>
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Subject
            </label>
            <input
              type="text"
              className="w-full bg-[#151515] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              placeholder="e.g. Suggestion for new feature"
              value={title}
              disabled={loading}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content Input  */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full bg-[#151515] border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none disabled:opacity-50"
              placeholder="Describe your feedback or issue in detail..."
              value={content}
              disabled={loading}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-neutral-800 bg-[#0F0F0F] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}
