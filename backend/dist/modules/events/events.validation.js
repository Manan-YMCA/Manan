import { z } from "zod";
export const eventPayloadSchema = z.object({
    name: z.string().trim().min(2).max(150),
    date: z.string().trim().min(2).max(120),
    desc: z.string().trim().min(1),
    detailsLink: z
        .union([z.string().trim().url(), z.literal(""), z.null(), z.undefined()])
        .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
    eventImage: z.string().trim().url(),
    eventImagePublicId: z
        .union([z.string().trim().min(1), z.literal(""), z.null(), z.undefined()])
        .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
});
