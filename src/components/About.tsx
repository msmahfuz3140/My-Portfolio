"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="max-w-6xl mx-auto px-8 py-16 sm:py-section-padding relative">
      <div
        ref={contentRef}
        className="glass-card p-6 sm:p-10 md:p-stack-lg rounded-[32px] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -z-10"></div>
        <div className="max-w-4xl space-y-stack-md">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">About Me</h2>
          <div className="space-y-6 text-muted font-body-lg">
            <p>
              I am a <span className="text-primary font-bold">MERN Stack Developer</span> with a strong interest in building scalable,
              high-performance web applications enhanced with AI-driven capabilities. Currently pursuing a degree in
              <span className="text-secondary font-medium">Computer Science and Engineering</span>, I have developed a solid foundation in modern web
              technologies and software development principles.
            </p>
            <p>
              My experience includes developing full-stack applications using MongoDB, Express.js, React, and Node.js,
              with a focus on writing clean, maintainable code and designing intuitive user interfaces. I am particularly
              interested in <span className="text-secondary font-medium">integrating artificial intelligence</span> into web applications to create smarter,
              more efficient, and user-centric solutions.
            </p>
            <p>
              I am continuously expanding my skill set by exploring advanced topics such as authentication systems,
              API architecture, and distributed systems. I approach development with a problem-solving mindset and a
              commitment to delivering reliable and impactful digital products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
