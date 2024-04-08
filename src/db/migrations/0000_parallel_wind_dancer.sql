DO $$ BEGIN
 CREATE TYPE "exercise_experience" AS ENUM('beginner', 'intermediate', 'advanced');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "exercise_type" AS ENUM('strength', 'plyometrics', 'warmup', 'smr', 'conditioning', 'activation', 'powerlifting', 'olympic-weightlifting');
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
 CREATE TYPE "target_muscle" AS ENUM('abductors', 'abs', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'hip-flexors', 'lats', 'lower-back', 'upper-back', 'neck', 'obliques', 'quads', 'shoulders', 'traps', 'triceps');
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
CREATE TABLE IF NOT EXISTS "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"target_muscle" "target_muscle",
	"type" "exercise_type",
	"equipment" text,
	"mechanics" text,
	"force_type" text,
	"experience_level" "exercise_experience",
	"secondary_muscles" text,
	"overview" text,
	"instructions" text,
	"tips" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer,
	"user_notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"date" date NOT NULL,
	"description" text,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercise" (
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workout_exercise_workout_id_exercise_id_pk" PRIMARY KEY("workout_id","exercise_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_exercise_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"position" integer NOT NULL,
	"reps" integer,
	"rpe" integer,
	"duration" integer,
	"weight" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"avatar" text,
	"birthdate" varchar(10),
	"weight_metric" real,
	"weight_imperial" real,
	"height_metric" real,
	"height_imperial" real,
	"gender" "gender",
	"units" "units",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
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
