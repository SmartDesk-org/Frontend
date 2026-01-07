import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function ProductTemplate({ title, subtitle, features, icon: Icon }) {
  return (
    <div className="bg-[#050505] min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl mb-24">
          {/* Dynamic Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-6">
            {Icon && <Icon size={14} />}
            <span>Product Feature</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            {title}
          </h1>
          
          <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl font-light">
            {subtitle}
          </p>
        </div>

        {/* --- FEATURE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-indigo-500/50 hover:bg-[#111] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Check size={16} strokeWidth={3} />
                </div>
                {feat.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm pl-11">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- CTA SECTION --- */}
        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-r from-indigo-900/10 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
             <h3 className="text-2xl font-bold text-white mb-2">Ready to scale?</h3>
             <p className="text-neutral-400">Get full access to {title} with our Enterprise plan.</p>
          </div>
          
          <a href="/purchase" className="relative z-10 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2">
            Talk to Sales <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
}