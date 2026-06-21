import { NextResponse } from "next/server";
import { getFaqs, saveFaq } from "@/lib/faq";
import { verifyAdminSecret } from "@/lib/admin-auth";

export async function GET() {
  try { const list = await getFaqs(); return NextResponse.json({ success: true, faqs: list }); }
  catch (err) { return NextResponse.json({ success: false, message: "Failed to load FAQs" }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.question || !body.answer) return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    const created = await saveFaq(body);
    return NextResponse.json({ success: true, faq: created });
  } catch (err) { return NextResponse.json({ success: false, message: "Failed to create FAQ" }, { status: 500 }); }
}