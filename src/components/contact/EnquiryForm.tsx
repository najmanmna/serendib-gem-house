"use client";

import { useActionState, useState, type ReactNode } from "react";

import { CheckCircleIcon } from "@/components/ui/icons";
import { submitEnquiry } from "@/lib/enquiries/actions";
import { enquiryTypes, isEnquiryType, type EnquiryFields, type EnquiryFormState, type EnquiryType } from "@/lib/enquiries/types";

const inputClass =
  "mt-2 block h-12 w-full rounded-brand border border-line bg-white px-4 text-[0.9375rem] text-navy placeholder:text-muted focus:border-navy focus:outline-none aria-[invalid=true]:border-[#b3122e]";

type FieldProps = {
  name: keyof EnquiryFields;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: { id: string; name: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode;
};

function Field({ name, label, required, hint, error, children }: FieldProps) {
  const id = `enquiry-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="text-[#b3122e]" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b3122e]">
          {error}
        </p>
      )}
    </div>
  );
}

type EnquiryFormProps = {
  initialType?: string;
  initialProductId?: string;
  /** Name of the gemstone matching `initialProductId`, shown for reassurance. */
  productName?: string;
};

export function EnquiryForm({ initialType, initialProductId = "", productName }: EnquiryFormProps) {
  const [state, action, pending] = useActionState(submitEnquiry, { status: "idle" } as EnquiryFormState);
  const values = state.status === "error" ? state.values : {};
  const errors = state.status === "error" ? state.fieldErrors : {};
  const [type, setType] = useState<EnquiryType>(
    initialType && isEnquiryType(initialType) ? initialType : initialProductId ? "purchase" : "general",
  );

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-brand bg-pale-blue p-8 sm:p-10">
        <CheckCircleIcon className="size-10 text-navy" strokeWidth={1.3} />
        <h2 className="mt-5 font-heading text-[2rem] leading-tight font-semibold">Thank you, {state.name}</h2>
        <p className="mt-3 max-w-md leading-relaxed text-navy/75">
          We have received your enquiry and will be in touch soon. A confirmation has been sent to your email.
        </p>
        <p className="mt-5 text-sm text-navy">
          Your reference: <span className="font-semibold tracking-wide">{state.reference}</span>
        </p>
      </div>
    );
  }

  const isGeneral = type === "general";

  return (
    <form action={action} noValidate className="space-y-6">
      {state.status === "error" && (
        <p role="alert" className="rounded-brand bg-[#fbecee] px-4 py-3 text-sm text-[#8f0f25]">
          {state.message}
        </p>
      )}

      <Field name="type" label="Enquiry type" required>
        {(props) => (
          <select
            {...props}
            value={type}
            onChange={(event) => setType(event.target.value as EnquiryType)}
            className={`${inputClass} cursor-pointer`}
          >
            {enquiryTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name}>
          {(props) => <input {...props} autoComplete="name" defaultValue={values.name} className={inputClass} />}
        </Field>
        <Field name="phone" label="Phone / WhatsApp" required error={errors.phone}>
          {(props) => (
            <input
              {...props}
              type="tel"
              autoComplete="tel"
              placeholder="+94 7X XXX XXXX"
              defaultValue={values.phone}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <Field name="email" label="Email" required error={errors.email}>
        {(props) => (
          <input {...props} type="email" autoComplete="email" defaultValue={values.email} className={inputClass} />
        )}
      </Field>

      {isGeneral ? (
        <Field name="subject" label="Subject" required error={errors.subject}>
          {(props) => <input {...props} defaultValue={values.subject} className={inputClass} />}
        </Field>
      ) : (
        <Field
          name="productId"
          label="Product ID"
          required
          error={errors.productId}
          hint={productName ? `Gemstone: ${productName}` : "Shown on each gemstone page, e.g. SGH-0001."}
        >
          {(props) => (
            <input
              {...props}
              defaultValue={values.productId ?? initialProductId}
              autoCapitalize="characters"
              className={`${inputClass} uppercase`}
            />
          )}
        </Field>
      )}

      {type === "viewing" && (
        <>
          <p className="rounded-brand bg-pale-blue px-4 py-3 text-sm leading-relaxed text-navy/80">
            Viewings are by appointment in Colombo. Submitting a request does not confirm an appointment; we will
            contact you to arrange the details.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field name="preferredDate" label="Preferred date" required error={errors.preferredDate}>
              {(props) => (
                <input
                  {...props}
                  type="date"
                  // Set in the browser only: no viewing dates in the past.
                  ref={(input) => {
                    if (input) input.min = new Date().toISOString().slice(0, 10);
                  }}
                  defaultValue={values.preferredDate}
                  className={inputClass}
                />
              )}
            </Field>
            <Field name="preferredTime" label="Preferred time" required error={errors.preferredTime}>
              {(props) => (
                <select {...props} defaultValue={values.preferredTime ?? ""} className={`${inputClass} cursor-pointer`}>
                  <option value="" disabled>
                    Choose a time
                  </option>
                  <option>Morning (9am – 12pm)</option>
                  <option>Afternoon (12pm – 4pm)</option>
                  <option>Evening (4pm – 7pm)</option>
                </select>
              )}
            </Field>
          </div>
        </>
      )}

      {type === "certification" && (
        <>
          <p className="rounded-brand bg-pale-blue px-4 py-3 text-sm leading-relaxed text-navy/80">
            Certification is optional and involves an additional fee. We will confirm the laboratory, cost and
            turnaround with you before going ahead.
          </p>
          <Field name="laboratory" label="Preferred laboratory" error={errors.laboratory}>
            {(props) => <input {...props} defaultValue={values.laboratory} className={inputClass} />}
          </Field>
        </>
      )}

      <Field name="message" label="Message" required={isGeneral} error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            rows={5}
            defaultValue={values.message}
            className={`${inputClass} h-auto resize-y py-3 leading-relaxed`}
          />
        )}
      </Field>

      {/* Spam protection: hidden from people, often filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input name="sgh_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {/* When the form appeared, set in the browser: very fast submissions are treated as spam. */}
      <input
        type="hidden"
        name="startedAt"
        ref={(input) => {
          if (input && !input.value) input.value = String(Date.now());
        }}
      />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-brand bg-navy px-8 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-hover disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-muted">We only use your details to respond to your enquiry.</p>
      </div>
    </form>
  );
}
