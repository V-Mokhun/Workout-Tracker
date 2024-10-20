import { EXERCISE_TYPES } from "@/shared/consts";
import { slugify } from "@/shared/lib";
import {
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

interface AddExerciseSelectProps {
  label: string;
  options: string[] | readonly string[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string;
}

export const AddExerciseSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: AddExerciseSelectProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger className="h-10">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={slugify(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
