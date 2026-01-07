import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const SERVICES = [
  { name: "API Gateway", status: "operational" },
  { name: "Web Dashboard", status: "operational" },
  { name: "Booking Engine", status: "operational" },
  { name: "Notifications (Email/Slack)", status: "operational" },
  { name: "Database Clusters (US-East)", status: "operational" },
  { name: "Database Clusters (EU-West)", status: "operational" },
];

export default function StatusPage() {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-20 max-w-3xl">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">System Status</h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          All Systems Operational
        </div>
      </div>

      {/* Status Grid */}
      <div className="space-y-4">
        {SERVICES.map((svc, i) => (
          <div key={i} className="flex items-center justify-between p-6 bg-[#0A0A0A] border border-white/10 rounded-xl">
            <span className="font-medium text-white">{svc.name}</span>
            <div className="flex items-center gap-2 text-emerald-500 text-sm font-mono">
              <CheckCircle2 size={16} />
              <span className="uppercase tracking-wider">Operational</span>
            </div>
          </div>
        ))}
      </div>

      {/* Past Incidents */}
      <div className="mt-16 pt-8 border-t border-white/10">
        <h3 className="text-lg font-bold text-white mb-6">Past Incidents</h3>
        <div className="space-y-6">
           <div className="pb-6 border-b border-white/5">
             <div className="flex items-center gap-3 mb-2">
               <span className="text-zinc-500 font-mono text-xs">Oct 24, 2025</span>
               <span className="text-sm font-bold text-white">Maintenance Window</span>
             </div>
             <p className="text-zinc-400 text-sm">Scheduled database upgrades completed successfully with zero downtime.</p>
           </div>
        </div>
      </div>
    </div>
  );
}