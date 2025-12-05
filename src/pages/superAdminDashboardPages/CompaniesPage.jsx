// src/pages/Companies/CompaniesPage.jsx
import React from 'react';

export default function CompaniesPage() {
  const dummyCompanies = [
    { id: 1, name: 'Acme Corp', status: 'Active', plan: 'Premium' },
    { id: 2, name: 'Globex Inc.', status: 'Inactive', plan: 'Basic' },
    { id: 3, name: 'Soylent Corp', status: 'Active', plan: 'Enterprise' },
  ];

  return (
    <div>
      <h1 className="mb-4">Client Companies</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Companies List
          <button className="btn btn-primary">Add New Company</button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyCompanies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>
                      <span
                        className={`badge bg-${company.status === 'Active' ? 'success' : 'danger'}`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td>{company.plan}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2">View</button>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}