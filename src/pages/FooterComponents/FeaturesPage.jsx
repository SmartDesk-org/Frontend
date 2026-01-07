import React from 'react';
import { Zap, Shield, Globe, Cpu, BarChart3, Lock } from 'lucide-react';

const FEATURES = [
  { title: "Global Availability", desc: "Deploy resources across 30+ regions with single-click provisioning.", icon: Globe },
  { title: "Real-time Analytics", desc: "Live dashboards showing desk usage, occupancy rates, and cost optimization.", icon: BarChart3 },
  { title: "SSO & Security", desc: "Enterprise-grade SAML 2.0 integration with granular role-based access control.", icon: Shield },
  { title: "Automated Workflows", desc: "Set rules for desk releases, booking limits, and department allocations.", icon: Zap },
  { title: "API First", desc: "Everything you see in the dashboard is available via our REST API.", icon: Cpu },
  { title: "Audit Logs", desc: "Immutable logs for compliance, tracking every booking and configuration change.", icon: Lock },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      {/* Hero */}
      <div className="max-w-3xl mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Built for the <span className="text-indigo-500">Scale</span> of Modern Work.
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          SmartDesk isn't just a booking tool. It's a comprehensive operating system for managing physical workspaces in a hybrid world.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {FEATURES.map((feat, i) => (
          <div key={i} className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-indigo-500/50 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors">
              <feat.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
            <p className="text-neutral-500 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}