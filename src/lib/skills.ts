import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import type { Skill } from "@/types/skill";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "skills.json");
const COLLECTION = "skills";

let mongoClient: MongoClient | null = null;

const seedSkills: Skill[] = [
  { id: "react", name: "React", category: "Frontend", proficiency: 90 },
  { id: "nextjs", name: "Next.js", category: "Frontend", proficiency: 88 },
  { id: "typescript", name: "TypeScript", category: "Language", proficiency: 82 },
  { id: "javascript", name: "JavaScript", category: "Language", proficiency: 92 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", proficiency: 90 },
  { id: "nodejs", name: "Node.js", category: "Backend", proficiency: 85 },
  { id: "express", name: "Express.js", category: "Backend", proficiency: 85 },
  { id: "mongodb", name: "MongoDB", category: "Database", proficiency: 80 },
  { id: "postgresql", name: "PostgreSQL", category: "Database", proficiency: 70 },
  { id: "python", name: "Python", category: "Language", proficiency: 65 },
  { id: "git", name: "Git", category: "Tools", proficiency: 88 },
  { id: "firebase", name: "Firebase", category: "Backend", proficiency: 75 },
  { id: "gsap", name: "GSAP", category: "Frontend", proficiency: 78 },
  { id: "framer", name: "Framer Motion", category: "Frontend", proficiency: 80 },
  { id: "restapi", name: "REST API", category: "Backend", proficiency: 88 },
];

function isMongoEnabled() {
  return !!process.env.MONGODB_URI;
}

async function getMongoCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  return mongoClient.db("portfolio").collection<Skill>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedSkills, null, 2), "utf-8");
  }
}

async function getSkillsFromFile(): Promise<Skill[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const list: Skill[] = JSON.parse(raw);
    if (list.length === 0) {
      await fs.writeFile(DATA_FILE, JSON.stringify(seedSkills, null, 2), "utf-8");
      return seedSkills;
    }
    return list;
  } catch {
    return seedSkills;
  }
}

async function getSkillsFromMongo(): Promise<Skill[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) {
    await collection.insertMany(seedSkills);
    return seedSkills;
  }
  return list;
}

export async function getSkills(): Promise<Skill[]> {
  if (isMongoEnabled()) {
    try {
      return await getSkillsFromMongo();
    } catch (err) {
      console.error("MongoDB skills fetch failed, falling back to file:", err);
      return getSkillsFromFile();
    }
  }
  return getSkillsFromFile();
}

export async function saveSkill(skill: Omit<Skill, "id">): Promise<Skill> {
  const newItem: Skill = {
    ...skill,
    id: skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID(),
  };

  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    await collection.insertOne(newItem);
    return newItem;
  }

  const list = await getSkillsFromFile();
  list.push(newItem);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newItem;
}

export async function updateSkill(id: string, updatedData: Partial<Skill>): Promise<Skill | null> {
  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updatedData },
      { returnDocument: "after" }
    );
    return result ?? null;
  }

  const list = await getSkillsFromFile();
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updatedData, id };
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[index];
}

export async function deleteSkill(id: string): Promise<boolean> {
  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }

  const list = await getSkillsFromFile();
  const filtered = list.filter((s) => s.id !== id);
  if (filtered.length === list.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}