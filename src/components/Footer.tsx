"use client";

import Link from "next/link";
import { Share2, Terminal, Globe, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-20 pb-12 border-t border-outline-variant bg-transparent relative">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute -top-10 left-1/2 -translate-x-1/2 p-4 glass-card rounded-full text-on-background hover:text-primary transition-all duration-300 hover:-translate-y-2 group"
      >
        <ArrowUp size={24} className="group-hover:animate-bounce" />
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start px-8 md:px-12 max-w-7xl mx-auto gap-12 py-16">
        <div className="md:w-1/3">
          <h3 className="font-h3 text-2xl text-on-background mb-4 font-extrabold">MD MAHFUZUL HAQUE</h3>
          <p className="text-muted text-body-md">
            Crafting high-performance digital solutions with technical mastery and creative vision. Building the future
            of web, one pixel at a time.
          </p>
          <div className="space-y-2 mt-6">
            <div className="flex items-center gap-3 text-primary font-body-md">
              <MapPin size={18} />
              <span>Netrakona, Mymensingh, Bangladesh</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 md:w-1/2">
          <div>
            <h4 className="font-label-caps text-blue-400 mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 font-body-md text-muted">
              <li><Link href="#home" className="hover:text-on-background transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-on-background transition-colors">About</Link></li>
              <li><Link href="#skills" className="hover:text-on-background transition-colors">Skills</Link></li>
              <li><Link href="#projects" className="hover:text-on-background transition-colors">Projects</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-blue-400 mb-6 uppercase tracking-widest">Connect With Me</h4>
            <div className="flex flex-wrap gap-1 sm:gap-3">
              <Link
                href="https://github.com/msmahfuz3140"
                target="_blank"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-blue-400 transition-all overflow-hidden"
              >
                <img src="https://skillicons.dev/icons?i=github" width={24} height={24} className="w-6 h-6" alt="GitHub" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/msmahfuz3140"
                target="_blank"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-blue-400 transition-all overflow-hidden"
              >
                <img src="https://skillicons.dev/icons?i=linkedin" width={24} height={24} className="w-6 h-6" alt="LinkedIn" />
              </Link>
              <Link
                href="https://wa.me/8801956016119"
                target="_blank"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-blue-400 transition-all overflow-hidden"
              >
                <img src="https://cdn.simpleicons.org/whatsapp/25D366" width={24} height={24} className="w-6 h-6" alt="WhatsApp" />
              </Link>
              <Link
                href="https://www.instagram.com/msmahfuz3140"
                target="_blank"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-blue-400 transition-all overflow-hidden"
              >
                <img src="https://skillicons.dev/icons?i=instagram" width={24} height={24} className="w-6 h-6" alt="Instagram" />
              </Link>
              <Link
                href="https://www.facebook.com/msmahfuz3140"
                target="_blank"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-blue-400 transition-all overflow-hidden"
              >
                <img src="https://cdn.simpleicons.org/facebook/1877F2" width={24} height={24} className="w-6 h-6" alt="Facebook" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 max-w-7xl mx-auto gap-4 border-t border-outline-variant pt-12">
        <p className="font-label-caps text-[10px] md:text-xs tracking-tight text-muted">
          © 2026 MD MAHFUZUL HAQUE. Crafted with technical mastery.
        </p>
        <div className="flex gap-4 md:gap-6">
          {["LinkedIn", "WhatsApp", "GitHub", "Instagram", "Facebook"].map((social) => (
            <Link
              key={social}
              href={
                social === "LinkedIn" ? "https://www.linkedin.com/in/msmahfuz3140" :
                  social === "GitHub" ? "https://github.com/msmahfuz3140" :
                    social === "Instagram" ? "https://www.instagram.com/msmahfuz3140" :
                      social === "Facebook" ? "https://www.facebook.com/msmahfuz3140" :
                        "https://wa.me/8801956016119"
              }
              target="_blank"
              className="font-label-caps text-[10px] md:text-xs text-muted hover:text-on-background transition-colors"
            >
              {social}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
