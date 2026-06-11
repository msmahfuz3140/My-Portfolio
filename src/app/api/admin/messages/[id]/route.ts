import { NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";
import { deleteMessage, markMessageAsRead } from "@/lib/messages";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const updated = await markMessageAsRead(id);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update message." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deleteMessage(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete message." }, { status: 500 });
  }
}
