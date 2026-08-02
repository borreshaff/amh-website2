"use client";

import { useState, FormEvent } from "react";
import { inquirySchema } from "@/lib/validation/inquirySchema";

const SERVICES = [
  "Brand Strategy",
  "Brand Identity",
  "Video Production",
  "Photography",
  "Social Media",
  "Digital Marketing",
  "Paid Campaign",
  "Full Campaign",
  "Website or Landing Page",
  "Ongoing Marketing Support",
  "Other"
];

const BUDGET_RANGES = ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k+", "Not sure yet"];

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const raw = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      whatsapp: formData.get("whatsapp") || undefined,
      industry: formData.get("industry"),
      service: formData.get("service"),
      objective: formData.get("objective"),
      budgetRange: formData.get("budgetRange"),
      launchDate: formData.get("launchDate") || undefined,
      referralSource: formData.get("referralSource") || undefined,
      details: formData.get("details") || undefined,
      consent: formData.get("consent") === "on"
    };

    const parsed = inquirySchema.safeParse(raw);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ form: "Something went wrong. Please try again or email us directly." });
    }
  }

  if (status === "success") {
    return (
      <p className="font-body text-white" role="status">
        Thank you — your project inquiry has been received. Our team will be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid max-w-2xl gap-6">
      {errors.form && (
        <p className="font-body text-sm text-red-400" role="alert">{errors.form}</p>
      )}

      <Field label="Full Name" name="fullName" error={errors.fullName} required />
      <Field label="Company" name="company" error={errors.company} required />
      <Field label="Email" name="email" type="email" error={errors.email} required />
      <Field label="Mobile Number" name="mobile" error={errors.mobile} required />
      <Field label="WhatsApp Number (optional)" name="whatsapp" />

      <Field label="Industry" name="industry" error={errors.industry} required />

      <SelectField
        label="Service Required"
        name="service"
        options={SERVICES}
        error={errors.service}
        required
      />

      <TextareaField
        label="Project Objective"
        name="objective"
        error={errors.objective}
        required
      />

      <SelectField
        label="Estimated Budget Range"
        name="budgetRange"
        options={BUDGET_RANGES}
        error={errors.budgetRange}
        required
      />

      <Field label="Preferred Launch Date (optional)" name="launchDate" type="date" />
      <Field label="How did you hear about AMH? (optional)" name="referralSource" />
      <TextareaField label="Additional Details (optional)" name="details" />

      <label className="flex items-start gap-3 font-body text-sm text-white/70">
        <input type="checkbox" name="consent" required className="mt-1" />
        I consent to AMH Group contacting me regarding this inquiry.
      </label>
      {errors.consent && (
        <p className="font-body text-sm text-red-400" role="alert">{errors.consent}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit bg-gold px-8 py-3 font-body text-xs uppercase tracking-wide2 text-black disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-body text-xs uppercase tracking-wide2 text-white/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full border border-white/20 bg-transparent px-4 py-3 font-body text-white focus:border-gold focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 font-body text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  label,
  name,
  error,
  required
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-body text-xs uppercase tracking-wide2 text-white/60">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full border border-white/20 bg-transparent px-4 py-3 font-body text-white focus:border-gold focus:outline-none"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 font-body text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
  required
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-body text-xs uppercase tracking-wide2 text-white/60">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full border border-white/20 bg-black px-4 py-3 font-body text-white focus:border-gold focus:outline-none"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 font-body text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
