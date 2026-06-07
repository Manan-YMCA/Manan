import { z } from "zod";

const envSchema = z.object({
  PORT: z.number().default(4000),
  FRONTEND_URL: z.url(),
  TRUSTED_ORIGINS: z.array(z.url()),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(16),
  DATABASE_URL: z.string().min(1),
  ADMIN_EMAIL: z.email(),
  RESEND_API_KEY: z.string(),
  RESEND_FROM_EMAIL: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);


