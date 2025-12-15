import React, { useState } from "react";
import {submitClientMessage} from "../../redux/api/clientMessagesApi"
export default function BookDemoSection() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNo: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

     await submitClientMessage({
      email: formData.email,
      phoneNo: formData.phoneNo,
      comment: formData.comment,
    });

      setSubmitted(true);
    } catch {
      setError("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 px-3 bg-light">
      <div className="container d-flex justify-content-center">
        <div className="col-md-6 text-center">
          <h3 className="fw-bold mb-4">Book a Demo</h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phoneNo"
                  required
                  className="form-control"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  name="comment"
                  rows="4"
                  className="form-control"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="text-danger">{error}</p>}

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          ) : (
            <p className="text-success fw-semibold">
              Thank you! We will contact you soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
