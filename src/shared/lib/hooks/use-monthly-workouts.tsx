"use client";

import { Workout } from "@/db";
import { format } from "date-fns";
import useSWR from "swr";
import { fetcher, FetcherError } from "../fetcher";

export const useMonthlyWorkouts = (date: Date) => {
  const { data, isLoading, error } = useSWR<{ data: Workout[] }, FetcherError>(
    `/api/workout/monthly?date=${format(date, "yyyy-MM")}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    workouts: data?.data,
    isLoading,
    error,
  };
};
