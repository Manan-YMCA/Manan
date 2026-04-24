import { z } from "zod";

export const siteInfoCardSchema = z.object({
  title: z.string().trim().min(1),
  subtitle: z.string().trim().min(1),
  frame: z.string().trim().url().optional(),
  rev: z.boolean().optional(),
  invert: z.boolean().optional(),
});

export const siteContentPayloadSchema = z.object({
  heroTitle: z.string().trim().min(1).max(100),
  heroSubtitle: z.string().trim().min(1).max(100),
  introText: z.string().trim().min(1),
  infoCards: z.array(siteInfoCardSchema).default([]),
});

export type SiteContentPayload = z.infer<typeof siteContentPayloadSchema>;
