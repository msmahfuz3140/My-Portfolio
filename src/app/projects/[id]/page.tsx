import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted hover:text-on-background mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="font-h1 text-4xl md:text-5xl text-on-background font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted font-body-lg">
              {project.fullDescription}
            </p>
          </div>

          <div className="aspect-video relative overflow-hidden rounded-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={project.githubUrl}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              <Image src="https://skillicons.dev/icons?i=github" width={20} height={20} className="w-5 h-5" alt="GitHub" />
              View Code
            </Link>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
              >
                <ExternalLink size={20} />
                Live Demo
              </Link>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-h2 text-2xl text-on-background font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-h2 text-2xl text-on-background font-bold mb-4">Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-muted">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-h2 text-2xl text-on-background font-bold mb-4">Future Improvements</h2>
              <ul className="space-y-2">
                {project.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span className="text-muted">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Md Mahfuzul Haque`,
    description: `${project.title} - ${project.description}. A project by Md Mahfuzul Haque, Full Stack Developer specializing in Next.js, React, and Node.js.`,
    keywords: [
      project.title,
      ...project.techStack,
      "Md Mahfuzul Haque",
      "Full Stack Developer",
      "Next.js Developer",
      "React Developer",
      "Web Development",
      "Portfolio Project",
    ],
    openGraph: {
      title: `${project.title} - Md Mahfuzul Haque Portfolio`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Md Mahfuzul Haque`,
      description: project.description,
      images: [project.image],
    },
  };
}
