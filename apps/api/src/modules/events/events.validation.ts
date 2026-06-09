import { z } from "zod";

export const eventQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const eventParamSchema = z.object({
  id: z.string().trim().min(1, { error: "id is mandatory" }),
});

export type EventQuery = z.infer<typeof eventQuerySchema>;
export type EventParam = z.infer<typeof eventParamSchema>;
