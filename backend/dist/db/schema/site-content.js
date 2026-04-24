import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
export const siteContent = pgTable("site_content", {
    id: text("id").primaryKey().default("default"),
    heroTitle: text("hero_title").notNull().default("Manan"),
    heroSubtitle: text("hero_subtitle").notNull().default("A Techno Surge"),
    introText: text("intro_text").notNull().default("The Coding Society of YMCA"),
    infoCards: jsonb("info_cards").notNull().default([]),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
