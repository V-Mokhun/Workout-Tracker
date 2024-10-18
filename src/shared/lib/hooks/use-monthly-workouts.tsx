"use client";

import { Workout } from "@/db";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { format } from "date-fns";

export const useMonthlyWorkouts = (
  date: Date,
  initialWorkouts: Workout[] = []
) => {
  const { data, isLoading, error } = useSWR<
    { data: Workout[] },
    { error: Error }
  >(`/api/workout/monthly?date=${format(date, "yyyy-MM")}`, fetcher, {
    fallbackData: { data: initialWorkouts },
  });

  return {
    workouts: data ? data.data : initialWorkouts,
    isLoading,
    error: error?.error,
  };
};
