import { NextResponse } from "next/server";
import { updateSkill, deleteSkill } from "@/lib/skills";
import { verifyAdminSecret } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updated = await updateSkill(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, skill: updated });
  } catch (err) {
    console.error("Failed to update skill:", err);
    return NextResponse.json({ success: false, message: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteSkill(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (err) {
    console.error("Failed to delete skill:", err);
    return NextResponse.json({ success: false, message: "Failed to delete skill" }, { status: 500 });
  }
}