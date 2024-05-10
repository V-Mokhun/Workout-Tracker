DO $$ BEGIN
 CREATE TYPE "exercise_experience" AS ENUM('Beginner', 'Intermediate', 'Advanced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "units" AS ENUM('metric', 'imperial');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise_equipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "exercise_equipments_name_unique" UNIQUE("name"),
	CONSTRAINT "exercise_equipments_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise_target_muscles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"full_image" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "exercise_target_muscles_name_unique" UNIQUE("name"),
	CONSTRAINT "exercise_target_muscles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "exercise_types_name_unique" UNIQUE("name"),
	CONSTRAINT "exercise_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"target_muscle_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	"equipment_id" integer NOT NULL,
	"mechanics" text,
	"force_type" text,
	"experience_level" "exercise_experience",
	"secondary_muscles" text,
	"overview" text,
	"instructions" text,
	"tips" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "exercises_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"name" varchar(255),
	"avatar" text,
	"birthdate" varchar(10),
	"weight_metric" real,
	"weight_imperial" real,
	"height_metric" real,
	"height_imperial" real,
	"gender" "gender",
	"units" "units" DEFAULT 'metric',
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_exercises" (
	"exercise_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"user_notes" text,
	"is_favorite" boolean DEFAULT false,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "user_exercises_user_id_exercise_id_pk" PRIMARY KEY("user_id","exercise_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"date" date NOT NULL,
	"description" text,
	"duration" integer,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercises" (
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "workout_exercises_workout_id_exercise_id_pk" PRIMARY KEY("workout_id","exercise_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercise_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"position" integer NOT NULL,
	"reps" integer,
	"rpe" integer,
	"duration" integer,
	"weight_metric" real,
	"weight_imperial" real,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercises_name_index" ON "exercises" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_target_muscle_id_exercise_target_muscles_id_fk" FOREIGN KEY ("target_muscle_id") REFERENCES "exercise_target_muscles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_type_id_exercise_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "exercise_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_equipment_id_exercise_equipments_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "exercise_equipments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_exercises" ADD CONSTRAINT "user_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_exercises" ADD CONSTRAINT "user_exercises_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_exercise_sets" ADD CONSTRAINT "fk_workout_exercise_set" FOREIGN KEY ("workout_id","exercise_id") REFERENCES "workout_exercises"("workout_id","exercise_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
