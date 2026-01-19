import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "./UI/Toast";
import { setAuthToken } from "../redux/authToken";
import {
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
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

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        const token = res.data?.accessToken || res.data;
        setAuthToken(token);
        toast.success("Authentication successful. Redirecting...");
        setTimeout(() => {
          if (res?.data?.role == 1) navigate("/super-admin");
          else if (res?.data?.role == 2) navigate("/company-admin");
          else if(res?.data?.role==3)navigate ("/employee")
          else navigate("/dashboard");
        }, 800);
      })
      .catch((err) => {
        toast.error(err?.message || "Invalid email or password.");
        console.error("Login Failed:", err);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* --- EMAIL INPUT --- */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs font-medium text-neutral-400 ml-1"
        >
          Email
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
            <Mail size={16} />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full h-11 bg-[#050505] border border-white/10 rounded-lg text-sm text-white pl-10 pr-4 placeholder-neutral-700 focus:border-white/30 focus:bg-white/[0.03] outline-none transition-all"
            placeholder="name@company.com"
          />
        </div>
      </div>

      {/* --- PASSWORD INPUT --- */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center ml-1">
          <label
            htmlFor="password"
            className="text-xs font-medium text-neutral-400"
          >
            Password
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs font-medium text-neutral-500 hover:text-white transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
            <Lock size={16} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full h-11 bg-[#050505] border border-white/10 rounded-lg text-sm text-white pl-10 pr-10 placeholder-neutral-700 focus:border-white/30 focus:bg-white/[0.03] outline-none transition-all"
            placeholder="Enter your password"
          />
          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors p-1"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      {/* --- ERROR MESSAGE --- */}
      {error && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <span className="text-xs text-red-200">{error}</span>
        </div>
      )}

      {/* --- SUBMIT BUTTON --- */}
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full h-11 mt-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
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

    </form>
  );
}