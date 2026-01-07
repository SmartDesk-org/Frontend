import React from "react";
import Navbar from "../components/LandingPageComponents/Navbar";
import HomeSection from "../components/LandingPageComponents/HomeSection";
import PricePlansSection from "../components/LandingPageComponents/PricePlansSection";
import FeedbackSection from "../components/LandingPageComponents/FeedbackSection";
import BookDemoSection from "../components/LandingPageComponents/BookDemoSection";
import Footer from "../components/LandingPageComponents/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-indigo-500/30">
      <Navbar />

      <main>
        {/* CLEAN SECTIONS
          Removed all Bootstrap classes (py-5, bg-light). 
          Each component now handles its own full-bleed layout.
        */}

        <section id="home">
          <HomeSection />
        </section>

        <section id="pricing">
          <PricePlansSection />
        </section>

        <section id="case-studies">
          <FeedbackSection />
        </section>

        <section id="book-demo">
          <BookDemoSection />
        </section>
      </main>

    </div>
  );
}
