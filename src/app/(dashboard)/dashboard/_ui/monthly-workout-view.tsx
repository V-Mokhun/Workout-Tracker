"use client";

import React from "react";
import { useState, useCallback, useMemo } from "react";
import { Button, buttonVariants, Heading } from "@/shared/ui";
import {
  Plus,
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { ADD_WORKOUT_ROUTE } from "@/shared/consts";

type ViewType = "calendar" | "list";
type Direction = "prev" | "next";

export const MonthlyWorkoutView = () => {
  const [viewType, setViewType] = useState<ViewType>("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleViewChange = useCallback((newView: ViewType) => {
    setViewType(newView);
  }, []);

  const handleMonthChange = useCallback((direction: Direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  }, []);

  const isNextMonthDisabled = useMemo(() => {
    const now = new Date();
    return (
      currentDate.getFullYear() > now.getFullYear() ||
      (currentDate.getFullYear() === now.getFullYear() &&
        currentDate.getMonth() >= now.getMonth())
    );
  }, [currentDate]);

  return (
    <div className="p-6 border rounded-sm space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleMonthChange("prev")}
            size="icon"
            aria-label="Previous month"
            variant="ghost"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Heading tag="h2" as="h3">
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Heading>
          <Button
            onClick={() => handleMonthChange("next")}
            aria-label="Next month"
            size="icon"
            variant="ghost"
            disabled={isNextMonthDisabled}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
        <Link className={buttonVariants()} href={ADD_WORKOUT_ROUTE}>
          <Plus className="mr-2 h-4 w-4" /> Add Workout
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleViewChange("list")}
          aria-label="List view"
          size="icon"
          variant={viewType === "list" ? "default" : "outline"}
        >
          <List className="h-6 w-6" />
        </Button>
        <Button
          onClick={() => handleViewChange("calendar")}
          aria-label="Calendar view"
          size="icon"
          variant={viewType === "calendar" ? "default" : "outline"}
        >
          <CalendarIcon className="h-6 w-6" />
        </Button>
      </div>

      {viewType === "calendar" ? (
        <div className="border rounded-md p-4">
          <p>Calendar view coming soon...</p>
        </div>
      ) : (
        <div className="border rounded-md p-4">
          <p>List view coming soon...</p>
        </div>
      )}
    </div>
  );
};
