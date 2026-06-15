import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { blogPosts as seedBlogs, BlogPost } from "@/data/blog";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blogs.json");
const COLLECTION = "blogs";

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

  return mongoClient.db("portfolio").collection<BlogPost>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Write the seed blogs as initial data
    await fs.writeFile(DATA_FILE, JSON.stringify(seedBlogs, null, 2), "utf-8");
  }
}

async function getBlogsFromFile(): Promise<BlogPost[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const list: BlogPost[] = JSON.parse(raw);
    if (list.length === 0) {
      // Seed if empty
      await fs.writeFile(DATA_FILE, JSON.stringify(seedBlogs, null, 2), "utf-8");
      return seedBlogs;
    }
    return list;
  } catch {
    return seedBlogs;
  }
}

async function getBlogsFromMongo(): Promise<BlogPost[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) {
    // Seed
    await collection.insertMany(seedBlogs);
    return seedBlogs;
  }
  return list;
}

export async function getBlogs(): Promise<BlogPost[]> {
  if (useMongo()) {
    try {
      return await getBlogsFromMongo();
    } catch (err) {
      console.error("MongoDB blogs fetch failed, falling back to file:", err);
      return getBlogsFromFile();
    }
  }
  return getBlogsFromFile();
}

export async function saveBlog(blog: Omit<BlogPost, "id" | "date">): Promise<BlogPost> {
  const newBlog: BlogPost = {
    ...blog,
    id: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID(),
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  };

  if (useMongo()) {
    const collection = await getMongoCollection();
    await collection.insertOne(newBlog);
    return newBlog;
  }

  const list = await getBlogsFromFile();
  list.unshift(newBlog);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newBlog;
}

export async function updateBlog(id: string, updatedData: Partial<BlogPost>): Promise<BlogPost | null> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updatedData },
      { returnDocument: "after" }
    );
    return result ?? null;
  }

  const list = await getBlogsFromFile();
  const index = list.findIndex((b) => b.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updatedData, id }; // Ensure ID remains unchanged
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[index];
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }

  const list = await getBlogsFromFile();
  const filtered = list.filter((b) => b.id !== id);
  if (filtered.length === list.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
