import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
export const gallery = pgTable("gallery", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    desc: text("desc").notNull(),
    image: text("image").notNull(),
    imagePublicId: text("image_public_id"),
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
