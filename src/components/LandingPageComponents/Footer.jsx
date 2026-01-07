import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Twitter,
  Linkedin,
  Github,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-20">
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 mb-6 group w-fit !no-underline"
            >
              <div className="w-9 h-9 bg-white text-black rounded-[4px] flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Layout size={20} strokeWidth={3} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                SmartDesk
              </span>
            </Link>

            <p className="!text-neutral-500 text-sm leading-relaxed max-w-sm mb-8">
              The operating system for the modern hybrid enterprise. We automate
              the chaos of multi-tenant resource allocation so you can scale
              without friction.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-white font-medium mb-6">Product</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/infrastructure" className="footer-link">
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="footer-link">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="footer-link">
                  Enterprise Scale
                </Link>
              </li>
              <li>
                <Link
                  to="/changelog"
                  className="footer-link flex items-center gap-1.5 group"
                >
                  Changelog{" "}
                  <ArrowUpRight
                    size={10}
                    className="opacity-50 group-hover:opacity-100"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* DEVELOPERS */}
          <div>
            <h4 className="text-white font-medium mb-6">Developers</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/docs" className="footer-link">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="footer-link">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/status" className="footer-link">
                  System Status
                </Link>
              </li>
              <li>
                <Link to="/opensource" className="footer-link">
                  Open Source
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPLIANCE */}
          <div>
            <h4 className="text-white font-medium mb-6">Compliance</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/dpa" className="footer-link">
                  DPA (GDPR)
                </Link>
              </li>
              <li>
                <Link to="/subprocessors" className="footer-link">
                  Subprocessors
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="footer-link flex items-center gap-2"
                >
                  <ShieldCheck size={12} className="text-neutral-600" />{" "}
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL (External → keep <a>) */}
          <div>
            <h4 className="text-white font-medium mb-6">Connect</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Twitter size={16} /> Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="!text-neutral-600 text-xs font-mono">
            © {new Date().getFullYear()} SmartDesk Inc. | Deployed on Edge
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-xs !text-neutral-500">
              <Globe size={14} /> United States (EN)
            </div>
            <div className="flex items-center gap-2 text-xs !text-neutral-500 opacity-50">
              <Zap size={14} /> Dark Mode Active
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
