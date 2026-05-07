"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const technologies = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", percentage: 95 },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", percentage: 92 },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", percentage: 88 },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", percentage: 85 },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", percentage: 90 },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", percentage: 86 },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", percentage: 84 },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", percentage: 82 },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", percentage: 78 },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", percentage: 94 },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", percentage: 87 },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", percentage: 80 },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", percentage: 75 },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", percentage: 72 },
];

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-16 sm:py-section-padding px-8" id="technologies">
      <div className="text-center mb-20">
        <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold mb-4">Technologies</h2>
        <p className="text-muted font-body-lg max-w-2xl mx-auto">
          My proficiency in various technologies and programming languages
        </p>
      </div>


      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content gap-8">
          {/* First Line */}
          {technologies.map((tech, index) => (
            <div key={`marquee-1-${index}`} className="flex items-center gap-4 shrink-0">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={40}
                height={40}
                className="w-10 h-10 object-contain filter brightness-0 invert dark:brightness-100"
                suppressHydrationWarning
              />
              <span className="text-sm font-medium text-muted whitespace-nowrap">{tech.name}</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{tech.percentage}%</span>
            </div>
          ))}
          {/* Second Line */}
          {technologies.map((tech, index) => (
            <div key={`marquee-2-${index}`} className="flex items-center gap-4 shrink-0">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={40}
                height={40}
                className="w-10 h-10 object-contain filter brightness-0 invert dark:brightness-100"
                suppressHydrationWarning
              />
              <span className="text-sm font-medium text-muted whitespace-nowrap">{tech.name}</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{tech.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 251.2;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
