"use client";

import { useDebouncedValue } from "@/shared/lib/hooks";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface UserExerciseSearchProps {
  onSearch: (query: string) => void;
}

export function UserExerciseSearch({ onSearch }: UserExerciseSearchProps) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) return;

    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search exercises..."
        className="pl-9"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
