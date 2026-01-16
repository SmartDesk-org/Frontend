import React, { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../redux/api/axiosClient";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Terminal,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function ResetPassword() {
  const containerRef = useRef();
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  // Logic States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // UI States
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // 🟢 GSAP: Mechanical Entrance
  useGSAP(
    () => {
      // Grid Reveal
      gsap.from(".grid-line", {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.inOut",
      });

      // Terminal Slide Up
      gsap.from(".reset-terminal", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("PASSWORD MUST BE > 6 CHARS");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("PASSCODE MISMATCH");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosClient.post("/Auth/reset-password", {
        token,
        newPassword,
      });

      setSuccess("PROTOCOL UPDATE SUCCESSFUL");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "RESET FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden p-6 font-mono"
    >
      {/* --- BACKGROUND: TECHNICAL GRID --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]" />
      </div>

      {/* --- MAIN TERMINAL CARD --- */}
      <div className="reset-terminal relative w-full max-w-[380px] z-10 bg-[#0A0A0A] border border-white/10 shadow-2xl">
        
        {/* Terminal Header Strip */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-neutral-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
             RESET PASSWORD
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white tracking-tight uppercase">
              Update Credentials
            </h2>
            <p className="text-[10px] text-neutral-500 mt-1 border-l-2 border-white/10 pl-2 leading-relaxed">
              ESTABLISH NEW SECURITY PROTOCOL FOR USER ACCOUNT.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                New Passcode
              </label>
              <div className="relative group">
                <input
                  type={showNewPass ? "text" : "password"}
                  className="w-full h-10 bg-[#050505] border border-white/10 text-xs text-white px-3 placeholder-neutral-700 focus:border-white/40 focus:bg-white/[0.02] outline-none transition-all rounded-none"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                >
                  {showNewPass ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Verify Passcode
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className="w-full h-10 bg-[#050505] border border-white/10 text-xs text-white px-3 placeholder-neutral-700 focus:border-white/40 focus:bg-white/[0.02] outline-none transition-all rounded-none"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                >
                  {showConfirmPass ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-white text-black text-[10px] font-bold border-l-4 border-red-500 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} />
                <span>ERROR: {error.toUpperCase()}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-2 bg-white text-black text-[10px] font-bold border-l-4 border-green-500 animate-in fade-in slide-in-from-top-1">
                <CheckCircle2 size={12} />
                <span>SUCCESS: {success}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-10 mt-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-200 active:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  <span>OVERWRITING...</span>
                </>
              ) : (
                <>
                  <span>CHANGE PASSWORD</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Strip */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] text-center">
          <p className="text-[9px] text-neutral-600 uppercase tracking-widest">
            © 2025 SmartDesk Sys. // All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}