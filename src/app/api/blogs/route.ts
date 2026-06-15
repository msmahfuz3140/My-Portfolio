import { NextResponse } from "next/server";
import { getBlogs, saveBlog } from "@/lib/blogs";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try {
    const list = await getBlogs();
    return NextResponse.json({ success: true, blogs: list });
  } catch (err) {
    console.error("Failed to load blogs:", err);
    return NextResponse.json({ success: false, message: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Simple validation
    if (!body.title || !body.excerpt || !body.category || !body.readTime || !body.url) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const created = await saveBlog(body);
    return NextResponse.json({ success: true, blog: created });
  } catch (err) {
    console.error("Failed to create blog:", err);
    return NextResponse.json({ success: false, message: "Failed to create blog" }, { status: 500 });
  }
}
