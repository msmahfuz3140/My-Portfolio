"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Use fromTo to ensure visibility and add a slight delay to allow layout to settle
      gsap.fromTo(".project-card",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Trigger slightly earlier
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger after a short delay to account for layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-16 sm:py-section-padding px-8" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-6">
        <div>
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Featured Projects.</h2>
          <p className="text-muted font-body-lg max-w-xl mt-4">
            Selected works that showcase technical complexity and creative problem solving.
          </p>
        </div>
        <Link
          href="https://github.com/msmahfuz3140"
          target="_blank"
          className="flex items-center gap-2 text-primary font-label-caps hover:gap-4 transition-all"
        >
          Explore all projects <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id} className="project-card glass-card group relative overflow-hidden rounded-2xl opacity-0">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  suppressHydrationWarning
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 sm:p-8 relative">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="font-h3 text-[22px] text-on-background leading-tight">{project.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="p-2 glass-card rounded-full text-on-background/60 hover:text-primary transition-colors flex items-center justify-center"
                    >
                      <img src="https://skillicons.dev/icons?i=github" className="w-5 h-5" alt="GitHub" />
                    </Link>
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="p-2 glass-card rounded-full text-on-background/60 hover:text-secondary transition-colors flex items-center justify-center"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-muted text-sm mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-2 text-on-background font-label-caps text-xs group-hover:gap-4 transition-all"
                >
                  View Case Study <ArrowRight size={14} className="text-primary" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-muted font-body-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
