import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

const envContent = readFileSync(".env.local", "utf-8");
const mongodbUriMatch = envContent.match(/MONGODB_URI=(.+)/);
const MONGODB_URI = mongodbUriMatch[1].trim();

async function fixMongo() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("portfolio");
    const collection = db.collection("projects");
    
    // Delete the corrupted project
    const result = await collection.deleteOne({ id: "dolor-aut-aute-vero" });
    console.log("Deleted corrupted project:", result.deletedCount);
    
    // Insert Blood Donation project
    const bloodDonation = {
      id: "blood-donation",
      title: "Blood Donation",
      description: "A web application for connecting blood donors with recipients in need.",
      fullDescription: "Blood Donation is a web application designed to facilitate the connection between blood donors and recipients in need. The platform allows users to register as donors or seek blood donations, providing a seamless way to manage and locate blood donation opportunities.",
      image: "/images/blood-donation.png",
      category: "Healthcare Platform",
      timeline: "4 Weeks",
      tags: ["React", "Next.js", "JavaScript", "Tailwind CSS", "State Management", "API Integration"],
      liveUrl: "https://blood-donation-mpi.vercel.app",
      githubUrl: "https://github.com/msmahfuz3140/blood-donation-practice-project",
      problem: "Many people struggle to find blood donors during emergencies. There's a need for a centralized platform that connects blood donors with recipients efficiently and quickly.",
      solution: "Built a web application that connects blood donors with recipients, featuring donor registration, blood request management, and search functionality using React state management and modern UI components.",
      results: [
        "Functional donor-recipient matching system",
        "User registration and profile management",
        "Blood request creation and tracking",
        "Responsive design for easy access on any device",
        "Live deployment for real-world usage"
      ],
      myRole: [
        "Designed and developed full-stack application",
        "Implemented state management for donor/recipient data",
        "Built responsive UI with Tailwind CSS",
        "Integrated REST API for data management",
        "Deployed and configured production environment"
      ],
      challenges: [
        "Implementing efficient donor-recipient matching logic",
        "Managing complex state for blood requests and donor data",
        "Designing intuitive UI for emergency situations",
        "Ensuring fast performance for critical search operations"
      ],
      improvements: [
        "Add user authentication and role-based access",
        "Implement real-time notifications for blood requests",
        "Add location-based donor search with maps",
        "Integrate SMS/email alerts for urgent requests",
        "Add donor eligibility verification system"
      ],
      techStack: ["React.js", "Next.js", "JavaScript (ES6)", "Tailwind CSS", "Context API", "REST API"]
    };
    
    await collection.insertOne(bloodDonation);
    console.log("Added Blood Donation project to MongoDB");
    
    console.log("MongoDB data fixed!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

fixMongo();