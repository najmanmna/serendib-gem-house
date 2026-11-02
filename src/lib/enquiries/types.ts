/** Enquiry types and form state shared by the enquiry form and its server action. */

export const enquiryTypes = [
  { value: "general", label: "General enquiry" },
  { value: "purchase", label: "Purchase enquiry" },
  { value: "viewing", label: "Viewing request" },
  { value: "certification", label: "Certification request" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export function isEnquiryType(value: string): value is EnquiryType {
  return enquiryTypes.some((type) => type.value === value);
}

export function enquiryTypeLabel(value: EnquiryType) {
  return enquiryTypes.find((type) => type.value === value)?.label ?? "Enquiry";
}

export type EnquiryFields = {
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  subject: string;
  productId: string;
  preferredDate: string;
  preferredTime: string;
  laboratory: string;
  message: string;
};

export type EnquiryFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<keyof EnquiryFields, string>>;
      values: Partial<EnquiryFields>;
    }
  | { status: "success"; reference: string; name: string };
