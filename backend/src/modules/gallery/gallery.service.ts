import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { gallery } from "../../db/schema/index.js";

export type GalleryRecord = typeof gallery.$inferSelect;
export type GalleryInsert = typeof gallery.$inferInsert;

export const galleryService = {
  async listGallery() {
    return db.select().from(gallery).orderBy(desc(gallery.timestamp));
  },

  async createGalleryItem(input: GalleryInsert) {
    const [createdGalleryItem] = await db
      .insert(gallery)
      .values({
        ...input,
        updatedAt: new Date(),
      })
      .returning();

    return createdGalleryItem;
  },
};
