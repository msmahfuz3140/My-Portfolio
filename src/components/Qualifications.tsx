"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";

export default function Qualifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8 bg-surface-container/30" id="qualifications">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Qualifications</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase">My Journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          {/* Education */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="text-blue-400" size={40} />
              <h3 className="font-h3 text-2xl md:text-h3 text-on-background">Education</h3>
            </div>
            <div className="relative timeline-line space-y-12 pl-12">
              {[
                {
                  title: "Diploma in Computer Science Technology",
                  subtitle: "Mymensingh Polytechnic Institute • 2023 - Present",
                  desc: "Currently pursuing Diploma in Computer Science Technology with a focus on programming, web development, and software engineering.",
                },
                {
                  title: "Higher Secondary Certificate (HSC)",
                  subtitle: "2022 - 2023",
                  desc: "Completed higher secondary education with a strong foundation in science and mathematics.",
                },
                {
                  title: "Secondary School Certificate (SSC)",
                  subtitle: "2022",
                  desc: "Completed secondary education with a focus on science and analytical thinking.",
                },
              ].map((item, i) => (
                <div key={i} className="timeline-item relative">
                  <div className="absolute -left-[53px] top-1 w-10 h-10 rounded-full glass-card flex items-center justify-center border-blue-400/50">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <h4 className="font-h3 text-[20px] text-on-background">{item.title}</h4>
                  <p className="text-muted font-label-caps text-xs mb-4">{item.subtitle}</p>
                  {item.desc && <p className="text-muted text-body-md">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-8">
              <Briefcase className="text-cyan-400" size={40} />
              <h3 className="font-h3 text-2xl md:text-h3 text-on-background">Experience</h3>
            </div>
            <div className="relative timeline-line space-y-12 pl-12">
              {[
                {
                  title: "Ai Powered Web Developer Intern",
                  subtitle: "Programming Hero • 2025 - Present",
                  desc: "Building full-stack web applications using MERN stack (MongoDB, Express.js, React, Node.js), with a focus on scalable architecture and clean code. Developing responsive user interfaces, integrating RESTful APIs, and exploring AI-driven features to enhance user experience and functionality.",
                },
                {
                  title: "Web Developer",
                  subtitle: "Freelance • 2024 - Present",
                  desc: "Developing responsive websites and web applications using modern technologies. Creating custom solutions for clients with focus on user experience and performance.",
                },
              ].map((item, i) => (
                <div key={i} className="timeline-item relative">
                  <div className="absolute -left-[53px] top-1 w-10 h-10 rounded-full glass-card flex items-center justify-center border-cyan-400/50">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <h4 className="font-h3 text-[20px] text-on-background">{item.title}</h4>
                  <p className="text-muted font-label-caps text-xs mb-4">{item.subtitle}</p>
                  {item.desc && <p className="text-muted text-body-md">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
