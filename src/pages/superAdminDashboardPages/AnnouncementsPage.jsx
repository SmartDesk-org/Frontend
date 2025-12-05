// src/pages/Announcements/AnnouncementsPage.jsx
import React from 'react';

export default function AnnouncementsPage() {
  const dummyAnnouncements = [
    { id: 1, title: 'System Maintenance', content: 'Scheduled maintenance on Nov 1st.', date: '2023-10-20' },
    { id: 2, title: 'New Feature Release', content: 'New reporting features are now live!', date: '2023-10-15' },
  ];

  return (
    <div>
      <h1 className="mb-4">Announcements</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          All Announcements
          <button className="btn btn-primary">Create New Announcement</button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyAnnouncements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>{announcement.id}</td>
                    <td>{announcement.title}</td>
                    <td>{announcement.content}</td>
                    <td>{announcement.date}</td>
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