import { Skeleton } from "@/shared/ui";
import { ViewType } from "./monthly-workout-view";
import { CalendarView } from "./calendar-view";

export const SkeletonLoader = ({
  viewType,
  currentDate,
}: {
  viewType: ViewType;
  currentDate: Date;
}) => {
  return (
    <>
      <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:text-lg">
          <Skeleton className="h-6 w-24 mb-2 sm:mb-0" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>

      <div className="bg-gray-100 border rounded-lg p-3 sm:p-4 shadow-sm">
        {viewType === "list" ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full border border-gray-200 rounded-lg bg-white"
              />
            ))}
          </div>
        ) : (
          <CalendarView currentDate={currentDate} workouts={[]} />
        )}
      </div>
    </>
  );
};
