import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email Input */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs font-medium text-neutral-400 uppercase tracking-wider ml-1"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
            <Mail size={18} strokeWidth={1.5} />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-lg py-3 pl-10 pr-4 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="name@company.com"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center ml-1">
          <label
            htmlFor="password"
            className="text-xs font-medium text-neutral-400 uppercase tracking-wider"
          >
            Password
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Forgot?
          </button>
        </div>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
            <Lock size={18} strokeWidth={1.5} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full bg-[#111] border border-white/10 text-white text-sm rounded-lg py-3 pl-10 pr-10 placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="Enter your password"
          />
          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="group w-full py-3 px-4 bg-white text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-xs text-neutral-500 uppercase tracking-widest">
          Or continue with
        </span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span>Google</span>
      </button>
    </form>
  );
}
