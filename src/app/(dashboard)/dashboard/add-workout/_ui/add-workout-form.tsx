"use client";

import { BasicWorkoutExerciseSet, Units } from "@/db";
import {
  calculateImperialFromMetric,
  calculateMetricFromImperial,
  dateWithoutTimezone,
} from "@/shared/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  Heading,
  useToast,
} from "@/shared/ui";
import { ExercisesSearch, SearchExercise } from "@/widgets";
import { SearchExerciseOnSelect } from "@/widgets/exercises-search/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AddWorkoutBaseForm } from "./add-workout-base-form";
import { AddWorkoutExercises } from "./add-workout-exercises";
import {
  addWorkoutFormSchema,
  AddWorkoutFormSchema,
} from "./add-workout-model";
import { addWorkout } from "./actions";
import { useRouter } from "next/navigation";
import { DASHBOARD_ROUTE } from "@/shared/consts";

interface AddWorkoutFormProps {
  units: Units;
  userId: string;
}

export interface ExerciseWithSets extends SearchExercise {
  instanceId: string;
  sets: BasicWorkoutExerciseSet[];
}

export type AddWorkoutSubmissionValues = Omit<
  AddWorkoutFormSchema,
  "hours" | "minutes" | "seconds"
> & {
  duration: number | undefined;
};

export const AddWorkoutForm = ({ units, userId }: AddWorkoutFormProps) => {
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [pendingExercise, setPendingExercise] = useState<SearchExercise | null>(
    null
  );
  const form = useForm<AddWorkoutFormSchema>({
    resolver: zodResolver(addWorkoutFormSchema),
    defaultValues: {
      name: "",
      notes: "",
      date: dateWithoutTimezone(new Date()),
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      exercises: [],
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
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

    const submissionValues: AddWorkoutSubmissionValues = {
      ...values,
      duration: totalSeconds > 0 ? totalSeconds : undefined,
      exercises: values.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => {
          let calculatedWeight: number | null = null;
          if (units === "metric" && set.weightMetric !== null) {
            const { weightImperial } = calculateImperialFromMetric({
              weightMetric: set.weightMetric,
            });
            calculatedWeight = weightImperial!;
          } else if (units === "imperial" && set.weightImperial !== null) {
            const { weightMetric } = calculateMetricFromImperial({
              weightImperial: set.weightImperial,
            });
            calculatedWeight = weightMetric!;
          }

          return {
            ...set,
            weightMetric:
              units === "metric" ? set.weightMetric : calculatedWeight,
            weightImperial:
              units === "imperial" ? set.weightImperial : calculatedWeight,
          };
        }),
      })),
    };

    startTransition(() => {
      addWorkout(submissionValues, userId).then((state) => {
        toast({
          title: state.message,
          variant: state.isError ? "destructive" : "success",
        });

        if (!state.isError) {
          router.push(DASHBOARD_ROUTE);
        }
      });
    });
  };

  const addExerciseToWorkout = (exercise: SearchExercise) => {
    const newInstanceId = crypto.randomUUID();

    setExercises([
      ...exercises,
      {
        ...exercise,
        instanceId: newInstanceId,
        sets: [],
      },
    ]);

    if (!Array.isArray(errors.exercises)) {
      form.clearErrors("exercises");
    }
  };

  const onExerciseSelect: SearchExerciseOnSelect = (
    exercise: SearchExercise,
    { setIsOpen, setSearchValue }
  ) => {
    if (exercises.some((e) => e.id === exercise.id)) {
      setShowDuplicateDialog(true);
      setPendingExercise(exercise);
      return;
    }

    addExerciseToWorkout(exercise);

    setIsOpen(false);
    setSearchValue("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* // TODO: pick workout "folder" */}
        <AddWorkoutBaseForm form={form} disabled={isPending} />
        {/* // TODO: choose type of workout: weights/calithenics, running,  */}
        <div className="space-y-4">
          <Heading tag="h2" as="h3">
            Exercises
          </Heading>
          <ExercisesSearch
            ref={searchRef}
            inputProps={{ placeholder: "Add exercise", disabled: isPending }}
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
          disabled={isPending}
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
            disabled={isPending}
            onClick={() => {
              searchRef.current?.scrollIntoView({ behavior: "smooth" });
              searchRef.current?.focus();
            }}
          >
            + Add Exercise
          </Button>
          <Button disabled={isPending} size="lg" type="submit">
            Save
          </Button>
        </div>
      </form>
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Duplicate Exercise?</DialogTitle>
            <DialogDescription>
              This exercise is already in your workout. Are you sure you want to
              add it again?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowDuplicateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingExercise) {
                  addExerciseToWorkout(pendingExercise);
                  setShowDuplicateDialog(false);
                  setPendingExercise(null);
                }
              }}
            >
              Add Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
