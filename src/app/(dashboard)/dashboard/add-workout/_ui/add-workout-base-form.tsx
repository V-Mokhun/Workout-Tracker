import { cn, dateWithoutTimezone } from "@/shared/lib";
import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/shared/ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { AddWorkoutFormSchema } from "./add-workout-model";
import { UseFormReturn } from "react-hook-form";

interface AddWorkoutBaseFormProps {
  form: UseFormReturn<AddWorkoutFormSchema>;
  disabled: boolean;
}

export const AddWorkoutBaseForm = ({
  form,
  disabled,
}: AddWorkoutBaseFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name*</FormLabel>
            <FormControl>
              <Input
                placeholder="#4 Full Body"
                {...field}
                disabled={disabled}
              />
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
                      disabled={disabled}
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
                    defaultMonth={field.value}
                    onSelect={(date) => {
                      if (!date) {
                        return;
                      }

                      field.onChange(dateWithoutTimezone(date));
                    }}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
