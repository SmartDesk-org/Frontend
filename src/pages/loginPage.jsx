// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="bg-white rounded shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="fs-3 fw-bold text-dark mb-4 text-center">Sign In</h2>
        <LoginForm />
      </div>
    </div>
  );
}
