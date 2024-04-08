ALTER TABLE "exercise" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "workout" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "workout_exercise" RENAME COLUMN "workoutId" TO "workout_id";--> statement-breakpoint
ALTER TABLE "workout_exercise" RENAME COLUMN "exerciseId" TO "exercise_id";--> statement-breakpoint
ALTER TABLE "workout_exercise_set" RENAME COLUMN "workoutId" TO "workout_id";--> statement-breakpoint
ALTER TABLE "workout_exercise_set" RENAME COLUMN "exerciseId" TO "exercise_id";--> statement-breakpoint
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workout" DROP CONSTRAINT "workout_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_workoutId_workout_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_exerciseId_exercise_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise_set" DROP CONSTRAINT "fk_workout_exercise_set";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_workoutId_exerciseId_pk";--> statement-breakpoint
ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_workout_id_exercise_id_pk" PRIMARY KEY("workout_id","exercise_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_set" ADD CONSTRAINT "fk_workout_exercise_set" FOREIGN KEY ("workout_id","exercise_id") REFERENCES "workout_exercise"("workout_id","exercise_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
