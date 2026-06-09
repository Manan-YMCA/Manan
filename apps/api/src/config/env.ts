import { z } from "zod";

const commaSeparatedUrls = z
  .string()
  .optional()
  .default("")
  .transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.url()));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  LOG_PRETTY: z
    .enum(["true", "false"])
    .optional()
    .default("false")
    .transform((value) => value === "true"),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.url(),
  TRUSTED_ORIGINS: commaSeparatedUrls,
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
