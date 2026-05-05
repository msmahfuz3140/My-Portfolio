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
    image: "/images/keen-keeper.png",
    tags: ["REACT.JS", "NODE.JS", "MONGODB"],
    liveUrl: "https://keen-keeper-wine.vercel.app/",
    githubUrl: "https://github.com/msmahfuz3140/Keen_Keeper",
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
    techStack: ["React.js", "Node.js", "MongoDB"]
  },
  {
    id: "digitools",
    title: "Digi Tools",
    description: "Marketplace for premium digital products and AI subscriptions.",
    fullDescription: "Digi Tools is a one-stop-shop for digital creators. It offers a variety of products including AI tool subscriptions, social media kits, and premium stock assets with a seamless checkout experience.",
    image: "/images/DigiTools.png",
    tags: ["NEXT.JS", "STRIPE", "MONGODB"],
    liveUrl: "as-6-digital-tools.netlify.app",
    githubUrl: "https://github.com/msmahfuz3140/Assignment-6_DigitalTools",
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

  // {
  //   id: "bookvibe",
  //   title: "Bookvibe",
  //   description: "A social platform for book lovers to share reviews and recommendations.",
  //   fullDescription: "Bookvibe is a community-driven platform for bibliophiles. Users can track their reading progress, write detailed reviews, and discover new books through personalized recommendations.",
  //   image: "/images/Book-vibe.png",
  //   tags: ["REACT.JS", "FIREBASE", "CONTEXT API"],
  //   liveUrl: "real-book-vibe.netlify.app",
  //   githubUrl: "https://github.com/msmahfuz3140/Book-Vibe-Project",
  //   challenges: [
  //     "Building a performant search system for a large book database.",
  //     "Managing complex state for user reading lists.",
  //     "Implementing a responsive UI for different device sizes."
  //   ],
  //   improvements: [
  //     "Adding a barcode scanner for quick book searching.",
  //     "Integrating with third-party book selling platforms.",
  //     "Implementing a dark mode for better night-time reading experience."
  //   ],
  //   techStack: ["React.js", "Firebase", "Context API", "Tailwind CSS"]
  // },

  {
    id: "qurbani-hut",
    title: "Qurbani Hut",
    description:
      "A modern online marketplace for buying and selling Qurbani animals, designed to connect farmers directly with buyers.",

    fullDescription:
      "Qurbani Hut is a modern web-based marketplace built to simplify the process of buying and selling Qurbani animals such as cows, goats, and sheep. The platform focuses on helping farmers, small traders, and rural sellers reach customers easily through an online system. It provides a clean user interface, product listing system, and smooth browsing experience, making Qurbani animal trading more accessible, efficient, and transparent.",

    image: "/images/quebani-hut.png",

    tags: ["Next.js", "MongoDB", "React", "Tailwind CSS", "REST API"],

    liveUrl: "https://qurbani-hut-mocha.vercel.app/",
    githubUrl: "https://github.com/msmahfuz3140/QurbaniHat-Project",

    challenges: [
      "Designing a user-friendly marketplace for farmers and buyers.",
      "Managing dynamic product listings and filtering systems.",
      "Handling API data fetching and error management.",
      "Creating responsive layouts for mobile and desktop users."
    ],

    improvements: [
      "Implement secure authentication and user dashboard.",
      "Add online payment gateway integration.",
      "Introduce real-time chat between buyer and seller.",
      "Add advanced search and category filtering system."
    ],

    techStack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "REST API"
    ]
  },
  {
    id: "dragon-news",
    title: "Dragon News",

    description:
      "A modern and responsive news portal website for browsing, reading, and managing latest news articles.",

    fullDescription:
      "Dragon News is a modern news portal web application designed to deliver the latest news in a clean, fast, and user-friendly interface. The platform allows users to explore news by categories, read detailed articles, and enjoy a smooth browsing experience. It focuses on responsive design, dynamic routing, and efficient data management to create a real-world news website experience.",

    image: "/images/dragon-news.png",

    tags: ["Next.js", "React", "Tailwind CSS", "Firebase", "REST API"],

    liveUrl: "https://dragon-news-ms.vercel.app",
    githubUrl: "https://github.com/msmahfuz3140/Dragon-news",

    challenges: [
      "Implementing dynamic routing for individual news pages.",
      "Managing category-based news filtering.",
      "Handling authentication and protected routes.",
      "Optimizing responsive UI for all screen sizes."
    ],

    improvements: [
      "Add comment system for news articles.",
      "Implement user profile and bookmarking feature.",
      "Add real-time news updates.",
      "Integrate admin dashboard for news management."
    ],

    techStack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Firebase Authentication",
      "REST API"
    ]
  },
  {
    id: "bpl-dream-11",
    title: "BPL Dream 11",

    description:
      "A fantasy cricket team builder web application inspired by Dream11, focused on Bangladesh Premier League (BPL).",

    fullDescription:
      "BPL Dream 11 is a fantasy cricket web application where users can create their own virtual cricket team using players from the Bangladesh Premier League (BPL). The platform allows users to select players based on roles, manage team combinations, and track total credits and selections dynamically. The project demonstrates state management, component-based architecture, and interactive user experience similar to real-world fantasy sports platforms.",

    image: "/images/bpl-dream-11.png",

    tags: ["React", "JavaScript", "Tailwind CSS", "State Management", "API Integration"],

    liveUrl: "https://bpl-dream-11-webp.netlify.app",
    githubUrl: "https://github.com/msmahfuz3140/BPL-Dream-11",

    challenges: [
      "Implementing player selection logic with credit limitations.",
      "Managing dynamic team updates using React state.",
      "Preventing duplicate player selection.",
      "Designing an interactive and responsive fantasy UI."
    ],

    improvements: [
      "Add user authentication system.",
      "Introduce leaderboard and scoring system.",
      "Enable team saving and editing feature.",
      "Add real-time match score integration."
    ],

    techStack: [
      "React.js",
      "JavaScript (ES6)",
      "Tailwind CSS",
      "Context API",
      "REST API"
    ]
  }
];
