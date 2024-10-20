"use client";

import { formatDuration } from "@/shared/lib";
import { useIsMobile, useMonthlyWorkouts } from "@/shared/lib/hooks";
import { Button, Heading } from "@/shared/ui";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarView } from "./calendar-view";
import { ListItem } from "./list-item";
import { MonthlyWorkoutViewHeader } from "./monthly-workout-view-header";
import { SkeletonLoader } from "./skeleton-loader";
import { useRouter, useSearchParams } from "next/navigation";

export type ViewType = "calendar" | "list";
type Direction = "prev" | "next";

export const MonthlyWorkoutView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [viewType, setViewType] = useState<ViewType>("list");
  const [currentDate, setCurrentDate] = useState(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? new Date(dateParam) : new Date();
  });
  const isMobile = useIsMobile();
  const { workouts, isLoading, error } = useMonthlyWorkouts(currentDate);

  useEffect(() => {
    const date = currentDate.toISOString().split("T")[0];

    if (date === searchParams.get("date")) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (date === new Date().toISOString().split("T")[0]) {
      newSearchParams.delete("date");
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
      return;
    }

    newSearchParams.set("date", currentDate.toISOString().split("T")[0]);
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [currentDate, router, searchParams]);

  const handleViewChange = useCallback(
    (newView: ViewType) => {
      if (!isMobile || newView === "list") {
        setViewType(newView);
      }
    },
    [isMobile]
  );

  const handleMonthChange = useCallback(async (direction: Direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  }, []);

  const isNextMonthDisabled =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  const totalWorkouts = workouts?.length ?? 0;
  const totalDuration = useMemo(
    () =>
      workouts?.reduce((sum, workout) => sum + (workout.duration || 0), 0) ?? 0,
    [workouts]
  );

  const renderListView = () => (
    <ul className="space-y-4">
      {error ? (
        <li className="text-center font-semibold text-red-400 py-8">
          {error.message}
        </li>
      ) : workouts?.length === 0 ? (
        <li className="text-center text-gray-500 py-8">
          No workouts for this month
        </li>
      ) : (
        workouts?.map((workout) => (
          <li key={workout.id}>
            <ListItem workout={workout} />
          </li>
        ))
      )}
    </ul>
  );

  const renderCalendarView = () => (
    <CalendarView currentDate={currentDate} workouts={workouts || []} />
  );

  const effectiveViewType = isMobile ? "list" : viewType;

  return (
    <div className="bg-gray-50 p-3 sm:p-6 rounded-lg shadow-sm space-y-4 sm:space-y-6">
      <MonthlyWorkoutViewHeader
        currentDate={currentDate}
        onMonthChange={handleMonthChange}
        isNextMonthDisabled={isNextMonthDisabled}
      />

      {isLoading ? (
        <SkeletonLoader
          viewType={effectiveViewType}
          currentDate={currentDate}
        />
      ) : (
        <>
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <Heading tag="h2" as="h3" className="mb-2">
              Month&apos;s Summary
            </Heading>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:text-lg">
              <p className="mb-2 sm:mb-0">
                <span className="font-medium">{totalWorkouts}</span> workout
                {totalWorkouts !== 1 ? "s" : ""}
              </p>
              <p>
                Total duration:{" "}
                <span className="font-medium">
                  {formatDuration(totalDuration)}
                </span>
              </p>
            </div>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleViewChange("list")}
                aria-label="List view"
                size="icon"
                variant={effectiveViewType === "list" ? "default" : "outline"}
              >
                <List className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
              <Button
                onClick={() => handleViewChange("calendar")}
                aria-label="Calendar view"
                size="icon"
                variant={
                  effectiveViewType === "calendar" ? "default" : "outline"
                }
              >
                <CalendarIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
            </div>
          )}

          <div className="bg-gray-100 border rounded-lg p-2 sm:p-4 shadow-sm">
            {effectiveViewType === "calendar"
              ? renderCalendarView()
              : renderListView()}
          </div>
        </>
      )}
    </div>
  );
};
