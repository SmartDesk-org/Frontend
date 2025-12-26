import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacksByCompany, addFeedback } from "../../redux/slices/feedbackSlice";
import AddFeedbackModal from "../../components/companyAdmin/AddFeedbackModal";

export default function FeedbacksPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.feedback);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      dispatch(fetchFeedbacksByCompany());
  }, [dispatch]);

  const handleAdd = async (payload) => {
    await dispatch(addFeedback(payload));
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Company Feedbacks</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Feedback
        </button>
      </div>

      {loading && <p className="text-muted">Loading feedbacks...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Feedback</th>
                <th>Published</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.id}>
                  <td>{f.title}</td>
                  <td className="text-muted">{f.content}</td>
                  <td>
                    <span
                      className={`badge ${
                        f.isPublished ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {f.isPublished ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}

              {list.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No feedbacks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <AddFeedbackModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}
