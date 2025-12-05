// src/components/Navbar.jsx
import React from 'react';
import SignInButton from './SignInButton';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-dark" href="#home">
          Smart Desk System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link text-dark" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#pricing">
                Price Plans
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#case-studies">
                Case Studies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#book-demo">
                Book Demo
              </a>
            </li>
          </ul>
           <SignInButton />
           
        </div>
      </div>
    </nav>
  );
}