"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Code2, Terminal, Cloud, Laptop, Network, CheckCircle2 } from "lucide-react";

const skills = [
  { name: "HTML", icon: <img src="https://skillicons.dev/icons?i=html" className="w-10 h-10" alt="HTML5" suppressHydrationWarning />, level: 90 },
  { name: "CSS", icon: <img src="https://skillicons.dev/icons?i=css" className="w-10 h-10" alt="CSS" suppressHydrationWarning />, level: 95 },
  { name: "JavaScript", icon: <img src="https://skillicons.dev/icons?i=js" className="w-10 h-10" alt="JavaScript" suppressHydrationWarning />, level: 85 },
  { name: "React", icon: <img src="https://skillicons.dev/icons?i=react" className="w-10 h-10" alt="React" suppressHydrationWarning />, level: 88 },
  { name: "Next.js", icon: <img src="https://skillicons.dev/icons?i=nextjs" className="w-10 h-10" alt="Next.js" suppressHydrationWarning />, level: 75 },
  { name: "Node.js", icon: <img src="https://skillicons.dev/icons?i=nodejs" className="w-10 h-10" alt="Node.js" suppressHydrationWarning />, level: 82 },
  { name: "Express", icon: <img src="https://skillicons.dev/icons?i=express" className="w-10 h-10" alt="Express" suppressHydrationWarning />, level: 78 },
  { name: "MongoDB", icon: <img src="https://skillicons.dev/icons?i=mongodb" className="w-10 h-10" alt="MongoDB" suppressHydrationWarning />, level: 76 },
  { name: "TailwindCSS", icon: <img src="https://skillicons.dev/icons?i=tailwind" className="w-10 h-10" alt="TailwindCSS" suppressHydrationWarning />, level: 92 },
  { name: "Git", icon: <img src="https://skillicons.dev/icons?i=git" className="w-10 h-10" alt="Git" suppressHydrationWarning />, level: 85 },
  { name: "Python", icon: <img src="https://skillicons.dev/icons?i=py" className="w-10 h-10" alt="Python" suppressHydrationWarning />, level: 70 },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Skills items animation
      gsap.fromTo(".skill-item",
        { scale: 0.8, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );

      // Large skill cards animation (Frontend/Backend)
      gsap.fromTo(".skill-card",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger after a short delay to ensure correct positioning
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8 relative" id="skills">
      <div className="max-w-6xl mx-auto text-center mb-stack-lg">
        <h2 className="font-h2 text-4xl md:text-h2 text-on-background mb-2 font-bold">Technologies</h2>
        <p className="font-label-caps text-blue-400 tracking-widest uppercase">My Tech Stack</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Skills Grid with Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:bg-background/80 transition-colors">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-h3 text-[18px] text-on-background font-semibold">{skill.name}</h3>
                </div>
              </div>

              {/* Skill Level Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-label-caps text-muted uppercase">Proficiency</span>
                  <span className="text-sm font-medium text-on-background">{skill.level}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={`https://developer.mozilla.org/en-US/docs/Web/${skill.name.toLowerCase()}`}
                    target="_blank"
                    className="text-xs text-primary hover:underline transition-colors"
                  >
                    Documentation
                  </a>
                  <a
                    href={`https://www.google.com/search?q=${skill.name.toLowerCase()}+tutorial`}
                    target="_blank"
                    className="text-xs text-muted hover:text-on-background transition-colors"
                  >
                    Tutorial
                  </a>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      animation: `fillBar 1.5s ease-out ${0.3 + index * 0.1}s forwards`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: ${skills.map(s => s.level)}%;
          }
        }
      `}</style>
    </section>
  );
}
