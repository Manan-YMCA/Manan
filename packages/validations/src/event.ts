import { z } from "zod";
import { optionalUrl } from "./common.js";

const dateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format");

export const eventPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(150),
    venue: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1),
    fromDate: dateSchema,
    toDate: dateSchema,
    imageUrl: z.url({ error: "invalid image url" }).trim(),
    activityReportUrl: optionalUrl,
    eventReportUrl: optionalUrl,
  })
  .refine((event) => event.toDate >= event.fromDate, {
    path: ["toDate"],
    error: "to date must be on or after from date",
  });

export type EventPayload = z.infer<typeof eventPayloadSchema>;
