"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const opportunities = [
  { label: "Internship", color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Freelance", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { label: "Full-time", color: "text-green-400", bg: "bg-green-500/10" },
];

export default function OpenToWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".otw-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 -mt-8 mb-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="otw-card glass-card rounded-2xl p-6 sm:p-8 border border-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 glow-radial opacity-30 -z-10" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Briefcase className="text-green-400" size={24} />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-h3 text-lg sm:text-xl text-on-background font-bold">Open to Work</h3>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-label-caps uppercase tracking-wider">
                    Available
                  </span>
                </div>
                <p className="text-muted text-sm max-w-lg">
                  Junior Full Stack Developer seeking opportunities to build impactful web applications.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-primary" />
                    Netrakona, Bangladesh
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-secondary" />
                    Remote & On-site OK
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {opportunities.map((opp) => (
                  <span
                    key={opp.label}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-label-caps uppercase tracking-wider ${opp.bg} ${opp.color}`}
                  >
                    {opp.label}
                  </span>
                ))}
              </div>
              <Link
                href="#contact"
                className="gradient-border-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-label-caps text-xs text-on-background hover:scale-105 transition-transform shrink-0"
              >
                Let&apos;s Talk <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
