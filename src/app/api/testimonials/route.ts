import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonial } from "@/lib/testimonials";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try {
    const list = await getTestimonials();
    return NextResponse.json({ success: true, testimonials: list });
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    return NextResponse.json({ success: false, message: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const created = await saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: created });
  } catch (err) {
    console.error("Failed to create testimonial:", err);
    return NextResponse.json({ success: false, message: "Failed to create testimonial" }, { status: 500 });
  }
}