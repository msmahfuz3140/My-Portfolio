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
  Star,
  Quote,
  Code2,
  Globe,
  Save,
  TrendingUp,
  Users,
  Download,
  Eye as EyeIcon,
  BarChart3,
  Activity,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  HelpCircle,
  Layers,
} from "lucide-react";
import type { ContactMessage } from "@/types/message";
import type { Project } from "@/data/projects";
import type { BlogPost } from "@/data/blog";
import type { Testimonial } from "@/types/testimonial";
import type { Skill } from "@/types/skill";
import type { SiteSettings as SiteSettingsType } from "@/types/site-settings";
import type { FAQItem } from "@/types/faq";
import type { Service } from "@/data/services";

type FilterType = "all" | "unread" | "read";
type TabType = "overview" | "inbox" | "projects" | "blog" | "testimonials" | "skills" | "faq" | "services" | "settings";

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
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    totalBlogs: 0,
    totalTestimonials: 0,
    totalSkills: 0,
  });

  // Projects CRUD state
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
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
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  // Testimonials CRUD state
  const [testimonialFormOpen, setTestimonialFormOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testOrg, setTestOrg] = useState("");
  const [testContent, setTestContent] = useState("");
  const [testRating, setTestRating] = useState(5);

  // FAQ CRUD state
  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [faqFormOpen, setFaqFormOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQItem | null>(null);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // Services CRUD state
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [servTitle, setServTitle] = useState("");
  const [servDescription, setServDescription] = useState("");
  const [servIcon, setServIcon] = useState("");
  const [servFeatures, setServFeatures] = useState("");
  const [servPrice, setServPrice] = useState("");

  // Skills CRUD state
  const [skillFormOpen, setSkillFormOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [skillProficiency, setSkillProficiency] = useState(80);

  // Site Settings state
  const [settingsFormOpen, setSettingsFormOpen] = useState(false);
  const [settingsSiteTitle, setSettingsSiteTitle] = useState("");
  const [settingsSiteDesc, setSettingsSiteDesc] = useState("");
  const [settingsEmail, setSettingsEmail] = useState("");
  const [settingsPhone, setSettingsPhone] = useState("");
  const [settingsGithub, setSettingsGithub] = useState("");
  const [settingsLinkedin, setSettingsLinkedin] = useState("");
  const [settingsKeywords, setSettingsKeywords] = useState("");

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

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonialsList(data.testimonials);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (res.ok && data.success) {
        setSkillsList(data.skills);
      }
    } catch (err) {
      console.error("Failed to load skills:", err);
    }
  }, []);

  const fetchSiteSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/site-settings");
      const data = await res.json();
      if (res.ok && data.success) {
        setSiteSettings(data.settings);
      }
    } catch (err) {
      console.error("Failed to load site settings:", err);
    }
  }, []);

  // Compute analytics from data on login/fetch
  const computeAnalytics = useCallback(() => {
    return {
      totalMessages: messages.length,
      unreadMessages: messages.filter((m) => !m.read).length,
      totalProjects: projectsList.length,
      totalBlogs: blogsList.length,
      totalTestimonials: testimonialsList.length,
      totalSkills: skillsList.length,
    };
  }, [messages, projectsList, blogsList, testimonialsList, skillsList]);

  // Trigger analytics update after data loads
  useEffect(() => {
    if (messages.length > 0 || projectsList.length > 0 || blogsList.length > 0 || testimonialsList.length > 0 || skillsList.length > 0) {
      setAnalytics(computeAnalytics());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, projectsList.length, blogsList.length, testimonialsList.length, skillsList.length]);

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
      fetchTestimonials();
      fetchSkills();
      fetchFaqs();
      fetchServices();
      fetchSiteSettings();
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
    setTestimonialsList([]);
    setSkillsList([]);
    setSiteSettings(null);
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
      setFormImage("/images/tutor-finder.png");
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
        headers: { "x-admin-secret": secret },
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
        headers: { "x-admin-secret": secret },
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

  // Testimonials Form handlers
  const openTestimonialForm = (testimonial?: Testimonial) => {
    setError("");
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setTestName(testimonial.name);
      setTestRole(testimonial.role);
      setTestOrg(testimonial.organization);
      setTestContent(testimonial.content);
      setTestRating(testimonial.rating);
    } else {
      setCurrentTestimonial(null);
      setTestName("");
      setTestRole("");
      setTestOrg("");
      setTestContent("");
      setTestRating(5);
    }
    setTestimonialFormOpen(true);
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: testName,
      role: testRole,
      organization: testOrg,
      content: testContent,
      rating: testRating,
    };

    try {
      const url = currentTestimonial ? `/api/testimonials/${currentTestimonial.id}` : "/api/testimonials";
      const method = currentTestimonial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save testimonial.");
      } else {
        fetchTestimonials();
        setTestimonialFormOpen(false);
        setCurrentTestimonial(null);
      }
    } catch {
      setError("Network error. Failed to save testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        fetchTestimonials();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete testimonial.");
      }
    } catch {
      setError("Network error. Failed to delete testimonial.");
    } finally {
      setLoading(false);
    }
  };

  // Skills Form handlers
  const openSkillForm = (skill?: Skill) => {
    setError("");
    if (skill) {
      setCurrentSkill(skill);
      setSkillName(skill.name);
      setSkillCategory(skill.category);
      setSkillProficiency(skill.proficiency);
    } else {
      setCurrentSkill(null);
      setSkillName("");
      setSkillCategory("Frontend");
      setSkillProficiency(80);
    }
    setSkillFormOpen(true);
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: skillName,
      category: skillCategory,
      proficiency: skillProficiency,
    };

    try {
      const url = currentSkill ? `/api/skills/${currentSkill.id}` : "/api/skills";
      const method = currentSkill ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save skill.");
      } else {
        fetchSkills();
        setSkillFormOpen(false);
        setCurrentSkill(null);
      }
    } catch {
      setError("Network error. Failed to save skill.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        fetchSkills();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete skill.");
      }
    } catch {
      setError("Network error. Failed to delete skill.");
    } finally {
      setLoading(false);
    }
  };

  // FAQ Form handlers
  const openFaqForm = (faq?: FAQItem) => {
    setError("");
    if (faq) {
      setCurrentFaq(faq);
      setFaqQuestion(faq.question);
      setFaqAnswer(faq.answer);
    } else {
      setCurrentFaq(null);
      setFaqQuestion("");
      setFaqAnswer("");
    }
    setFaqFormOpen(true);
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { question: faqQuestion, answer: faqAnswer };

    try {
      const url = currentFaq ? `/api/faq/${currentFaq.id}` : "/api/faq";
      const method = currentFaq ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save FAQ.");
      } else {
        fetchFaqs();
        setFaqFormOpen(false);
        setCurrentFaq(null);
      }
    } catch {
      setError("Network error. Failed to save FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleFaqDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        fetchFaqs();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete FAQ.");
      }
    } catch {
      setError("Network error. Failed to delete FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch("/api/faq");
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqList(data.faqs);
      }
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    }
  }, []);

  // Services Form handlers
  const openServiceForm = (service?: Service) => {
    setError("");
    if (service) {
      setCurrentService(service);
      setServTitle(service.title);
      setServDescription(service.description);
      setServIcon(service.icon);
      setServFeatures(service.features.join(", "));
      setServPrice(service.price);
    } else {
      setCurrentService(null);
      setServTitle("");
      setServDescription("");
      setServIcon("layers");
      setServFeatures("");
      setServPrice("From $");
    }
    setServiceFormOpen(true);
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: servTitle,
      description: servDescription,
      icon: servIcon,
      features: servFeatures.split(",").map((f) => f.trim()).filter(Boolean),
      price: servPrice,
    };

    try {
      const url = currentService ? `/api/services/${currentService.id}` : "/api/services";
      const method = currentService ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save service.");
      } else {
        fetchServices();
        setServiceFormOpen(false);
        setCurrentService(null);
      }
    } catch {
      setError("Network error. Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        fetchServices();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to delete service.");
      }
    } catch {
      setError("Network error. Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (res.ok && data.success) {
        setServicesList(data.services);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    }
  }, []);

  // Site Settings handlers
  const openSettingsForm = () => {
    if (!siteSettings) return;
    setSettingsSiteTitle(siteSettings.siteTitle);
    setSettingsSiteDesc(siteSettings.siteDescription);
    setSettingsEmail(siteSettings.contactEmail);
    setSettingsPhone(siteSettings.contactPhone);
    setSettingsGithub(siteSettings.socialLinks.github);
    setSettingsLinkedin(siteSettings.socialLinks.linkedin);
    setSettingsKeywords(siteSettings.seoKeywords.join(", "));
    setSettingsFormOpen(true);
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      siteTitle: settingsSiteTitle,
      siteDescription: settingsSiteDesc,
      contactEmail: settingsEmail,
      contactPhone: settingsPhone,
      socialLinks: {
        github: settingsGithub,
        linkedin: settingsLinkedin,
      },
      seoKeywords: settingsKeywords.split(",").map((k) => k.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save site settings.");
      } else {
        fetchSiteSettings();
        setSettingsFormOpen(false);
      }
    } catch {
      setError("Network error. Failed to save site settings.");
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

  // TAB: Overview Dashboard with Analytics
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-h2 text-xl text-on-background font-bold">Welcome back, Mahfuz!</h3>
        <p className="text-muted text-sm mt-1">Here is a quick overview of your portfolio analytics.</p>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Inbox size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.totalMessages}</p>
            <p className="text-muted text-[10px] font-label-caps">Messages</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
            <MessageSquare size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.unreadMessages}</p>
            <p className="text-muted text-[10px] font-label-caps">Unread</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Briefcase size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.totalProjects}</p>
            <p className="text-muted text-[10px] font-label-caps">Projects</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.totalBlogs}</p>
            <p className="text-muted text-[10px] font-label-caps">Blogs</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Quote size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.totalTestimonials}</p>
            <p className="text-muted text-[10px] font-label-caps">Testimonials</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
            <Code2 size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-on-background">{analytics.totalSkills}</p>
            <p className="text-muted text-[10px] font-label-caps">Skills</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
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
                <p className="text-muted text-xs mt-0.5">Read, reply, or delete messages.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setActiveTab("testimonials"); fetchTestimonials(); }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                <Quote size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Manage Testimonials</p>
                <p className="text-muted text-xs mt-0.5">Add, edit, or delete testimonials.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setActiveTab("skills"); fetchSkills(); }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Code2 size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Manage Skills</p>
                <p className="text-muted text-xs mt-0.5">Update skills, categories, and proficiency levels.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => { setActiveTab("settings"); fetchSiteSettings(); }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:border-primary/50 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Settings size={16} />
              </div>
              <div>
                <p className="text-on-background text-sm font-bold">Site Settings</p>
                <p className="text-muted text-xs mt-0.5">Manage site title, description, social links, SEO.</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Database Status */}
      <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
          <Database size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-on-background">Database Status</p>
          <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
            <ShieldCheck size={12} className="text-green-400" />
            Connected & Synced
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Read/Unread Messages Bar Chart */}
        <div className="glass-card rounded-2xl p-5">
          <h4 className="font-h3 text-sm text-on-background font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-primary" />
            Message Status
          </h4>
          <div className="flex items-end gap-3 h-32">
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-lg font-bold text-on-background">{analytics.totalMessages - analytics.unreadMessages}</span>
              <div
                className="w-full rounded-t-lg bg-green-500/70 transition-all duration-500"
                style={{ height: `${analytics.totalMessages > 0 ? ((analytics.totalMessages - analytics.unreadMessages) / analytics.totalMessages) * 100 : 0}%`, minHeight: analytics.totalMessages > 0 ? '20px' : '0px' }}
              />
              <span className="text-[10px] text-muted font-label-caps">Read</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-lg font-bold text-on-background">{analytics.unreadMessages}</span>
              <div
                className="w-full rounded-t-lg bg-orange-400/70 transition-all duration-500"
                style={{ height: `${analytics.totalMessages > 0 ? (analytics.unreadMessages / analytics.totalMessages) * 100 : 0}%`, minHeight: analytics.unreadMessages > 0 ? '20px' : '0px' }}
              />
              <span className="text-[10px] text-muted font-label-caps">Unread</span>
            </div>
          </div>
        </div>

        {/* Content Distribution */}
        <div className="glass-card rounded-2xl p-5">
          <h4 className="font-h3 text-sm text-on-background font-bold mb-4 flex items-center gap-2">
            <PieChart size={16} className="text-purple-400" />
            Content Overview
          </h4>
          <div className="space-y-3">
            {[
              { label: "Projects", value: analytics.totalProjects, color: "bg-blue-500" },
              { label: "Blogs", value: analytics.totalBlogs, color: "bg-purple-500" },
              { label: "Testimonials", value: analytics.totalTestimonials, color: "bg-amber-500" },
              { label: "Skills", value: analytics.totalSkills, color: "bg-green-500" },
            ].map((item) => {
              const maxVal = Math.max(analytics.totalProjects, analytics.totalBlogs, analytics.totalTestimonials, analytics.totalSkills, 1);
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-20 text-[10px] font-label-caps text-muted shrink-0">{item.label}</span>
                  <div className="flex-1 h-4 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.value / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-on-background w-6 text-right">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="glass-card rounded-2xl p-5">
        <h4 className="font-h3 text-sm text-on-background font-bold mb-4 flex items-center gap-2">
          <Activity size={16} className="text-cyan-400" />
          Recent Activity
        </h4>
        {messages.length === 0 && testimonialsList.length === 0 ? (
          <p className="text-muted text-xs text-center py-6">No recent activity to show.</p>
        ) : (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {/* Show recent messages */}
            {[...messages].slice(0, 5).map((msg) => (
              <div key={msg.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container/50 text-xs">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${!msg.read ? 'bg-primary/20 text-primary' : 'bg-surface-container text-muted'}`}>
                  <Mail size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-background truncate font-medium">{msg.name}</p>
                  <p className="text-muted truncate">{msg.message}</p>
                </div>
                <span className="text-muted/60 text-[10px] shrink-0">{formatDate(msg.createdAt)}</span>
              </div>
            ))}
            {/* Show if there are testimonials */}
            {[...testimonialsList].slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container/50 text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Quote size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-background truncate font-medium">{t.name}</p>
                  <p className="text-muted truncate">{t.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // TAB: Inbox Messages
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

  // TAB: Projects Console
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
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Project Title *</label>
                <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Tutor Finder" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Category *</label>
                <input type="text" required value={formCategory} onChange={(e) => setFormCategory(e.target.value)} placeholder="e.g. Full Stack Marketplace" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Timeline *</label>
                <input type="text" required value={formTimeline} onChange={(e) => setFormTimeline(e.target.value)} placeholder="e.g. 8 Weeks" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Image URL/Path *</label>
                <input type="text" required value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="e.g. /images/tutor-finder.png" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Live URL</label>
                <input type="url" value={formLiveUrl} onChange={(e) => setFormLiveUrl(e.target.value)} placeholder="https://live-site.com" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">GitHub URL *</label>
                <input type="url" required value={formGithubUrl} onChange={(e) => setFormGithubUrl(e.target.value)} placeholder="https://github.com/..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Brief Description *</label>
              <textarea required rows={2} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="A brief 1-2 sentence description..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Full Description *</label>
              <textarea required rows={4} value={formFullDescription} onChange={(e) => setFormFullDescription(e.target.value)} placeholder="Detailed explanation..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">The Problem *</label>
                <textarea required rows={3} value={formProblem} onChange={(e) => setFormProblem(e.target.value)} placeholder="What issue does this solve?" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">The Solution *</label>
                <textarea required rows={3} value={formSolution} onChange={(e) => setFormSolution(e.target.value)} placeholder="How did you solve it?" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tags (Comma separated) *</label>
                <input type="text" required value={formTags} onChange={(e) => setFormTags(e.target.value)} placeholder="e.g. Next.js, TypeScript" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tech Stack (Comma separated) *</label>
                <input type="text" required value={formTechStack} onChange={(e) => setFormTechStack(e.target.value)} placeholder="e.g. Next.js, Node.js" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">My Role (One per line) *</label>
                <textarea required rows={4} value={formMyRole} onChange={(e) => setFormMyRole(e.target.value)} placeholder="Designed database schema&#10;Built auth flows" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Key Results (One per line) *</label>
                <textarea required rows={4} value={formResults} onChange={(e) => setFormResults(e.target.value)} placeholder="Role-based access implemented&#10;100% responsive" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Challenges (One per line) *</label>
                <textarea required rows={4} value={formChallenges} onChange={(e) => setFormChallenges(e.target.value)} placeholder="Handling token verification" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Improvements (One per line) *</label>
                <textarea required rows={4} value={formImprovements} onChange={(e) => setFormImprovements(e.target.value)} placeholder="Add scheduling calendar" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setProjectFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Project"}</button>
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
            <p className="text-muted text-sm mt-1">Manage featured projects on your site.</p>
          </div>
          <button onClick={() => openProjectForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Add New Project
          </button>
        </div>
        {projectsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Briefcase className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No projects loaded</h3>
            <p className="text-muted text-xs">Dynamic projects list is empty.</p>
            <button onClick={fetchProjects} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
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
                          <button onClick={() => openProjectForm(project)} className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors" title="Edit"><Edit size={14} /></button>
                          <button onClick={() => handleProjectDelete(project.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={14} /></button>
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

  // TAB: Blog Console
  const renderBlogTab = () => {
    if (blogFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setBlogFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to Blogs List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">{currentBlog ? `Edit: ${currentBlog.title}` : "Write New Blog Post"}</h3>
          </div>
          <form onSubmit={handleBlogSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Blog Title *</label>
                <input type="text" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="e.g. Next.js Performance" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Category *</label>
                <input type="text" required value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} placeholder="e.g. Tutorial" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Read Time *</label>
                <input type="text" required value={blogReadTime} onChange={(e) => setBlogReadTime(e.target.value)} placeholder="e.g. 5 min read" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Tags (Comma separated) *</label>
                <input type="text" required value={blogTags} onChange={(e) => setBlogTags(e.target.value)} placeholder="e.g. Next.js, SEO" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Excerpt / Summary *</label>
              <textarea required rows={3} value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} placeholder="A compelling brief excerpt..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Article Link URL *</label>
              <input type="url" required value={blogUrl} onChange={(e) => setBlogUrl(e.target.value)} placeholder="https://dev.to/username/article" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setBlogFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Blog Post"}</button>
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
            <p className="text-muted text-sm mt-1">Manage technical articles linked on your portfolio.</p>
          </div>
          <button onClick={() => openBlogForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Write New Post
          </button>
        </div>
        {blogsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <FileText className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No articles loaded</h3>
            <p className="text-muted text-xs">Blogs list is empty.</p>
            <button onClick={fetchBlogs} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
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
                    <th className="p-4">Date</th>
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
                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-400 font-label-caps">{blog.category}</span>
                      </td>
                      <td className="p-4 text-muted text-xs">{blog.readTime}</td>
                      <td className="p-4 text-muted text-xs">{blog.date}</td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openBlogForm(blog)} className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors" title="Edit"><Edit size={14} /></button>
                          <button onClick={() => handleBlogDelete(blog.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={14} /></button>
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

  // TAB: Testimonials Console
  const renderTestimonialsTab = () => {
    if (testimonialFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setTestimonialFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to Testimonials List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
          </div>
          <form onSubmit={handleTestimonialSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Name *</label>
                <input type="text" required value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g. Md. Rahim Uddin" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Role *</label>
                <input type="text" required value={testRole} onChange={(e) => setTestRole(e.target.value)} placeholder="e.g. Senior Instructor" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Organization *</label>
                <input type="text" required value={testOrg} onChange={(e) => setTestOrg(e.target.value)} placeholder="e.g. Mymensingh Polytechnic" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Rating (1-5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setTestRating(star)} className={`p-2 rounded-lg transition-colors ${star <= testRating ? "text-amber-400" : "text-muted/30"}`}>
                      <Star size={20} fill={star <= testRating ? "currentColor" : "none"} />
                    </button>
                  ))}
                  <span className="text-muted text-xs ml-2">{testRating}/5</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Testimonial Content *</label>
              <textarea required rows={4} value={testContent} onChange={(e) => setTestContent(e.target.value)} placeholder="Write the testimonial message..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setTestimonialFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Testimonial"}</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Testimonials Manager</h3>
            <p className="text-muted text-sm mt-1">Manage client, instructor, and collaborator testimonials.</p>
          </div>
          <button onClick={() => openTestimonialForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Add Testimonial
          </button>
        </div>
        {testimonialsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Quote className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No testimonials</h3>
            <p className="text-muted text-xs">Testimonials list is empty.</p>
            <button onClick={fetchTestimonials} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonialsList.map((t) => (
              <div key={t.id} className="glass-card p-5 rounded-2xl border border-outline-variant/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-background">{t.name}</p>
                      <p className="text-muted text-xs">{t.role} · {t.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-3">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-outline-variant/30">
                  <button onClick={() => openTestimonialForm(t)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors" title="Edit"><Edit size={12} /></button>
                  <button onClick={() => handleTestimonialDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // TAB: Skills Console
  const renderSkillsTab = () => {
    if (skillFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setSkillFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to Skills List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentSkill ? `Edit: ${currentSkill.name}` : "Add New Skill"}
            </h3>
          </div>
          <form onSubmit={handleSkillSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Skill Name *</label>
                <input type="text" required value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="e.g. React" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Category *</label>
                <select value={skillCategory} onChange={(e) => setSkillCategory(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Language">Language</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Proficiency % *</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={10} max={100} step={5} value={skillProficiency} onChange={(e) => setSkillProficiency(Number(e.target.value))} className="flex-1 accent-primary" />
                  <span className="text-sm font-bold text-on-background w-8 text-right">{skillProficiency}%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setSkillFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Skill"}</button>
            </div>
          </form>
        </div>
      );
    }

    const categories = [...new Set(skillsList.map((s) => s.category))];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Skills Manager</h3>
            <p className="text-muted text-sm mt-1">Manage skills, categories, and proficiency levels.</p>
          </div>
          <button onClick={() => openSkillForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Add Skill
          </button>
        </div>
        {skillsList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Code2 className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No skills loaded</h3>
            <p className="text-muted text-xs">Skills list is empty.</p>
            <button onClick={fetchSkills} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((cat) => {
              const catSkills = skillsList.filter((s) => s.category === cat);
              return (
                <div key={cat}>
                  <h4 className="font-label-caps text-muted text-xs mb-3 uppercase tracking-wider">{cat} ({catSkills.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {catSkills.map((skill) => (
                      <div key={skill.id} className="glass-card p-4 rounded-xl border border-outline-variant/50 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-bold text-sm text-on-background">{skill.name}</p>
                            <div className="flex items-center gap-1">
                              <button onClick={() => openSkillForm(skill)} className="p-1 rounded hover:bg-primary/10 text-muted hover:text-primary transition-colors"><Edit size={10} /></button>
                              <button onClick={() => handleSkillDelete(skill.id)} className="p-1 rounded hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"><Trash2 size={10} /></button>
                            </div>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${skill.proficiency}%` }} />
                          </div>
                          <p className="text-muted text-[10px] mt-0.5 text-right">{skill.proficiency}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // TAB: FAQ Manager
  const renderFaqTab = () => {
    if (faqFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setFaqFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to FAQ List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentFaq ? "Edit FAQ" : "Add New FAQ"}
            </h3>
          </div>
          <form onSubmit={handleFaqSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-5">
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Question *</label>
              <input type="text" required value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} placeholder="e.g. What services do you offer?" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Answer *</label>
              <textarea required rows={5} value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} placeholder="Write the detailed answer..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setFaqFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save FAQ"}</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">FAQ Manager</h3>
            <p className="text-muted text-sm mt-1">Manage frequently asked questions on your site.</p>
          </div>
          <button onClick={() => openFaqForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Add FAQ
          </button>
        </div>
        {faqList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <HelpCircle className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No FAQs loaded</h3>
            <p className="text-muted text-xs">FAQ list is empty.</p>
            <button onClick={fetchFaqs} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {faqList.map((faq) => (
              <div key={faq.id} className="glass-card p-5 rounded-xl border border-outline-variant/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-background">{faq.question}</p>
                    <p className="text-muted text-xs mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openFaqForm(faq)} className="p-2 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors" title="Edit"><Edit size={14} /></button>
                    <button onClick={() => handleFaqDelete(faq.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // TAB: Services Manager
  const renderServicesTab = () => {
    if (serviceFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setServiceFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to Services List
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">
              {currentService ? `Edit: ${currentService.title}` : "Add New Service"}
            </h3>
          </div>
          <form onSubmit={handleServiceSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Service Title *</label>
                <input type="text" required value={servTitle} onChange={(e) => setServTitle(e.target.value)} placeholder="e.g. Full Stack Web App" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Price *</label>
                <input type="text" required value={servPrice} onChange={(e) => setServPrice(e.target.value)} placeholder="e.g. From $200" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Description *</label>
              <textarea required rows={2} value={servDescription} onChange={(e) => setServDescription(e.target.value)} placeholder="Brief description of the service..." className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
            </div>
            <div className="space-y-1">
              <label className="font-label-caps text-muted text-[10px]">Features (Comma separated) *</label>
              <input type="text" required value={servFeatures} onChange={(e) => setServFeatures(e.target.value)} placeholder="e.g. Next.js / React, Node.js REST API" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setServiceFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Service"}</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Services Manager</h3>
            <p className="text-muted text-sm mt-1">Manage the services you offer to clients.</p>
          </div>
          <button onClick={() => openServiceForm()} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Plus size={15} /> Add Service
          </button>
        </div>
        {servicesList.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Layers className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No services loaded</h3>
            <p className="text-muted text-xs">Services list is empty.</p>
            <button onClick={fetchServices} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesList.map((service) => (
              <div key={service.id} className="glass-card p-5 rounded-2xl border border-outline-variant/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm text-on-background">{service.title}</p>
                    <p className="text-muted text-xs mt-1">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {service.features.map((f, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-label-caps">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                  <p className="text-sm font-bold text-green-400">{service.price}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openServiceForm(service)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted hover:text-primary transition-colors" title="Edit"><Edit size={12} /></button>
                    <button onClick={() => handleServiceDelete(service.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // TAB: Site Settings
  const renderSettingsTab = () => {
    if (settingsFormOpen) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button onClick={() => setSettingsFormOpen(false)} className="flex items-center gap-1.5 text-muted hover:text-on-background text-xs font-label-caps transition-colors">
              <ChevronLeft size={16} /> Back to Settings
            </button>
            <h3 className="font-h3 text-base text-on-background font-bold">Edit Site Settings</h3>
          </div>
          <form onSubmit={handleSettingsSubmit} className="glass-card p-5 md:p-6 rounded-2xl space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Site Title</label>
                <input type="text" value={settingsSiteTitle} onChange={(e) => setSettingsSiteTitle(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Contact Email</label>
                <input type="email" value={settingsEmail} onChange={(e) => setSettingsEmail(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">Contact Phone</label>
                <input type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-label-caps text-muted text-[10px]">Site Description</label>
                <textarea rows={2} value={settingsSiteDesc} onChange={(e) => setSettingsSiteDesc(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors resize-y" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">GitHub URL</label>
                <input type="url" value={settingsGithub} onChange={(e) => setSettingsGithub(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-muted text-[10px]">LinkedIn URL</label>
                <input type="url" value={settingsLinkedin} onChange={(e) => setSettingsLinkedin(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="font-label-caps text-muted text-[10px]">SEO Keywords (Comma separated)</label>
                <input type="text" value={settingsKeywords} onChange={(e) => setSettingsKeywords(e.target.value)} placeholder="e.g. Full Stack Developer, Next.js" className="w-full bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2 text-sm text-on-background focus:border-primary outline-none transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
              <button type="button" onClick={() => setSettingsFormOpen(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-muted hover:text-on-background hover:bg-surface-container/50 text-xs font-label-caps transition-all">Cancel</button>
              <button type="submit" disabled={loading} className="gradient-border-btn px-6 py-2.5 rounded-lg text-xs font-label-caps text-on-background disabled:opacity-50">{loading ? "Saving..." : "Save Settings"}</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-h2 text-xl text-on-background font-bold">Site Settings</h3>
            <p className="text-muted text-sm mt-1">Manage global site configuration, SEO, and social links.</p>
          </div>
          <button onClick={openSettingsForm} className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label-caps font-bold hover:shadow-lg transition-all scale-100 active:scale-95 shrink-0">
            <Edit size={15} /> Edit Settings
          </button>
        </div>
        {siteSettings ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <h4 className="font-h3 text-sm text-on-background font-bold flex items-center gap-2"><Globe size={16} className="text-primary" /> Site Info</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted">Title:</span> <span className="text-on-background">{siteSettings.siteTitle}</span></p>
                <p><span className="text-muted">Description:</span> <span className="text-on-background text-xs">{siteSettings.siteDescription}</span></p>
                <p><span className="text-muted">Email:</span> <span className="text-on-background">{siteSettings.contactEmail}</span></p>
                <p><span className="text-muted">Phone:</span> <span className="text-on-background">{siteSettings.contactPhone}</span></p>
              </div>
            </div>
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <h4 className="font-h3 text-sm text-on-background font-bold flex items-center gap-2"><ExternalLink size={16} className="text-blue-400" /> Social Links</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted">GitHub:</span> <span className="text-on-background text-xs truncate block">{siteSettings.socialLinks.github}</span></p>
                <p><span className="text-muted">LinkedIn:</span> <span className="text-on-background text-xs truncate block">{siteSettings.socialLinks.linkedin}</span></p>
              </div>
            </div>
            <div className="glass-card p-5 rounded-2xl md:col-span-2 space-y-3">
              <h4 className="font-h3 text-sm text-on-background font-bold flex items-center gap-2"><BarChart3 size={16} className="text-cyan-400" /> SEO Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {siteSettings.seoKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] rounded-full font-label-caps">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center flex-col flex items-center justify-center">
            <Settings className="text-muted mb-3" size={40} />
            <h3 className="font-h3 text-base text-on-background mb-1">No settings loaded</h3>
            <p className="text-muted text-xs">Click Refresh to load site settings.</p>
            <button onClick={fetchSiteSettings} className="mt-4 flex items-center gap-1 px-4 py-2 bg-surface-container rounded-lg text-xs font-label-caps hover:bg-surface-container-high transition-colors">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        )}
      </div>
    );
  };

  // Main UI render once unlocked
  const dashboardView = (
    <div className="flex flex-col lg:flex-row h-full min-h-[500px] lg:h-[650px] overflow-hidden cursor-auto">
      {/* Sidebar */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-outline-variant shrink-0 bg-surface-container/20 flex flex-col p-4 gap-4 justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <LayoutDashboard className="text-primary" size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-h3 text-sm text-on-background font-bold truncate">Admin Panel</h2>
              <p className="text-muted text-[10px] truncate">Mahfuz's Console</p>
            </div>
          </div>

          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible py-1 lg:py-0 gap-1 scrollbar-none">
            <button onClick={() => setActiveTab("overview")} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "overview" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <LayoutDashboard size={15} /> Overview
            </button>
            <button onClick={() => setActiveTab("inbox")} className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "inbox" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <div className="flex items-center gap-2.5"><Inbox size={15} /> Inbox</div>
              {unreadCount > 0 && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === "inbox" ? "bg-on-primary text-primary" : "bg-primary text-on-primary"}`}>{unreadCount}</span>}
            </button>
            <button onClick={() => { setActiveTab("projects"); fetchProjects(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "projects" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <Briefcase size={15} /> Projects
            </button>
            <button onClick={() => { setActiveTab("blog"); fetchBlogs(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "blog" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <FileText size={15} /> Blog
            </button>
            <button onClick={() => { setActiveTab("testimonials"); fetchTestimonials(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "testimonials" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <Quote size={15} /> Testimonials
            </button>
            <button onClick={() => { setActiveTab("skills"); fetchSkills(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "skills" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <Code2 size={15} /> Skills
            </button>
            <button onClick={() => { setActiveTab("faq"); fetchFaqs(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "faq" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <HelpCircle size={15} /> FAQ
            </button>
            <button onClick={() => { setActiveTab("services"); fetchServices(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "services" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <Layers size={15} /> Services
            </button>
            <button onClick={() => { setActiveTab("settings"); fetchSiteSettings(); }} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-label-caps transition-all shrink-0 ${activeTab === "settings" ? "bg-primary text-on-primary" : "text-muted hover:text-on-background hover:bg-surface-container/55"}`}>
              <Settings size={15} /> Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-outline-variant/50 pt-4 mt-2 lg:mt-0 flex-wrap lg:flex-nowrap gap-2">
          <button
            onClick={() => { fetchMessages(secret); fetchProjects(); fetchBlogs(); fetchTestimonials(); fetchSkills(); fetchSiteSettings(); }}
            disabled={loading}
            className="p-2 rounded-lg glass-card hover:border-primary transition-colors text-muted hover:text-primary"
            title="Refresh all data"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="flex items-center gap-1">
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-muted hover:text-red-400 transition-colors text-[10px] font-label-caps" title="Logout">
              <LogOut size={12} /> Sign Out
            </button>
            {mode === "modal" && onClose && (
              <button onClick={onClose} className="p-2 rounded-lg glass-card text-muted hover:text-on-background transition-colors" title="Close">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-5 md:p-6 overflow-hidden min-h-0 bg-surface-container/10">
        {error && <div className="glass-card p-3 rounded-xl text-red-400 text-sm mb-4 shrink-0">{error}</div>}

        <div className="flex-1 overflow-y-auto min-h-0 h-full">
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "inbox" && renderInboxTab()}
          {activeTab === "projects" && renderProjectsTab()}
          {activeTab === "blog" && renderBlogTab()}
          {activeTab === "testimonials" && renderTestimonialsTab()}
          {activeTab === "skills" && renderSkillsTab()}
          {activeTab === "faq" && renderFaqTab()}
          {activeTab === "services" && renderServicesTab()}
          {activeTab === "settings" && renderSettingsTab()}
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