import { env } from "../config/env.js";
import { sql } from "./index.js";

const defaultSiteContent = {
  id: "default",
  heroTitle: "Manan",
  heroSubtitle: "A Techno Surge",
  introText: "The Coding Society of YMCA",
};

export async function ensureDatabaseSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" text PRIMARY KEY,
      "name" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "email_verified" boolean NOT NULL DEFAULT false,
      "image" text,
      "role" text NOT NULL DEFAULT 'user',
      "banned" boolean NOT NULL DEFAULT false,
      "ban_reason" text,
      "ban_expires" timestamptz,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "session" (
      "id" text PRIMARY KEY,
      "token" text NOT NULL UNIQUE,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "expires_at" timestamptz NOT NULL,
      "ip_address" text,
      "user_agent" text,
      "impersonated_by" text,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "account" (
      "id" text PRIMARY KEY,
      "account_id" text NOT NULL,
      "provider_id" text NOT NULL,
      "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "access_token" text,
      "refresh_token" text,
      "id_token" text,
      "access_token_expires_at" timestamptz,
      "refresh_token_expires_at" timestamptz,
      "scope" text,
      "password" text,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "verification" (
      "id" text PRIMARY KEY,
      "identifier" text NOT NULL,
      "value" text NOT NULL,
      "expires_at" timestamptz NOT NULL,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "member_profiles" (
      "id" text PRIMARY KEY,
      "user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
      "email" text NOT NULL UNIQUE,
      "name" text NOT NULL,
      "admission" integer NOT NULL,
      "role" text NOT NULL,
      "frameworks" text NOT NULL,
      "languages" text NOT NULL,
      "other_skills" text NOT NULL,
      "banner" text,
      "pfp" text,
      "pfp_public_id" text,
      "permission" text NOT NULL DEFAULT 'user',
      "social_links" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "events" (
      "id" text PRIMARY KEY,
      "name" text NOT NULL,
      "date" text NOT NULL,
      "desc" text NOT NULL,
      "details_link" text,
      "event_image" text NOT NULL,
      "event_image_public_id" text,
      "timestamp" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "gallery" (
      "id" text PRIMARY KEY,
      "name" text NOT NULL,
      "desc" text NOT NULL,
      "image" text NOT NULL,
      "image_public_id" text,
      "timestamp" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "site_content" (
      "id" text PRIMARY KEY,
      "hero_title" text NOT NULL DEFAULT 'Manan',
      "hero_subtitle" text NOT NULL DEFAULT 'A Techno Surge',
      "intro_text" text NOT NULL DEFAULT 'The Coding Society of YMCA',
      "info_cards" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "allowed_emails" (
      "id" text PRIMARY KEY,
      "email" text NOT NULL UNIQUE,
      "role" text NOT NULL DEFAULT 'user',
      "enabled" boolean NOT NULL DEFAULT true,
      "created_at" timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    INSERT INTO "site_content" (
      "id",
      "hero_title",
      "hero_subtitle",
      "intro_text",
      "info_cards",
      "updated_at"
    )
    VALUES (
      ${defaultSiteContent.id},
      ${defaultSiteContent.heroTitle},
      ${defaultSiteContent.heroSubtitle},
      ${defaultSiteContent.introText},
      '[]'::jsonb,
      now()
    )
    ON CONFLICT ("id") DO NOTHING
  `;

  const allowlist = [
    {
      email: env.ADMIN_EMAIL.trim().toLowerCase(),
      role: "admin",
    },
    ...env.ALLOWED_USER_EMAILS_LIST.map((email) => ({
      email,
      role: "user",
    })),
  ];

  for (const entry of allowlist) {
    await sql`
      INSERT INTO "allowed_emails" ("id", "email", "role", "enabled", "created_at")
      VALUES (${crypto.randomUUID()}, ${entry.email}, ${entry.role}, true, now())
      ON CONFLICT ("email") DO UPDATE
      SET "role" = EXCLUDED."role",
          "enabled" = true
    `;
  }
}
