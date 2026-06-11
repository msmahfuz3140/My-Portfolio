"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Monitor, Rocket, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";

const iconMap = {
  layers: Layers,
  monitor: Monitor,
  rocket: Rocket,
  wrench: Wrench,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Services</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">What I Offer</p>
          <p className="text-muted font-body-lg max-w-2xl mx-auto mt-4">
            Professional web development services tailored to your needs — from idea to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="service-card glass-card p-8 rounded-2xl group hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 glow-radial opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-label-caps uppercase tracking-wider">
                    {service.price}
                  </span>
                </div>

                <h3 className="font-h3 text-xl text-on-background font-bold mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-on-background/80">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-label-caps text-xs group-hover:gap-4 transition-all"
                >
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
