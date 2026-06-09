import { z } from "zod";

export const galleryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const galleryDeleteSchema = z.object({
  id: z.string().trim().min(1, { error: "id is mandatory" }),
});

export type GalleryQuery = z.infer<typeof galleryQuerySchema>;
export type GalleryDelete = z.infer<typeof galleryDeleteSchema>;
