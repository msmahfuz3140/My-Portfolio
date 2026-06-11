export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
}

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full Stack Web App",
    description: "End-to-end web applications with modern frontend, robust backend, and database integration.",
    icon: "layers",
    features: ["Next.js / React Frontend", "Node.js REST API", "MongoDB Database", "Authentication & Deployment"],
    price: "From $200",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Pixel-perfect, responsive interfaces with smooth animations and optimized performance.",
    icon: "monitor",
    features: ["Responsive Design", "Tailwind CSS / UI", "GSAP Animations", "SEO Optimization"],
    price: "From $100",
  },
  {
    id: "landing",
    title: "Landing Page",
    description: "High-converting landing pages for businesses, portfolios, and product launches.",
    icon: "rocket",
    features: ["Modern UI Design", "Mobile-First Layout", "Contact Integration", "Fast Loading Speed"],
    price: "From $80",
  },
  {
    id: "maintenance",
    title: "Bug Fix & Maintenance",
    description: "Quick fixes, performance improvements, and ongoing support for existing projects.",
    icon: "wrench",
    features: ["Bug Fixing", "Performance Tuning", "Feature Updates", "Code Refactoring"],
    price: "From $50",
  },
];
