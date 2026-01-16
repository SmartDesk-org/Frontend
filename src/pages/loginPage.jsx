import React, { useRef } from "react";
import LoginForm from "../components/LoginForm";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal } from "lucide-react";

export default function LoginPage() {
  const containerRef = useRef();

  useGSAP(
    () => {
      // Mechanical Grid Reveal
      gsap.from(".grid-line", {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.inOut",
      });

      // Terminal Card Entrance (Sharp slide up)
      gsap.from(".login-terminal", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

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
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]" />
      </div>

      {/* --- MAIN TERMINAL CARD --- */}
      <div className="login-terminal relative w-full max-w-[380px] z-10 bg-[#0A0A0A] border border-white/10 shadow-2xl">
        
        {/* Terminal Header Strip */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-neutral-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              LOGIN
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
              Identify User
            </h2>
            <p className="text-[10px] text-neutral-500 mt-1 border-l-2 border-white/10 pl-2 leading-relaxed">
              ENTER CREDENTIALS TO INITIALIZE WORKSPACE SESSION.
            </p>
          </div>

          <LoginForm />
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