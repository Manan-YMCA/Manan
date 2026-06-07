import { env } from "../config/env.js";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isAdminEmail = (email: string) =>
  normalizeEmail(email) === normalizeEmail(env.ADMIN_EMAIL);
