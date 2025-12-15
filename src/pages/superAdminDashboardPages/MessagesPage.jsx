import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  toggleRead,
  toggleImportant,
  removeMessage,
} from "../../redux/slices/clientMessagesSlice";

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(
    (s) => s.clientMessages
  );

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // 1️⃣ Sort: Important first, then unread, then latest
  const sortedMessages = [...messages].sort((a, b) => {
    if (a.isImportant !== b.isImportant)
      return b.isImportant - a.isImportant;
    if (a.isRead !== b.isRead)
      return a.isRead - b.isRead;
    return b.id - a.id;
  });

  // 2️⃣ Separate unread and read
  const unreadMessages = sortedMessages.filter(m => !m.isRead);
  const readMessages = sortedMessages.filter(m => m.isRead);

  const renderRow = (m) => (
    <tr key={m.id} className={!m.isRead ? "table-warning" : ""}>
      <td>{m.id}</td>
      <td>{m.email}</td>
      <td>{m.phoneNo}</td>

      {/* Long comment handling */}
      <td style={{ maxWidth: 300 }}>
        <div
          style={{
            maxHeight: 60,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {m.comment}
        </div>
      </td>

      <td>
        {m.isImportant && "⭐ "}
        {m.isRead ? "Read" : "Unread"}
      </td>

      <td className="d-flex gap-2">
        {!m.isRead && (
          <button
            className="btn btn-sm btn-info"
            onClick={() => dispatch(toggleRead(m.id))}
          >
            Mark as Read
          </button>
        )}

        <button
          className="btn btn-sm btn-warning"
          onClick={() => dispatch(toggleImportant(m.id))}
        >
          {m.isImportant ? "Unmark" : "Important"}
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(removeMessage(m.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="mb-4">Contact Messages</h1>

      {/* UNREAD SECTION */}
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">
          Unread Messages ({unreadMessages.length})
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unreadMessages.length
                ? unreadMessages.map(renderRow)
                : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No unread messages
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* READ SECTION */}
      <div className="card shadow-sm">
        <div className="card-header fw-bold">
          Read Messages ({readMessages.length})
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {readMessages.length
                ? readMessages.map(renderRow)
                : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No read messages
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
