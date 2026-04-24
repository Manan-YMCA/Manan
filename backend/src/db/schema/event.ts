import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  date: text("date").notNull(),
  desc: text("desc").notNull(),
  detailsLink: text("details_link"),
  eventImage: text("event_image").notNull(),
  eventImagePublicId: text("event_image_public_id"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
