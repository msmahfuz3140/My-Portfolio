"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // Simulate subscription - in production, integrate with an email service
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 sm:py-section-padding px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-10 md:p-12 rounded-[32px]">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Mail className="text-primary" size={28} />
          </div>
          <h2 className="font-h2 text-3xl md:text-4xl text-on-background font-bold mb-3">
            Stay Updated
          </h2>
          <p className="text-muted text-sm mb-8 max-w-md mx-auto">
            Get notified about new projects, blog posts, and web development tips I share.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
              <CheckCircle2 size={18} />
              <span>Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-background focus:border-primary outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="gradient-border-btn px-6 py-3 rounded-xl text-sm font-bold text-on-background flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}