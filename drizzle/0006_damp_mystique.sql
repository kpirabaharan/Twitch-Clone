ALTER TABLE "follower" RENAME TO "follow";--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "follower_follower_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "follow" DROP CONSTRAINT "follower_following_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_user_id_fk" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
