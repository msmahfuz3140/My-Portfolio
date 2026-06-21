import { NextResponse } from "next/server";
import { getServices, saveService } from "@/lib/services";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try { const list = await getServices(); return NextResponse.json({ success: true, services: list }); }
  catch { return NextResponse.json({ success: false, message: "Failed to load services" }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.title) return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    const created = await saveService(body);
    return NextResponse.json({ success: true, service: created });
  } catch { return NextResponse.json({ success: false, message: "Failed to create service" }, { status: 500 }); }
}