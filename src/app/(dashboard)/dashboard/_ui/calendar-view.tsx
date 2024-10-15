import { useMemo } from "react";
import { Workout } from "@/db";
import { Plus } from "lucide-react";
import { isSameDay, format } from "date-fns";
import { cn, formatDuration } from "@/shared/lib";
import Link from "next/link";
import { ADD_WORKOUT_ROUTE, WORKOUT_ROUTE } from "@/shared/consts";
import { Button, buttonVariants } from "@/shared/ui";

type CalendarViewProps = {
  currentDate: Date;
  workouts: Workout[];
};

export const CalendarView = ({ currentDate, workouts }: CalendarViewProps) => {
  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }, [currentDate]);

  const firstDayOfMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, [currentDate]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const calendarDays = useMemo(() => {
    const days = [];
    const totalDays = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        dayNumber
      );
      const dayWorkouts = workouts.filter((workout) =>
        isSameDay(workout.date, date)
      );

      days.push({
        dayNumber: isCurrentMonth ? dayNumber : null,
        isCurrentMonth,
        workouts: dayWorkouts,
      });
    }

    return days;
  }, [daysInMonth, firstDayOfMonth, currentDate, workouts]);

  return (
    <div className="grid grid-cols-7 gap-1 bg-gray-100">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-semibold p-2">
          {day}
        </div>
      ))}
      {calendarDays.map((day, index) => (
        <div
          key={index}
          className={cn(
            `p-2 rounded-md flex flex-col h-40 overflow-hidden relative group`,
            day.isCurrentMonth
              ? "bg-white"
              : "bg-gray-300 select-none pointer-events-none"
          )}
        >
          {day.dayNumber && (
            <>
              <div className="text-sm font-semibold">{day.dayNumber}</div>
              <div className="flex-1 overflow-y-auto space-y-1 py-2">
                {day.workouts.map((workout, idx) => (
                  <Link
                    key={idx}
                    href={WORKOUT_ROUTE(workout.id)}
                    className="block text-xs bg-gray-100 rounded-md p-1 font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {workout.duration && (
                      <span className="mr-1">
                        {formatDuration(workout.duration)}
                      </span>
                    )}
                    <span className="line-clamp-3">{workout.name}</span>
                  </Link>
                ))}
              </div>
              {day.isCurrentMonth && (
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                  <Link
                    href={`${ADD_WORKOUT_ROUTE}?date=${format(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day.dayNumber
                      ),
                      "yyyy-MM-dd"
                    )}`}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                      className:
                        "w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out text-xs",
                    })}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Workout
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
