import { z } from "zod";

export const socialLinkSchema = z.object({
  title: z.string().trim().min(1),
  link: z.url(),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1),
  image: z.url().nullable(),
  admissionYear: z.number().int().min(2000).max(2100),
  rollNumber: z.string().trim().min(1),
  graduationYear: z.number().int().min(2000).max(2100),
  designation: z.string().trim().min(1),
  techStack: z.string().trim().min(1),
  languages: z.string().trim().min(1),
  otherSkills: z.string().trim().min(1),
  bannerUrl: z.url(),
  socialLinks: z.array(socialLinkSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
