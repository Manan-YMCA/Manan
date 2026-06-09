import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.js";

export const userProfile = pgTable("userProfiles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `user_profiles-${crypto.randomUUID()}`),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  admissionYear: integer("admission_year").notNull(),
  rollNumber: text("roll_number"),
  graduationYear: integer("graduation_year"),
  designation: text("designation").notNull(),
  techStack: text("tech_stack").notNull(),
  languages: text("languages").notNull(),
  otherSkills: text("other_skills").notNull(),
  bannerUrl: text("banner_url").notNull(),
  socialLinks: jsonb("social_links").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
