import { z } from "zod";

export const optionalUrl = z
  .string()
  .transform((v) => (v.trim() ? v.trim() : null))
  .pipe(z.union([z.url({ error: "invalid url" }), z.literal(null)]));
