import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquirySchema";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Basic honeypot / rate-limit hooks belong here before dispatch.
  // TODO: send via Resend/SendGrid and/or push to CRM. Never log full
  // personal details — log only a submission id/timestamp.
  try {
    // await sendInquiryNotification(parsed.data);
    console.log("Inquiry received:", new Date().toISOString());
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process inquiry:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
