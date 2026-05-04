import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code, Calendar, Users, Lightbulb, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Shishir Karmokar`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 border-b border-outline-variant bg-background/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-muted hover:text-on-background transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-label-caps text-sm">Back to Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="font-h1 text-4xl md:text-5xl text-on-background font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {project.fullDescription}
            </p>
            <div className="flex justify-center gap-4 mt-8">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="gradient-border-btn px-6 py-3 rounded-full text-on-background font-label-caps text-sm hover:scale-105 transition-transform"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </Link>
              )}
              <Link
                href={project.githubUrl}
                target="_blank"
                className="glass-card px-6 py-3 rounded-full text-on-background font-label-caps text-sm hover:scale-105 transition-transform"
              >
                <Code size={16} className="mr-2" />
                View Code
              </Link>
            </div>
          </div>

          {/* Project Image */}
          <div className="relative mb-16 rounded-3xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="font-h2 text-3xl text-on-background font-bold mb-8 flex items-center gap-3">
            <Lightbulb className="text-primary" size={32} />
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.techStack.map((tech, index) => (
              <div
                key={index}
                className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <span className="text-primary font-label-caps text-xs">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-20">
          <h2 className="font-h2 text-3xl text-on-background font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="text-secondary" size={32} />
            Challenges
          </h2>
          <div className="space-y-4">
            {project.challenges.map((challenge, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <p className="text-muted">{challenge}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="mb-20">
          <h2 className="font-h2 text-3xl text-on-background font-bold mb-8 flex items-center gap-3">
            <Users className="text-blue-400" size={32} />
            Future Improvements
          </h2>
          <div className="space-y-4">
            {project.improvements.map((improvement, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                <p className="text-muted">{improvement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-20">
          <h2 className="font-h2 text-3xl text-on-background font-bold mb-8 flex items-center gap-3">
            <Calendar className="text-primary" size={32} />
            Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full font-label-caps text-xs border border-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
