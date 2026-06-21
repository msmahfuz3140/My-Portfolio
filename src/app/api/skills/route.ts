import { NextResponse } from "next/server";
import { getSkills, saveSkill } from "@/lib/skills";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try {
    const list = await getSkills();
    return NextResponse.json({ success: true, skills: list });
  } catch (err) {
    console.error("Failed to load skills:", err);
    return NextResponse.json({ success: false, message: "Failed to load skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }
    const created = await saveSkill(body);
    return NextResponse.json({ success: true, skill: created });
  } catch (err) {
    console.error("Failed to create skill:", err);
    return NextResponse.json({ success: false, message: "Failed to create skill" }, { status: 500 });
  }
}