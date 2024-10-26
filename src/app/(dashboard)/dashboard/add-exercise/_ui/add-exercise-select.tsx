"use client";

import { slugify } from "@/shared/lib";
import {
  Button,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { EraserIcon } from "lucide-react";
import { useState } from "react";

interface AddExerciseSelectProps {
  label: string;
  options: string[] | readonly string[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  slugify?: boolean;
}

export const AddExerciseSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  slugify: isSlugify = true,
}: AddExerciseSelectProps) => {
  const [key, setKey] = useState(+new Date());
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value}
        onValueChange={onChange}
        defaultValue={value}
        key={key}
      >
        <FormControl>
          <SelectTrigger className="h-10">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {value && (
            <Button
              className="w-full px-2 py-1.5 text-base justify-start"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setKey(+new Date());
              }}
            >
              <EraserIcon className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
          {options.map((option) => (
            <SelectItem
              key={option}
              value={isSlugify ? slugify(option) : option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
