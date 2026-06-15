import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { projects as seedProjects, Project } from "@/data/projects";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "projects.json");
const COLLECTION = "projects";

let mongoClient: MongoClient | null = null;

function useMongo() {
  return !!process.env.MONGODB_URI;
}

async function getMongoCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }

  return mongoClient.db("portfolio").collection<Project>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Write the seed projects as initial data
    await fs.writeFile(DATA_FILE, JSON.stringify(seedProjects, null, 2), "utf-8");
  }
}

async function getProjectsFromFile(): Promise<Project[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const list: Project[] = JSON.parse(raw);
    if (list.length === 0) {
      // Seed if empty
      await fs.writeFile(DATA_FILE, JSON.stringify(seedProjects, null, 2), "utf-8");
      return seedProjects;
    }
    return list;
  } catch {
    return seedProjects;
  }
}

async function getProjectsFromMongo(): Promise<Project[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) {
    // Seed
    await collection.insertMany(seedProjects);
    return seedProjects;
  }
  return list;
}

export async function getProjects(): Promise<Project[]> {
  if (useMongo()) {
    try {
      return await getProjectsFromMongo();
    } catch (err) {
      console.error("MongoDB projects fetch failed, falling back to file:", err);
      return getProjectsFromFile();
    }
  }
  return getProjectsFromFile();
}

export async function saveProject(project: Omit<Project, "id">): Promise<Project> {
  const newProject: Project = {
    ...project,
    id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID(),
  };

  if (useMongo()) {
    const collection = await getMongoCollection();
    await collection.insertOne(newProject);
    return newProject;
  }

  const list = await getProjectsFromFile();
  list.push(newProject);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newProject;
}

export async function updateProject(id: string, updatedData: Partial<Project>): Promise<Project | null> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updatedData },
      { returnDocument: "after" }
    );
    return result ?? null;
  }

  const list = await getProjectsFromFile();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updatedData, id }; // Ensure ID remains unchanged
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }

  const list = await getProjectsFromFile();
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length === list.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
