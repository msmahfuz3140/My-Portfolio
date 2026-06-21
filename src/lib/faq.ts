import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { faqs as seedFaqs } from "@/data/faq";
import type { FAQItem } from "@/types/faq";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "faq.json");
const COLLECTION = "faq";

let mongoClient: MongoClient | null = null;

function isMongoEnabled() { return !!process.env.MONGODB_URI; }

async function getMongoCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!mongoClient) { mongoClient = new MongoClient(uri); await mongoClient.connect(); }
  return mongoClient.db("portfolio").collection<FAQItem>(COLLECTION);
}

async function ensureDataFile() {
  try { await fs.access(DATA_FILE); }
  catch { await fs.mkdir(DATA_DIR, { recursive: true }); await fs.writeFile(DATA_FILE, JSON.stringify(seedFaqs, null, 2), "utf-8"); }
}

async function getFromFile(): Promise<FAQItem[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try { const list: FAQItem[] = JSON.parse(raw); if (list.length === 0) { await fs.writeFile(DATA_FILE, JSON.stringify(seedFaqs, null, 2), "utf-8"); return seedFaqs; } return list; }
  catch { return seedFaqs; }
}

async function getFromMongo(): Promise<FAQItem[]> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) { await collection.insertMany(seedFaqs); return seedFaqs; }
  return list;
}

export async function getFaqs(): Promise<FAQItem[]> {
  if (isMongoEnabled()) { try { return await getFromMongo(); } catch (err) { console.error("MongoDB faq fetch failed:", err); return getFromFile(); } }
  return getFromFile();
}

export async function saveFaq(faq: Omit<FAQItem, "id">): Promise<FAQItem> {
  const newItem: FAQItem = { ...faq, id: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID() };
  if (isMongoEnabled()) { const collection = await getMongoCollection(); await collection.insertOne(newItem); return newItem; }
  const list = await getFromFile(); list.push(newItem); await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8"); return newItem;
}

export async function updateFaq(id: string, data: Partial<FAQItem>): Promise<FAQItem | null> {
  if (isMongoEnabled()) { const collection = await getMongoCollection(); const result = await collection.findOneAndUpdate({ id }, { $set: data }, { returnDocument: "after" }); return result ?? null; }
  const list = await getFromFile(); const idx = list.findIndex((f) => f.id === id); if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data, id }; await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8"); return list[idx];
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (isMongoEnabled()) { const collection = await getMongoCollection(); const result = await collection.deleteOne({ id }); return result.deletedCount === 1; }
  const list = await getFromFile(); const filtered = list.filter((f) => f.id !== id); if (filtered.length === list.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8"); return true;
}