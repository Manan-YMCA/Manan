import { count, eq, ne } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  events as eventsTable,
  gallery as galleryTable,
  user,
  userProfile,
} from "../../db/schema/index.js";

export const adminService = {
  async getDashboardSummary() {
    const [[{ events }], [{ gallery }], [{ members }]] = await Promise.all([
      db.select({ events: count() }).from(eventsTable),
      db.select({ gallery: count() }).from(galleryTable),
      db.select({ members: count() }).from(user),
    ]);

    return { counts: { members, events, gallery } };
  },

  async listPublicMembers() {
    return db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        role: user.role,
        admissionYear: userProfile.admissionYear,
        designation: userProfile.designation,
        techStack: userProfile.techStack,
        languages: userProfile.languages,
        otherSkills: userProfile.otherSkills,
        bannerUrl: userProfile.bannerUrl,
        socialLinks: userProfile.socialLinks,
      })
      .from(user)
      .innerJoin(userProfile, eq(userProfile.userId, user.id))
      .where(ne(user.role, "admin"))
      .orderBy(userProfile.admissionYear);
  },

  async updateMemberEmail(id: string, email: string) {
    const [updated] = await db
      .update(user)
      .set({ email, updatedAt: new Date() })
      .where(eq(user.id, id))
      .returning({ id: user.id, email: user.email });
    return updated ?? null;
  },

  async listMembers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [data, [{ total }]] = await Promise.all([
      db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          banned: user.banned,
          banReason: user.banReason,
          createdAt: user.createdAt,
        })
        .from(user)
        .where(ne(user.role, "admin"))
        .orderBy(user.createdAt)
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(user).where(ne(user.role, "admin")),
    ]);
    return { data, total };
  },
};
