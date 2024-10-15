"use client";

import { Workout } from "@/db";
import { Button } from "@/shared/ui";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { MonthlyWorkoutViewHeader } from "./monthly-workout-view-header";
import { ListItem } from "./list-item";
import { CalendarView } from "./calendar-view";
import { useIsMobile } from "@/shared/lib/hooks";

type ViewType = "calendar" | "list";
type Direction = "prev" | "next";

export const MonthlyWorkoutView = ({ workouts }: { workouts: Workout[] }) => {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = useIsMobile();

  const handleViewChange = useCallback(
    (newView: ViewType) => {
      if (!isMobile || newView === "list") {
        setViewType(newView);
      }
    },
    [isMobile]
  );

  const handleMonthChange = useCallback((direction: Direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  }, []);

  const isNextMonthDisabled =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [workouts]);

  const renderListView = () => (
    <ul className="space-y-4">
      {sortedWorkouts.length === 0 ? (
        <li className="text-center text-gray-500 py-8">
          No workouts for this month
        </li>
      ) : (
        sortedWorkouts.map((workout) => (
          <li key={workout.id}>
            <ListItem workout={workout} />
          </li>
        ))
      )}
    </ul>
  );

  const renderCalendarView = () => (
    <CalendarView currentDate={currentDate} workouts={workouts} />
  );

  const effectiveViewType = isMobile ? "list" : viewType;

  return (
    <div className="bg-gray-50 p-3 sm:p-6 rounded-lg shadow-sm space-y-4 sm:space-y-6">
      <MonthlyWorkoutViewHeader
        currentDate={currentDate}
        onMonthChange={handleMonthChange}
        isNextMonthDisabled={isNextMonthDisabled}
      />

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
            variant={effectiveViewType === "calendar" ? "default" : "outline"}
          >
            <CalendarIcon className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        </div>
      )}

      <div className="bg-gray-100 border rounded-lg p-3 sm:p-4 shadow-sm">
        {effectiveViewType === "calendar"
          ? renderCalendarView()
          : renderListView()}
      </div>
    </div>
  );
};
