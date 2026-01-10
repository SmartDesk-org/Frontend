import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

/* ================= TOAST MANAGER ================= */
class ToastManager {
  listeners = [];

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(event) {
    this.listeners.forEach((l) => l(event));
  }

  success(message) {
    this.notify({ id: Date.now(), message, type: "success" });
  }
  error(message) {
    this.notify({ id: Date.now(), message, type: "error" });
  }
  info(message) {
    this.notify({ id: Date.now(), message, type: "info" });
  }
}

export const toast = new ToastManager();

/* ================= TOASTER ================= */
export const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((newToast) => {
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => removeToast(newToast.id), 3500);
    });

    return unsubscribe;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
  }, []);

  const theme = {
    success: {
      icon: <CheckCircle2 size={14} />,
      iconBg: "bg-green-500/10 text-green-500",
      border: "border-green-500/20",
      progress: "bg-green-500",
      title: "Success",
    },
    error: {
      icon: <AlertCircle size={14} />,
      iconBg: "bg-red-500/10 text-red-500",
      border: "border-red-500/20",
      progress: "bg-red-500",
      title: "Error",
    },
    info: {
      icon: <Info size={14} />,
      iconBg: "bg-blue-500/10 text-blue-500",
      border: "border-blue-500/20",
      progress: "bg-blue-500",
      title: "Info",
    },
  }[type];

  return (
    <div
      className={`
    pointer-events-auto relative w-[280px] flex items-center gap-2
    px-2 py-1.5 rounded-md border bg-[#0B0B0B]/90 backdrop-blur-md
    transition-all duration-250 ease-out
    ${theme.border}
    ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
  `}
    >
      {/* Icon */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${theme.iconBg}`}
      >
        {theme.icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-xs font-medium text-white leading-tight">
          {theme.title}
        </p>
        <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
          {message}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={() => {
          setShow(false);
          setTimeout(onClose, 200);
        }}
        className="text-neutral-500 hover:text-white transition"
      >
        <X size={12} />
      </button>

      {/* Progress */}
      <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-white/5 overflow-hidden rounded-b-lg">
        <div
          className={`h-full ${theme.progress}`}
          style={{ animation: "toast-progress 3.5s linear forwards" }}
        />
      </div>
    </div>
  );
};
