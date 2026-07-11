"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Search, 
  Terminal, 
  User, 
  Code, 
  BookOpen, 
  Award, 
  Phone, 
  Sun, 
  Moon, 
  FileText, 
  Briefcase,
  Layers,
  FolderOpen,
  ArrowRight,
  Sparkles,
  Clock,
  Bot,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "navigation" | "project" | "blog" | "action";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load recent commands from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cmd_recent");
      if (stored) setRecentIds(JSON.parse(stored));
    } catch {}
  }, []);

  const pushRecent = (id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((r) => r !== id)].slice(0, 5);
      try { localStorage.setItem("cmd_recent", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Toggle Command Palette visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Navigate to standard sections or paths
  const handleNavigate = (id: string, path: string, isAnchor = true) => {
    pushRecent(id);
    setIsOpen(false);
    if (isAnchor) {
      router.push(path);
      const anchor = path.replace("/#", "");
      const element = document.getElementById(anchor);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  const staticCommands = useMemo<CommandItem[]>(() => [
    // Navigation
    { id: "nav-home", title: "Go to Home", subtitle: "Main hero section", category: "navigation", icon: <Sparkles size={16} />, action: () => handleNavigate("nav-home", "/#hero") },
    { id: "nav-about", title: "Go to About", subtitle: "Biography and summary", category: "navigation", icon: <User size={16} />, action: () => handleNavigate("nav-about", "/#about") },
    { id: "nav-skills", title: "Go to Technologies", subtitle: "My technical skill set", category: "navigation", icon: <Code size={16} />, action: () => handleNavigate("nav-skills", "/#skills") },
    { id: "nav-projects", title: "Go to Featured Projects", subtitle: "Case studies & work", category: "navigation", icon: <FolderOpen size={16} />, action: () => handleNavigate("nav-projects", "/#projects") },
    { id: "nav-services", title: "Go to Services", subtitle: "Web development services", category: "navigation", icon: <Layers size={16} />, action: () => handleNavigate("nav-services", "/#services") },
    { id: "nav-github-sec", title: "Go to GitHub Activity", subtitle: "Open-source commits & repos", category: "navigation", icon: <FaGithub size={16} />, action: () => handleNavigate("nav-github-sec", "/#github") },
    { id: "nav-blog", title: "Go to Blog & Articles", subtitle: "Technical guides & thoughts", category: "navigation", icon: <BookOpen size={16} />, action: () => handleNavigate("nav-blog", "/#blog") },
    { id: "nav-achievements", title: "Go to Achievements", subtitle: "Certifications & milestones", category: "navigation", icon: <Award size={16} />, action: () => handleNavigate("nav-achievements", "/#achievements") },
    { id: "nav-contact", title: "Go to Contact Me", subtitle: "Get in touch for projects", category: "navigation", icon: <Phone size={16} />, action: () => handleNavigate("nav-contact", "/#contact") },
    
    // Actions
    { 
      id: "action-theme", 
      title: `Switch Theme to ${theme === "dark" ? "Light" : "Dark"} Mode`, 
      subtitle: "Change color mode", 
      category: "action", 
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />, 
      action: () => {
        pushRecent("action-theme");
        setTheme(theme === "dark" ? "light" : "dark");
        setIsOpen(false);
      } 
    },
    { 
      id: "action-resume", 
      title: "Download Resume / CV", 
      subtitle: "PDF document of experiences", 
      category: "action", 
      icon: <FileText size={16} />, 
      action: () => {
        pushRecent("action-resume");
        window.open("/resume.pdf", "_blank");
        setIsOpen(false);
      } 
    },
    { 
      id: "action-github", 
      title: "View GitHub Profile", 
      subtitle: "@msmahfuz3140 on GitHub", 
      category: "action", 
      icon: <FaGithub size={16} />, 
      action: () => {
        pushRecent("action-github");
        window.open("https://github.com/msmahfuz3140", "_blank");
        setIsOpen(false);
      } 
    },
    { 
      id: "action-linkedin", 
      title: "View LinkedIn Profile", 
      subtitle: "Connect on LinkedIn", 
      category: "action", 
      icon: <FaLinkedin size={16} />, 
      action: () => {
        pushRecent("action-linkedin");
        window.open("https://www.linkedin.com/in/msmahfuz3140", "_blank");
        setIsOpen(false);
      } 
    },
    {
      id: "action-ai-chat",
      title: "AI Assistant (Coming Soon)",
      subtitle: "Ask anything about Mahfuz",
      category: "action",
      icon: <Bot size={16} />,
      action: () => setIsOpen(false),
    },
  ], [theme, setTheme]);

  // Combine static and dynamic data (projects/blogs)
  const allItems = useMemo<CommandItem[]>(() => {
    const projectItems = projects.map<CommandItem>((p) => ({
      id: `project-${p.id}`,
      title: `Project: ${p.title}`,
      subtitle: p.description,
      category: "project",
      icon: <Briefcase size={16} className="text-primary" />,
      action: () => handleNavigate(`/projects/${p.id}`, false)
    }));

    const blogItems = blogPosts.map<CommandItem>((b) => ({
      id: `blog-${b.id}`,
      title: `Blog: ${b.title}`,
      subtitle: b.excerpt,
      category: "blog",
      icon: <BookOpen size={16} className="text-secondary" />,
      action: () => handleNavigate(`/blog/${b.id}`, false)
    }));

    return [...staticCommands, ...projectItems, ...blogItems];
  }, [staticCommands]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems;
    const query = search.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query))
    );
  }, [search, allItems]);

  // Handle keyboard events inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Autoscroll to active selected item
  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const activeItem = listElement.querySelector(`[data-index="${selectedIndex}"]`);
    if (!activeItem) return;

    const listRect = listElement.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    if (itemRect.bottom > listRect.bottom) {
      listElement.scrollTop += itemRect.bottom - listRect.bottom;
    } else if (itemRect.top < listRect.top) {
      listElement.scrollTop -= listRect.top - itemRect.top;
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating Keyboard Trigger Badge on bottom left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[99] glass-card px-4 py-3 rounded-full flex items-center gap-2 shadow-lg border border-outline-variant/60 text-muted hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 group text-xs font-semibold cursor-pointer"
        aria-label="Open Command Palette"
      >
        <Terminal size={14} className="group-hover:animate-pulse" />
        <span className="font-label-caps">Menu</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-outline-variant bg-surface-container text-[10px] font-mono leading-none">
          ctrl
        </kbd>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-outline-variant bg-surface-container text-[10px] font-mono leading-none">
          K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-surface-container/95 border border-outline-variant rounded-2xl shadow-2xl overflow-hidden glass-card flex flex-col"
              onKeyDown={handleKeyDown}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-outline-variant/50">
                <Search size={18} className="text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent text-sm text-on-background placeholder-muted outline-none border-none font-sans"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 rounded bg-muted/20 hover:bg-muted/40 transition-colors text-[10px] font-label-caps uppercase text-muted tracking-wider"
                >
                  ESC
                </button>
              </div>

              {/* Items List Container */}
              <div
                ref={listRef}
                className="max-h-[380px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-outline-variant"
              >
                {filteredItems.length > 0 ? (
                  // Group items by category to make it clean
                  ["navigation", "project", "blog", "action"].map((categoryGroup) => {
                    const groupItems = filteredItems.filter((i) => i.category === categoryGroup);
                    if (groupItems.length === 0) return null;

                    return (
                      <div key={categoryGroup} className="space-y-1">
                        <p className="px-3 pt-3 pb-1 text-[10px] font-label-caps tracking-widest text-primary/60 uppercase">
                          {categoryGroup === "navigation" && "Quick Navigation"}
                          {categoryGroup === "project" && "Projects"}
                          {categoryGroup === "blog" && "Articles"}
                          {categoryGroup === "action" && "Actions"}
                        </p>
                        {groupItems.map((item) => {
                          const globalIndex = filteredItems.findIndex((fi) => fi.id === item.id);
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <div
                              key={item.id}
                              data-index={globalIndex}
                              onClick={() => item.action()}
                              className={`flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-primary/10 border-l-2 border-primary pl-4"
                                  : "hover:bg-surface-container/50 border-l-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isSelected ? "bg-primary/20 text-primary" : "bg-muted/10 text-muted"
                                }`}>
                                  {item.icon}
                                </div>
                                <div className="min-w-0">
                                  <p className={`text-xs font-semibold truncate ${
                                    isSelected ? "text-primary" : "text-on-background"
                                  }`}>
                                    {item.title}
                                  </p>
                                  {item.subtitle && (
                                    <p className="text-[10px] text-muted truncate max-w-[340px] mt-0.5">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="text-primary text-[10px] font-label-caps flex items-center gap-1 shrink-0"
                                >
                                  Open <ArrowRight size={10} />
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted text-xs">No matching commands found.</p>
                  </div>
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="px-4 py-3 bg-muted/10 border-t border-outline-variant/40 flex justify-between items-center text-[10px] text-muted font-sans">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/50 bg-surface-container font-mono">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/50 bg-surface-container font-mono">Enter</kbd> Select
                  </span>
                </div>
                <span>
                  Press <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/50 bg-surface-container font-mono">Ctrl + K</kbd> to toggle
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
