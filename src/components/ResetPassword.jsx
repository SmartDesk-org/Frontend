import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../redux/api/axiosClient";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axiosClient.post("/Auth/reset-password", {
        token,
        newPassword,
      });

      setSuccess(res.data.message);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3 p-4 shadow rounded bg-white"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h4 className="text-center">Reset Password</h4>

        <input
          type="password"
          className="form-control"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-danger mb-0">{error}</p>}
        {success && <p className="text-success mb-0">{success}</p>}

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
