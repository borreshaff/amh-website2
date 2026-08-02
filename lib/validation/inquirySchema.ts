import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  company: z.string().min(1, "Please enter your company name."),
  email: z.string().email("Please enter a valid email address."),
  mobile: z.string().min(6, "Please enter a valid mobile number."),
  whatsapp: z.string().optional(),
  industry: z.string().min(1, "Please select an industry."),
  service: z.string().min(1, "Please select a service."),
  objective: z.string().min(10, "Please tell us a little about your objective."),
  budgetRange: z.string().min(1, "Please select a budget range."),
  launchDate: z.string().optional(),
  referralSource: z.string().optional(),
  details: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm consent to proceed." })
  })
});

export type InquiryInput = z.infer<typeof inquirySchema>;
