import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { siteContent } from "../../db/schema/index.js";
const defaultSiteContent = {
    id: "default",
    heroTitle: "Manan",
    heroSubtitle: "A Techno Surge",
    introText: "The Coding Society of YMCA",
    infoCards: [],
    updatedAt: new Date(),
};
export const siteService = {
    async getSiteContent() {
        const [content] = await db
            .select()
            .from(siteContent)
            .where(eq(siteContent.id, "default"));
        if (content) {
            return content;
        }
        const [createdContent] = await db
            .insert(siteContent)
            .values(defaultSiteContent)
            .onConflictDoNothing()
            .returning();
        return createdContent ?? defaultSiteContent;
    },
    async updateSiteContent(payload) {
        const [updatedContent] = await db
            .insert(siteContent)
            .values({
            id: "default",
            ...payload,
            updatedAt: new Date(),
        })
            .onConflictDoUpdate({
            target: siteContent.id,
            set: {
                ...payload,
                updatedAt: new Date(),
            },
        })
            .returning();
        return updatedContent;
    },
};
