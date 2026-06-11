import { NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";
import { getMessages } from "@/lib/messages";

export async function GET(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    return NextResponse.json({ success: true, messages });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to load messages." }, { status: 500 });
  }
}
