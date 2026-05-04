export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string[];
  improvements: string[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    id: "keenkeeper",
    title: "KeenKeeper",
    description: "A comprehensive friend hub and relationship management platform.",
    fullDescription: "KeenKeeper is a sophisticated social management tool designed to help users maintain meaningful connections. It features friend tracking, activity logging, and reminders for important social milestones.",
    image: "/images/projects/keenkeeper_v2.png",
    tags: ["REACT.JS", "NODE.JS", "MONGODB"],
    liveUrl: "https://keen-keeper-sk.vercel.app/",
    githubUrl: "https://github.com/shuvroshishir/KeenKeeper",
    challenges: [
      "Designing a scalable database schema for social connections.",
      "Implementing real-time notifications for social reminders.",
      "Ensuring high data privacy for user relationship logs."
    ],
    improvements: [
      "Integrating with major social media platforms for contact syncing.",
      "Adding AI-driven relationship insights and suggestions.",
      "Implementing a group management system for social circles."
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "GSAP"]
  },
  {
    id: "digitools",
    title: "Digi Tools",
    description: "Marketplace for premium digital products and AI subscriptions.",
    fullDescription: "Digi Tools is a one-stop-shop for digital creators. It offers a variety of products including AI tool subscriptions, social media kits, and premium stock assets with a seamless checkout experience.",
    image: "/images/projects/digitools_v2.png",
    tags: ["NEXT.JS", "STRIPE", "MONGODB"],
    liveUrl: "https://digitools-by-sk.netlify.app/",
    githubUrl: "https://github.com/shuvr0shishir/DigiTools",
    challenges: [
      "Implementing a secure digital product delivery system.",
      "Managing recurring subscription billing with Stripe.",
      "Optimizing the storefront for high conversion rates."
    ],
    improvements: [
      "Implementing a multi-vendor marketplace system.",
      "Adding an affiliate marketing dashboard.",
      "Integrating AI-powered product recommendations."
    ],
    techStack: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "qurbanihat",
    title: "Qurbanihat",
    description: "Live stock booking platform with seamless payment integration.",
    fullDescription: "Qurbanihat is a specialized livestock booking platform built with Next.js and Better Auth. It features a secure booking system, real-time availability tracking, and integrated payment gateways to simplify the livestock purchasing process.",
    image: "/images/projects/qurbanihat.png",
    tags: ["NEXT.JS", "TAILWIND", "BETTER AUTH", "GOOGLE AUTH"],
    liveUrl: "https://qurbanihat-livestock-booking.vercel.app/",
    githubUrl: "https://github.com/shuvroshishir/qurbanihat-livestock-booking",
    challenges: [
      "Implementing complex livestock inventory management.",
      "Ensuring secure transactions with high reliability.",
      "Optimizing image delivery for high-quality livestock photos."
    ],
    improvements: [
      "Adding live video streaming for livestock inspection.",
      "Implementing a buyer-seller direct chat system.",
      "Expanding to include regional veterinary support integration."
    ],
    techStack: ["Next.js", "Better Auth", "Prisma", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "bookvibe",
    title: "Bookvibe",
    description: "A social platform for book lovers to share reviews and recommendations.",
    fullDescription: "Bookvibe is a community-driven platform for bibliophiles. Users can track their reading progress, write detailed reviews, and discover new books through personalized recommendations.",
    image: "/images/projects/bookvibe.png",
    tags: ["REACT.JS", "FIREBASE", "CONTEXT API"],
    liveUrl: "https://bookvibe-sk.netlify.app/",
    githubUrl: "https://github.com/shuvroshishir/book-vibe-project",
    challenges: [
      "Building a performant search system for a large book database.",
      "Managing complex state for user reading lists.",
      "Implementing a responsive UI for different device sizes."
    ],
    improvements: [
      "Adding a barcode scanner for quick book searching.",
      "Integrating with third-party book selling platforms.",
      "Implementing a dark mode for better night-time reading experience."
    ],
    techStack: ["React.js", "Firebase", "Context API", "Tailwind CSS"]
  },
  {
    id: "library-system",
    title: "DIU Library Management System",
    description: "Enterprise solution for academic library administration.",
    fullDescription: "A robust library management system developed for educational institutions. It automates book circulation, member management, and fine tracking using a PHP and MySQL backend.",
    image: "/images/projects/library.png",
    tags: ["PHP", "MYSQL", "BOOTSTRAP"],
    liveUrl: "https://diu-library.page.gd",
    githubUrl: "https://github.com/shuvroshishir/diu-library-management-system",
    challenges: [
      "Ensuring database consistency during high-volume book checkouts.",
      "Implementing a flexible fine calculation system.",
      "Designing an intuitive interface for both librarians and students."
    ],
    improvements: [
      "Implementing RFID integration for automated book tracking.",
      "Adding an e-book lending system.",
      "Integrating with the university student portal for SSO."
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap"]
  },
  {
    id: "scientific-calculator",
    title: "Scientific Calculator",
    description: "High-precision command-line scientific calculator.",
    fullDescription: "A low-level implementation of a scientific calculator in C, focusing on mathematical precision and algorithmic efficiency. It supports complex expressions, trigonometric functions, and algebraic operations.",
    image: "/images/projects/calculator.png",
    tags: ["C", "ALGORITHMS", "MATH"],
    liveUrl: "",
    githubUrl: "https://github.com/shuvroshishir/scientific-calculator",
    challenges: [
      "Handling floating-point precision errors in complex calculations.",
      "Parsing nested mathematical expressions efficiently.",
      "Implementing robust error handling for invalid user inputs."
    ],
    improvements: [
      "Adding support for matrix calculations.",
      "Implementing a graphical user interface (GUI) using a C library.",
      "Adding a plotting feature for mathematical functions."
    ],
    techStack: ["C", "Standard Library", "Algorithmic Logic"]
  }
];
