import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { getBlogs } from "@/lib/blogs";

export const revalidate = 0;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ id: blog.id }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    notFound();
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-20 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob"></div>
      </div>

      <article className="max-w-3xl mx-auto px-8 py-20">
        {/* Back button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-muted hover:text-on-background text-sm mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-caps uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-muted text-xs">
              <Calendar size={12} />
              {formatDate(blog.date)}
            </span>
            <span className="flex items-center gap-1.5 text-muted text-xs">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-background leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-lg text-muted leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {blog.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-surface-container rounded-lg text-muted text-xs">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Blog content placeholder */}
        <div className="glass-card p-8 md:p-10 rounded-[24px] mb-10">
          <div className="prose prose-invert max-w-none">
            <p className="text-muted text-base leading-relaxed mb-6">
              This article was originally published on Dev.to. Click the button below to read the full article with code snippets, detailed explanations, and interactive examples.
            </p>
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/50">
              <h3 className="font-bold text-on-background mb-3">Article Summary</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong className="text-on-background">Category:</strong> {blog.category}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong className="text-on-background">Published:</strong> {formatDate(blog.date)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong className="text-on-background">Reading Time:</strong> {blog.readTime}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong className="text-on-background">Tags:</strong> {blog.tags.join(", ")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Read Full Article Button */}
        <div className="text-center">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-on-background hover:shadow-lg transition-all"
          >
            Read Full Article on Dev.to
            <ExternalLink size={18} />
          </a>
        </div>
      </article>
    </main>
  );
}