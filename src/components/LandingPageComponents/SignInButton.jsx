// src/components/SignInButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/login')}
      // onClick={() => navigate('/superAdminDashBoard')}
      className="btn btn-primary px-4 py-2"
    >
      Sign In
    </button>
  );
}
