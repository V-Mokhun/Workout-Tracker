"use client";

import { Button, Form, FormMessage, Heading } from "@/shared/ui";
import { ExercisesSearch, SearchExercise } from "@/widgets";
import { SearchExerciseOnSelect } from "@/widgets/exercises-search/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddWorkoutBaseForm } from "./add-workout-base-form";
import { AddWorkoutExercises } from "./add-workout-exercises";
import {
  addWorkoutFormSchema,
  AddWorkoutFormSchema,
} from "./add-workout-model";
import { BasicWorkoutExerciseSet, Units } from "@/db";

interface AddWorkoutFormProps {
  units: Units;
}

export interface ExerciseWithSets extends SearchExercise {
  sets: BasicWorkoutExerciseSet[];
}

export const AddWorkoutForm = ({ units }: AddWorkoutFormProps) => {
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const form = useForm<AddWorkoutFormSchema>({
    resolver: zodResolver(addWorkoutFormSchema),
    defaultValues: {
      name: "",
      notes: "",
      date: new Date(),
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      exercises: [],
    },
  });
  const { errors } = form.formState;

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.setValue("exercises", exercises);
  }, [form, exercises]);

  const onSubmit = (values: AddWorkoutFormSchema) => {
    const totalSeconds =
      (values.hours || 0) * 3600 +
      (values.minutes || 0) * 60 +
      (values.seconds || 0);

    const submissionValues = {
      ...values,
      duration: totalSeconds > 0 ? totalSeconds : undefined,
    };
    console.log(submissionValues);
    // Handle form submission here
  };

  const onExerciseSelect: SearchExerciseOnSelect = (
    exercise: SearchExercise,
    { setIsOpen, setSearchValue }
  ) => {
    if (exercises.some((e) => e.id === exercise.id)) {
      // TODO: show toast with are you sure you want to add the same exercise twice?
    }

    const newSetId =
      exercises.reduce((acc, ex) => {
        return Math.max(acc, ...ex.sets.map((s) => s.id));
      }, 0) + 1;

    setExercises([
      ...exercises,
      {
        ...exercise,
        sets: [
          {
            id: newSetId,
            duration: null,
            reps: null,
            rpe: null,
            weightMetric: null,
            weightImperial: null,
            position: 1,
          },
        ],
      },
    ]);

    if (!Array.isArray(errors.exercises)) {
      form.clearErrors("exercises");
    }

    setIsOpen(false);
    setSearchValue("");
  };

  console.log(errors.exercises);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* // TODO: pick workout "folder" */}
        <AddWorkoutBaseForm form={form} />
        {/* // TODO: choose type of workout: weights/calithenics, running,  */}
        <div className="space-y-4">
          <Heading tag="h2" as="h3">
            Exercises
          </Heading>
          <ExercisesSearch
            ref={searchRef}
            placeholder="Add exercise"
            onSelect={onExerciseSelect}
            searchContent={
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm mt-4">
                <p>Don&apos;t see the exercise you want to add?</p>
                <Button
                  variant="link"
                  size="sm"
                  className="underline hover:no-underline justify-start px-0 md:px-3"
                >
                  Add your custom exercise
                </Button>
              </div>
            }
          />
        </div>
        <AddWorkoutExercises
          exercises={exercises}
          setExercises={setExercises}
          units={units}
          errors={errors.exercises}
        />
        {form.formState.errors.exercises?.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.exercises.message}
          </p>
        )}
        <div className="flex justify-between items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              searchRef.current?.scrollIntoView({ behavior: "smooth" });
              searchRef.current?.focus();
            }}
          >
            + Add Exercise
          </Button>
          <Button size="lg" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
