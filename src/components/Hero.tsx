"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Code, Terminal, Rocket, Globe, FileText, Send } from "lucide-react";
import myPhoto from "../../public/images/my-photo.jpg"

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      })
        .from(".hero-text", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        }, "-=0.5")
        .from(".hero-btn", {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        }, "-=0.4");

      // Antigravity floating effect for image and cards
      gsap.to(".floating-card", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          repeat: -1,
          yoyo: true,
        }
      });

      gsap.to(imageContainerRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-section-padding px-8 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] glow-radial -z-10 opacity-60"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] glow-radial -z-10 opacity-40"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        {/* Side Socials */}
        <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40">
          {[
            { icon: <img src="https://skillicons.dev/icons?i=github" className="w-6 h-6" alt="GitHub" />, href: "https://github.com/msmahfuz3140" },
            { icon: <img src="https://skillicons.dev/icons?i=linkedin" className="w-6 h-6" alt="LinkedIn" />, href: "https://www.linkedin.com/in/msmahfuz3140" },
            { icon: <img src="https://cdn.simpleicons.org/whatsapp/25D366" className="w-6 h-6" alt="WhatsApp" />, href: "https://wa.me/8801956016119" },
            { icon: <img src="https://skillicons.dev/icons?i=instagram" className="w-6 h-6" alt="Instagram" />, href: "https://www.instagram.com/msmahfuz3140" },
            { icon: <img src="https://cdn.simpleicons.org/facebook/1877F2" className="w-6 h-6" alt="Facebook" />, href: "https://www.facebook.com/msmahfuz3140" },
          ].map((social, i) => (
            <Link
              key={i}
              href={social.href}
              target="_blank"
              className="p-3 glass-card rounded-full text-on-background/60 hover:text-primary hover:border-primary transition-all duration-300"
            >
              {mounted && social.icon}
            </Link>
          ))}
          <div className="w-[1px] h-20 bg-outline-variant mx-auto mt-2"></div>
        </div>

        <div className="space-y-stack-md">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-label-caps text-secondary tracking-[0.2em] uppercase block"
          >
            DIPLOMA CST STUDENT / WEB DEVELOPER
          </motion.span>
          <h1 ref={titleRef} className="font-h1 text-4xl sm:text-5xl md:text-h1 text-on-background leading-tight">
            Hi, I&apos;m <br />
            <span className="gradient-text font-extrabold">MD MAHFUZUL HAQUE</span>
          </h1>
          <p className="hero-text font-body-lg text-muted max-w-lg">
            A passionate Web Developer specializing in building exceptional digital experiences with modern web technologies. I turn complex problems into elegant, scalable code.
          </p>
          <div className="flex flex-wrap gap-3 pt-8">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'MD_Mahfuzul_Haque_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="hero-btn gradient-border-btn px-10 py-4 rounded-full font-label-caps text-on-background hover:scale-105 transition-transform flex items-center gap-2"
            >
              {mounted && <FileText size={18} />} Download Resume
            </button>
            <Link
              href="#contact"
              className="hero-btn glass-card border-2 border-outline-variant px-10 py-4 rounded-full font-label-caps text-on-background hover:border-primary hover:scale-105 transition-transform flex items-center gap-2"
            >
              {mounted && <Send size={18} />} Hire Me
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div ref={imageContainerRef} className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            {/* Spinning Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-outline-variant animate-[spin_20s_linear_infinite]"></div>

            {/* Main Image Container */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-outline-variant glass-card">
              <Image
                src={myPhoto}
                alt="Shishir Karmokar"
                fill
                priority
                sizes="(max-width: 768px) 320px, 450px"
                suppressHydrationWarning
                className="object-cover transition-all duration-700"
              />
            </div>

            {/* Floating Cards */}
            <div className="floating-card absolute -top-4 -left-4 sm:-left-8 glass-card p-3 sm:p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                {mounted && <Code size={20} />}
              </div>
              <div>
                <p className="text-[10px] text-muted font-label-caps">PROBLEM SOLVING</p>
                <p className="font-h3 text-[16px] text-on-background">500+ Solved</p>
              </div>
            </div>

            <div className="floating-card absolute top-1/2 -right-4 sm:-right-12 glass-card p-3 sm:p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                {mounted && <Terminal size={20} />}
              </div>
              <div>
                <p className="text-[10px] text-muted font-label-caps">EXPERIENCE</p>
                <p className="font-h3 text-[16px] text-on-background">2+ Years</p>
              </div>
            </div>

            <div className="floating-card absolute -bottom-4 left-1/4 glass-card p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                {mounted && <Rocket size={20} />}
              </div>
              <div>
                <p className="text-[10px] text-muted font-label-caps">PROJECTS</p>
                <p className="font-h3 text-[16px] text-on-background">25+ Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}