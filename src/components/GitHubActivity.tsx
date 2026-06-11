"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, GitFork, BookOpen, Users, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";

const GITHUB_USERNAME = "msmahfuz3140";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string | null;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".github-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
        ]);
        if (userRes.ok) setUser(await userRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch {
        // silently fail — section shows fallback
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  const stats = user
    ? [
        { label: "Repositories", value: user.public_repos, icon: BookOpen },
        { label: "Followers", value: user.followers, icon: Users },
        { label: "Following", value: user.following, icon: FaGithub },
      ]
    : [];

  return (
    <section ref={sectionRef} className="py-16 sm:py-section-padding px-8 bg-surface-container/30" id="github">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-4xl md:text-h2 text-on-background font-bold">GitHub Activity</h2>
          <p className="font-label-caps text-blue-400 tracking-widest uppercase mt-2">Open Source & Code</p>
          <p className="text-muted font-body-lg max-w-2xl mx-auto mt-4">
            My latest open-source work and contribution activity on GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="github-card glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-outline-variant shrink-0">
                  {user ? (
                    <Image src={user.avatar_url} alt={GITHUB_USERNAME} width={64} height={64} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-surface-container animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-h3 text-lg text-on-background font-bold">@{GITHUB_USERNAME}</h3>
                  <p className="text-muted text-xs mt-0.5 line-clamp-2">
                    {user?.bio || "Full Stack Developer | Diploma CST Student"}
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-surface-container rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
                      <span className="flex items-center gap-2 text-muted text-sm">
                        <stat.icon size={14} className="text-primary" />
                        {stat.label}
                      </span>
                      <span className="font-h3 text-on-background font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                className="gradient-border-btn w-full mt-6 py-3 rounded-xl font-label-caps text-xs text-on-background flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                
                <FaGithub size={16}/>
                View Profile
              </Link>
            </div>

            {/* Contribution Graph */}
            <div className="github-card glass-card p-4 rounded-2xl overflow-hidden">
              <p className="text-muted text-[10px] font-label-caps uppercase tracking-wider mb-3 px-2">Contribution Graph</p>
              <Image
                src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                alt="GitHub contribution chart"
                width={600}
                height={120}
                className="w-full h-auto rounded-lg"
                unoptimized
              />
            </div>
          </div>

          {/* Recent Repos */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="github-card glass-card p-6 rounded-2xl h-40 animate-pulse bg-surface-container/50" />
                  ))
                : repos.map((repo) => (
                    <Link
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      className="github-card glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-h3 text-sm text-on-background font-bold group-hover:text-primary transition-colors truncate">
                          {repo.name}
                        </h4>
                        <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2 min-h-[32px]">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-muted text-[10px]">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={10} />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={10} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
