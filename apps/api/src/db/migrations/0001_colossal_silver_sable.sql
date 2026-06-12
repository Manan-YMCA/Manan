ALTER TABLE "events" ADD COLUMN "venue" text;
--> statement-breakpoint
UPDATE "events" SET "venue" = 'TBA' WHERE "venue" IS NULL;
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "venue" SET NOT NULL;
