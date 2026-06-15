import { NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/projects";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try {
    const list = await getProjects();
    return NextResponse.json({ success: true, projects: list });
  } catch (err) {
    console.error("Failed to load projects:", err);
    return NextResponse.json({ success: false, message: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Simple validation
    if (!body.title || !body.description || !body.fullDescription) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const created = await saveProject(body);
    return NextResponse.json({ success: true, project: created });
  } catch (err) {
    console.error("Failed to create project:", err);
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 });
  }
}
