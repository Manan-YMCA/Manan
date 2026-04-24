import { z } from "zod";
export const galleryPayloadSchema = z.object({
    name: z.string().trim().min(2).max(150),
    desc: z.string().trim().min(1),
    image: z.string().trim().url(),
    imagePublicId: z
        .union([z.string().trim().min(1), z.literal(""), z.null(), z.undefined()])
        .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
});
