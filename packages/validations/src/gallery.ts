import { z } from "zod";

export const galleryPayloadSchema = z.object({
  name: z.string().trim().min(2).max(150),
  description: z.string().trim().min(1),
  imageUrl: z.url({ error: "invalid image url" }).trim(),
});

export type GalleryPayload = z.infer<typeof galleryPayloadSchema>;
