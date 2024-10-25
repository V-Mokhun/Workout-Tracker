CREATE TABLE IF NOT EXISTS "custom_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"target_muscle_slug" text,
	"type_slug" text,
	"equipment_slug" text,
	"mechanics" text,
	"force_type" text,
	"experience_level" "exercise_experience",
	"secondary_muscles" text,
	"notes" text,
	"overview" text,
	"instructions" text,
	"tips" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_target_muscle_slug_exercise_target_muscles_slug_fk" FOREIGN KEY ("target_muscle_slug") REFERENCES "public"."exercise_target_muscles"("slug") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_type_slug_exercise_types_slug_fk" FOREIGN KEY ("type_slug") REFERENCES "public"."exercise_types"("slug") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_exercises" ADD CONSTRAINT "custom_exercises_equipment_slug_exercise_equipments_slug_fk" FOREIGN KEY ("equipment_slug") REFERENCES "public"."exercise_equipments"("slug") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "custom_exercises_name_index" ON "custom_exercises" USING btree ("name");