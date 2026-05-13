import { env } from "../config/env.js";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isAdminEmail = (email: string) =>
  normalizeEmail(email) === normalizeEmail(env.ADMIN_EMAIL);

export const isAllowedEmail = (email: string) =>
  isAdminEmail(email) || env.ALLOWED_USER_EMAILS_LIST.includes(normalizeEmail(email));

export const getRoleForEmail = (email: string) =>
  isAdminEmail(email) ? "admin" : "user";
