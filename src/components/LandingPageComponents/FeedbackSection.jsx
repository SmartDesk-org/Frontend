import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedFeedbacks } from "../../redux/slices/feedbackSlice";

export default function FeedbackSection() {
  const dispatch = useDispatch();

  const { list: feedbacks, loading, error } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    dispatch(fetchPublishedFeedbacks());
  }, [dispatch]);

  return (
    <section className="py-5 px-3 container">
      <h3 className="fw-bold text-center text-dark mb-5 fs-2">
        What Our Clients Say
      </h3>

      {/* Loading */}
      {loading && (
        <p className="text-center text-muted">Loading feedbacks...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-danger">{error}</p>
      )}

      {/* Empty */}
      {!loading && feedbacks.length === 0 && (
        <p className="text-center text-muted">
          No feedbacks available yet
        </p>
      )}

      {/* Feedback Cards */}
      <div className="row g-4 justify-content-center">
        {feedbacks.map((item) => (
          <div
            className="col-12 col-md-6 col-lg-4 d-flex"
            key={item.id}
          >
            <article
              className="border rounded p-4 shadow-sm h-100 w-100 text-center"
              style={{
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.08)")
              }
            >
              <h5 className="fw-semibold mb-2">{item.title}</h5>

              <p className="text-muted mb-3">
                {item.content}
              </p>

              {item.companyName && (
                <div className="fw-medium text-dark">
                  — {item.companyName}
                </div>
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
