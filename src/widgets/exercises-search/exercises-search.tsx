"use client";

import { BasicExercise } from "@/db";
import { useState } from "react";
import { Search } from "./search";
import { SQL } from "drizzle-orm";
import { ApiResponse } from "@/shared/api";

export type SearchExercise = BasicExercise & { targetMuscle: { name: string } };

interface ExercisesSearchProps {
  whereClause?: SQL<unknown>;
}

export const ExercisesSearch = ({ whereClause }: ExercisesSearchProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<SearchExercise[]>([]);

  const onSearchExercises = (value: string) => {
    setLoading(true);
    fetch("/api/exercise/search", {
      method: "POST",
      body: JSON.stringify({ searchValue: value, whereClause }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }: ApiResponse<SearchExercise[]>) => {
        setExercises(data);
        setError("");
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
      error={error}
      exercises={exercises}
      isLoading={loading}
      onSearch={onSearchExercises}
    />
  );
};
