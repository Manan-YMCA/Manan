import { env } from "../../config/env.js";
import { normalizeEmail } from "../../auth/role-resolver.js";

export const allowlistService = {
  getAdminEmail() {
    return normalizeEmail(env.ADMIN_EMAIL);
  },

  getAllowedUserEmails() {
    return env.ALLOWED_USER_EMAILS_LIST.map(normalizeEmail);
  },

  isAllowedEmail(email: string) {
    const normalizedEmail = normalizeEmail(email);

    return (
      normalizedEmail === normalizeEmail(env.ADMIN_EMAIL) ||
      env.ALLOWED_USER_EMAILS_LIST.includes(normalizedEmail)
    );
  },
};
