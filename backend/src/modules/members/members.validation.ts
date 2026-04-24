import { z } from "zod";

const currentYear = new Date().getFullYear() + 1;

const optionalUrlField = z
  .union([z.string().url(), z.literal(""), z.null(), z.undefined()])
  .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null));

export const socialLinkSchema = z.object({
  title: z.string().trim().min(1),
  link: z.string().trim().url(),
});

export const memberPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  admission: z.coerce.number().int().min(2015).max(currentYear),
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
});

export type MemberPayload = z.infer<typeof memberPayloadSchema>;
