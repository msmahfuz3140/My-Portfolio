"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Code2, Terminal, Cloud, Laptop, Network, CheckCircle2 } from "lucide-react";

const skills = [
  { name: "Next.js", icon: <img src="https://skillicons.dev/icons?i=nextjs" className="w-10 h-10" alt="Next.js" /> },
  { name: "React", icon: <img src="https://skillicons.dev/icons?i=react" className="w-10 h-10" alt="React" /> },
  { name: "JavaScript", icon: <img src="https://skillicons.dev/icons?i=js" className="w-10 h-10" alt="JavaScript" /> },
  { name: "MongoDB", icon: <img src="https://skillicons.dev/icons?i=mongodb" className="w-10 h-10" alt="MongoDB" /> },
  { name: "Express", icon: <img src="https://skillicons.dev/icons?i=express" className="w-10 h-10" alt="Express" /> },
  { name: "Git", icon: <img src="https://skillicons.dev/icons?i=git" className="w-10 h-10" alt="Git" /> },
  { name: "TailwindCSS", icon: <img src="https://skillicons.dev/icons?i=tailwind" className="w-10 h-10" alt="TailwindCSS" /> },
  { name: "HTML5", icon: <img src="https://skillicons.dev/icons?i=html" className="w-10 h-10" alt="HTML5" /> },
  { name: "CSS", icon: <img src="https://skillicons.dev/icons?i=css" className="w-10 h-10" alt="CSS" /> },
  { name: "C", icon: <img src="https://skillicons.dev/icons?i=c" className="w-10 h-10" alt="C" /> },
  { name: "C++", icon: <img src="https://skillicons.dev/icons?i=cpp" className="w-10 h-10" alt="C++" /> },
  { name: "Python", icon: <img src="https://skillicons.dev/icons?i=py" className="w-10 h-10" alt="Python" /> },
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
        {/* Professional Marquee Container */}
        <div className="marquee-container mb-24">
          <div className="marquee-content gap-6 sm:gap-8">
            {/* First set of skills */}
            {skills.map((skill, index) => (
              <div key={`first-${index}`} className="skill-item group relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 glass-card rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                  {skill.icon}
                </div>
                <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 font-label-caps text-[8px] sm:text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background/80 px-2 py-1 rounded">
                  {skill.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {skills.map((skill, index) => (
              <div key={`second-${index}`} className="skill-item group relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 glass-card rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                  {skill.icon}
                </div>
                <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 font-label-caps text-[8px] sm:text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background/80 px-2 py-1 rounded">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="skill-card glass-card p-10 rounded-3xl">
            <h3 className="font-h3 text-2xl md:text-h3 text-on-background mb-6 flex items-center gap-4">
              {mounted && <Laptop className="text-blue-400" />}
              Frontend Developer
            </h3>
            <ul className="space-y-4 text-muted font-body-md">
              {[
                "Modern UI with React & Next.js",
                "Responsive & Fluid Layouts",
                "Performance Optimization",
                "Interactive Animations",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  {mounted && <CheckCircle2 className="text-green-400" size={18} />}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-card glass-card p-10 rounded-3xl">
            <h3 className="font-h3 text-2xl md:text-h3 text-on-background mb-6 flex items-center gap-4">
              {mounted && <Database className="text-blue-400" />}
              Backend Developer
            </h3>
            <ul className="space-y-4 text-muted font-body-md">
              {[
                "Scalable Node.js Architecture",
                "REST & GraphQL API Design",
                "Database Schema Modeling",
                "Authentication & Security",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  {mounted && <CheckCircle2 className="text-green-400" size={18} />}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
