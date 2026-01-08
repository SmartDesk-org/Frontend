// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🔵 SUBMIT LOGIN →", email);

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        const role = res?.data?.role;

        if (role === 1) {
          navigate("/super-admin");
        } else if (role === 2) {
          navigate("/company-admin");
        }
      })

      .catch((err) => {
        console.error("🔴 LOGIN FAILED:", err);
      });
  };

  const handleGoogleAuth = () => {
    alert("Google Auth Dummy Button Clicked");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {/* Email */}
      <div>
        <label htmlFor="email" className="form-label text-secondary mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="form-control"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="form-label text-secondary mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="form-control"
          placeholder="Your password"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-danger text-center" style={{ fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* Forgot Password */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="btn btn-link p-0 text-decoration-none text-primary"
          style={{ fontSize: "0.9rem" }}
        >
          Forgot Password?
        </button>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="d-flex align-items-center my-3">
        <hr className="flex-grow-1" />
        <span className="mx-2 text-muted">or</span>
        <hr className="flex-grow-1" />
      </div>

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "20px", width: "20px" }}
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.4H42V20H24v8h11.3c-1.2 3.3-4.4 5.7-8.3 5.7-5 0-9-4-9-9s4-9 9-9c2.3 0 4.4.9 6 2.3l5-5z"
          />
          <path
            fill="#FF3D00"
            d="M24 44c5.7 0 10.5-1.9 14-5.1l-6.7-5.5c-1.8 1.2-4.1 1.9-7.3 1.9-5.6 0-10.4-3.7-12.1-8.8l-6.9 5.3C8.7 39.7 15.8 44 24 44z"
          />
          <path
            fill="#4CAF50"
            d="M12 27.6c-1-.6-1.8-1.5-2.4-2.5l-6.9 5.3C5.7 33.9 9.5 37 14 38.3l6.7-5.5c-.3-.2-.6-.3-1-.5-2-.9-4.3-1.7-7.7-5.1z"
          />
          <path
            fill="#1976D2"
            d="M24 14c3.1 0 5.7 1 7.7 2.7l5.7-5.7C34.7 7.9 29.7 6 24 6 15.8 6 8.7 10.3 5 17.3l6.9 5.3c1.5-5.1 6.4-8.6 12.1-8.6z"
          />
        </svg>
        Sign in with Google
      </button>
    </form>
  );
}
