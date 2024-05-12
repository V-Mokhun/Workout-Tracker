"use client";

import { DEFAULT_EXERCISE_IMAGE, SINGLE_EXERCISE_ROUTE } from "@/shared/consts";
import { useDebouncedValue } from "@/shared/lib/hooks";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchExercise } from "./exercises-search";

interface SearchProps<T extends SearchExercise> {
  exercises: T[];
  isLoading: boolean;
  error?: string;
  onSearch: (value: string) => void;
}

export const Search = <T extends SearchExercise>({
  onSearch,
  exercises,
  isLoading,
  error,
}: SearchProps<T>) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue.trim().length === 0) return;

    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  let content = null;

  if (debouncedSearchValue.trim().length === 0) {
    content = <p className="text-sm">Start typing to search for exercises</p>;
  } else if (isLoading) {
    content = <p className="text-sm">Loading...</p>;
  } else if (error) {
    content = <p className="text-sm text-red-500">{error}</p>;
  } else if (exercises.length === 0) {
    content = (
      <p className="text-sm">
        No results found! Try search for a different exercise
      </p>
    );
  } else {
    content = (
      <ul className="space-y-4">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Link
              className="flex items-center gap-3 p-2 transition-colors hover:bg-muted"
              href={SINGLE_EXERCISE_ROUTE + `/${exercise.slug}`}
            >
              <Image
                width={80}
                height={50}
                alt={exercise.name}
                src={exercise.image ?? DEFAULT_EXERCISE_IMAGE}
                className="h-auto w-20 object-cover"
              />
              <div className="space-y-0.5">
                <h3 className="text-base md:text-lg leading-tight font-semibold">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {exercise.targetMuscle.name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          type="text"
          placeholder="Search exercises"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />
      </PopoverTrigger>
      <PopoverContent
        className="popover-content-width-same-as-its-trigger px-3 py-4 max-h-60 overflow-y-auto"
        side="bottom"
        sideOffset={0}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};
