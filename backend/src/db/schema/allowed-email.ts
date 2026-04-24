import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const allowedEmails = pgTable("allowed_emails", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  enabled: boolean("enabled").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
