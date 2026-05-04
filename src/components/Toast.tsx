"use client";

import { useState, useEffect } from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-400" size={20} />;
      case "error":
        return <AlertCircle className="text-red-400" size={20} />;
      default:
        return <CheckCircle className="text-blue-400" size={20} />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-400/50";
      case "error":
        return "border-red-400/50";
      default:
        return "border-blue-400/50";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`glass-card p-4 rounded-2xl border ${getBorderColor()} min-w-[300px] max-w-[400px] backdrop-blur-lg`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-on-background text-sm font-medium">
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-muted hover:text-on-background transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
