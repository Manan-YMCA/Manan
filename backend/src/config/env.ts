import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:4000"),
  BETTER_AUTH_SECRET: z.string().min(16),
  DATABASE_URL: z.string().min(1),
  ADMIN_EMAIL: z.string().email().default("xyz@gmail.com"),
  ALLOWED_USER_EMAILS: z.string().default(""),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  ALLOWED_USER_EMAILS_LIST: parsedEnv.ALLOWED_USER_EMAILS.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
};
