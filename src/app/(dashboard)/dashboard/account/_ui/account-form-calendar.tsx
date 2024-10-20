"use client";

import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { AccountFormSchema } from "./account-form-model";
import { Control } from "react-hook-form";
import { cn } from "@/shared/lib";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AccountFormCalendarProps {
  control: Control<AccountFormSchema>;
}

const currentYear = new Date().getFullYear();
const years = new Array(100).fill(0).map((_, i) => currentYear - i);

export const AccountFormCalendar = ({ control }: AccountFormCalendarProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 xs:flex-row xs:gap-2 items-start xs:items-center justify-between">
      <FormField
        control={control}
        name="birthdate"
        render={({ field }) => (
          <FormItem className={cn("flex flex-col flex-1 w-full xs:w-auto")}>
            <FormLabel>Year of birth</FormLabel>
            <Select
              onValueChange={(year) => {
                const value = field.value;

                const date = value
                  ? new Date(value.setFullYear(+year))
                  : new Date(new Date().setFullYear(+year));

                if (date > new Date()) return;

                field.onChange(date);
              }}
              defaultValue={
                field.value ? `${field.value.getFullYear()}` : undefined
              }
              value={field.value ? `${field.value.getFullYear()}` : undefined}
            >
              <FormControl>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Pick a year" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-96">
                {years.map((year) => {
                  return (
                    <SelectItem value={`${year}`} key={year}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="birthdate"
        render={({ field }) => {
          return (
            <FormItem className={cn("flex flex-col flex-1 w-full xs:w-auto")}>
              <FormLabel>Date of birth</FormLabel>
              <Popover
                open={calendarOpen}
                onOpenChange={(open) => setCalendarOpen(open)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal space-x-2 text-sm md:text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className="block w-full text-sm">
                        {field.value
                          ? format(field.value, "MMMM do")
                          : "Pick a date"}
                      </span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="buttons"
                    formatters={{
                      formatCaption: (date) => format(date, "MMMM"),
                    }}
                    selected={field.value ?? undefined}
                    fixedWeeks
                    onSelect={(e) => {
                      field.onChange(e);
                      setCalendarOpen(false);
                    }}
                    defaultMonth={field.value ?? new Date()}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    fromYear={
                      field.value ? field.value.getFullYear() : currentYear
                    }
                    toYear={
                      field.value ? field.value.getFullYear() : currentYear
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};
