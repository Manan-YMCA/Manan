import { z } from "zod";

export const eventPayloadSchema = z.object({
  name: z.string().trim().min(2).max(150),
  date: z.string().trim().min(2).max(120),
  eventDateValue: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  desc: z.string().trim().min(1),
  detailsLink: z
    .union([z.string().trim().url(), z.literal(""), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
  eventImage: z.string().trim().url(),
  eventImagePublicId: z
    .union([z.string().trim().min(1), z.literal(""), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim() ? value.trim() : null)),
}).superRefine((value, ctx) => {
  const parsedDate = new Date(`${value.eventDateValue}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["eventDateValue"],
      message: "Invalid event date.",
    });
  }
});

export type EventPayload = z.infer<typeof eventPayloadSchema>;
