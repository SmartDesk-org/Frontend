import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/slices/companySlice";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-4">Client Companies</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          Companies List
        </div>

        <div className="card-body">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && companies?.length === 0 && (
            <p>No companies found</p>
          )}

          {!loading && companies?.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Created On</th>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c) => (
                    <tr key={c.companyId}>
                      <td>{c.companyId}</td>
                      <td className="fw-semibold">{c.name}</td>
                      <td>{c.address}</td>
                      <td>
                        <span
                          className={`badge ${
                            c.isActive
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {c.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {c.modifiedAt
                          ? new Date(c.modifiedAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
