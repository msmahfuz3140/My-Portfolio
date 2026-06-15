"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/data/blog";

export default function Blog({ initialBlogs = [] }: { initialBlogs?: BlogPost[] }) {
  const [blogsList, setBlogsList] = useState<BlogPost[]>(initialBlogs);

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogsList(initialBlogs);
    } else {
      fetch("/api/blogs")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.blogs) {
            setBlogsList(data.blogs);
          }
        })
        .catch((err) => console.error("Error loading blogs:", err));
    }
  }, [initialBlogs]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
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

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">Blog & Articles</h2>
            <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">Thoughts & Tutorials</p>
            <p className="text-muted font-body-lg max-w-xl mt-4">
              Technical articles about my projects, learning journey, and web development insights.
            </p>
          </div>
          <Link
            href="https://dev.to"
            target="_blank"
            className="flex items-center gap-2 text-primary font-label-caps text-xs hover:gap-4 transition-all shrink-0"
          >
            View all articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogsList.map((post) => (
            <Link
              key={post.id}
              href={post.url}
              target="_blank"
              className="blog-card glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all block"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-caps uppercase tracking-wider">
                    {post.category}
                  </span>
                  <BookOpen size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-h3 text-lg text-on-background font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] text-muted font-label-caps">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-muted text-xs pt-4 border-t border-outline-variant/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
