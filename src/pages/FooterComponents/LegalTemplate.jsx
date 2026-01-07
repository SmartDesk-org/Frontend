import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LegalTemplate({ title, lastUpdated, content }) {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-20 max-w-4xl">
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-2 text-emerald-500 mb-4">
          <ShieldCheck size={20} />
          <span className="text-sm font-mono uppercase tracking-widest">Compliance Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-neutral-500 font-mono text-sm">Last Verified: <span className="text-white">{lastUpdated}</span></p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
        {content || (
          <div className="space-y-8">
            <p className="text-xl leading-relaxed">
              At SmartDesk, trust is our fundamental currency. This document outlines our strict adherence to global standards regarding {title.toLowerCase()}.
            </p>
            <div className="p-6 bg-[#111] border border-white/10 rounded-xl">
              <h4 className="text-white font-bold mb-2">Key Takeaway</h4>
              <p className="text-sm text-neutral-400">
                We do not sell your data. We encrypt everything at rest and in transit. 
                We are fully SOC2 Type II and GDPR compliant.
              </p>
            </div>
            <p>
              (This is a placeholder for the full legal text. In a real application, you would populate this with your actual markdown or HTML content.)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}