"use client";

import { ExerciseCardType } from "@/widgets";
import useSWR from "swr";
import { fetcher, FetcherError } from "../fetcher";

export const useUserCustomExercises = (url: string) => {
  const { data, isLoading, error } = useSWR<
    { data: { exercises: ExerciseCardType[]; totalPages: number } },
    FetcherError
  >(url, fetcher, {
    keepPreviousData: true,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
