import { asc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { memberProfiles } from "../../db/schema/index.js";
export const membersService = {
    async listMembers() {
        return db
            .select()
            .from(memberProfiles)
            .orderBy(asc(memberProfiles.admission), asc(memberProfiles.name));
    },
    async getMemberByUserId(userId) {
        const [member] = await db
            .select()
            .from(memberProfiles)
            .where(eq(memberProfiles.userId, userId));
        return member ?? null;
    },
    async createMember(input) {
        const [createdMember] = await db
            .insert(memberProfiles)
            .values({
            ...input,
            updatedAt: new Date(),
        })
            .returning();
        return createdMember;
    },
    async updateMemberByUserId(userId, input) {
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
