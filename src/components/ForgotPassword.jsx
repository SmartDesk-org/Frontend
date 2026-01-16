import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../redux/slices/authSlice";
import { gsap } from "gsap";
import { 
  Terminal, 
  ArrowLeft, 
  Loader2, 
  X, 
  Check 
} from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  // 🟢 Local state for popup visibility to handle animations
  const [popupVisible, setPopupVisible] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((s) => s.auth);

  const containerRef = useRef(null);
  const popupRef = useRef(null);

  // 1. Mechanical Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the container lines
      gsap.from(".grid-line", {
        scaleY: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.inOut",
      });

      // Slide the card up mechanically
      gsap.from(".auth-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out", // sharper ease
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 2. Status Popup Logic
  useEffect(() => {
    if (message || error) {
      setPopupVisible(true);
      
      // Sharp slide in
      gsap.fromTo(
        popupRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Auto hide
      const timer = setTimeout(() => {
        gsap.to(popupRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          onComplete: () => setPopupVisible(false)
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen bg-[#050505] overflow-hidden text-neutral-200 font-mono"
    >
      {/* 🟢 BACKGROUND: Technical Grid (Square Lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      ></div>
      
      {/* Vignette to focus center */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505] pointer-events-none"></div>

      {/* 🟢 STATUS POPUP (Strict B&W) */}
      <div 
        ref={popupRef}
        className="fixed top-6 z-50 flex items-center gap-3 px-4 py-3 bg-black border border-white/20 shadow-2xl"
        style={{ display: popupVisible ? "flex" : "none" }}
      >
        <div className={`w-1 h-full absolute left-0 top-0 ${error ? 'bg-white' : 'bg-neutral-600'}`}></div>
        {error ? <X size={14} className="text-white" /> : <Check size={14} className="text-white" />}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">
            {error ? "SYSTEM_ERROR" : "SYSTEM_SUCCESS"}
          </span>
          <span className="text-[11px] text-white">
            {error || message}
          </span>
        </div>
      </div>

      {/* 🟢 MAIN CARD */}
      <div className="auth-card relative w-full max-w-[360px] bg-[#0A0A0A] border border-white/10 p-0 shadow-2xl z-10">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-neutral-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              FORGET?
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
            FORGOT PASSWORD
          </h2>
          <p className="text-[10px] text-neutral-500 leading-relaxed mb-6 border-l-2 border-white/10 pl-3">
            ENTER REGISTERED EMAIL ADDRESS. SYSTEM WILL DISPATCH RESET TOKEN TO CONTACT REFERENCE.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest ml-1">
                Target Email
              </label>
              <input
                type="email"
                className="w-full h-10 bg-[#050505] border border-white/10 px-3 text-xs text-white font-mono placeholder-neutral-800 focus:border-white/40 focus:bg-white/[0.02] outline-none transition-all"
                placeholder="user@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button 
              disabled={loading}
              className="group relative w-full h-10 bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-200 active:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  PROCESSING
                </>
              ) : (
                <>
                  <span>INITIATE RESET</span>
                  <div className="w-1 h-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex justify-center">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-[10px] text-neutral-500 hover:text-white transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Abort / Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}