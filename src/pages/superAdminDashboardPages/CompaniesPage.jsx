import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/slices/companySlice";
import SubscriptionHistoryModal from "./SubscriptionHistoryModal";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies, loadingCompanies, error } = useSelector(
    (state) => state.company
  );

  const [selectedCompany, setSelectedCompany] = useState(null);

  // 🔹 ADDED
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // 🔹 ADDED (derived data, no logic changed)
  const filteredCompanies = companies?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div>
      <h1 className="mb-4">Client Companies</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Companies List</span>

          {/* 🔹 ADDED */}
          <input
            type="text"
            className="form-control form-control-sm w-25"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="card-body">
          {loadingCompanies && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loadingCompanies && filteredCompanies?.length === 0 && (
            <p>No companies found</p>
          )}

          {!loadingCompanies && filteredCompanies?.length > 0 && (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((c) => (
                    <tr key={c.companyId}>
                      <td>{c.companyId}</td>
                      <td className="fw-semibold">{c.name}</td>
                      <td>{c.address}</td>
                      <td>
                        <span
                          className={`badge ${
                            c.isActive ? "bg-success" : "bg-secondary"
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
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedCompany(c)}
                        >
                          View Subscriptions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedCompany && (
        <SubscriptionHistoryModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
