"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Trophy, Medal, ScrollText } from "lucide-react";

const achievements = [
  { id: "1", title: "Complete Web Development Course", issuer: "Programming Hero", year: "2024", type: "certificate" },
  { id: "2", title: "Next.js & React Developer", issuer: "Self-Taught / Project Based", year: "2024", type: "achievement" },
  { id: "3", title: "500+ Problems Solved", issuer: "Various Online Judges", year: "2024", type: "milestone" },
  { id: "4", title: "Diploma in CST", issuer: "Mymensingh Polytechnic Institute", year: "2023-Present", type: "education" },
];

const iconMap: Record<string, React.ReactNode> = {
  certificate: <ScrollText size={20} />,
  achievement: <Trophy size={20} />,
  milestone: <Medal size={20} />,
  education: <Award size={20} />,
};

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".achievement-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8" id="achievements">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Achievements</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">Certifications & Milestones</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div key={item.id} className="achievement-card glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                {iconMap[item.type] || <Award size={20} />}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-on-background">{item.title}</p>
                <p className="text-muted text-xs mt-0.5">{item.issuer}</p>
                <p className="text-primary/60 text-[10px] font-label-caps mt-1">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}