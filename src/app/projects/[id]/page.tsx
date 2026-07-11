import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}

export const revalidate = 0;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const projects = await getProjects();
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
