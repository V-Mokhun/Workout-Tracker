"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  addExerciseFormSchema,
  AddExerciseFormSchema,
} from "./add-exercise-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { addExercise } from "./actions";
import { useToast, Form } from "@/shared/ui";
import { AddExerciseImageUpload } from "./add-exercise-image-upload";

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
          <div className="flex-1">content</div>
        </div>
      </form>
    </Form>
  );
};
