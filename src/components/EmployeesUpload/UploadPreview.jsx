
import React, { useState } from "react";
import Pagination from "../pagination";

export default function UploadPreview({ data, onCancel, onConfirm, uploading }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="card shadow border-0 mb-5 border-start border-4 border-primary">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-primary">
          <span className="badge bg-primary me-2">Preview</span>
          Reviewing {data.length} records
        </h5>
        <div>
          <button className="btn btn-outline-danger btn-sm me-2" onClick={onCancel}>Cancel</button>
          <button className="btn btn-success btn-sm" onClick={onConfirm} disabled={uploading}>
            {uploading ? <><span className="spinner-border spinner-border-sm me-2"/>Uploading...</> : 'Confirm Upload'}
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="ps-4">Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Floor</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={idx}>
                  <td className="ps-4 fw-medium">{row.EmployeeName || "-"}</td>
                  <td>{row.Email || "-"}</td>
                  <td><span className="badge bg-light text-dark border">{row.Department}</span></td>
                  <td>{row.DefaultFloorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-top">
          <Pagination currentPage={page} totalItems={data.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}