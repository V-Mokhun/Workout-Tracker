"use client";

import { BasicExercise } from "@/db";
import { ApiResponse } from "@/shared/api";
import { useState } from "react";
import { Search, SearchExerciseOnSelect } from "./search";
import { forwardRef } from "react";

export type SearchExercise = BasicExercise & { targetMuscle: { name: string } };

interface ExercisesSearchProps {
  whereOptions?: { [key: string]: any };
  searchContent?: React.ReactNode;
  onSelect?: SearchExerciseOnSelect;
  placeholder?: string;
}

export const ExercisesSearch = forwardRef<
  HTMLInputElement,
  ExercisesSearchProps
>(({ whereOptions, searchContent, onSelect, placeholder }, ref) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<SearchExercise[]>([]);

  const onSearchExercises = (value: string) => {
    setLoading(true);
    fetch("/api/exercise/search", {
      method: "POST",
      body: JSON.stringify({
        searchValue: value,
        ...whereOptions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((result: ApiResponse<SearchExercise[]>) => {
        if ("error" in result) {
          setExercises([]);
          setError(result.error.message);
        } else {
          setExercises(result.data);
          setError("");
        }
      })
      .catch(() => {
        setExercises([]);
        setError("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Search
      ref={ref}
      error={error}
      exercises={exercises}
      isLoading={loading}
      onSearch={onSearchExercises}
      searchContent={searchContent}
      onSelect={onSelect}
      placeholder={placeholder}
    />
  );
});

ExercisesSearch.displayName = "ExercisesSearch";
