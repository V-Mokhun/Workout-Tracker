"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  addExerciseFormSchema,
  AddExerciseFormSchema,
} from "./add-exercise-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { addExercise } from "./actions";
import { useToast, Form, Button } from "@/shared/ui";
import { AddExerciseImageUpload } from "./add-exercise-image-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import {
  EXERCISE_EQUIPMENTS,
  EXERCISE_EXPERIENCES,
  EXERCISE_MECHANICS,
  EXERCISE_MUSCLE_GROUPS,
  EXERCISE_TYPES,
} from "@/shared/consts";
import { slugify } from "@/shared/lib";
import { AddExerciseSelect } from "./add-exercise-select";

interface AddExerciseFormProps {
  userId: string;
}

export const AddExerciseForm = ({ userId }: AddExerciseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AddExerciseFormSchema>({
    resolver: zodResolver(addExerciseFormSchema),
    defaultValues: {
      name: "",
      image: undefined,
      targetMuscle: undefined,
      type: undefined,
      equipment: undefined,
      mechanics: "",
      forceType: "",
      experienceLevel: undefined,
      secondaryMuscles: "",
      notes: "",
      overview: "",
      instructions: "",
      tips: "",
    },
  });
  const { toast } = useToast();

  function onSubmit(values: AddExerciseFormSchema) {
    startTransition(() => {
      addExercise(values, userId).then((state) => {
        toast({
          title: state.message,
          variant: state.isError ? "destructive" : "success",
        });
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-start gap-6">
          <AddExerciseImageUpload control={form.control} />
          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Exercise name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetMuscle"
              render={({ field }) => (
                <AddExerciseSelect
                  label="Target Muscle"
                  options={EXERCISE_MUSCLE_GROUPS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select exercise target muscle"
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <AddExerciseSelect
                  label="Type"
                  options={EXERCISE_TYPES}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select exercise type"
                />
              )}
            />
            <FormField
              control={form.control}
              name="equipment"
              render={({ field }) => (
                <AddExerciseSelect
                  label="Equipment"
                  options={EXERCISE_EQUIPMENTS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select equipment needed"
                />
              )}
            />
            <FormField
              control={form.control}
              name="mechanics"
              render={({ field }) => (
                <AddExerciseSelect
                  label="Mechanics"
                  options={EXERCISE_MECHANICS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select exercise mechanics"
                />
              )}
            />
            <FormField
              control={form.control}
              name="forceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Force Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Force type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <AddExerciseSelect
                  label="Experience Level"
                  options={EXERCISE_EXPERIENCES}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select exercise experience level"
                />
              )}
            />
            <FormField
              control={form.control}
              name="secondaryMuscles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Muscles</FormLabel>
                  <FormControl>
                    <Input placeholder="Secondary muscles" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Additional notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overview</FormLabel>
                <FormControl>
                  <Textarea placeholder="Exercise overview" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Exercise instructions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tips"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tips</FormLabel>
                <FormControl>
                  <Textarea placeholder="Exercise tips" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Exercise"}
        </Button>
      </form>
    </Form>
  );
};
