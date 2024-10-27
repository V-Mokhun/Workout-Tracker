"use client";

import { Button, useToast } from "@/shared/ui";
import { Star } from "lucide-react";
import { useTransition, useState } from "react";
import { cn } from "@/shared/lib";
import { toggleExerciseFavorite } from "@/shared/api/exercise/actions";

interface FavoriteButtonProps {
  exerciseId: number;
  initialIsFavorite: boolean;
}

export const FavoriteButton = ({
  exerciseId,
  initialIsFavorite,
}: FavoriteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const prevIsFavorite = isFavorite;
      setIsFavorite((prev) => !prev);
      const { success } = await toggleExerciseFavorite(exerciseId);
      if (!success) {
        setIsFavorite(prevIsFavorite);
        toast({
          title: `Failed to ${isFavorite ? "remove from" : "add to"} favorites`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="shrink-0 bg-slate-200 hover:bg-slate-300"
      onClick={handleFavoriteClick}
      disabled={isPending}
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
