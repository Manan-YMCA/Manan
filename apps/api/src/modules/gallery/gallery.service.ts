import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { gallery } from "../../db/schema/index.js";

type GalleryInsert = typeof gallery.$inferInsert;

export const galleryService = {
  async listGallery(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const data = await db
      .select()
      .from(gallery)
      .orderBy(desc(gallery.timestamp))
      .limit(limit)
      .offset(offset);
    const [{ total }] = await db.select({ total: count() }).from(gallery);
    return { data, total };
  },

  async createGalleryItem(input: GalleryInsert) {
    const [createdGalleryItem] = await db
      .insert(gallery)
      .values({
        ...input,
      })
      .returning();

    return createdGalleryItem;
  },

  async deleteGalleryItem(id: string) {
    const [deleted] = await db
      .delete(gallery)
      .where(eq(gallery.id, id))
      .returning();
    return deleted ?? null;
  },
};
