import React from 'react';

const UPDATES = [
  { version: "v2.4.0", date: "Jan 05, 2026", title: "Smart Scheduling AI", desc: "Introduced AI-driven desk recommendations based on team proximity." },
  { version: "v2.3.5", date: "Dec 12, 2025", title: "Okta SCIM Integration", desc: "Automated user provisioning via Okta is now live for Enterprise plans." },
  { version: "v2.3.0", date: "Nov 28, 2025", title: "Dark Mode for Dashboard", desc: "The highly requested dark theme is now available in user settings." },
];

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-20 max-w-3xl">
      <h1 className="text-5xl font-bold text-white mb-16">Changelog</h1>
      
      <div className="relative border-l border-white/10 pl-12 space-y-16">
        {UPDATES.map((update, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div className="absolute -left-[53px] top-1 w-3 h-3 bg-indigo-500 rounded-full ring-4 ring-[#050505]"></div>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-white">{update.version}</span>
              <span className="text-zinc-500 text-sm">{update.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{update.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{update.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}