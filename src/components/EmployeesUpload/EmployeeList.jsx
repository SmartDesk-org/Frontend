import React, { useState } from "react";
import Pagination from "../pagination"; // Adjust path as needed

export default function EmployeeList({ list, loading, isDimmed }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const paginatedData = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Helper to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "??";
  };

  const getAvatarColor = (id) => {
    const colors = [
      "primary",
      "success",
      "danger",
      "warning",
      "info",
      "secondary",
    ];
    return colors[id % colors.length];
  };

  return (
    <div
      className={`card border-0 shadow-sm rounded-4 overflow-hidden ${
        isDimmed ? "opacity-50" : ""
      }`}
      style={{ transition: "opacity 0.3s" }}
    >
      <div className="card-body p-0">
        <div className="table-responsive">
          <table
            className="table table-hover align-middle mb-0"
            style={{ minWidth: "600px" }}
          >
            <thead className="bg-light text-secondary small text-uppercase">
              <tr>
                <th className="py-3 ps-4 border-0" style={{ width: "35%" }}>
                  Employee Name
                </th>
                <th className="py-3 border-0" style={{ width: "25%" }}>
                  Email
                </th>
                <th className="py-3 border-0" style={{ width: "20%" }}>
                  Department
                </th>
                <th className="py-3 border-0" style={{ width: "20%" }}>
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2 mb-0">Loading directory...</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((e) => (
                  <tr key={e.employeeId} style={{ height: "70px" }}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        {/* Modern Avatar Circle */}
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center text-white bg-${getAvatarColor(
                            e.employeeId
                          )} bg-gradient shadow-sm`}
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          {getInitials(e.userName)}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">
                            {e.userName}
                          </div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            ID: {e.employeeId}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="text-secondary">{e.email}</td>
                    <td>
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-medium">
                        {e.department}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2 text-dark">
                        <i className="bi bi-layers-half text-secondary"></i>
                        <span>Floor {e.defaultFloorId}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && list.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="text-muted d-flex flex-column align-items-center">
                      <i className="bi bi-inbox fs-1 mb-2 opacity-25"></i>
                      <span>No employees found in the directory.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Pagination */}
      {list.length > 0 && (
        <div className="card-footer bg-white border-top py-3">
          <Pagination
            currentPage={page}
            totalItems={list.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
