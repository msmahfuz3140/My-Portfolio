"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  Mail,
  Inbox,
  User,
  Phone,
  MapPin,
  Clock,
  Trash2,
  CheckCheck,
  MessageSquare,
  LogOut,
  RefreshCw,
  Eye,
  X,
} from "lucide-react";
import type { ContactMessage } from "@/types/message";

type FilterType = "all" | "unread" | "read";

type AdminInboxPanelProps = {
  mode?: "modal" | "page";
  onClose?: () => void;
};

export default function AdminInboxPanel({ mode = "page", onClose }: AdminInboxPanelProps) {
  const [secret, setSecret] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    localStorage.removeItem("portfolio_admin_secret");
  }, []);

  const fetchMessages = useCallback(async (adminSecret: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setSecret("");
          setLoginError("Wrong password. Try again.");
        } else {
          setError(data.message || "Failed to load messages.");
        }
        return;
      }
      setMessages(data.messages);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-secret": inputSecret },
      });

      if (!res.ok) {
        setLoginError("Wrong password. Try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setSecret(inputSecret);
      setMessages(data.messages);
      setInputSecret("");
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSecret("");
    setMessages([]);
    setSelectedId(null);
    setInputSecret("");
    setLoginError("");
  };

  const markAsRead = async (id: string) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "x-admin-secret": secret },
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    }
  };

  const handleSelect = (msg: ContactMessage) => {
    setSelectedId(msg.id);
    if (!msg.read) markAsRead(msg.id);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": secret },
    });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const loginView = (
    <div className={mode === "modal" ? "p-6 md:p-8" : "flex items-center justify-center p-6 min-h-[60vh]"}>
      <div className={`w-full ${mode === "modal" ? "" : "max-w-md glass-card p-8 md:p-10 rounded-[32px]"}`}>
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="text-primary" size={28} />
          </div>
          <h2 className="font-h2 text-xl text-on-background font-bold">Admin Inbox</h2>
          <p className="text-muted text-sm mt-2">Enter your password to view messages</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="font-label-caps text-muted text-xs">PASSWORD</label>
            <input
              type="password"
              value={inputSecret}
              onChange={(e) => setInputSecret(e.target.value)}
              required
              placeholder="Enter admin password"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-background focus:border-primary outline-none transition-colors cursor-auto"
            />
          </div>

          {loginError && (
            <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="gradient-border-btn w-full py-3.5 rounded-xl font-h3 text-[15px] text-on-background flex items-center justify-center gap-2 disabled:opacity-50 cursor-auto"
          >
            {loading ? "Checking..." : "Unlock Inbox"}
            <Eye size={18} />
          </button>
        </form>
      </div>
    </div>
  );

  const inboxView = (
    <div className="flex flex-col h-full cursor-auto">
      <div className="flex items-center justify-between gap-3 p-4 md:p-5 border-b border-outline-variant shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Inbox className="text-primary" size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="font-h3 text-base text-on-background font-bold truncate">Message Inbox</h2>
            <p className="text-muted text-xs truncate">Only you can see these</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-caps">
              {unreadCount} new
            </span>
          )}
          <button
            onClick={() => fetchMessages(secret)}
            disabled={loading}
            className="p-2 rounded-lg glass-card hover:border-primary transition-colors text-muted hover:text-primary"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg glass-card text-muted hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
          {mode === "modal" && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg glass-card text-muted hover:text-on-background transition-colors"
              title="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex gap-2 mb-4 shrink-0 flex-wrap">
          {(["all", "unread", "read"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-label-caps transition-all ${
                filter === f
                  ? "bg-primary text-on-primary"
                  : "glass-card text-muted hover:text-on-background"
              }`}
            >
              {f === "all" ? `All (${messages.length})` : f === "unread" ? `Unread (${unreadCount})` : `Read (${messages.length - unreadCount})`}
            </button>
          ))}
        </div>

        {error && (
          <div className="glass-card p-3 rounded-xl text-red-400 text-sm mb-4 shrink-0">{error}</div>
        )}

        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-1 flex flex-col items-center justify-center">
            <MessageSquare className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-lg text-on-background mb-1">No messages yet</h3>
            <p className="text-muted text-sm">
              {filter === "all"
                ? "Contact form messages will appear here."
                : `No ${filter} messages.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
            <div className="space-y-2 overflow-y-auto pr-1 min-h-0 max-h-[280px] lg:max-h-none">
              {filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`w-full text-left glass-card p-4 rounded-xl transition-all hover:border-primary/50 ${
                    selectedId === msg.id ? "border-primary ring-1 ring-primary/30" : ""
                  } ${!msg.read ? "border-l-4 border-l-primary" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!msg.read ? "bg-primary/20 text-primary" : "bg-surface-container text-muted"}`}>
                        <User size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-h3 text-sm text-on-background truncate">{msg.name}</p>
                        <p className="text-muted text-[11px] truncate">{msg.email}</p>
                      </div>
                    </div>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-muted text-xs mt-2 line-clamp-2">{msg.message}</p>
                  <p className="text-muted/60 text-[10px] mt-1.5 flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(msg.createdAt)}
                  </p>
                </button>
              ))}
            </div>

            <div className="overflow-y-auto min-h-0 max-h-[320px] lg:max-h-none">
              {selected ? (
                <div className="glass-card rounded-2xl p-5 h-full">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div className="min-w-0">
                      <h3 className="font-h2 text-lg text-on-background font-bold truncate">{selected.name}</h3>
                      <p className="text-muted text-xs mt-0.5 flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(selected.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {selected.read && (
                        <span className="flex items-center gap-1 text-green-400 text-[10px]">
                          <CheckCheck size={12} /> Read
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(selected.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container text-sm">
                      <Mail className="text-blue-400 shrink-0" size={14} />
                      <span className="text-on-background truncate">{selected.email}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container text-sm">
                      <Phone className="text-green-400 shrink-0" size={14} />
                      <span className="text-on-background">{selected.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container text-sm">
                      <MapPin className="text-cyan-400 shrink-0" size={14} />
                      <span className="text-on-background">{selected.address}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container border border-outline-variant">
                    <p className="text-muted text-[10px] font-label-caps mb-2 flex items-center gap-1">
                      <MessageSquare size={12} />
                      MESSAGE
                    </p>
                    <p className="text-on-background text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
                  <Mail className="text-muted mb-3" size={36} />
                  <p className="text-muted text-sm">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <div className="flex flex-col h-full max-h-[85vh] overflow-hidden rounded-[24px]">
        {!secret ? loginView : inboxView}
      </div>
    );
  }

  if (!secret) {
    return (
      <div className="min-h-screen bg-background cursor-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-radial -z-10 opacity-30" />
        {loginView}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cursor-auto">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-radial -z-10 opacity-20" />
      <div className="max-w-5xl mx-auto glass-card my-8 rounded-[32px] overflow-hidden min-h-[70vh]">
        {inboxView}
      </div>
    </div>
  );
}
