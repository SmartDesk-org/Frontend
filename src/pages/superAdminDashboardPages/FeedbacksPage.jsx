import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFeedbacks,
  togglePublishFeedback,
  deleteFeedback,
} from "../../redux/slices/feedbackSlice";

export default function FeedbacksPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.feedback);

  useEffect(() => {
    dispatch(fetchAllFeedbacks());
  }, [dispatch]);

  return (
    <div>
      <h3 className="mb-4">Client Feedbacks</h3>

      {loading && <p>Loading feedbacks...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Published</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((f) => (
                <tr key={f.id}>
                  <td>{f.title}</td>
                  <td>{f.companyName ?? "-"}</td>
                  <td>
                    <span
                      className={
                        f.isPublished
                          ? "badge bg-success"
                          : "badge bg-secondary"
                      }
                    >
                      {f.isPublished ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    {new Date(f.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-end">
                    <button
                      className={`btn btn-sm me-2 ${
                        f.isPublished
                          ? "btn-outline-warning"
                          : "btn-outline-success"
                      }`}
                      onClick={() =>
                        dispatch(togglePublishFeedback(f.id))
                      }
                    >
                      {f.isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        dispatch(deleteFeedback(f.id))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No feedbacks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
