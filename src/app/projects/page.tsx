import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Projects from "@/components/Projects";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All Projects | Md Mahfuzul Haque",
  description: "Explore all projects showcasing full-stack development, modern web technologies, and creative problem solving.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-label-caps">Back to Home</span>
        </Link>
      </section>
      <section className="max-w-7xl mx-auto py-16 sm:py-section-padding px-8">
        <div className="mb-12">
          <h1 className="font-h2 text-4xl md:text-5xl text-on-background font-bold mb-4">
            All Projects
          </h1>
          <p className="text-muted font-body-lg max-w-2xl">
            A complete collection of my work, featuring full-stack applications, 
            client projects, and innovative solutions built with modern technologies.
          </p>
        </div>
      </section>
      <Projects initialProjects={projects} />
    </main>
  );
}