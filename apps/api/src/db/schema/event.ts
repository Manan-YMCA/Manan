import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `event-${crypto.randomUUID}`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  date: text("date"),
  imageUrl: text("image_url").notNull(),
  activiryReportUrl: text("activity_report_url"),
  eventReportUrl: text("event_report_url"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
