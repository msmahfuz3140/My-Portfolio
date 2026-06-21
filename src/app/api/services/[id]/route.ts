import { NextResponse } from "next/server";
import { updateService, deleteService } from "@/lib/services";
import { verifyAdminSecret } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateService(id, body);
    if (!updated) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, service: updated });
  } catch { return NextResponse.json({ success: false, message: "Failed to update service" }, { status: 500 }); }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const deleted = await deleteService(id);
    if (!deleted) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch { return NextResponse.json({ success: false, message: "Failed to delete service" }, { status: 500 }); }
}