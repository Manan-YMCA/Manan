import { asc, desc, eq, or } from "drizzle-orm";
import { db } from "../../db/index.js";
import { memberProfiles } from "../../db/schema/index.js";

export type MemberRecord = typeof memberProfiles.$inferSelect;
export type MemberInsert = typeof memberProfiles.$inferInsert;

const sortMembers = (members: MemberRecord[]) =>
  [...members].sort((left, right) => {
    if (left.admission !== right.admission) {
      return left.admission - right.admission;
    }

    return left.name.localeCompare(right.name);
  });

const dedupeMembers = (members: MemberRecord[]) => {
  const latestByIdentity = new Map<string, MemberRecord>();

  for (const member of members) {
    const identityKey = member.userId || member.email;
    const current = latestByIdentity.get(identityKey);

    if (!current) {
      latestByIdentity.set(identityKey, member);
      continue;
    }

    const currentTime = new Date(current.updatedAt ?? current.createdAt).getTime();
    const nextTime = new Date(member.updatedAt ?? member.createdAt).getTime();

    if (nextTime >= currentTime) {
      latestByIdentity.set(identityKey, member);
    }
  }

  return sortMembers(Array.from(latestByIdentity.values()));
};

export const membersService = {
  async listMembers() {
    const members = await db
      .select()
      .from(memberProfiles)
      .orderBy(asc(memberProfiles.admission), asc(memberProfiles.name));

    return dedupeMembers(members);
  },

  async getMemberByUserId(userId: string) {
    const members = await db
      .select()
      .from(memberProfiles)
      .where(eq(memberProfiles.userId, userId))
      .orderBy(desc(memberProfiles.updatedAt), desc(memberProfiles.createdAt));

    return members[0] ?? null;
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
