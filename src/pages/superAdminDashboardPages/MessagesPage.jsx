// src/pages/Messages/MessagesPage.jsx
import React from 'react';

export default function MessagesPage() {
  const dummyMessages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Inquiry about plans', message: 'I am interested in your enterprise plan.', date: '2023-10-26' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Partnership opportunity', message: 'We would like to discuss a potential partnership.', date: '2023-10-25' },
  ];

  return (
    <div>
      <h1 className="mb-4">Contact Messages</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header">Messages from Landing Page</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.id}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td>{msg.message}</td>
                    <td>{msg.date}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2">View</button>
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