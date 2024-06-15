"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AccountFormSchema, accountFormSchema } from "./account-form-model";
import { User } from "@/db";

interface AccountFormProps {
  user: User;
}

export const AccountForm = ({ user }: AccountFormProps) => {
  const form = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user.name ?? "",
      birthdate: user.birthdate,
      weightMetric: user.weightMetric,
      weightImperial: user.weightImperial,
      heightMetric: user.heightMetric,
      heightImperial: user.heightImperial,
      gender: user.gender,
    },
  });

  function onSubmit(values: AccountFormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Change your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
