import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "../db/index.js";
import * as schema from "../db/schema/index.js";
import { env } from "../config/env.js";
import { getRoleForEmail, isAllowedEmail, normalizeEmail } from "./role-resolver.js";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
const resendFromEmail = env.RESEND_FROM_EMAIL?.trim();
const useCrossSiteCookies = env.BETTER_AUTH_URL.startsWith("https://");

export const auth = betterAuth({
  appName: "Manan Website",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: env.FRONTEND_URL_LIST,
  advanced: {
    useSecureCookies: useCrossSiteCookies,
    defaultCookieAttributes: {
      sameSite: useCrossSiteCookies ? "none" : "lax",
      secure: useCrossSiteCookies,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    emailOTP({
      expiresIn: 300,
      allowedAttempts: 5,
      resendStrategy: "reuse",
      async sendVerificationOTP({ email, otp, type }) {
        if (!resend || !resendFromEmail) {
          throw new Error("Resend configuration is missing.");
        }

        if (resendFromEmail.includes("yourdomain.com")) {
          throw new Error(
            "RESEND_FROM_EMAIL is still using the placeholder domain. Replace it with an email from a verified Resend domain."
          );
        }

        const subject =
          type === "sign-in"
            ? "Your Manan login code"
            : type === "email-verification"
              ? "Verify your email"
              : "Your password reset code";

        const response = await resend.emails.send({
          from: resendFromEmail,
          to: [email],
          subject,
          text: `Your Manan Website OTP is ${otp}. This code expires in 5 minutes.`,
          html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Manan Website</h2>
            <p>Your one-time code is:</p>
            <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px;">${otp}</p>
            <p>This code will expire in 5 minutes.</p>
          </div>`,
        });

        if (response.error) {
          if (
            response.error.message?.toLowerCase().includes("not authorized to send emails from")
          ) {
            throw new Error(
              "This Resend API key cannot send from the current RESEND_FROM_EMAIL. Use a sender address from a domain verified inside the same Resend account."
            );
          }

          throw new Error(
            response.error.message || "Failed to send OTP email through Resend."
          );
        }
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path !== "/email-otp/send-verification-otp" &&
        ctx.path !== "/sign-in/email-otp"
      ) {
        return;
      }

      const email = normalizeEmail(String(ctx.body?.email || ""));
      if (!isAllowedEmail(email)) {
        throw new APIError("BAD_REQUEST", {
          message: "You're not authorized as club member :(",
        });
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const email = normalizeEmail(user.email);
          if (!isAllowedEmail(email)) {
            throw new Error("Unauthorized email.");
          }

          return {
            data: {
              ...user,
              email,
              emailVerified: true,
              role: getRoleForEmail(email),
            },
          };
        },
      },
    },
  },
});
