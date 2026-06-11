"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">FAQ</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">Common Questions</p>
          <p className="text-muted font-body-lg max-w-xl mx-auto mt-4">
            Answers to questions clients and recruiters frequently ask.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="faq-item glass-card rounded-2xl overflow-hidden transition-colors hover:border-primary/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-auto"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <HelpCircle size={18} className="text-primary shrink-0" />
                    <span className="font-h3 text-sm sm:text-base text-on-background font-bold">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-6 pb-6 pl-[52px] text-muted text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
