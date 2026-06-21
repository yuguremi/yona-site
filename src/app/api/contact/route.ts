import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";

/**
 * Contact submission handler (SPEC §4.6).
 *
 * Sends email via the Resend REST API when RESEND_API_KEY / CONTACT_TO_EMAIL /
 * CONTACT_FROM_EMAIL are configured. When they are not, it falls back to a
 * "dummy" mode that validates and logs the submission so the build and the
 * form keep working without any external service.
 */
function buildEmailText(data: ContactInput): string {
  const lines = [
    `お名前: ${data.name}`,
    `メール: ${data.email}`,
    data.company ? `会社・団体名: ${data.company}` : null,
    data.phone ? `電話番号: ${data.phone}` : null,
    `問い合わせ種別: ${data.inquiryType}`,
    data.budget ? `予算帯: ${data.budget}` : null,
    data.deadline ? `希望納期: ${data.deadline}` : null,
    data.referenceUrl ? `参考URL: ${data.referenceUrl}` : null,
    "",
    "相談内容:",
    data.message,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "入力内容を確認してください。" },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Dummy mode — no email service configured.
  if (!apiKey || !to || !from) {
    console.info("[contact] Dummy mode submission:", {
      name: parsed.data.name,
      email: parsed.data.email,
      inquiryType: parsed.data.inquiryType,
    });
    return NextResponse.json({ ok: true, mode: "dummy" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.email,
        subject: `[yona] お問い合わせ: ${parsed.data.inquiryType}（${parsed.data.name}様）`,
        text: buildEmailText(parsed.data),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend API error:", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}
