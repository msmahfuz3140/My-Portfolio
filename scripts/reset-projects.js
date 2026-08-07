import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

// Read .env.local file manually
const envContent = readFileSync(".env.local", "utf-8");
const mongodbUriMatch = envContent.match(/MONGODB_URI=(.+)/);

if (!mongodbUriMatch) {
  console.error("MONGODB_URI not found in .env file");
  process.exit(1);
}

const MONGODB_URI = mongodbUriMatch[1].trim();

async function resetProjects() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("portfolio");
    const collection = db.collection("projects");
    
    // Delete all projects
    const result = await collection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} projects from MongoDB`);
    
    console.log("Projects collection cleared. Restart your dev server to reseed.");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

resetProjects();