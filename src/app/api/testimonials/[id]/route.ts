import { NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/testimonials";
import { verifyAdminSecret } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updated = await updateTestimonial(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err) {
    console.error("Failed to update testimonial:", err);
    return NextResponse.json({ success: false, message: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteTestimonial(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    console.error("Failed to delete testimonial:", err);
    return NextResponse.json({ success: false, message: "Failed to delete testimonial" }, { status: 500 });
  }
}