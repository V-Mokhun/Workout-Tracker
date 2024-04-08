ALTER TABLE "exercise" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "workout" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "workout_exercise" RENAME COLUMN "workout_id" TO "workoutId";--> statement-breakpoint
ALTER TABLE "workout_exercise" RENAME COLUMN "exercise_id" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "workout_exercise_set" RENAME COLUMN "workout_id" TO "workoutId";--> statement-breakpoint
ALTER TABLE "workout_exercise_set" RENAME COLUMN "exercise_id" TO "exerciseId";--> statement-breakpoint
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workout" DROP CONSTRAINT "workout_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_workout_id_workout_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_exercise_id_exercise_id_fk";
--> statement-breakpoint
ALTER TABLE "workout_exercise_set" DROP CONSTRAINT "fk_workout_exercise_set";
--> statement-breakpoint
ALTER TABLE "workout_exercise" DROP CONSTRAINT "workout_exercise_workout_id_exercise_id_pk";--> statement-breakpoint
ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_workoutId_exerciseId_pk" PRIMARY KEY("workoutId","exerciseId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_workoutId_workout_id_fk" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise" ADD CONSTRAINT "workout_exercise_exerciseId_exercise_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_set" ADD CONSTRAINT "fk_workout_exercise_set" FOREIGN KEY ("workoutId","exerciseId") REFERENCES "workout_exercise"("workoutId","exerciseId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
