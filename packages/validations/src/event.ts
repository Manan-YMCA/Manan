import { z } from "zod";
import { optionalUrl } from "./common.js";

export const eventPayloadSchema = z.object({
  name: z.string().trim().min(2).max(150),
  description: z.string().trim().min(1),
  date: z.string().trim().min(1).max(120),
  imageUrl: z.url({ error: "invalid image url" }).trim(),
  activityReportUrl: optionalUrl,
  eventReportUrl: optionalUrl,
});

export type EventPayload = z.infer<typeof eventPayloadSchema>;
