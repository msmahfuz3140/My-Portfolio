import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { services as seedServices } from "@/data/services";
import type { Service } from "@/data/services";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "services.json");
const COLLECTION = "services";
let mongoClient: MongoClient | null = null;
function isMongoEnabled() { return !!process.env.MONGODB_URI; }

async function getMongoCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!mongoClient) { mongoClient = new MongoClient(uri); await mongoClient.connect(); }
  return mongoClient.db("portfolio").collection<Service>(COLLECTION);
}

async function ensureDataFile() {
  try { await fs.access(DATA_FILE); }
  catch { await fs.mkdir(DATA_DIR, { recursive: true }); await fs.writeFile(DATA_FILE, JSON.stringify(seedServices, null, 2), "utf-8"); }
}

async function getFromFile(): Promise<Service[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try { const list = JSON.parse(raw); if (list.length === 0) { await fs.writeFile(DATA_FILE, JSON.stringify(seedServices, null, 2), "utf-8"); return seedServices; } return list; }
  catch { return seedServices; }
}

async function getFromMongo(): Promise<Service[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) { await collection.insertMany(seedServices); return seedServices; }
  return list;
}

export async function getServices(): Promise<Service[]> {
  if (isMongoEnabled()) { try { return await getFromMongo(); } catch { return getFromFile(); } }
  return getFromFile();
}

export async function saveService(svc: Omit<Service, "id">): Promise<Service> {
  const newItem: Service = { ...svc, id: svc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID() };
  if (isMongoEnabled()) { const collection = await getMongoCollection(); await collection.insertOne(newItem); return newItem; }
  const list = await getFromFile(); list.push(newItem); await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8"); return newItem;
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  if (isMongoEnabled()) { const collection = await getMongoCollection(); const result = await collection.findOneAndUpdate({ id }, { $set: data }, { returnDocument: "after" }); return result ?? null; }
  const list = await getFromFile(); const idx = list.findIndex((s) => s.id === id); if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data, id }; await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8"); return list[idx];
}

export async function deleteService(id: string): Promise<boolean> {
  if (isMongoEnabled()) { const collection = await getMongoCollection(); const result = await collection.deleteOne({ id }); return result.deletedCount === 1; }
  const list = await getFromFile(); const filtered = list.filter((s) => s.id !== id); if (filtered.length === list.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8"); return true;
}