import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { Check, Zap, ArrowRight, AlertCircle, Building2, Users } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function PricePlansSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading, error } = useSelector((state) => state.subscription);
  
  // Ref for scoping animations
  const sectionRef = useRef();

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Header Animation (Clean Fade Up)
    tl.from(".header-anim", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "all"
    });

    // 2. Cards Animation (Staggered Entry)
    if (plans && plans.length > 0) {
      tl.from(".card-anim", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      }, "-=0.4");
    }
  }, { scope: sectionRef, dependencies: [plans, loading] });

  // --- LOADING STATE ---
  if (loading) {
    return (
      <section className="py-32 bg-[#050505] flex justify-center items-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-neutral-500 text-sm font-mono tracking-widest uppercase animate-pulse">
            Loading Pricing...
          </p>
        </div>
      </section>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <section className="py-32 bg-[#050505] flex justify-center">
        <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span>Error loading plans: {error}</span>
        </div>
      </section>
    );
  }

  // --- FILTER & SORT ---
  const activePlans = plans
    ?.filter((p) => p.isActive)
    .sort((a, b) => a.priceMonthly - b.priceMonthly);

  // --- EMPTY STATE ---
  if (!activePlans?.length) {
    return (
      <section className="py-32 bg-[#050505] text-center">
        <div className="container mx-auto px-6">
          <div className="p-12 border border-dashed border-white/10 rounded-2xl bg-[#0A0A0A]">
            <h3 className="text-xl font-bold text-white mb-2">No Active Plans</h3>
            <p className="text-neutral-500 mb-6">Pricing is currently being updated.</p>
          </div>
        </div>
      </section>
    );
  }

  const choosePlan = (plan) => {
    navigate("/purchase", { state: { selectedPlan: plan } });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 bg-[#050505] border-t border-white/5 overflow-hidden" 
      id="pricing"
    >
      {/* Background Glow (Your 'Befores' Style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="header-anim inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Zap size={14} />
            <span>Usage-Based Scaling</span>
          </div>
          
          <h2 className="header-anim text-5xl md:text-6xl font-medium text-white mb-6 tracking-tight leading-[1.1]">
            Transparent pricing for <br />
            <span className="text-neutral-500">modern enterprises.</span>
          </h2>
          
          <p className="header-anim text-neutral-400 text-lg font-light max-w-xl mx-auto">
            Choose the perfect stack for your organization. Upgrade, downgrade, or cancel at any time.
          </p>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {activePlans.map((plan) => {
            const isPopular = plan.subscriptionName === "Startup" || plan.subscriptionName === "Business Pro";
            
            return (
              <div
                key={plan.id}
                className={`card-anim group relative flex flex-col p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2
                  ${isPopular 
                    // POPULAR: Darker #0c0c10 with Indigo Borders/Glow
                    ? "bg-[#0c0c10] border border-indigo-500/40 shadow-[0_0_50px_-15px_rgba(99,102,241,0.2)]" 
                    // STANDARD: Classic #0A0A0A with Minimal White Borders
                    : "bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-[#0f0f0f]"
                  }`}
              >
                
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/10">
                    Recommended
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className={`text-lg font-medium mb-4 ${isPopular ? "text-white" : "text-neutral-300"}`}>
                    {plan.subscriptionName}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-light text-white tracking-tight">
                      ₹{plan.priceMonthly}
                    </span>
                    <span className="text-neutral-500 text-sm">/mo</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 font-mono uppercase tracking-wide">
                    Billed ₹{plan.priceYearly} yearly
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/5 mb-8"></div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {/* Hard Limits */}
                  <li className="flex items-center gap-3">
                    <Users size={16} className="text-neutral-500" />
                    <span className="text-sm text-neutral-300">
                      <span className="text-white font-medium">{plan.maxEmployees}</span> Active Users
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Building2 size={16} className="text-neutral-500" />
                    <span className="text-sm text-neutral-300">
                      <span className="text-white font-medium">{plan.maxDesks}</span> Workspaces
                    </span>
                  </li>

                  {/* Dynamic Description */}
                  {(plan.description || "").split(",").map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center 
                        ${isPopular ? "bg-indigo-500/20" : "bg-white/10"}`}>
                        <Check size={10} className={isPopular ? "text-indigo-400" : "text-neutral-400"} />
                      </div>
                      <span className="text-sm text-neutral-400 leading-tight">
                        {f.trim()}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => choosePlan(plan)}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn
                    ${isPopular 
                      ? "bg-white text-black hover:bg-neutral-200" 
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                >
                  Select Plan
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="header-anim mt-24 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Enterprise</span>
              <span className="w-px h-4 bg-white/10"></span>
              <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                 Need custom limits and SLA?
              </span>
              <ArrowRight size={14} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
           </div>
        </div>

      </div>
    </section>
  );
}