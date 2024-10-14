"use client";

import { User } from "@/db";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  useToast,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { AccountFormCalendar } from "./account-form-calendar";
import { AccountFormSchema, accountFormSchema } from "./account-form-model";
import { updateAccountSettings } from "./actions";

interface AccountFormProps {
  user: User;
}

export const AccountForm = ({ user }: AccountFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user.name ?? "",
      birthdate: user.birthdate ? new Date(user.birthdate) : undefined,
      weightMetric: user.weightMetric,
      weightImperial: user.weightImperial,
      heightImperialFeet: user.heightImperialFeet,
      heightImperialInches: user.heightImperialInches,
      heightMetricMetres: user.heightMetricMetres,
      heightMetricCentimetres: user.heightMetricCentimetres,
      gender: user.gender,
    },
  });
  const { toast } = useToast();

  const isMetric = user.units === "metric";

  function onSubmit(values: AccountFormSchema) {
    startTransition(() => {
      updateAccountSettings(values, user.id).then((state) => {
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold text-primary">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Change your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AccountFormCalendar control={form.control} />
        {isMetric ? (
          <>
            <FormField
              control={form.control}
              name="weightMetric"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold text-primary">
                    Weight (kg)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={20}
                      max={200}
                      step={0.1}
                      placeholder="Set your weight in kilograms"
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="heightMetricMetres"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 space-y-3">
                    <FormLabel className="text-lg font-semibold text-primary">
                      Height (m)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={2}
                        step={1}
                        placeholder="Set your height in metres"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heightMetricCentimetres"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 space-y-3">
                    <FormLabel className="text-lg font-semibold text-primary">
                      Height (cm)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={99}
                        step={1}
                        placeholder="Set your height in centimetres"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="weightImperial"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold text-primary">
                    Weight (lb)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={440}
                      step={0.1}
                      placeholder="Set your weight in pounds"
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="heightImperialFeet"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 space-y-3">
                    <FormLabel className="text-lg font-semibold text-primary">
                      Height (ft)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={8}
                        step={1}
                        placeholder="Set your height in feet"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heightImperialInches"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2 space-y-3">
                    <FormLabel className="text-lg font-semibold text-primary">
                      Height (in)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={11}
                        step={1}
                        placeholder="Set your height in inches"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold text-primary">
                Gender
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-100 p-3 rounded-md transition-all duration-300 hover:bg-gray-200">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-grow">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-100 p-3 rounded-md transition-all duration-300 hover:bg-gray-200">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-grow">
                      Female
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
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
