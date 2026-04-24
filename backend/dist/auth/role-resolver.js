import { env } from "../config/env.js";
export const normalizeEmail = (email) => email.trim().toLowerCase();
export const isAdminEmail = (email) => normalizeEmail(email) === normalizeEmail(env.ADMIN_EMAIL);
export const isAllowedEmail = (email) => isAdminEmail(email) || env.ALLOWED_USER_EMAILS_LIST.includes(normalizeEmail(email));
export const getRoleForEmail = (email) => isAdminEmail(email) ? "admin" : "user";
