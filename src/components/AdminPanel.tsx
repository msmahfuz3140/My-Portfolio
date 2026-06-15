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
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  ChevronRight,
  Database,
  ShieldCheck,
  Plus,
  Edit,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import type { ContactMessage } from "@/types/message";
import type { Project } from "@/data/projects";
import type { BlogPost } from "@/data/blog";

type FilterType = "all" | "unread" | "read";
type TabType = "overview" | "inbox" | "projects" | "blog";

type AdminPanelProps = {
  mode?: "modal" | "page";
  onClose?: () => void;
};

export default function AdminPanel({ mode = "page", onClose }: AdminPanelProps) {
  const [secret, setSecret] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Projects CRUD state
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Project Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formTimeline, setFormTimeline] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formLiveUrl, setFormLiveUrl] = useState("");
  const [formGithubUrl, setFormGithubUrl] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFullDescription, setFormFullDescription] = useState("");
  const [formProblem, setFormProblem] = useState("");
  const [formSolution, setFormSolution] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formTechStack, setFormTechStack] = useState("");
  const [formMyRole, setFormMyRole] = useState("");
  const [formResults, setFormResults] = useState("");
  const [formChallenges, setFormChallenges] = useState("");
  const [formImprovements, setFormImprovements] = useState("");

  // Blogs CRUD state
  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);

  // Blog Form Fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

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

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (res.ok && data.success) {
        setProjectsList(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogsList(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
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
      fetchProjects();
      fetchBlogs();
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
    setProjectsList([]);
    setBlogsList([]);
    setSelectedId(null);
    setInputSecret("");
    setLoginError("");
    setActiveTab("overview");
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

  // Projects Form handlers
  const openProjectForm = (project?: Project) => {
    setError("");
    if (project) {
      setCurrentProject(project);
      setFormTitle(project.title);
      setFormCategory(project.category);
      setFormTimeline(project.timeline);
      setFormImage(project.image);
      setFormLiveUrl(project.liveUrl || "");
      setFormGithubUrl(project.githubUrl || "");
      setFormDescription(project.description || "");
      setFormFullDescription(project.fullDescription || "");
      setFormProblem(project.problem || "");
      setFormSolution(project.solution || "");
      setFormTags(project.tags ? project.tags.join(", ") : "");
      setFormTechStack(project.techStack ? project.techStack.join(", ") : "");
      setFormMyRole(project.myRole ? project.myRole.join("\n") : "");
      setFormResults(project.results ? project.results.join("\n") : "");
      setFormChallenges(project.challenges ? project.challenges.join("\n") : "");
      setFormImprovements(project.improvements ? project.improvements.join("\n") : "");
    } else {
      setCurrentProject(null);
      setFormTitle("");
      setFormCategory("");
      setFormTimeline("");
      setFormImage("/images/tutor-finder.png"); // Default path
      setFormLiveUrl("");
      setFormGithubUrl("");
      setFormDescription("");
      setFormFullDescription("");
      setFormProblem("");
      setFormSolution("");
      setFormTags("");
      setFormTechStack("");
      setFormMyRole("");
      setFormResults("");
      setFormChallenges("");
      setFormImprovements("");
    }
    setProjectFormOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const projectPayload = {
      title: formTitle,
      category: formCategory,
      timeline: formTimeline,
      image: formImage,
      liveUrl: formLiveUrl,
      githubUrl: formGithubUrl,
      description: formDescription,
      fullDescription: formFullDescription,
      problem: formProblem,
      solution: formSolution,
      tags: formTags.split(",").map((t) => t.trim()).filter(Boolean),
      techStack: formTechStack.split(",").map((t) => t.trim()).filter(Boolean),
      myRole: formMyRole.split("\n").map((r) => r.trim()).filter(Boolean),
      results: formResults.split("\n").map((r) => r.trim()).filter(Boolean),
      challenges: formChallenges.split("\n").map((c) => c.trim()).filter(Boolean),
      improvements: formImprovements.split("\n").map((i) => i.trim()).filter(Boolean),
    };

    try {
      const url = currentProject ? `/api/projects/${currentProject.id}` : "/api/projects";
      const method = currentProject ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(projectPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save project.");
      } else {
        fetchProjects();
        setProjectFormOpen(false);
        setCurrentProject(null);
      }
    } catch {
      setError("Network error. Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": secret,
        },
      });
      if (res.ok) {
        fetchProjects();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete project.");
      }
    } catch {
      setError("Network error. Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  // Blogs Form handlers
  const openBlogForm = (blog?: BlogPost) => {
    setError("");
    if (blog) {
      setCurrentBlog(blog);
      setBlogTitle(blog.title);
      setBlogExcerpt(blog.excerpt);
      setBlogCategory(blog.category);
      setBlogReadTime(blog.readTime);
      setBlogTags(blog.tags ? blog.tags.join(", ") : "");
      setBlogUrl(blog.url);
    } else {
      setCurrentBlog(null);
      setBlogTitle("");
      setBlogExcerpt("");
      setBlogCategory("");
      setBlogReadTime("");
      setBlogTags("");
      setBlogUrl("https://dev.to");
    }
    setBlogFormOpen(true);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const blogPayload = {
      title: blogTitle,
      excerpt: blogExcerpt,
      category: blogCategory,
      readTime: blogReadTime,
      tags: blogTags.split(",").map((t) => t.trim()).filter(Boolean),
      url: blogUrl,
    };

    try {
      const url = currentBlog ? `/api/blogs/${currentBlog.id}` : "/api/blogs";
      const method = currentBlog ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(blogPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save blog post.");
      } else {
        fetchBlogs();
        setBlogFormOpen(false);
        setCurrentBlog(null);
      }
    } catch {
      setError("Network error. Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": secret,
        },
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete blog post.");
      }
    } catch {
      setError("Network error. Failed to delete blog post.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const selectedMessage = messages.find((m) => m.id === selectedId) ?? null;
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
          <h2 className="font-h2 text-xl text-on-background font-bold">Admin Console</h2>
          <p className="text-muted text-sm mt-2">Enter your password to unlock the admin dashboard</p>
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
            {loading ? "Checking..." : "Unlock Dashboard"}
            <Eye size={18} />
          </button>
        </form>
      </div>
    </div>
  );

  // TAB CONTENT: Overview Dashboard
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-h2 text-xl text-on-background font-bold">Welcome back, Mahfuz!</h3>
        <p className="text-muted text-sm mt-1">Here is a quick overview of your portfolio activity.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Inbox size={20} />
          </div>
          <div>
            <p className="text-muted text-xs font-label-caps">Total Messages</p>
            <h4 className="text-xl font-bold text-on-background mt-0.5">{messages.length}</h4>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="text-muted text-xs font-label-caps">Unread Messages</p>
            <h4 className="text-xl font-bold text-on-background mt-0.5">{unreadCount}</h4>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
            <Database size={20} />
          </div>
          <div>
            <p className="text-muted text-xs font-label-caps">Database Link</p>
            <h4 className="text-sm font-bold text-on-background mt-1 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-green-400" />
              Connected
            </h4>
          </div>
        </div>
      </div>

      {/* Quick Actions & Dashboard Navigation */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="font-h3 text-base text-on-background font-bold mb-4">Quick Management Actions</h4>
        <div className="space-y-3">
          <button
            onClick={() => setActiveTab("inbox")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Go to Messages Inbox</p>
                <p className="text-muted text-xs mt-0.5">Read, reply, or delete messages sent via your contact form.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
              <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab("projects");
              fetchProjects();
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Briefcase size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Project Manager</p>
                <p className="text-muted text-xs mt-0.5">Manage your dynamically loaded projects: add new ones, update contents, or delete them.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              setActiveTab("blog");
              fetchBlogs();
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Blog Post Manager</p>
                <p className="text-muted text-xs mt-0.5">Write and manage your blog articles: edit details, categories, tags, or delete posts.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  // TAB CONTENT: Inbox Messages
  const renderInboxTab = () => (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden">
      <div className="flex gap-2 mb-4 shrink-0 flex-wrap">
        {(["all", "unread", "read"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-label-caps transition-all ${
              filter === f ? "bg-primary text-on-primary" : "glass-card text-muted hover:text-on-background"
            }`}
          >
            {f === "all"
              ? `All (${messages.length})`
              : f === "unread"
              ? `Unread (${unreadCount})`
              : `Read (${messages.length - unreadCount})`}
          </button>
        ))}
      </div>

      {filteredMessages.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center flex-1 flex flex-col items-center justify-center">
          <MessageSquare className="text-muted mb-3" size={40} />
          <h3 className="font-h3 text-lg text-on-background mb-1">No messages yet</h3>
          <p className="text-muted text-sm">
            {filter === "all" ? "Contact form messages will appear here." : `No ${filter} messages.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden h-full">
          {/* List column */}
          <div className="lg:col-span-5 space-y-2 overflow-y-auto pr-1 min-h-0 max-h-[300px] lg:max-h-none h-full">
            {filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left glass-card p-4 rounded-xl transition-all hover:border-primary/50 ${
                  selectedId === msg.id ? "border-primary ring-1 ring-primary/30" : ""
                } ${!msg.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        !msg.read ? "bg-primary/20 text-primary" : "bg-surface-container text-muted"
                      }`}
                    >
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

          {/* Details column */}
          <div className="lg:col-span-7 overflow-y-auto min-h-0 max-h-[350px] lg:max-h-none h-full">
            {selectedMessage ? (
              <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                  <div className="min-w-0">
                    <h3 className="font-h2 text-lg text-on-background font-bold truncate">{selectedMessage.name}</h3>
                    <p className="text-muted text-xs mt-0.5 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {selectedMessage.read && (
                      <span className="flex items-center gap-1 text-green-400 text-[10px] mr-1">
                        <CheckCheck size={12} /> Read
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4 shrink-0">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container text-xs">
                    <Mail className="text-blue-400 shrink-0" size={14} />
                    <span className="text-on-background truncate">{selectedMessage.email}</span>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container text-xs">
                      <Phone className="text-green-400 shrink-0" size={14} />
                      <span className="text-on-background">{selectedMessage.phone}</span>
                    </div>
                  )}
                  {selectedMessage.address && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container text-xs">
                      <MapPin className="text-cyan-400 shrink-0" size={14} />
                      <span className="text-on-background truncate">{selectedMessage.address}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant flex-1 overflow-y-auto">
                  <p className="text-muted text-[10px] font-label-caps mb-2 flex items-center gap-1">
                    <MessageSquare size={12} />
                    MESSAGE
                  </p>
                  <p className="text-on-background text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
                <Mail className="text-muted mb-3" size={36} />
                <p className="text-muted text-sm">Select a message from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // TAB CONTENT: Projects Console (Dynamic CRUD)
  const renderProjectsTab = () => {
    if (projectFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => setProjectFormOpen(false)}
              className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors"
            >
              <ChevronLeft size={16} /> Back to Projects List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentProject ? `Edit: ${currentProject.title}` : "Create New Project"}
            </h3>
          </div>

          <form onSubmit={handleProjectSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Tutor Finder"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Category *</label>
                <input
                  type="text"
                  required
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="e.g. Full Stack Marketplace"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Timeline */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Timeline *</label>
                <input
                  type="text"
                  required
                  value={formTimeline}
                  onChange={(e) => setFormTimeline(e.target.value)}
                  placeholder="e.g. 8 Weeks"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Image Path */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Image URL/Path *</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="e.g. /images/tutor-finder.png"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Live URL */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Live URL</label>
                <input
                  type="url"
                  value={formLiveUrl}
                  onChange={(e) => setFormLiveUrl(e.target.value)}
                  placeholder="https://live-site.com"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* GitHub URL */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">GitHub URL *</label>
                <input
                  type="url"
                  required
                  value={formGithubUrl}
                  onChange={(e) => setFormGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Brief Description * (Shows on cards)</label>
              <textarea
                required
                rows={2}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="A brief 1-2 sentence description of the project..."
                className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Full Description * (Shows on details page)</label>
              <textarea
                required
                rows={4}
                value={formFullDescription}
                onChange={(e) => setFormFullDescription(e.target.value)}
                placeholder="A detailed explanation of the project's features and scope..."
                className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Problem */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">The Problem *</label>
                <textarea
                  required
                  rows={3}
                  value={formProblem}
                  onChange={(e) => setFormProblem(e.target.value)}
                  placeholder="What issue does this project solve?"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>

              {/* Solution */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">The Solution *</label>
                <textarea
                  required
                  rows={3}
                  value={formSolution}
                  onChange={(e) => setFormSolution(e.target.value)}
                  placeholder="How did you solve the problem?"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tags */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tags (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Next.js, TypeScript, Full Stack"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Tech Stack */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tech Stack list (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  placeholder="e.g. Next.js, Node.js, Express, MongoDB"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* My Role */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">My Role list (One item per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={formMyRole}
                  onChange={(e) => setFormMyRole(e.target.value)}
                  placeholder="Designed the database schema&#10;Built authentication flows&#10;Handled responsive styles"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>

              {/* Key Results */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Key Results list (One item per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={formResults}
                  onChange={(e) => setFormResults(e.target.value)}
                  placeholder="Role-based access implemented&#10;Reduced query latencies by 30%&#10;100% responsive layout"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Challenges */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Challenges list (One item per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={formChallenges}
                  onChange={(e) => setFormChallenges(e.target.value)}
                  placeholder="Handling token verification&#10;Syncing MongoDB states"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>

              {/* Improvements */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Future Improvements list (One item per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={formImprovements}
                  onChange={(e) => setFormImprovements(e.target.value)}
                  placeholder="Add scheduling calendar&#10;Integrate payment gateways"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button
                type="button"
                onClick={() => setProjectFormOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Project Manager</h3>
            <p className="text-muted text-sm mt-1">Manage the dynamic list of featured projects shown on your site.</p>
          </div>
          <button
            onClick={() => openProjectForm()}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0"
          >
            <Plus size={15} /> Add New Project
          </button>
        </div>

        {projectsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Briefcase className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No projects loaded</h3>
            <p className="text-muted text-xs">Dynamic projects list is empty. Click Refresh or Add New Project.</p>
            <button
              onClick={fetchProjects}
              className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors"
            >
              <RefreshCw size={12} /> Refresh List
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container/30 font-label-caps text-[10px] text-muted">
                    <th className="p-4 pl-6">Preview</th>
                    <th className="p-4">Title & Category</th>
                    <th className="p-4">Timeline</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {projectsList.map((project) => (
                    <tr key={project.id} className="hover:bg-surface-container/10 transition-colors text-sm">
                      <td className="p-4 pl-6 shrink-0">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-outline-variant">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-on-background">{project.title}</p>
                        <p className="text-muted text-xs mt-0.5">{project.category}</p>
                      </td>
                      <td className="p-4 text-muted text-xs">{project.timeline}</td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openProjectForm(project)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                            title="Edit Project"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleProjectDelete(project.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // TAB CONTENT: Blog Console (Dynamic CRUD)
  const renderBlogTab = () => {
    if (blogFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => setBlogFormOpen(false)}
              className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors"
            >
              <ChevronLeft size={16} /> Back to Blogs List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentBlog ? `Edit: ${currentBlog.title}` : "Write New Blog Post"}
            </h3>
          </div>

          <form onSubmit={handleBlogSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Blog Title *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. Next.js Performance Optimization"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Category *</label>
                <input
                  type="text"
                  required
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  placeholder="e.g. Tutorial, Career, Frontend"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Read Time */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Read Time *</label>
                <input
                  type="text"
                  required
                  value={blogReadTime}
                  onChange={(e) => setBlogReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tags (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={blogTags}
                  onChange={(e) => setBlogTags(e.target.value)}
                  placeholder="e.g. Next.js, SEO, Performance"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Excerpt / Summary *</label>
              <textarea
                required
                rows={3}
                value={blogExcerpt}
                onChange={(e) => setBlogExcerpt(e.target.value)}
                placeholder="A compelling brief excerpt summarizing the blog post contents..."
                className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y"
              />
            </div>

            {/* URL */}
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Article Link URL * (e.g. Dev.to, Medium, Hashnode link)</label>
              <input
                type="url"
                required
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="https://dev.to/username/article-title"
                className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button
                type="button"
                onClick={() => setBlogFormOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Blog Post"}
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Blog Post Manager</h3>
            <p className="text-muted text-sm mt-1">Manage technical articles and blog posts linked on your portfolio.</p>
          </div>
          <button
            onClick={() => openBlogForm()}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0"
          >
            <Plus size={15} /> Write New Post
          </button>
        </div>

        {blogsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <FileText className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No articles loaded</h3>
            <p className="text-muted text-xs">Dynamic blogs list is empty. Click Refresh or Write New Post.</p>
            <button
              onClick={fetchBlogs}
              className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors"
            >
              <RefreshCw size={12} /> Refresh List
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container/30 font-label-caps text-[10px] text-muted">
                    <th className="p-4 pl-6">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Read Time</th>
                    <th className="p-4">Published Date</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {blogsList.map((blog) => (
                    <tr key={blog.id} className="hover:bg-surface-container/10 transition-colors text-sm">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-on-background line-clamp-1">{blog.title}</p>
                        <p className="text-muted/70 text-[10px] mt-0.5 truncate max-w-sm">{blog.url}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-400 font-label-caps">
                          {blog.category}
                        </span>
                      </td>
                      <td className="p-4 text-muted text-xs">{blog.readTime}</td>
                      <td className="p-4 text-muted text-xs">{blog.date}</td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBlogForm(blog)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                            title="Edit Post"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleBlogDelete(blog.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main UI render once unlocked
  const dashboardView = (
    <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:h-[650px] overflow-hidden cursor-auto">
      {/* Sidebar - Navigation panel */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-outline-variant shrink-0 bg-surface-container/20 flex flex-col p-4 gap-4 justify-between">
        <div className="space-y-4">
          {/* Brand/Context */}
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <LayoutDashboard className="text-primary" size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-h3 text-sm text-on-background font-bold truncate">Admin Panel</h2>
              <p className="text-muted text-[10px] truncate">Mahfuz's Console</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible py-1 lg:py-0 gap-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${
                activeTab === "overview"
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-on-background hover:bg-surface-container/55"
              }`}
            >
              <LayoutDashboard size={15} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("inbox")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${
                activeTab === "inbox"
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-on-background hover:bg-surface-container/55"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox size={15} />
                Inbox
              </div>
              {unreadCount > 0 && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === "inbox" ? "bg-on-primary text-primary" : "bg-primary text-on-primary"
                  }`}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("projects");
                fetchProjects();
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${
                activeTab === "projects"
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-on-background hover:bg-surface-container/55"
              }`}
            >
              <Briefcase size={15} />
              Projects
            </button>
            <button
              onClick={() => {
                setActiveTab("blog");
                fetchBlogs();
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${
                activeTab === "blog"
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-on-background hover:bg-surface-container/55"
              }`}
            >
              <FileText size={15} />
              Blog
            </button>
          </nav>
        </div>

        {/* Panel Footer actions */}
        <div className="flex items-center justify-between border-t border-outline-variant/50 pt-4 mt-2 lg:mt-0 flex-wrap lg:flex-nowrap gap-2">
          <button
            onClick={() => {
              fetchMessages(secret);
              fetchProjects();
              fetchBlogs();
            }}
            disabled={loading}
            className="p-2 rounded-lg glass-card hover:border-primary transition-colors text-muted hover:text-primary"
            title="Refresh statistics & lists"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-muted hover:text-red-400 transition-colors text-[10px] font-label-caps"
              title="Logout"
            >
              <LogOut size={12} />
              Sign Out
            </button>
            {mode === "modal" && onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg glass-card text-muted hover:text-on-background transition-colors"
                title="Close"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content viewport */}
      <div className="flex-1 flex flex-col p-5 md:p-6 overflow-hidden min-h-0 bg-surface-container/10">
        {error && <div className="glass-card p-3 rounded-xl text-red-400 text-sm mb-4 shrink-0">{error}</div>}

        <div className="flex-1 overflow-y-auto min-h-0 h-full">
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "inbox" && renderInboxTab()}
          {activeTab === "projects" && renderProjectsTab()}
          {activeTab === "blog" && renderBlogTab()}
        </div>
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <div className="flex flex-col h-full max-h-[85vh] overflow-hidden rounded-[24px]">
        {!secret ? loginView : dashboardView}
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
      <div className="max-w-6xl mx-auto glass-card my-8 rounded-[32px] overflow-hidden min-h-[70vh]">
        {dashboardView}
      </div>
    </div>
  );
}
