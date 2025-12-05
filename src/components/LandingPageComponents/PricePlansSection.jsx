// src/components/PricePlansSection.jsx
import React from 'react';

const plans = [
  {
    title: 'Basic',
    price: '$49/mo',
    features: ['Desk Booking', 'Employee Check-in', 'Basic Reporting'],
  },
  {
    title: 'Pro',
    price: '$99/mo',
    features: ['All Basic Features', 'Meeting Room Booking', 'Real-time Monitoring'],
  },
  {
    title: 'Enterprise',
    price: 'Custom Pricing',
    features: ['All Pro Features', 'Dedicated Support', 'Custom Integrations'],
  },
];

export default function PricePlansSection() {
  return (
    <section className="py-5 px-3 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold text-dark mb-4 fs-2">Pricing Plans</h3>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-white rounded shadow p-4 flex-fill"
              style={{ maxWidth: '350px', margin: '0 auto' }}
            >
              <h4 className="fs-4 fw-semibold mb-3">{plan.title}</h4>
              <p className="fs-2 fw-bold mb-4">{plan.price}</p>

              <ul className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                {plan.features.map((feature, i) => (
                  <li key={i}>&#10003; {feature}</li>
                ))}
              </ul>

              <button className="btn btn-primary w-100">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
