import React, { useState, useRef } from "react";
import { submitClientMessage } from "../../redux/api/clientMessagesApi";
import { ArrowRight, Check, Loader2, Minus } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookDemoSection() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNo: "",
    comment: "",
    companyName: "" // Added for Multi-tenant context
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. Line Drawing Animation
    gsap.from(".divider-line", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    // 2. Text Fade Up
    gsap.from(".fade-up", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

  }, { scope: sectionRef });

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await submitClientMessage(formData);
      setSubmitted(true);
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#08090A] text-white py-24 lg:py-32 overflow-hidden font-sans" id="book-demo">
      
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION - Minimalist & Huge */}
        <div className="mb-16 lg:mb-24">
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6 fade-up">
            04 — Deployment
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] fade-up">
            Ready to <br/>
            <span className="text-zinc-500">Scale Up?</span>
          </h2>
        </div>

        {/* HORIZONTAL DIVIDER - The "Thin Line" Aesthetic */}
        <div className="w-full h-[1px] bg-white/10 mb-16 lg:mb-24 divider-line"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: CONTEXT (Multi-tenant Value) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-8 fade-up">
              <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                SmartDesk is designed for multi-tenant architectures. One integration to rule your entire resource management stack.
              </p>
              
              <div className="flex flex-col gap-4 pt-4">
                {[
                  "SSO & SAML Integration",
                  "Audit Logs & Compliance",
                  "99.99% SLA Guarantee"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-500">
                    <Minus size={16} className="text-zinc-700" />
                    <span className="text-sm font-medium tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Stats */}
            <div className="mt-12 lg:mt-0 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 fade-up">
              <div>
                <h4 className="text-3xl font-medium tracking-tight text-white">2.4s</h4>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Avg. Deployment</p>
              </div>
              <div>
                <h4 className="text-3xl font-medium tracking-tight text-white">500+</h4>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Active Tenants</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE PRECISION FORM */}
          <div className="lg:col-span-7 pl-0 lg:pl-12 fade-up">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-0">
                
                {/* Field 1: Company (Crucial for SaaS) */}
                <div className="group relative border-b border-white/10 focus-within:border-white transition-colors duration-300">
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="Company / Organization"
                    className="w-full bg-transparent py-6 text-lg md:text-xl text-white placeholder-zinc-600 outline-none font-light tracking-tight"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                {/* Field 2: Email */}
                <div className="group relative border-b border-white/10 focus-within:border-white transition-colors duration-300">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Work Email"
                    className="w-full bg-transparent py-6 text-lg md:text-xl text-white placeholder-zinc-600 outline-none font-light tracking-tight"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Field 3: Requirements */}
                <div className="group relative border-b border-white/10 focus-within:border-white transition-colors duration-300">
                  <textarea
                    name="comment"
                    rows="3"
                    placeholder="Tell us about your infrastructure..."
                    className="w-full bg-transparent py-6 text-lg md:text-xl text-white placeholder-zinc-600 outline-none font-light tracking-tight resize-none"
                    value={formData.comment}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-10 flex items-center justify-between">
                  {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
                  
                  <button
                    disabled={loading}
                    className="group flex items-center gap-4 text-white hover:text-zinc-300 transition-colors disabled:opacity-50"
                  >
                    <span className="text-sm font-medium tracking-widest uppercase">
                      {loading ? "Processing Request" : "Schedule Walkthrough"}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ArrowRight size={16} className="transform group-hover:-rotate-45 transition-transform duration-300" />
                      )}
                    </div>
                  </button>
                </div>

              </form>
            ) : (
              /* Success State - Minimalist */
              <div className="h-full flex flex-col justify-center py-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight">Request Logged.</h3>
                </div>
                <p className="text-zinc-400 font-light text-lg max-w-md">
                  We have received your configuration details. A solutions engineer will reach out to <span className="text-white">{formData.email}</span> within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Return to Console
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}