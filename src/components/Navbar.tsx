"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Inbox, ChevronDown, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import AdminModal from "./AdminModal";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openAdmin = () => {
    setProfileOpen(false);
    setAdminOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "border-0 shadow glass-card py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto">
          <div className="flex gap-3 items-center text-xl font-bold tracking-tighter text-on-background font-h1">
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-outline-variant hover:border-primary transition-colors group cursor-auto"
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <Image src="/images/my-photo.jpg" alt="MD MAHFUZUL HAQUE" fill className="object-cover" />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 glass-card rounded-2xl border border-outline-variant shadow-xl overflow-hidden z-[60] cursor-auto"
                  >
                    <div className="px-4 py-3 border-b border-outline-variant/50">
                      <p className="text-on-background text-sm font-bold truncate">MD MAHFUZUL HAQUE</p>
                      <p className="text-muted text-[10px] font-label-caps mt-0.5">Portfolio Owner</p>
                    </div>
                    <button
                      type="button"
                      onClick={openAdmin}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left text-on-background hover:bg-primary/10 transition-colors group cursor-auto"
                    >
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        <LayoutDashboard size={16} />
                      </span>
                      <span className="font-label-caps text-xs tracking-wide">Admin</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/" className="hidden sm:block hover:opacity-80 transition-opacity">
              MD MAHFUZUL HAQUE
            </Link>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="sm:hidden flex items-center gap-1 text-sm cursor-auto"
              aria-label="Toggle profile menu"
            >
              <span className="truncate max-w-[120px]">MAHFUZ</span>
              <ChevronDown size={16} className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-label-caps text-[10px] uppercase tracking-widest font-bold text-muted hover:text-on-background transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Menu Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full glass-card text-on-background hover:text-primary transition-colors"
            >
              {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>

            {/* Desktop Connect Button */}
            <Link
              href="https://www.linkedin.com/in/msmahfuz3140"
              target="_blank"
              className="hidden md:block gradient-border-btn px-6 py-2 rounded-full font-label-caps text-on-background scale-100 active:scale-95 transition-transform"
            >
              Connect
            </Link>

            {/* Mobile Menu Button */}
            <button suppressHydrationWarning className="md:hidden text-on-background" onClick={() => setIsOpen(!isOpen)}>
              {mounted && (isOpen ? <X size={28} /> : <Menu size={28} />)}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full glass-card md:hidden"
            >
              <div className="flex flex-col items-center py-8 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-label-caps text-sm uppercase tracking-widest font-bold text-muted hover:text-on-background"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="https://www.linkedin.com/in/msmahfuz3140"
                  target="_blank"
                  className="gradient-border-btn px-8 py-3 rounded-full font-label-caps text-on-background"
                >
                  Connect
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AdminModal open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
