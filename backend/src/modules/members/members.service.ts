import { asc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { memberProfiles } from "../../db/schema/index.js";

export type MemberRecord = typeof memberProfiles.$inferSelect;
export type MemberInsert = typeof memberProfiles.$inferInsert;

export const membersService = {
  async listMembers() {
    return db
      .select()
      .from(memberProfiles)
      .orderBy(asc(memberProfiles.admission), asc(memberProfiles.name));
  },

  async getMemberByUserId(userId: string) {
    const [member] = await db
      .select()
      .from(memberProfiles)
      .where(eq(memberProfiles.userId, userId));

    return member ?? null;
  },

  async createMember(input: MemberInsert) {
    const [createdMember] = await db
      .insert(memberProfiles)
      .values({
        ...input,
        updatedAt: new Date(),
      })
      .returning();

    return createdMember;
  },

  async updateMemberByUserId(userId: string, input: Partial<MemberInsert>) {
    const [updatedMember] = await db
      .update(memberProfiles)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(memberProfiles.userId, userId))
      .returning();

    return updatedMember ?? null;
  },
};
