"use client";

import { BasicExercise } from "@/db";
import { ApiResponse } from "@/shared/api";
import { useState } from "react";
import { Search } from "./search";

export type SearchExercise = BasicExercise & { targetMuscle: { name: string } };

interface ExercisesSearchProps {
  whereOptions?: { [key: string]: any };
}

export const ExercisesSearch = ({ whereOptions }: ExercisesSearchProps) => {
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
      error={error}
      exercises={exercises}
      isLoading={loading}
      onSearch={onSearchExercises}
    />
  );
};
