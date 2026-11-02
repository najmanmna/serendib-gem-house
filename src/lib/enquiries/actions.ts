"use server";

import { headers } from "next/headers";

import { emailConfig, sendEmail } from "@/lib/email";
import {
  enquiryTypeLabel,
  isEnquiryType,
  type EnquiryFields,
  type EnquiryFormState,
} from "@/lib/enquiries/types";
import { products } from "@/lib/data/products";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

const MAX = { name: 100, email: 200, phone: 30, subject: 150, laboratory: 100, message: 2000 } as const;

/**
 * Best-effort rate limit: 5 submissions per address per 10 minutes, held in memory.
 * Add a Cloudflare rate-limiting rule in production for a durable limit.
 */
const recentSubmissions = new Map<string, number[]>();
function isRateLimited(key: string) {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const recent = (recentSubmissions.get(key) ?? []).filter((time) => time > windowStart);
  recent.push(now);
  recentSubmissions.set(key, recent);
  return recent.length > 5;
}

/** Unique, date-based reference, e.g. SGH-ENQ-20261102-7K4Q. Sequential numbering comes with Sanity. */
function enquiryReference() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const code = Array.from(crypto.getRandomValues(new Uint8Array(4)), (byte) =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(byte % 32),
  ).join("");
  return `SGH-ENQ-${date}-${code}`;
}

const text = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);

const singleLine = (value: string) => value.replace(/\s+/g, " ");

export async function submitEnquiry(_previous: EnquiryFormState, formData: FormData): Promise<EnquiryFormState> {
  const rawType = String(formData.get("type") ?? "general");
  const values: EnquiryFields = {
    type: isEnquiryType(rawType) ? rawType : "general",
    name: singleLine(text(formData, "name", MAX.name)),
    email: text(formData, "email", MAX.email).toLowerCase(),
    phone: singleLine(text(formData, "phone", MAX.phone)),
    subject: singleLine(text(formData, "subject", MAX.subject)),
    productId: text(formData, "productId", 20).toUpperCase(),
    preferredDate: text(formData, "preferredDate", 10),
    preferredTime: text(formData, "preferredTime", 40),
    laboratory: singleLine(text(formData, "laboratory", MAX.laboratory)),
    message: text(formData, "message", MAX.message),
  };

  // Spam check 1: a hidden field that people never see or fill in. Respond as if
  // successful so automated submissions learn nothing.
  if (String(formData.get("sgh_hp") ?? "") !== "") {
    return { status: "success", reference: enquiryReference(), name: values.name };
  }

  const fieldErrors: Partial<Record<keyof EnquiryFields, string>> = {};
  const needsProduct = values.type !== "general";
  const product = values.productId ? products.find((item) => item.productId === values.productId) : undefined;

  if (!values.name) fieldErrors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(values.phone) || digits.length < 9 || digits.length > 15) {
    fieldErrors.phone = "Please enter a valid phone or WhatsApp number.";
  }
  if (values.type === "general") {
    if (!values.subject) fieldErrors.subject = "Please add a subject.";
    if (!values.message) fieldErrors.message = "Please enter your message.";
  }
  if (needsProduct && !values.productId) fieldErrors.productId = "Please enter the gemstone's Product ID.";
  else if (values.productId && !product) fieldErrors.productId = "We couldn't find a gemstone with this Product ID.";
  if (values.type === "viewing") {
    const today = new Date().toISOString().slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate)) fieldErrors.preferredDate = "Please choose a preferred date.";
    else if (values.preferredDate < today) fieldErrors.preferredDate = "Please choose a date from today onwards.";
    if (!values.preferredTime) fieldErrors.preferredTime = "Please choose a preferred time.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  // Spam check 2: forms completed within seconds of appearing are usually automated.
  // A real person who is very quick simply sees an error and can send again.
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 2500) {
    return { status: "error", message: "Please wait a moment and send your enquiry again.", fieldErrors: {}, values };
  }

  const requestHeaders = await headers();
  const client = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(client)) {
    return {
      status: "error",
      message: "You've sent several enquiries in a short time. Please wait a few minutes and try again.",
      fieldErrors: {},
      values,
    };
  }

  const config = emailConfig();
  const unavailable = {
    status: "error" as const,
    message:
      "Sorry, we couldn't send your enquiry just now. Please try again shortly, or contact us on WhatsApp or by email.",
    fieldErrors: {},
    values,
  };
  if (!config) {
    console.error("Enquiry not sent: RESEND_API_KEY, EMAIL_FROM or ADMIN_NOTIFICATION_EMAIL is not configured.");
    return unavailable;
  }

  const reference = enquiryReference();
  const typeLabel = enquiryTypeLabel(values.type);
  const productLine = product ? `${product.name} (${product.productId})` : null;

  const adminText = [
    `Reference: ${reference}`,
    `Type: ${typeLabel}`,
    `Submitted: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Colombo" })} (Colombo time)`,
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone / WhatsApp: ${values.phone}`,
    values.subject && `Subject: ${values.subject}`,
    productLine && `Gemstone: ${productLine}`,
    product && `Gemstone page: ${siteConfig.url}${routes.product(product.slug)}`,
    values.type === "viewing" && `Preferred viewing: ${values.preferredDate}, ${values.preferredTime}`,
    values.laboratory && `Preferred laboratory: ${values.laboratory}`,
    "",
    "Message:",
    values.message || "(none)",
  ]
    .filter((line) => line !== false && line !== null && line !== undefined)
    .join("\n");

  // The administrator email is the record of the enquiry until enquiries are stored in Sanity,
  // so success is only reported once it has been accepted for delivery.
  const delivered = await sendEmail({
    to: config.admin,
    subject: `New ${typeLabel} | ${reference}`,
    text: adminText,
    replyTo: values.email,
  });
  if (!delivered) return unavailable;

  // The acknowledgement confirms receipt only; a failure here does not affect the enquiry.
  await sendEmail({
    to: values.email,
    subject: `We received your enquiry | ${siteConfig.name}`,
    text: [
      `Hello ${values.name},`,
      "",
      `Thank you for contacting ${siteConfig.name}.`,
      "",
      "We have received your enquiry and will review it and get back to you.",
      "",
      `Your enquiry reference is: ${reference}`,
      productLine ? `Gemstone: ${productLine}` : null,
      "",
      "If your enquiry concerns a particular gemstone, please keep this reference for future communication.",
      "",
      "Kind regards,",
      siteConfig.name,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  return { status: "success", reference, name: values.name };
}
