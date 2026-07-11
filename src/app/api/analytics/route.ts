import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

let mongoClient: MongoClient | null = null;

async function getAnalyticsCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  return mongoClient.db("portfolio").collection("analytics");
}

// ─── POST: Log a visitor ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const page = body.page || "/";

    // Get IP from Vercel/proxy headers, fallback to remote
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // Skip localhost / private IPs from polluting analytics
    const isLocal =
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.") ||
      ip.startsWith("172.");

    let country = "Unknown";
    let city = "Unknown";
    let countryCode = "XX";

    if (!isLocal) {
      try {
        const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,countryCode,status`, {
          next: { revalidate: 86400 }, // cache per IP for 24h
        });
        if (geo.ok) {
          const geoData = await geo.json();
          if (geoData.status === "success") {
            country = geoData.country || "Unknown";
            city = geoData.city || "Unknown";
            countryCode = geoData.countryCode || "XX";
          }
        }
      } catch {
        // silently ignore geo lookup failures
      }
    } else {
      country = "Local Dev";
      countryCode = "BD";
      city = "Localhost";
    }

    const collection = await getAnalyticsCollection();

    await collection.insertOne({
      ip,
      country,
      city,
      countryCode,
      page,
      userAgent: req.headers.get("user-agent") || "unknown",
      referrer: req.headers.get("referer") || "direct",
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics POST error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// ─── GET: Return analytics summary (admin only) ────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("x-admin-secret");
    if (authHeader !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const collection = await getAnalyticsCollection();

    // Date range: last 30 days
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const [
      totalVisits,
      todayVisits,
      countryStats,
      dailyStats,
      pageStats,
      recentVisits,
    ] = await Promise.all([
      // Total all time
      collection.countDocuments(),

      // Today
      collection.countDocuments({
        timestamp: { $gte: new Date(new Date().toDateString()) },
      }),

      // Top countries (last 30 days)
      collection
        .aggregate([
          { $match: { timestamp: { $gte: since } } },
          { $group: { _id: { country: "$country", countryCode: "$countryCode" }, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ])
        .toArray(),

      // Daily visits for last 14 days
      collection
        .aggregate([
          { $match: { timestamp: { $gte: since } } },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          { $limit: 14 },
        ])
        .toArray(),

      // Top pages
      collection
        .aggregate([
          { $match: { timestamp: { $gte: since } } },
          { $group: { _id: "$page", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 8 },
        ])
        .toArray(),

      // Recent 10 visits
      collection
        .find({}, { projection: { ip: 0 } }) // never expose IPs
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalVisits,
        todayVisits,
        countryStats: countryStats.map((c) => ({
          country: c._id.country,
          countryCode: c._id.countryCode,
          count: c.count,
        })),
        dailyStats: dailyStats.map((d) => ({
          date: d._id,
          count: d.count,
        })),
        pageStats: pageStats.map((p) => ({
          page: p._id,
          count: p.count,
        })),
        recentVisits,
      },
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
