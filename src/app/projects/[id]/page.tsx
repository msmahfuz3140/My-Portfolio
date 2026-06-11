import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Target,
  Lightbulb,
  TrendingUp,
  UserCheck,
  Clock,
  Layers,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] glow-radial -z-10 opacity-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] glow-radial -z-10 opacity-15" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted hover:text-primary mb-10 transition-colors font-label-caps text-xs"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-caps uppercase tracking-widest">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-muted text-xs">
              <Clock size={12} />
              {project.timeline}
            </span>
          </div>
          <h1 className="font-h1 text-4xl sm:text-5xl text-on-background font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted font-body-lg max-w-3xl leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Cover Image */}
        <div className="glass-card rounded-[24px] overflow-hidden mb-12 border border-outline-variant">
          <div className="aspect-video relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href={project.githubUrl}
            target="_blank"
            className="gradient-border-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-label-caps text-sm text-on-background hover:scale-105 transition-transform"
          >
            <FaGithub size={16}/>
            View Code
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="glass-card inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-label-caps text-sm text-on-background hover:border-primary transition-colors border border-outline-variant"
            >
              <ExternalLink size={18} className="text-secondary" />
              Live Demo
            </Link>
          )}
        </div>

        {/* Problem → Solution → Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border-l-4 border-l-red-400 hover:border-red-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
              <Target className="text-red-400" size={20} />
            </div>
            <h2 className="font-h3 text-lg text-on-background font-bold mb-3">The Problem</h2>
            <p className="text-muted text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-2xl border-l-4 border-l-blue-400 hover:border-blue-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Lightbulb className="text-blue-400" size={20} />
            </div>
            <h2 className="font-h3 text-lg text-on-background font-bold mb-3">The Solution</h2>
            <p className="text-muted text-sm leading-relaxed">{project.solution}</p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-2xl border-l-4 border-l-green-400 hover:border-green-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <h2 className="font-h3 text-lg text-on-background font-bold mb-3">Key Results</h2>
            <ul className="space-y-2">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-2 text-muted text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* My Role */}
        <div className="glass-card p-8 sm:p-10 rounded-[24px] mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserCheck className="text-primary" size={20} />
            </div>
            <h2 className="font-h2 text-2xl text-on-background font-bold">My Role</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.myRole.map((role, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface-container">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-on-background text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Layers className="text-secondary" size={20} />
            </div>
            <h2 className="font-h2 text-2xl text-on-background font-bold">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass-card text-primary text-sm font-medium border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-amber-400" size={20} />
              <h2 className="font-h3 text-xl text-on-background font-bold">Challenges Faced</h2>
            </div>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="text-muted text-sm leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-cyan-400" size={20} />
              <h2 className="font-h3 text-xl text-on-background font-bold">Future Improvements</h2>
            </div>
            <ul className="space-y-3">
              {project.improvements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span className="text-muted text-sm leading-relaxed">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-8 sm:p-10 rounded-[24px] text-center">
          <h3 className="font-h2 text-2xl text-on-background font-bold mb-3">Interested in similar work?</h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            I&apos;m available for freelance projects and collaborations. Let&apos;s build something great together.
          </p>
          <Link
            href="/#contact"
            className="gradient-border-btn inline-flex items-center gap-2 px-10 py-4 rounded-full font-label-caps text-on-background hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found", description: "The requested project could not be found." };
  }

  return {
    title: `${project.title} Case Study | Md Mahfuzul Haque`,
    description: `${project.problem} — ${project.solution}`,
    keywords: [project.title, ...project.techStack, "Case Study", "Md Mahfuzul Haque", "Full Stack Developer"],
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
      type: "article",
    },
  };
}
