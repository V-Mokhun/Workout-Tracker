"use client";

import { ExerciseEquipment, ExerciseTargetMuscle } from "@/db";
import { useUserCustomExercises } from "@/shared/lib/hooks";
import { Pagination } from "@/widgets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  UserExerciseFilters,
  UserExerciseFiltersType,
} from "./user-exercise-filters";
import { UserExerciseList } from "./user-exercise-list";
import { UserExerciseSearch } from "./user-exercise-search";
import { useEffect, useState } from "react";
import { preload } from "swr";
import { fetcher } from "@/shared/lib";

interface UserExerciseContentProps {
  muscleGroups: ExerciseTargetMuscle[];
  equipments: ExerciseEquipment[];
}

export const UserExerciseContent = ({
  muscleGroups,
  equipments,
}: UserExerciseContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);
  const [preloadedUrls, setPreloadedUrls] = useState<string[]>([]);

  const { data, isLoading } = useUserCustomExercises(
    `/api/exercise/user-custom?${searchParams.toString()}`
  );

  useEffect(() => {
    if (!data?.totalPages || isLoading || currentPage >= data.totalPages)
      return;

    const params = new URLSearchParams(searchParams);
    params.set("page", (currentPage + 1).toString());
    const url = `/api/exercise/user-custom?${params.toString()}`;

    if (!preloadedUrls.includes(url)) {
      preload(url, fetcher);
      setPreloadedUrls((prev) => [...prev, url]);
    }
  }, [currentPage, searchParams, data?.totalPages, preloadedUrls, isLoading]);

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr] flex-1">
      <aside className="space-y-6">
        <UserExerciseFilters
          muscleGroups={muscleGroups}
          equipments={equipments}
          initialFilters={{
            type:
              (searchParams.get("type") as UserExerciseFiltersType) ?? "all",
            muscleGroup: searchParams.get("muscleGroup") ?? null,
            equipment: searchParams.get("equipment") ?? null,
          }}
          onChange={(filters) => {
            const params = new URLSearchParams(searchParams);

            params.delete("page");

            if (filters.type !== "all") {
              params.set("type", filters.type);
            } else {
              params.delete("type");
            }

            if (filters.muscleGroup) {
              params.set("muscleGroup", filters.muscleGroup);
            } else {
              params.delete("muscleGroup");
            }

            if (filters.equipment) {
              params.set("equipment", filters.equipment);
            } else {
              params.delete("equipment");
            }

            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      </aside>

      <div className="space-y-6 h-full flex flex-col">
        <UserExerciseSearch
          defaultValue={searchParams.get("query") ?? ""}
          onSearch={(query) => {
            const params = new URLSearchParams(searchParams);
            if (query.trim().length > 0) {
              params.set("query", query.trim());
            } else {
              params.delete("query");
            }

            router.push(`${pathname}?${params.toString()}`);
          }}
          onClear={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("query");
            router.push(`${pathname}?${params.toString()}`);
          }}
        />

        <UserExerciseList
          exercises={data?.exercises ?? []}
          isLoading={isLoading}
        />

        <Pagination
          totalPages={data?.totalPages || 1}
          disablePrevious={currentPage === 1}
          disableNext={currentPage === (data?.totalPages || 1)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
