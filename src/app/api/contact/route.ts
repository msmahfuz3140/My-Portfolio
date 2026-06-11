import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/messages";
import type { ContactFormPayload } from "@/types/message";

function validatePayload(body: Partial<ContactFormPayload>): body is ContactFormPayload {
  return !!(
    body.name?.trim() &&
    body.address?.trim() &&
    body.phone?.trim() &&
    body.email?.trim() &&
    body.message?.trim()
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormPayload>;

    if (!validatePayload(body)) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json({ success: false, message: "Phone must be 11 digits." }, { status: 400 });
    }

    const payload: ContactFormPayload = {
      name: body.name.trim(),
      address: body.address.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
    };

    await saveMessage(payload);

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const formData = new FormData();
      formData.append("access_key", web3formsKey);
      Object.entries(payload).forEach(([key, value]) => formData.append(key, value));

      fetch("https://api.web3forms.com/submit", { method: "POST", body: formData }).catch(() => {});
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to save message." }, { status: 500 });
  }
}
