"use client";

import { useState, useTransition } from "react";
import { Search } from "./search";
import { BasicExercise } from "@/db";

export type SearchExercise = BasicExercise & { targetMuscle: { name: string } };

interface ExercisesSearchProps<T extends SearchExercise> {
  onSearch: (value: string) => Promise<T[]>;
}

export const ExercisesSearch = <T extends SearchExercise>({
  onSearch,
}: ExercisesSearchProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState<T[]>([]);

  const onSearchExercises = (value: string) => {
    setLoading(true);
    onSearch(value)
      .then((data) => {
        setExercises(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Search
      exercises={exercises}
      isLoading={loading}
      onSearch={onSearchExercises}
    />
  );
};
