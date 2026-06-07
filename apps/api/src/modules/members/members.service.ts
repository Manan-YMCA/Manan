import { asc, desc, eq, or } from "drizzle-orm";
import { db } from "../../db/index.js";
import { memberProfiles } from "../../db/schema/index.js";

export type MemberRecord = typeof memberProfiles.$inferSelect;
export type MemberInsert = typeof memberProfiles.$inferInsert;

export const membersService = {
  async listMembers() {
    const members = await db
      .select()
      .from(memberProfiles)
      .orderBy(asc(memberProfiles.admission), asc(memberProfiles.name));

    return members;
  },

  async getMemberByUserId(userId: string) {
    const members = await db
      .select()
      .from(memberProfiles)
      .where(eq(memberProfiles.userId, userId))
      .limit(1);

    return members;
  },

  async saveMemberForUser(
    identity: { userId: string; email: string },
    input: Omit<MemberInsert, "userId" | "email">
  ) {
    const existingMembers = await db
      .select()
      .from(memberProfiles)
      .where(
        or(
          eq(memberProfiles.userId, identity.userId),
          eq(memberProfiles.email, identity.email)
        )
      )
      .orderBy(desc(memberProfiles.updatedAt), desc(memberProfiles.createdAt));

    const existingMember = existingMembers[0];
    const payload = {
      ...input,
      userId: identity.userId,
      email: identity.email,
      updatedAt: new Date(),
    };

    if (existingMember) {
      const [updatedMember] = await db
        .update(memberProfiles)
        .set(payload)
        .where(eq(memberProfiles.id, existingMember.id))
        .returning();

      return {
        created: false,
        member: updatedMember ?? existingMember,
      };
    }

    const [createdMember] = await db
      .insert(memberProfiles)
      .values(payload)
      .returning();

    return {
      created: true,
      member: createdMember,
    };
  },
};
