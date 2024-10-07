DO $$ BEGIN
 CREATE TYPE "public"."exercise_set_type" AS ENUM('Normal', 'Warmup', 'Failure');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workout_exercise_sets" ADD COLUMN "type" "exercise_set_type" DEFAULT 'Normal' NOT NULL;