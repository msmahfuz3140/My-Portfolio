"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Award, Coffee } from "lucide-react";

interface StatItemProps {
  end: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

function StatItem({ end, label, icon, suffix = "+" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <motion.p
        key={count}
        initial={{ scale: 1.2, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-on-background"
      >
        {count}{suffix}
      </motion.p>
      <p className="text-muted text-xs font-label-caps mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 px-8">
      <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-8 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatItem end={500} label="Problems Solved" icon={<Code size={24} />} />
          <StatItem end={25} label="Projects Completed" icon={<Briefcase size={24} />} />
          <StatItem end={3} label="Certifications" icon={<Award size={24} />} suffix="+" />
          <StatItem end={2} label="Years Experience" icon={<Coffee size={24} />} suffix="+" />
        </div>
      </div>
    </section>
  );
}