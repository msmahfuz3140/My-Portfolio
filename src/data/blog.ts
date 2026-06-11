export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "tutor-finder-journey",
    title: "How I Built Tutor Finder — A Full-Stack Marketplace with Next.js & MongoDB",
    excerpt:
      "A deep dive into building a real-world tutor marketplace from scratch — covering authentication, role-based access, MongoDB queries, and deployment on Vercel.",
    date: "2025-12-15",
    readTime: "8 min read",
    category: "Full Stack",
    tags: ["Next.js", "MongoDB", "Better Auth"],
    url: "https://dev.to",
  },
  {
    id: "mern-stack-guide",
    title: "My MERN Stack Learning Journey as a Diploma CST Student",
    excerpt:
      "From HTML basics to building production apps — sharing my learning path, resources, challenges, and tips for fellow diploma students entering web development.",
    date: "2025-11-20",
    readTime: "6 min read",
    category: "Career",
    tags: ["MERN", "Learning", "Career"],
    url: "https://dev.to",
  },
  {
    id: "nextjs-tips",
    title: "5 Next.js Tips That Made My Projects Production-Ready",
    excerpt:
      "Practical Next.js patterns I learned while building multiple deployed projects — App Router, API routes, image optimization, and environment configuration.",
    date: "2025-10-08",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Next.js", "Tips", "Deployment"],
    url: "https://dev.to",
  },
];
