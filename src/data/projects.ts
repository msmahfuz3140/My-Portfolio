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
  problem: string;
  solution: string;
  results: string[];
  myRole: string[];
  category: string;
  timeline: string;
}

export const projects: Project[] = [
  {
    id: "tutor-finder",
    title: "Tutor Finder",
    description:
      "A full-stack platform that helps students find qualified tutors and allows tutors to manage their teaching services efficiently.",
    fullDescription:
      "Tutor Finder is a full-stack web application designed to bridge the gap between students and tutors. Students can explore tutor profiles, search based on their learning needs, and connect with suitable tutors. Tutors can create and manage their profiles, showcase their expertise, and update their teaching information.",
    image: "/images/tutor-finder.png",
    category: "Full Stack Marketplace",
    timeline: "8 Weeks",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Better Auth", "TypeScript", "Tailwind CSS", "Full Stack"],
    liveUrl: "https://tutor-finder-project.vercel.app",
    githubUrl: "https://github.com/msmahfuz3140/Tutor_Finder_Project",
    problem:
      "Students in Bangladesh often struggle to find reliable, qualified tutors nearby. Traditional methods rely on word-of-mouth with no centralized platform for comparing tutors, viewing credentials, or managing teaching profiles.",
    solution:
      "Built a full-stack marketplace where students can search and filter tutors by subject and location, while tutors manage professional profiles with authentication, role-based dashboards, and MongoDB-backed data storage.",
    results: [
      "End-to-end full-stack app with secure auth & role-based access",
      "Dynamic tutor search with MongoDB filtering",
      "Responsive UI working across mobile & desktop",
      "Deployed live on Vercel with production-ready architecture",
    ],
    myRole: [
      "Designed database schema and REST API architecture",
      "Implemented Better Auth with protected routes",
      "Built student & tutor dashboards with Next.js App Router",
      "Developed responsive UI with Tailwind CSS",
      "Deployed and configured production environment",
    ],
    challenges: [
      "Implementing secure authentication and session management using Better Auth.",
      "Managing protected routes and role-based access control.",
      "Designing efficient MongoDB queries for tutor discovery and filtering.",
      "Handling client-server data synchronization in a full-stack environment.",
      "Building a responsive and user-friendly interface across devices.",
    ],
    improvements: [
      "Add tutor booking and scheduling functionality.",
      "Integrate online payment methods for tutor sessions.",
      "Implement real-time messaging between tutors and students.",
      "Introduce tutor reviews and rating systems.",
      "Add email notifications and appointment reminders.",
    ],
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Better Auth", "TypeScript", "Tailwind CSS", "REST API"],
  },
  {
    id: "qurbani-hut",
    title: "Qurbani Hut",
    description:
      "A modern online marketplace for buying and selling Qurbani animals, designed to connect farmers directly with buyers.",
    fullDescription:
      "Qurbani Hut is a modern web-based marketplace built to simplify the process of buying and selling Qurbani animals such as cows, goats, and sheep. The platform focuses on helping farmers, small traders, and rural sellers reach customers easily through an online system.",
    image: "/images/quebani-hut.png",
    category: "E-Commerce Marketplace",
    timeline: "6 Weeks",
    tags: ["Next.js", "MongoDB", "React", "Tailwind CSS", "REST API"],
    liveUrl: "https://qurbani-hut-new.vercel.app",
    githubUrl: "https://github.com/msmahfuz3140/qurbani-Hut",
    problem:
      "During Qurbani season, farmers and small sellers lack a digital platform to list animals and reach urban buyers. Buyers struggle to compare listings, prices, and animal details in one place.",
    solution:
      "Created a clean marketplace with product listing, category browsing, dynamic filtering, and a mobile-first interface that makes animal trading transparent and accessible online.",
    results: [
      "Functional marketplace with dynamic product listings",
      "Category-based browsing and filtering system",
      "Mobile-responsive design for rural & urban users",
      "Live deployment with smooth API data handling",
    ],
    myRole: [
      "Built product listing and marketplace UI",
      "Integrated MongoDB for dynamic data management",
      "Implemented API fetching with error handling",
      "Designed responsive layouts for all screen sizes",
      "Deployed application on Vercel",
    ],
    challenges: [
      "Designing a user-friendly marketplace for farmers and buyers.",
      "Managing dynamic product listings and filtering systems.",
      "Handling API data fetching and error management.",
      "Creating responsive layouts for mobile and desktop users.",
    ],
    improvements: [
      "Implement secure authentication and user dashboard.",
      "Add online payment gateway integration.",
      "Introduce real-time chat between buyer and seller.",
      "Add advanced search and category filtering system.",
    ],
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "MongoDB", "REST API"],
  },
  {
    id: "keenkeeper",
    title: "KeenKeeper",
    description: "A comprehensive friend hub and relationship management platform.",
    fullDescription:
      "KeenKeeper is a sophisticated social management tool designed to help users maintain meaningful connections. It features friend tracking, activity logging, and reminders for important social milestones.",
    image: "/images/keen-keeper.png",
    category: "Social Management App",
    timeline: "5 Weeks",
    tags: ["REACT.JS", "NODE.JS", "MONGODB"],
    liveUrl: "https://keen-keeper-wine.vercel.app/",
    githubUrl: "https://github.com/msmahfuz3140/Keen_Keeper",
    problem:
      "People often lose track of important social connections and milestones — birthdays, meetups, and relationship history get scattered across apps with no single place to manage them.",
    solution:
      "Developed a MERN-stack social hub where users log friendships, track activities, set reminders, and maintain a private relationship history with a clean dashboard experience.",
    results: [
      "Scalable MongoDB schema for social connections",
      "CRUD operations for friend & activity management",
      "Reminder system for social milestones",
      "Privacy-focused data architecture",
    ],
    myRole: [
      "Designed MongoDB schema for social data",
      "Built React frontend with component architecture",
      "Developed Node.js REST API endpoints",
      "Implemented notification & reminder logic",
      "Handled deployment and environment setup",
    ],
    challenges: [
      "Designing a scalable database schema for social connections.",
      "Implementing real-time notifications for social reminders.",
      "Ensuring high data privacy for user relationship logs.",
    ],
    improvements: [
      "Integrating with major social media platforms for contact syncing.",
      "Adding AI-driven relationship insights and suggestions.",
      "Implementing a group management system for social circles.",
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
  },
  {
    id: "dragon-news",
    title: "Dragon News",
    description:
      "A modern and responsive news portal website for browsing, reading, and managing latest news articles.",
    fullDescription:
      "Dragon News is a modern news portal web application designed to deliver the latest news in a clean, fast, and user-friendly interface. The platform allows users to explore news by categories, read detailed articles, and enjoy a smooth browsing experience.",
    image: "/images/dragon-news.png",
    category: "News Portal",
    timeline: "4 Weeks",
    tags: ["Next.js", "React", "Tailwind CSS", "Firebase", "REST API"],
    liveUrl: "https://dragon-news-ms.vercel.app",
    githubUrl: "https://github.com/msmahfuz3140/Dragon-news",
    problem:
      "Bangladesh lacks fast, category-organized news portals built with modern web tech. Many local news sites are slow, cluttered, and not optimized for mobile reading experiences.",
    solution:
      "Built a performant news portal with dynamic routing, category filtering, Firebase authentication, and a clean reading interface optimized for all devices.",
    results: [
      "Dynamic article pages with category routing",
      "Firebase auth with protected user features",
      "Fast, mobile-optimized reading experience",
      "Clean UI matching modern news portal standards",
    ],
    myRole: [
      "Architected Next.js dynamic routing for articles",
      "Integrated Firebase Authentication",
      "Built category-based news filtering system",
      "Designed responsive article reading layout",
      "Optimized performance for fast page loads",
    ],
    challenges: [
      "Implementing dynamic routing for individual news pages.",
      "Managing category-based news filtering.",
      "Handling authentication and protected routes.",
      "Optimizing responsive UI for all screen sizes.",
    ],
    improvements: [
      "Add comment system for news articles.",
      "Implement user profile and bookmarking feature.",
      "Add real-time news updates.",
      "Integrate admin dashboard for news management.",
    ],
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Firebase Authentication", "REST API"],
  },
  {
    id: "bpl-dream-11",
    title: "BPL Dream 11",
    description:
      "A fantasy cricket team builder web application inspired by Dream11, focused on Bangladesh Premier League (BPL).",
    fullDescription:
      "BPL Dream 11 is a fantasy cricket web application where users can create their own virtual cricket team using players from the Bangladesh Premier League (BPL). Users select players based on roles, manage team combinations, and track credits dynamically.",
    image: "/images/bpl-dream-11.png",
    category: "Fantasy Sports App",
    timeline: "3 Weeks",
    tags: ["React", "JavaScript", "Tailwind CSS", "State Management", "API Integration"],
    liveUrl: "https://bpl-dream-11-webp.netlify.app",
    githubUrl: "https://github.com/msmahfuz3140/BPL-Dream-11",
    problem:
      "Cricket fans want to build fantasy BPL teams but lack a dedicated, interactive platform with credit-based player selection logic similar to popular fantasy sports apps.",
    solution:
      "Created an interactive fantasy team builder with credit limits, role-based player selection, duplicate prevention, and real-time team state updates using React Context API.",
    results: [
      "Credit-based player selection with validation",
      "Real-time team updates via React state",
      "Role-based team composition (WK, BAT, AR, BOWL)",
      "Interactive, responsive fantasy sports UI",
    ],
    myRole: [
      "Designed player selection logic & credit system",
      "Managed complex state with Context API",
      "Built interactive team builder UI",
      "Integrated player data via REST API",
      "Implemented duplicate selection prevention",
    ],
    challenges: [
      "Implementing player selection logic with credit limitations.",
      "Managing dynamic team updates using React state.",
      "Preventing duplicate player selection.",
      "Designing an interactive and responsive fantasy UI.",
    ],
    improvements: [
      "Add user authentication system.",
      "Introduce leaderboard and scoring system.",
      "Enable team saving and editing feature.",
      "Add real-time match score integration.",
    ],
    techStack: ["React.js", "JavaScript (ES6)", "Tailwind CSS", "Context API", "REST API"],
  },
  {
    id: "blood-donation",
    title: "Blood Donation",
    description: "A web application for connecting blood donors with recipients in need.",
    fullDescription:
      "Blood Donation is a web application designed to facilitate the connection between blood donors and recipients in need. Users can register as donors or seek blood donations with location and blood group filtering.",
    image: "/images/blood-donation.png",
    category: "Healthcare Platform",
    timeline: "4 Weeks",
    tags: ["React", "Next.js", "JavaScript", "Tailwind CSS", "State Management", "API Integration"],
    liveUrl: "https://blood-donation-mpi.vercel.app",
    githubUrl: "https://github.com/msmahfuz3140/blood-donation-practice-project",
    problem:
      "Finding compatible blood donors during emergencies is difficult — donors and recipients have no quick digital way to connect by blood group, location, and availability.",
    solution:
      "Built a donor-recipient matching platform with registration forms, blood group filtering, location-based search, and a clean dashboard for managing donation requests.",
    results: [
      "Donor & recipient registration system",
      "Blood group and location-based filtering",
      "Responsive healthcare-focused UI",
      "Deployed live for real-world usability",
    ],
    myRole: [
      "Designed donor/recipient data models",
      "Built registration and search functionality",
      "Implemented filtering by blood group & location",
      "Created responsive UI with Next.js & React",
      "Handled API integration and deployment",
    ],
    challenges: [
      "Designing intuitive donor registration flow.",
      "Implementing blood group and location filtering.",
      "Managing form validation for medical data.",
      "Building a trustworthy, accessible healthcare UI.",
    ],
    improvements: [
      "Add real-time donor availability status.",
      "Implement SMS/email notification for matches.",
      "Add hospital integration for verified requests.",
      "Introduce donor verification system.",
    ],
    techStack: ["React.js", "Next.js", "JavaScript (ES6)", "Tailwind CSS", "Context API", "REST API"],
  },
];
