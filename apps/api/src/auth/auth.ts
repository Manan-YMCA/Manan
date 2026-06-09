import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import * as schema from "../db/schema/auth-schema.js";
import { env } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);
const resendFromEmail = env.RESEND_FROM_EMAIL;

export const auth = betterAuth({
  appName: "manan",
  trustedOrigins: env.TRUSTED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  advanced: {
    database: {
      generateId: (opt) => `${opt.model}-${crypto.randomUUID()}`,
    },
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
            "RESEND_FROM_EMAIL is still using the placeholder domain. Replace it with an email from a verified Resend domain.",
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
            response.error.message
              ?.toLowerCase()
              .includes("not authorized to send emails from")
          ) {
            throw new Error(
              "This Resend API key cannot send from the current RESEND_FROM_EMAIL. Use a sender address from a domain verified inside the same Resend account.",
            );
          }

          throw new Error(
            response.error.message ||
            "Failed to send OTP email through Resend.",
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

      if (!ctx.body.email) return;
      const [existing] = await db
        .select({ id: schema.user.id })
        .from(schema.user)
        .where(eq(schema.user.email, ctx.body.email))
        .limit(1);

      if (!existing) {
        throw new APIError("BAD_REQUEST", {
          message: "You're not authorized as club member :(",
        });
      }
    }),
  },
  databaseHooks: {
    user: {
      update: {
        before: async (user) => {
          if (user.role === "admin") {
            throw new Error("Admin role cannot be assigned via API.");
          }
          return { data: user };
        },
      },
    },
  },
});
