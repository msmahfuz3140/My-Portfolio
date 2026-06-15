import { NextResponse } from "next/server";
import { updateBlog, deleteBlog } from "@/lib/blogs";
import { verifyAdminSecret } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updated = await updateBlog(id, body);
    
    if (!updated) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (err) {
    console.error("Failed to update blog:", err);
    return NextResponse.json({ success: false, message: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteBlog(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete blog:", err);
    return NextResponse.json({ success: false, message: "Failed to delete blog" }, { status: 500 });
  }
}
