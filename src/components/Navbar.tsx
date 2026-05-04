"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "border-0 shadow glass-card py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex gap-3 items-center text-xl font-bold tracking-tighter text-on-background font-h1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-outline-variant">
            <Image src="/images/my-photo.jpg" alt="MD MAHFUZUL HAQUE" fill className="object-cover" />
          </div>
          MD MAHFUZUL HAQUE
        </Link>

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
  );
}
