import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error("Failed to load site settings:", err);
    return NextResponse.json({ success: false, message: "Failed to load site settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error("Failed to update site settings:", err);
    return NextResponse.json({ success: false, message: "Failed to update site settings" }, { status: 500 });
  }
}