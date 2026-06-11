"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
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
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8 bg-surface-container/30" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Testimonials</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">What People Say</p>
          <p className="text-muted font-body-lg max-w-2xl mx-auto mt-4">
            Feedback from instructors, clients, and collaborators I&apos;ve worked with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card glass-card p-8 rounded-2xl relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={32} />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-on-background/90 text-sm leading-relaxed mb-8 relative z-10">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-outline-variant/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-h3 text-sm text-on-background font-bold">{t.name}</p>
                  <p className="text-muted text-xs">
                    {t.role} · {t.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
