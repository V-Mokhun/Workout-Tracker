"use client";

import { ApiResponse } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Star } from "lucide-react";
import useSWRMutation from "swr/mutation";

interface FavoriteButtonProps {
  exerciseId: number;
  initialIsFavorite: boolean;
}

const toggleExerciseFavorite = async (
  url: string,
  { arg }: { arg: number }
) => {
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ exerciseId: arg }),
  });

  return res.json() as Promise<ApiResponse<boolean>>;
};

export const FavoriteButton = ({
  exerciseId,
  initialIsFavorite,
}: FavoriteButtonProps) => {
  const { trigger, isMutating, data } = useSWRMutation(
    `/api/exercise/toggle-favorite`,
    toggleExerciseFavorite
  );

  const isFavorite =
    data === undefined || "error" in data ? initialIsFavorite : data.data;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="shrink-0 bg-slate-200 hover:bg-slate-300"
      onClick={async () => {
        await trigger(exerciseId, {
          optimisticData: !isFavorite,
          rollbackOnError: true,
        });
      }}
      disabled={isMutating}
    >
      <Star
        className={cn(
          "w-6 h-6 transition-colors",
          isFavorite && "fill-yellow-500 text-yellow-500"
        )}
      />
    </Button>
  );
};
