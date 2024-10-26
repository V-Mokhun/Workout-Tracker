"use client";

import {
  EXERCISE_EQUIPMENTS,
  EXERCISE_EXPERIENCES,
  EXERCISE_MECHANICS,
  EXERCISE_MUSCLE_GROUPS,
  EXERCISE_TYPES,
  USER_EXERCISES_ROUTE,
} from "@/shared/consts";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "@/shared/ui";
import { Editor } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { addExercise } from "./actions";
import { AddExerciseImageUpload } from "./add-exercise-image-upload";
import {
  addExerciseFormSchema,
  AddExerciseFormSchema,
} from "./add-exercise-model";
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
  const router = useRouter();

  async function onSubmit(values: AddExerciseFormSchema) {
    const formData = new FormData();
    if (values.image) {
      formData.append("image", values.image);
    }

    startTransition(() => {
      addExercise(
        { ...values, image: values.image ? formData : undefined },
        userId
      ).then((state) => {
        toast({
          title: state.message,
          variant: state.isError ? "destructive" : "success",
        });

        if (!state.isError) {
          router.push(USER_EXERCISES_ROUTE);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <AddExerciseImageUpload control={form.control} />
          </div>
          <div className="flex-1 space-y-4 w-full">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    slugify={false}
                  />
                )}
              />
            </div>
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
          {["notes", "overview", "instructions", "tips"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof AddExerciseFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Editor
                      editorProps={{
                        content: field.value as string,
                        onUpdate: ({ editor }) => {
                          field.onChange(editor.getHTML());
                        },
                        immediatelyRender: false,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Adding..." : "Add Exercise"}
        </Button>
      </form>
    </Form>
  );
};
