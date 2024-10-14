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
              <FormLabel className="text-lg font-semibold text-primary">
                Measurement Units
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-100 p-3 rounded-md transition-all duration-300 hover:bg-gray-200">
                    <FormControl>
                      <RadioGroupItem value="metric" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-grow">
                      Metric (kg / km)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-100 p-3 rounded-md transition-all duration-300 hover:bg-gray-200">
                    <FormControl>
                      <RadioGroupItem value="imperial" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-grow">
                      Imperial (lbs / miles)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <Button
            size="lg"
            type="submit"
            disabled={units === formUnits || isPending}
          >
            {isPending ? "Updating..." : "Update Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
