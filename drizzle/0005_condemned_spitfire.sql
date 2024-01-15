DO $$ BEGIN
 ALTER TABLE "follower" ADD CONSTRAINT "follower_following_id_user_id_fk" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
