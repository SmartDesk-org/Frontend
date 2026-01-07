import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Layout, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef();

  // --- GSAP ANIMATIONS ---
  useGSAP(
    () => {
      const timeline = gsap.timeline();
      timeline.from(containerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      timeline.from(
        ".nav-item",
        {
          y: -10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  // --- SCROLL LISTENER ---
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- SMART NAVIGATION HANDLER ---
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);

      if (location.pathname === "/") {
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Product", href: "/infrastructure" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        body {
          background-color: #050505;
          margin: 0;
          font-family: 'Inter', sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }
        nav a { color: inherit; text-decoration: none; }
      `}</style>

      <nav
        ref={containerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#050505] border-white/5 py-2"
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* LOGO */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="nav-item flex items-center gap-2 group text-white"
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Layout size={20} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-bold tracking-wide group-hover:text-neutral-300 transition-colors uppercase">
                SmartDesk
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-10">
              <ul className="flex items-center gap-8 m-0 p-0 list-none">
                {navLinks.map((link) => (
                  <li key={link.name} className="nav-item">
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="relative text-sm font-light tracking-widest text-neutral-300 transition-colors uppercase !no-underline cursor-pointer group hover:text-white"
                    >
                      {link.name}
                      {/* Sliding Underline */}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* DESKTOP SIGN IN BUTTON */}
              <div className="nav-item pl-8 border-l border-white/5">
                <button
                  onClick={() => navigate("/login")}
                  // FIX: Added 'group' to button, and 'group-hover:text-black' to children
                  className="group flex items-center gap-2 px-4 py-1.5 rounded border border-white/10 text-white font-light text-xs transition-all duration-300 uppercase hover:bg-white hover:border-white"
                >
                  <LogIn size={12} strokeWidth={1.5} className="transition-colors group-hover:text-black" />
                  <span className="transition-colors group-hover:text-black">Sign In</span>
                </button>
              </div>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-white hover:bg-white/5 rounded transition-colors"
            >
              {isOpen ? (
                <X size={18} strokeWidth={1.5} />
              ) : (
                <Menu size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/5 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-base font-light text-neutral-300 hover:text-white transition-colors tracking-wide !no-underline cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/5">
              {/* MOBILE SIGN IN BUTTON */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
                // FIX: Added 'group' to button, and 'group-hover:text-black' to children
                className="group w-full flex items-center justify-center gap-2 px-5 py-2 rounded border border-white/10 text-white font-light text-xs uppercase transition-all duration-300 hover:bg-white hover:border-white"
              >
                <LogIn size={12} strokeWidth={1.5} className="transition-colors group-hover:text-black" />
                <span className="transition-colors group-hover:text-black">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}