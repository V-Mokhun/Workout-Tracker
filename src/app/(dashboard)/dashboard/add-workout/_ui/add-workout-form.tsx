"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  addWorkoutFormSchema,
  AddWorkoutFormSchema,
} from "./add-workout-model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/shared/ui";
import { cn } from "@/shared/lib";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ExercisesSearch, SearchExercise } from "@/widgets";
import { SearchExerciseOnSelect } from "@/widgets/exercises-search/search";

interface AddWorkoutFormProps {}

export const AddWorkoutForm = ({}: AddWorkoutFormProps) => {
  const [exercises, setExercises] = useState<SearchExercise[]>([]);
  const form = useForm<AddWorkoutFormSchema>({
    resolver: zodResolver(addWorkoutFormSchema),
    defaultValues: {
      name: "",
      notes: "",
      date: new Date(),
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
    },
  });

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
    setExercises([...exercises, exercise]);

    setIsOpen(false);
    setSearchValue("");
  };

  console.log("exercises", exercises);

  return (
    <Form {...form}>
      {/* TODO: pick workout "folder" */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="#4 Full Body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between">
                <FormLabel>Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "min-w-60 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="flex-1">
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </span>
                        <CalendarIcon className="ml-3 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      fixedWeeks
                      defaultMonth={field.value ?? new Date()}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1924-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Duration (hh:mm:ss)</FormLabel>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20"
                        type="number"
                        placeholder="HH"
                        min={0}
                        max={23}
                        step={1}
                        pattern="[0-9]*"
                        onChange={(e) => {
                          if (e.target.value === undefined) {
                            field.onChange(undefined);
                            return;
                          }

                          const value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            field.onChange(undefined);
                            return;
                          }

                          if (value < 0 || value > 23) {
                            if (value < 0) {
                              field.onChange(-value);
                            }
                            return;
                          }

                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20"
                        type="number"
                        placeholder="MM"
                        min={0}
                        max={59}
                        step={1}
                        pattern="[0-9]*"
                        onChange={(e) => {
                          if (e.target.value === undefined) {
                            field.onChange(undefined);
                            return;
                          }

                          const value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            field.onChange(undefined);
                            return;
                          }

                          if (value < 0 || value > 59) {
                            if (value < 0) {
                              field.onChange(-value);
                            }
                            return;
                          }

                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seconds"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20"
                        type="number"
                        placeholder="SS"
                        min={0}
                        max={59}
                        step={1}
                        pattern="[0-9]*"
                        onChange={(e) => {
                          if (e.target.value === undefined) {
                            field.onChange(undefined);
                            return;
                          }

                          const value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            field.onChange(undefined);
                            return;
                          }

                          if (value < 0 || value > 59) {
                            if (value < 0) {
                              field.onChange(-value);
                            }
                            return;
                          }

                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="4th full body workout, first one this week. Feel pretty strong, could've pushed a little harder"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // TODO: choose type of workout: weights/calithenics, running,  */}
        <div className="space-y-4">
          <Heading tag="h2" as="h3">
            Exercises
          </Heading>
          <ExercisesSearch
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
      </form>
    </Form>
  );
};