import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
});

export type MemberInput = z.infer<typeof memberSchema>;
