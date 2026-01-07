import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedFeedbacks } from "../../redux/slices/feedbackSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Quote,
  Building2,
  TrendingUp,
  ShieldCheck,
  Code2,
  Users,
  User,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Building2, TrendingUp, ShieldCheck, Code2];

export default function FeedbackSection() {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);

  const { list: feedbacks, loading } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchPublishedFeedbacks());
  }, [dispatch]);

  // --- 1. SAFE DATA PREPARATION ---
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  // Ensure we always have at least an empty array, slice top 4
  const displayFeedbacks = safeFeedbacks.slice(0, 4);

  // --- 2. OPTIMIZED ANIMATION (No "Falling" Effect) ---
  useGSAP(
    () => {
      if (!loading && displayFeedbacks.length > 0) {
        // Kill any old animations to prevent glitches
        gsap.killTweensOf(".bento-card");

        gsap.fromTo(
          ".bento-card",
          { y: 30, opacity: 0 }, // Start slightly down and invisible
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%", // Triggers when section is 80% visible
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [loading, displayFeedbacks] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#0A0A0A] border-t border-white/10"
      id="case-studies"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Users size={14} />
              <span>Customer Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Trusted by Enterprises.
            </h2>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
            <div className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && displayFeedbacks.length === 0 && (
          <div className="p-12 border border-dashed border-white/10 rounded-2xl text-center text-neutral-500 font-mono text-sm">
            No published feedbacks found via API.
          </div>
        )}

        {/* --- THE BENTO GRID (Fixed Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {displayFeedbacks.map((item, index) => {
            // Determine Width: First and Last items span 2 columns on Desktop
            const isWide = index === 0 || index === 3;
            const gridClass = isWide ? "lg:col-span-2" : "lg:col-span-1";

            // Safe Data Access
            const content = item.content || item.Content || "No content.";
            const company = item.companyName || item.CompanyName || "Client";
            const title = item.title || item.Title || "User";
            const Icon = ICONS[index % ICONS.length];

            return (
              <div
                key={item.id || index}
                className={`bento-card group relative flex flex-col justify-between p-8 rounded-2xl bg-[#111] border border-white/10 hover:border-indigo-500/50 hover:bg-[#141414] transition-all duration-300 ${gridClass}`}
              >
                {/* Decorative Icon */}
                <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                  <Icon size={80} />
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Quote size={20} className="text-indigo-400 fill-current" />
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      {company}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed line-clamp-3">
                    "{content}"
                  </h3>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/20">
                    {title.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {title}
                    </div>
                    <div className="text-neutral-500 text-xs">{company}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
