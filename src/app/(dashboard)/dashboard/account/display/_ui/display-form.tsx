"use client";

import { Units } from "@/db";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  useToast,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateAccountDisplay } from "./actions";
import { DisplayFormSchema, displayFormSchema } from "./display-form-model";

interface DisplayFormProps {
  units: Units;
}

export type DisplayFormState = {
  message: string;
  isError: boolean;
};

export const DisplayForm = ({ units }: DisplayFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<DisplayFormSchema>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      units,
    },
  });
  const { toast } = useToast();

  const formUnits = form.watch("units");

  const onSubmit = async (values: DisplayFormSchema) => {
    startTransition(() => {
      updateAccountDisplay(values).then((state) => {
        toast({
          title: state.message,
          variant: state.isError ? "destructive" : "success",
        });
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Measurement Units</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="metric" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Metric (kg / km)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="imperial" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Imperial (lbs / miles)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="lg"
          type="submit"
          disabled={units === formUnits || isPending}
        >
          Update
        </Button>
      </form>
    </Form>
  );
};
