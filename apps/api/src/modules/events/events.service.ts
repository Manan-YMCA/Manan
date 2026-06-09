import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { events } from "../../db/schema/index.js";

type EventInsert = typeof events.$inferInsert;

export const eventsService = {
  async listEvents(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const data = await db
      .select()
      .from(events)
      .orderBy(desc(events.timestamp))
      .limit(limit)
      .offset(offset);
    const [{ total }] = await db.select({ total: count() }).from(events);
    return { data, total };
  },

  async getEvent(id: string) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event ?? null;
  },

  async updateEvent(id: string, input: Partial<EventInsert>) {
    const [updated] = await db
      .update(events)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return updated ?? null;
  },

  async createEvent(input: EventInsert) {
    const [createdEvent] = await db
      .insert(events)
      .values({
        ...input,
      })
      .returning();

    return createdEvent;
  },

  async deleteEvent(id: string) {
    const [deleted] = await db
      .delete(events)
      .where(eq(events.id, id))
      .returning();
    return deleted ?? null;
  },
};
