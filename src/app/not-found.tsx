"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".error-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="error-content">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative glass-card p-8 rounded-2xl">
                <AlertCircle className="text-primary" size={64} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="font-h2 text-6xl md:text-7xl text-on-background font-bold mb-6">
            404
          </h1>
          <h2 className="font-h3 text-2xl md:text-3xl text-muted mb-4">
            Page Not Found
          </h2>
          <p className="text-muted font-body-lg max-w-2xl mx-auto mb-12">
            Oops! The page you&apos;re looking for seems to have vanished into the digital void.
            Let&apos;s get you back to safety.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary hover:bg-primary/80 text-on-primary font-medium transition-all duration-300 hover:scale-105"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-card hover:border-primary/50 text-on-background font-medium transition-all duration-300 hover:scale-105"
            >
              <Search size={20} />
              <span>Browse Projects</span>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-16 p-6 rounded-2xl bg-muted/20">
            <h3 className="font-h3 text-lg text-muted mb-3">
              Still can&apos;t find what you&apos;re looking for?
            </h3>
            <div className="space-y-2 text-muted font-body-md">
              <p>• Check the URL for any typos</p>
              <p>• Try using the search function</p>
              <p>• Visit the <Link href="/projects" className="text-primary hover:underline">projects page</Link> to see all available content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/5 blur-[100px] animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}
