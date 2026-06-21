import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import type { SiteSettings } from "@/types/site-settings";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site-settings.json");
const COLLECTION = "siteSettings";

let mongoClient: MongoClient | null = null;

const defaultSettings: SiteSettings = {
  siteTitle: "Md Mahfuzul Haque | Full Stack Developer",
  siteDescription:
    "Md Mahfuzul Haque is a passionate Full Stack Developer specializing in Next.js, React, Node.js, TypeScript & MongoDB. Building fast, modern and SEO-optimized web applications.",
  logoUrl: "/images/my-photo.jpg",
  faviconUrl: "/images/my-photo.jpg",
  contactEmail: "mdmahfuzulhaque3140@gmail.com",
  contactPhone: "01956016119",
  socialLinks: {
    github: "https://github.com/msmahfuz3140",
    linkedin: "https://www.linkedin.com/in/msmahfuz3140",
    whatsapp: "https://wa.me/8801956016119",
    instagram: "https://www.instagram.com/msmahfuz3140",
    facebook: "https://www.facebook.com/msmahfuz3140",
  },
  aboutContent: "",
  seoKeywords: [
    "Md Mahfuzul Haque",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "Web Developer Bangladesh",
  ],
};

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
  return mongoClient.db("portfolio").collection<SiteSettings>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultSettings, null, 2), "utf-8");
  }
}

async function getSettingsFromFile(): Promise<SiteSettings> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return defaultSettings;
  }
}

async function getSettingsFromMongo(): Promise<SiteSettings> {
  const collection = await getMongoCollection();
  const list = await collection.find({}).toArray();
  if (list.length === 0) {
    await collection.insertOne(defaultSettings);
    return defaultSettings;
  }
  return list[0];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isMongoEnabled()) {
    try {
      return await getSettingsFromMongo();
    } catch (err) {
      console.error("MongoDB settings fetch failed, falling back to file:", err);
      return getSettingsFromFile();
    }
  }
  return getSettingsFromFile();
}

export async function updateSiteSettings(updatedData: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isMongoEnabled()) {
    const collection = await getMongoCollection();
    const list = await collection.find({}).toArray();
    if (list.length === 0) {
      const merged = { ...defaultSettings, ...updatedData };
      await collection.insertOne(merged);
      return merged;
    }
    const currentId = list[0]._id;
    await collection.updateOne({ _id: currentId }, { $set: updatedData });
    const result = await collection.findOne({ _id: currentId });
    return result ?? { ...defaultSettings, ...updatedData };
  }

  const current = await getSettingsFromFile();
  const updated = { ...current, ...updatedData };
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}