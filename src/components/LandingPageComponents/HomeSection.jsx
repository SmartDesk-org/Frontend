import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Building2,
  Map,
  MousePointer2,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  LayoutGrid,
  ShieldCheck,
  BarChart3,
  Globe2,
  Users
} from "lucide-react";

// --- COMPONENT: ANIMATED FLOOR PLAN SIMULATION ---
// (Kept the visual logic, updated styles for a more corporate look)
const FloorPlanDemo = () => {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.set(".cursor", { x: 0, y: 0, opacity: 0 });
    tl.set(".desk-target", { backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" });
    tl.set(".booking-badge", { opacity: 0, y: 10 });

    tl.to(".cursor", { opacity: 1, duration: 0.5 });
    tl.to(".cursor", { x: 140, y: 80, duration: 1, ease: "power2.inOut" });
    tl.to(".cursor", { scale: 0.8, duration: 0.1 });
    tl.to(".cursor", { scale: 1, duration: 0.1 });
    tl.to(".desk-target", { backgroundColor: "#3b82f6", borderColor: "#3b82f6", duration: 0.2 }); // Blue for Corporate
    tl.to(".booking-badge", { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    tl.to(".cursor", { opacity: 0, delay: 1, duration: 0.5 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[450px] bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 border-b border-white/5 flex justify-between items-center bg-[#0F0F0F]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-neutral-400 font-mono tracking-widest">HQ / FLOOR 4 / ZONE A</span>
        </div>
        <div className="text-[10px] text-neutral-500 font-mono">REAL-TIME AVAILABILITY</div>
      </div>

      {/* Floor Grid */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {[...Array(12)].map((_, i) => {
          const isTarget = i === 6;
          const isAlreadyBooked = [1, 3, 8, 9, 11].includes(i);
          return (
            <div 
              key={i}
              className={`
                w-16 h-12 rounded border flex flex-col items-center justify-center transition-colors
                ${isTarget ? 'desk-target border-white/20 bg-white/5 text-white' : ''}
                ${isAlreadyBooked ? 'border-neutral-800 bg-neutral-900 text-neutral-700' : 'border-white/10 bg-transparent text-neutral-500'}
                ${!isTarget && !isAlreadyBooked ? 'bg-white/5' : ''}
              `}
            >
              <span className="text-[8px] font-mono opacity-50">{isAlreadyBooked ? 'OCC' : 'AVBL'}</span>
              <span className="text-[10px] font-medium">{`W-${100+i}`}</span>
            </div>
          );
        })}
      </div>

      {/* Cursor */}
      <div className="cursor absolute top-10 left-10 pointer-events-none opacity-0 z-20">
        <MousePointer2 fill="white" size={24} className="text-white drop-shadow-lg" />
      </div>

      {/* Badge */}
      <div className="booking-badge absolute bottom-10 bg-[#0F0F0F] border border-blue-500/30 px-4 py-3 rounded-lg flex items-center gap-3 opacity-0 shadow-2xl z-10 w-64">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
           <CheckCircle size={14} className="text-blue-500" />
        </div>
        <div>
           <p className="text-xs text-white font-medium">Reservation Confirmed</p>
           <p className="text-[10px] text-neutral-400">Workstation W-106 • 09:00 - 18:00</p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: FLOW STEP ---
const FlowStep = ({ number, title, desc, specs, isLast }) => (
  <div className="relative flex gap-6 group">
    {!isLast && (
      <div className="absolute left-[19px] top-10 bottom-[-30px] w-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
    )}
    <div className="relative z-10 w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-sm font-medium text-white group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shadow-lg">
      {number}
    </div>
    <div className="pb-12">
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm mb-3">
        {desc}
      </p>
      {/* Added Data/Specs Mini-List */}
      <div className="flex gap-2">
         {specs.map((spec, i) => (
             <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-neutral-300 font-mono uppercase">
                {spec}
             </span>
         ))}
      </div>
    </div>
  </div>
);

// --- MAIN SECTION ---
export default function HomeSection() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from(".hero-element", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide uppercase mb-6">
            <Globe2 size={12} />
            <span>Enterprise SaaS Architecture</span>
          </div>
          <h1 className="hero-element text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
            Intelligent Workspace <br />
            <span className="text-neutral-500">Orchestration & Analytics.</span>
          </h1>
          <p className="hero-element text-lg text-neutral-400 font-light max-w-3xl mx-auto">
            A centralized operating system for hybrid workplaces. Optimize real estate utilization, 
            streamline employee check-ins, and manage multi-branch resources from a single pane of glass.
          </p>

          {/* --- DATA METRICS BAR --- */}
          <div className="hero-element mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
             <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                <div className="text-2xl font-light text-white mb-1">30%</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Cost Reduction</div>
             </div>
             <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                <div className="text-2xl font-light text-white mb-1">100%</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Visibility</div>
             </div>
             <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                <div className="text-2xl font-light text-white mb-1">0ms</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Booking Latency</div>
             </div>
             <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                <div className="text-2xl font-light text-white mb-1">ISO</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">27001 Certified</div>
             </div>
          </div>
        </div>

        {/* --- MAIN SPLIT LAYOUT --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-start border-t border-white/5 pt-20">
          
          {/* LEFT: TECHNICAL FLOW */}
          <div className="hero-element pl-2">
            <h4 className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-10">
              System Workflow
            </h4>

            <FlowStep 
              number="01"
              title="Tenant Configuration & Onboarding"
              desc="Super Admins configure organizational hierarchy. Define branches, upload floor plans, and set role-based access controls (RBAC) for thousands of employees."
              specs={["Multi-Tenant", "SSO Integration", "RBAC"]}
            />

            <FlowStep 
              number="02"
              title="Interactive Floor Mapping"
              desc="Transform static blueprints into dynamic, interactive booking engines. Employees visualize real-time occupancy, locate team members, and filter by amenities."
              specs={["Vector Mapping", "Live State", "Search"]}
            />

            <FlowStep 
              number="03"
              title="Instant Resource Provisioning"
              desc="One-click reservation engine. Whether it's hot-desking, meeting room scheduling, or parking allocation, the system prevents conflicts instantly."
              specs={["Conflict Resolution", "Auto-Release", "Calendar Sync"]}
              isLast={true}
            />

            <div className="mt-10">
              <button className="group px-8 py-3 bg-white text-black rounded text-sm font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Deploy Environment <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW UI */}
          <div className="hero-element">
             <div className="relative">
                {/* Floating Tags */}
                <div className="absolute -right-4 top-10 z-20 flex flex-col gap-3">
                   <div className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl flex items-center gap-3 animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-[10px] text-neutral-300 font-mono">SYNC: ACTIVE</span>
                   </div>
                   <div className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl flex items-center gap-3">
                      <BarChart3 size={12} className="text-purple-500" />
                      <span className="text-[10px] text-neutral-300 font-mono">ANALYTICS: ON</span>
                   </div>
                </div>

                <FloorPlanDemo />

                {/* Bottom Tech Stack Strip */}
                <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-6">
                    <div className="flex gap-4">
                       <ShieldCheck size={18} className="text-neutral-600" />
                       <Users size={18} className="text-neutral-600" />
                       <LayoutGrid size={18} className="text-neutral-600" />
                    </div>
                    <p className="text-[10px] font-mono text-neutral-600">
                       POWERED BY SMARTDESK ENGINE V2.4
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}