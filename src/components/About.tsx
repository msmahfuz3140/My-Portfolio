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
              I am <span className="text-primary font-bold">MD MAHFUZUL HAQUE</span>, a passionate <span className="text-primary font-bold">Web Developer</span> currently pursuing
              <span className="text-secondary font-medium">Diploma in Computer Science Technology (CST)</span> at
              <span className="text-secondary font-medium">Mymensingh Polytechnic Institute</span>. I have developed a strong foundation in
              modern web technologies and software development principles.
            </p>
            <p>
              My experience includes developing full-stack applications using MongoDB, Express.js, React, and Node.js,
              with a focus on writing clean, maintainable code and designing intuitive user interfaces.
              I have specialized training in <span className="text-cyan-400 font-medium">web development</span> and
              <span className="text-cyan-400 font-medium">cybersecurity</span>, ensuring I build secure and efficient applications.
            </p>
            <p>
              I am continuously expanding my skill set by exploring advanced topics such as
              <span className="text-cyan-400 font-medium">cybersecurity</span>, authentication systems, API architecture, and distributed systems.
              My focus on <span className="text-cyan-400 font-medium">cybersecurity</span> ensures I build secure, protected applications
              that safeguard user data and maintain system integrity.
            </p>
            <p>
              Based in <span className="text-primary font-medium">Mymensingh</span>, I approach development with a problem-solving mindset and a
              commitment to delivering reliable and impactful digital products that combine robust security measures
              to create innovative, safe, and efficient solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
