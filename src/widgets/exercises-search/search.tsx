"use client";

import { DEFAULT_EXERCISE_IMAGE, SINGLE_EXERCISE_ROUTE } from "@/shared/consts";
import { useDebouncedValue } from "@/shared/lib/hooks";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { ForwardedRef, useEffect, useState } from "react";
import { SearchExercise } from "./exercises-search";
import { forwardRef } from "react";

export type SearchExerciseOnSelect = (
  exercise: SearchExercise,
  {
    setIsOpen,
    setSearchValue,
  }: {
    setIsOpen: (isOpen: boolean) => void;
    setSearchValue: (value: string) => void;
  }
) => void;

interface SearchProps<T extends SearchExercise> {
  exercises: T[];
  isLoading: boolean;
  error?: string;
  onSearch: (value: string) => void;
  onSelect?: SearchExerciseOnSelect;
  searchContent?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const SearchInner = <T extends SearchExercise>(
  {
    onSearch,
    exercises,
    isLoading,
    error,
    searchContent,
    onSelect,
    inputProps,
  }: SearchProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
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
    let renderExercise = (exercise: T) => (
      <>
        <Image
          width={80}
          height={50}
          alt={exercise.name}
          src={exercise.image ?? DEFAULT_EXERCISE_IMAGE}
          className="h-auto w-20 max-h-12 object-cover"
        />
        <div className="space-y-0.5">
          <h3 className="text-base md:text-lg leading-tight font-semibold">
            {exercise.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {exercise?.targetMuscle?.name}
          </p>
        </div>
      </>
    );

    content = (
      <ul className="space-y-4">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {onSelect ? (
              <button
                onClick={() =>
                  onSelect(exercise, { setIsOpen, setSearchValue })
                }
                className="flex w-full text-left items-center gap-3 p-2 transition-colors hover:bg-muted"
              >
                {renderExercise(exercise)}
              </button>
            ) : (
              <Link
                className="flex items-center gap-3 p-2 transition-colors hover:bg-muted"
                href={SINGLE_EXERCISE_ROUTE(exercise.slug)}
              >
                {renderExercise(exercise)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          ref={ref}
          type="text"
          placeholder="Search exercises"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          {...inputProps}
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
        {searchContent}
      </PopoverContent>
    </Popover>
  );
};

export const Search = forwardRef(SearchInner);

Search.displayName = "Search";
