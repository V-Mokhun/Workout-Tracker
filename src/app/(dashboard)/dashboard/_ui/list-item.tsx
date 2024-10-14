import { Workout } from "@/db";
import { WORKOUT_ROUTE } from "@/shared/consts";
import { format } from "date-fns";
import { Clock, Dumbbell } from "lucide-react";
import Link from "next/link";

interface ListItemProps {
  workout: Workout;
}

export const ListItem: React.FC<ListItemProps> = ({ workout }) => {
  return (
    <Link
      href={WORKOUT_ROUTE(workout.id)}
      className="block border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
          <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {workout.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {format(workout.date, "MMM d, yyyy")}
          </p>
        </div>
        {workout.duration && (
          <div className="flex items-center text-xs sm:text-sm text-gray-600 ml-2 sm:ml-4">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">{workout.duration} min</span>
            <span className="xs:hidden">{workout.duration}m</span>
          </div>
        )}
      </div>
    </Link>
  );
};
