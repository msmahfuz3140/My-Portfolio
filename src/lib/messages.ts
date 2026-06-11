import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import type { ContactMessage, ContactFormPayload } from "@/types/message";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "messages.json");
const COLLECTION = "contact_messages";

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

  return mongoClient.db("portfolio").collection<ContactMessage>(COLLECTION);
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function getMessagesFromFile(): Promise<ContactMessage[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const messages: ContactMessage[] = JSON.parse(raw);
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

async function getMessagesFromMongo(): Promise<ContactMessage[]> {
  const collection = await getMongoCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getMessages(): Promise<ContactMessage[]> {
  if (useMongo()) return getMessagesFromMongo();
  return getMessagesFromFile();
}

export async function saveMessage(payload: ContactFormPayload): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    id: crypto.randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
    read: false,
  };

  if (useMongo()) {
    const collection = await getMongoCollection();
    await collection.insertOne(newMessage);
    return newMessage;
  }

  const messages = await getMessagesFromFile();
  messages.unshift(newMessage);
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return newMessage;
}

export async function markMessageAsRead(id: string): Promise<ContactMessage | null> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: { read: true } },
      { returnDocument: "after" }
    );
    return result ?? null;
  }

  const messages = await getMessagesFromFile();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return null;

  messages[index] = { ...messages[index], read: true };
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return messages[index];
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (useMongo()) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }

  const messages = await getMessagesFromFile();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
