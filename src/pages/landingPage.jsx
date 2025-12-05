// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../components/LandingPageComponents/Navbar';
import HomeSection from '../components/LandingPageComponents/HomeSection';
import PricePlansSection from "../components/LandingPageComponents/PricePlansSection";
import CaseStudiesSection from '../components/LandingPageComponents/CaseStudiesSection';
import BookDemoSection from '../components/LandingPageComponents/BookDemoSection';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      {/* Bootstrap fixed-top navbar height is approx 56px, so add margin top */}
      {/* <header className="d-flex justify-content-end align-items-center bg-white shadow-sm" style={{ marginTop: '56px', padding: '1rem 1.5rem' }}>
       
      </header> */}

      <main>
        <section id="home" className="py-5">
          <HomeSection />
        </section>
        <section id="pricing" className="py-5 bg-light">
          <PricePlansSection />
        </section>
        <section id="case-studies" className="py-5">
          <CaseStudiesSection />
        </section>
        <section id="book-demo" className="py-5 bg-light">
          <BookDemoSection />
        </section>
      </main>

      <footer className="text-center text-muted py-4 bg-white">
        &copy; {new Date().getFullYear()} Smart Desk & Employee Check-in System
      </footer>
    </div>
  );
}