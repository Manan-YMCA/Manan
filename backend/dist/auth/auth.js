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
export const auth = betterAuth({
    appName: "Manan Website",
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.FRONTEND_URL],
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
                if (!resend || !env.RESEND_FROM_EMAIL) {
                    throw new Error("Resend configuration is missing.");
                }
                const subject = type === "sign-in"
                    ? "Your Manan login code"
                    : type === "email-verification"
                        ? "Verify your email"
                        : "Your password reset code";
                void resend.emails.send({
                    from: env.RESEND_FROM_EMAIL,
                    to: [email],
                    subject,
                    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Manan Website</h2>
            <p>Your one-time code is:</p>
            <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px;">${otp}</p>
            <p>This code will expire in 5 minutes.</p>
          </div>`,
                });
            },
        }),
    ],
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/email-otp/send-verification-otp" &&
                ctx.path !== "/sign-in/email-otp") {
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
