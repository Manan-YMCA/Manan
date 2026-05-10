import { z } from "zod";

const currentYear = new Date().getFullYear() + 4;

const optionalUrlField = z
  .union([z.string().url(), z.literal(""), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null));

export const socialLinkSchema = z.object({
  title: z.string().trim().min(1),
  link: z.string().trim().url(),
});

export const memberPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  admission: z.coerce.number().int().min(2015).max(currentYear).optional(),
  passOutYear: z.coerce.number().int().min(2015).max(currentYear).optional(),
  role: z.string().trim().min(2).max(120),
  frameworks: z.string().trim().min(1),
  languages: z.string().trim().min(1),
  otherSkills: z.string().trim().min(1),
  banner: optionalUrlField,
  pfp: z.string().trim().url(),
  pfpPublicId: z
    .union([z.string().trim().min(1), z.literal(""), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
  socialLinks: z.array(socialLinkSchema).max(5).default([]),
  email: z.string().email().optional(),
}).superRefine((value, ctx) => {
  const resolvedYear = value.passOutYear ?? value.admission;

  if (typeof resolvedYear !== "number" || Number.isNaN(resolvedYear)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passOutYear"],
      message: "Pass out year is required.",
    });
    return;
  }

  if (resolvedYear < 2015 || resolvedYear > currentYear) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passOutYear"],
      message: `Pass out year must be between 2015 and ${currentYear}.`,
    });
  }
});

export type MemberPayload = z.infer<typeof memberPayloadSchema>;
