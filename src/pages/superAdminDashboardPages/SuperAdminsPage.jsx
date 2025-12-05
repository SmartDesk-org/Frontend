// src/pages/SuperAdmins/SuperAdminsPage.jsx
import React from 'react';

export default function SuperAdminsPage() {
  const dummySuperAdmins = [
    { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Primary' },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Secondary' },
  ];

  return (
    <div>
      <h1 className="mb-4">Manage Super Admins</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Super Admins List
          <button className="btn btn-primary">Add New Super Admin</button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummySuperAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
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