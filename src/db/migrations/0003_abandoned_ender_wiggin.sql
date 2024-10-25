ALTER TABLE "custom_exercises" DROP CONSTRAINT "custom_exercises_target_muscle_slug_exercise_target_muscles_slug_fk";
--> statement-breakpoint
ALTER TABLE "custom_exercises" DROP CONSTRAINT "custom_exercises_type_slug_exercise_types_slug_fk";
--> statement-breakpoint
ALTER TABLE "custom_exercises" DROP CONSTRAINT "custom_exercises_equipment_slug_exercise_equipments_slug_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_target_muscle_slug_exercise_target_muscles_slug_fk" FOREIGN KEY ("target_muscle_slug") REFERENCES "public"."exercise_target_muscles"("slug") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_type_slug_exercise_types_slug_fk" FOREIGN KEY ("type_slug") REFERENCES "public"."exercise_types"("slug") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_equipment_slug_exercise_equipments_slug_fk" FOREIGN KEY ("equipment_slug") REFERENCES "public"."exercise_equipments"("slug") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
