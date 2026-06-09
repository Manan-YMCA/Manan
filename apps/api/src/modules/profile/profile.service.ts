import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { user, userProfile } from "../../db/schema/index.js";
import type { Profile } from "@manan/validations";

export const profileService = {
  async getProfile(userId: string) {
    const [row] = await db
      .select({
        name: user.name,
        image: user.image,
        admissionYear: userProfile.admissionYear,
        rollNumber: userProfile.rollNumber,
        graduationYear: userProfile.graduationYear,
        designation: userProfile.designation,
        techStack: userProfile.techStack,
        languages: userProfile.languages,
        otherSkills: userProfile.otherSkills,
        bannerUrl: userProfile.bannerUrl,
        socialLinks: userProfile.socialLinks,
      })
      .from(user)
      .leftJoin(userProfile, eq(userProfile.userId, userId))
      .where(eq(user.id, userId));
    return row ?? null;
  },

  async upsertProfile(userId: string, data: Profile) {
    const { name, image, ...profileData } = data;

    await db
      .update(user)
      .set({ name, image, updatedAt: new Date() })
      .where(eq(user.id, userId));

    await db
      .insert(userProfile)
      .values({ userId, ...profileData })
      .onConflictDoUpdate({
        target: userProfile.userId,
        set: { ...profileData, updatedAt: new Date() },
      });
  },
};
