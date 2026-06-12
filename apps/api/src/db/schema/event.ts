import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `event-${crypto.randomUUID()}`),
  name: text("name").notNull(),
  venue: text("venue").notNull(),
  description: text("description").notNull(),
  fromDate: date("from_date").notNull(),
  toDate: date("to_date").notNull(),
  imageUrl: text("image_url").notNull(),
  activityReportUrl: text("activity_report_url"),
  eventReportUrl: text("event_report_url"),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
