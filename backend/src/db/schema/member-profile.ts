import { jsonb, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth-schema.js";

export const memberProfiles = pgTable("member_profiles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  admission: integer("admission").notNull(),
  role: text("role").notNull(),
  frameworks: text("frameworks").notNull(),
  languages: text("languages").notNull(),
  otherSkills: text("other_skills").notNull(),
  banner: text("banner"),
  pfp: text("pfp"),
  pfpPublicId: text("pfp_public_id"),
  permission: text("permission").notNull().default("user"),
  socialLinks: jsonb("social_links").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
