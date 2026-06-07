import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  eventDate: text("event_date_value"),
  eventImage: text("event_image").notNull(),
  eventlinks: jsonb("links").notNull().default([]),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
