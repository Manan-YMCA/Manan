import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const gallery = pgTable("gallery", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `gallery-${crypto.randomUUID()}`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
