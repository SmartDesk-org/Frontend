// src/components/CaseStudiesSection.jsx
import React from 'react';

const caseStudies = [
  {
    title: 'TechCorp Increases Desk Utilization by 30%',
    summary:
      'Implemented Smart Desk System to optimize flexible seating and monitor attendance in real-time.',
    link: '#',
  },
  {
    title: 'InnovateX Streamlines Meeting Room Bookings',
    summary:
      'Reduced meeting conflicts and improved room usage efficiency using our booking platform.',
    link: '#',
  },
  {
    title: 'Global Enterprises Enhances Employee Check-in Experience',
    summary:
      'Seamless QR code check-ins and automated attendance tracking across multiple locations.',
    link: '#',
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="py-5 px-3 container">
      <h3 className="fw-bold text-center text-dark mb-5 fs-2">Case Studies</h3>

      <div className="row g-4">
        {caseStudies.map(({ title, summary, link }) => (
          <div className="col-md-4" key={title}>
            <article
              className="border rounded p-4 shadow-sm hover-shadow cursor-pointer"
              style={{ transition: '0.2s' }}
              onClick={() => window.open(link, '_blank')}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)')}
            >
              <h4 className="fw-semibold fs-5 mb-2">{title}</h4>
              <p className="text-muted">{summary}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
