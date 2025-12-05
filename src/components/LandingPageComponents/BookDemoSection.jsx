// src/components/BookDemoSection.jsx
import React, { useState } from 'react';

export default function BookDemoSection() {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-5 px-3 bg-light">
      <div className="container d-flex justify-content-center">
        <div className="col-md-6 text-center">
          <h3 className="fw-bold text-dark mb-4">Book a Demo</h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="text-start">

              {/* Name */}
              <div className="mb-3">
                <label className="form-label text-secondary">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label text-secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Comment */}
              <div className="mb-3">
                <label className="form-label text-secondary">Comment</label>
                <textarea
                  name="comment"
                  rows="4"
                  value={formData.comment}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Write your message here..."
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          ) : (
            <p className="text-success fw-semibold mt-3">
              Thank you for your request! We will contact you soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
