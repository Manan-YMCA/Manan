import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { events } from "../../db/schema/index.js";

export type EventRecord = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;

export const eventsService = {
  async listEvents() {
    return db.select().from(events).orderBy(desc(events.timestamp));
  },

  async createEvent(input: EventInsert) {
    const [createdEvent] = await db
      .insert(events)
      .values({
        ...input,
        updatedAt: new Date(),
      })
      .returning();

    return createdEvent;
  },
};
