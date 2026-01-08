import React, { useRef } from "react";
import LoginForm from "../components/LoginForm";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Layout } from "lucide-react";

export default function LoginPage() {
  const containerRef = useRef();

  useGSAP(
    () => {
      // Background Glow Animation
      gsap.to(".glow-orb", {
        scale: 1.2,
        opacity: 0.4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Content Entrance
      gsap.from(".login-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden p-6"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* Grid Pattern */}
        <div className="absolute inset-0 " />

        {/* Glowing Orb */}
        <div className="glow-orb absolute  -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]rounded-full pointer-events-none" />
      </div>

      {/* --- MAIN CARD --- */}
      <div className="login-content relative w-full max-w-md z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4">
            <Layout className="text-white" size={24} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-medium text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-neutral-400 text-sm mt-2 font-light">
            Enter your credentials to access your workspace.
          </p>
        </div>

        {/* Form Container - SHADOW REMOVED HERE */}
        {/* Removed 'shadow-2xl' from the className below */}
        <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-neutral-500 text-xs mt-8">
          © 2025 SmartDesk Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
