import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback, clearFeedbackError } from "../../redux/slices/feedbackSlice";

export default function AddFeedbackModal({ onClose }) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((s) => s.feedback);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [localError, setLocalError] = useState("");

  // Clear backend error when modal opens/closes
  useEffect(() => {
    dispatch(clearFeedbackError());
    return () => dispatch(clearFeedbackError());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setLocalError("Title and feedback are required");
      return;
    }

    setLocalError("");

    const res = await dispatch(
      addFeedback({ title, content })
    );

    // ✅ Close modal only on success
    if (addFeedback.fulfilled.match(res)) {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Add Feedback</h5>
            <button
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* Local validation error */}
            {localError && (
              <div className="alert alert-danger py-2">
                {localError}
              </div>
            )}

            {/* Backend error from slice */}
            {error && (
              <div className="alert alert-danger py-2">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
                disabled={loading}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Feedback</label>
              <textarea
                className="form-control"
                rows={4}
                value={content}
                disabled={loading}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
