// src/pages/Plans/PlansPage.jsx
import React from 'react';

export default function PlansPage() {
  const dummyPlans = [
    { id: 1, name: 'Basic', price: '$10/month', features: '5 desks, 1 admin' },
    { id: 2, name: 'Premium', price: '$50/month', features: '50 desks, 5 admins, reporting' },
    { id: 3, name: 'Enterprise', price: 'Custom', features: 'Unlimited desks, custom features' },
  ];

  return (
    <div>
      <h1 className="mb-4">Manage Plans</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Plans List
          <button className="btn btn-primary">Add New Plan</button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.id}</td>
                    <td>{plan.name}</td>
                    <td>{plan.price}</td>
                    <td>{plan.features}</td>
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