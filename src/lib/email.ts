/**
 * Transactional email via Resend's HTTP API (no SDK, so it also runs on
 * Cloudflare Workers). Server-side only: the API key must never reach the browser.
 *
 * Required environment variables:
 *   RESEND_API_KEY            Resend API key
 *   EMAIL_FROM                Verified sender, e.g. "Serendib Crown Gems <hello@yourdomain>"
 *   ADMIN_NOTIFICATION_EMAIL  Where new enquiries are sent
 */

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const admin = process.env.ADMIN_NOTIFICATION_EMAIL?.trim();
  return apiKey && from && admin ? { apiKey, from, admin } : null;
}

/** Returns true only if Resend accepted the message. */
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  const config = emailConfig();
  if (!config) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("Email delivery failed", response.status, await response.text().catch(() => ""));
    }
    return response.ok;
  } catch (error) {
    console.error("Email delivery failed", error);
    return false;
  }
}
