import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { testimonials as seedTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonial";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "testimonials.json");
const COLLECTION = "testimonials";

let mongoClient: MongoClient | null = null;

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
  return mongoClient.db("portfolio").collection<Testimonial>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedTestimonials, null, 2), "utf-8");
  }
}

async function getTestimonialsFromFile(): Promise<Testimonial[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const list: Testimonial[] = JSON.parse(raw);
    if (list.length === 0) {
      await fs.writeFile(DATA_FILE, JSON.stringify(seedTestimonials, null, 2), "utf-8");
      return seedTestimonials;
    }
    return list;
  } catch {
    return seedTestimonials;
  }
}

async function getTestimonialsFromMongo(): Promise<Testimonial[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) {
    await collection.insertMany(seedTestimonials);
    return seedTestimonials;
  }
  return list;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isMongoEnabled()) {
    try {
      return await getTestimonialsFromMongo();
    } catch (err) {
      console.error("MongoDB testimonials fetch failed, falling back to file:", err);
      return getTestimonialsFromFile();
    }
  }
  return getTestimonialsFromFile();
}

export async function saveTestimonial(testimonial: Omit<Testimonial, "id">): Promise<Testimonial> {
  const newItem: Testimonial = {
    ...testimonial,
    id: testimonial.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID(),
  };

  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    await collection.insertOne(newItem);
    return newItem;
  }

  const list = await getTestimonialsFromFile();
  list.push(newItem);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newItem;
}

export async function updateTestimonial(id: string, updatedData: Partial<Testimonial>): Promise<Testimonial | null> {
  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updatedData },
      { returnDocument: "after" }
    );
    return result ?? null;
  }

  const list = await getTestimonialsFromFile();
  const index = list.findIndex((t) => t.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updatedData, id };
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }

  const list = await getTestimonialsFromFile();
  const filtered = list.filter((t) => t.id !== id);
  if (filtered.length === list.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}