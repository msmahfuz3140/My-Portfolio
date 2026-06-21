import { NextResponse } from "next/server";
import { updateFaq, deleteFaq } from "@/lib/faq";
import { verifyAdminSecret } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateFaq(id, body);
    if (!updated) return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    return NextResponse.json({ success: true, faq: updated });
  } catch (err) { return NextResponse.json({ success: false, message: "Failed to update FAQ" }, { status: 500 }); }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const deleted = await deleteFaq(id);
    if (!deleted) return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (err) { return NextResponse.json({ success: false, message: "Failed to delete FAQ" }, { status: 500 }); }
}