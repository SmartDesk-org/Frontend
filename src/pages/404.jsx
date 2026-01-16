import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-red-500/30">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Red Glow (Subtle Warning) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 text-center px-6">
        {/* Error Code Badge */}
       

        {/* Massive 404 Text */}
        <h1 className="text-9xl md:text-[180px] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl text-white font-medium mt-4 mb-6">
          Page Not Found
        </h2>

        <p className="text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed">
          The resource you are looking for has been moved, deleted, or never
          existed in this sector. Please return to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors w-full md:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors w-full md:w-auto justify-center"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-neutral-700 text-xs font-mono uppercase tracking-widest">
          SmartDesk OS • v2.4.0 • Region: US-EAST
        </p>
      </div>
    </div>
  );
}
