import { Separator, Skeleton } from "@/shared/ui";

export const ExerciseCardSkeleton = () => {
  return (
    <li className="relative flex flex-col bg-muted rounded-md shadow-sm h-full">
      <Skeleton className="w-full aspect-[8/5] rounded-t-md" />

      <div className="py-2 flex flex-col h-full">
        <div className="px-2 md:px-4 flex-auto flex items-start justify-between gap-2">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-0.5" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        <>
          <Separator className="mt-3" />
          <div className="h-10 w-full" />
        </>
      </div>
    </li>
  );
};
