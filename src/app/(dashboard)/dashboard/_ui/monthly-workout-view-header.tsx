import { ADD_WORKOUT_ROUTE } from "@/shared/consts";
import { Button, buttonVariants, Heading } from "@/shared/ui";
import {
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import Link from "next/link";

interface MonthlyWorkoutViewHeaderProps {
  currentDate: Date;
  onMonthChange: (direction: "prev" | "next") => void;
  isNextMonthDisabled: boolean;
}

export const MonthlyWorkoutViewHeader = ({
  currentDate,
  onMonthChange,
  isNextMonthDisabled,
}: MonthlyWorkoutViewHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
        <Button
          onClick={() => onMonthChange("prev")}
          size="icon"
          aria-label="Previous month"
          variant="ghost"
          className="p-1 sm:p-2"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
        <Heading tag="h3" className="text-center">
          {currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Heading>
        <Button
          onClick={() => onMonthChange("next")}
          aria-label="Next month"
          size="icon"
          variant="ghost"
          disabled={isNextMonthDisabled}
          className="p-1 sm:p-2"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
      </div>
      <Link 
        className={buttonVariants({ className: "w-full sm:w-auto justify-center" })} 
        href={ADD_WORKOUT_ROUTE}
      >
        <Plus className="mr-2 h-4 w-4" /> 
        <span className="sm:hidden">Add</span>
        <span className="hidden sm:inline">Add Workout</span>
      </Link>
    </div>
  );
};
